const requestLog = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const getClientIp = (request) =>
    request.headers?.["x-forwarded-for"]?.split(",")[0].trim()
    || request.socket?.remoteAddress
    || "unknown";

const isRateLimited = (ip) => {
    const now = Date.now();
    const recentRequests = (requestLog.get(ip) || []).filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);
    recentRequests.push(now);
    requestLog.set(ip, recentRequests);
    return recentRequests.length > RATE_LIMIT_MAX_REQUESTS;
};

module.exports = async (request, response) => {
    if (request.method !== "POST") {
        response.setHeader("Allow", "POST");
        return response.status(405).json({ error: "Method not allowed." });
    }

    let payload = request.body;
    if (typeof payload === "string") {
        try {
            payload = JSON.parse(payload);
        } catch {
            return response.status(400).json({ error: "Invalid JSON payload." });
        }
    }

    const { name, email, subject, message } = payload || {};

    // 1. Honeypot check: reject bots filling hidden fields
    if (payload?.website) {
        return response.status(400).json({ error: "Unable to process this request." });
    }

    // 2. In-memory per-container rate limit
    if (isRateLimited(getClientIp(request))) {
        return response.status(429).json({ error: "Too many messages. Please try again later." });
    }

    // 3. Type validation
    if (![name, email, subject, message].every((value) => typeof value === "string")) {
        return response.status(400).json({ error: "All fields must be valid text." });
    }

    // 4. Strip CR/LF to prevent header injection attacks
    const cleanName = name.replace(/[\r\n]+/g, " ").trim();
    const cleanEmail = email.replace(/[\r\n]+/g, " ").trim();
    const cleanSubject = subject.replace(/[\r\n]+/g, " ").trim();
    const cleanMessage = message.trim();

    // 5. Length & format bounds
    if (cleanName.length < 2 || cleanName.length > 100) {
        return response.status(400).json({ error: "Name must be between 2 and 100 characters." });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanEmail) || cleanEmail.length > 150) {
        return response.status(400).json({ error: "Please provide a valid email address." });
    }

    if (cleanSubject.length < 3 || cleanSubject.length > 200) {
        return response.status(400).json({ error: "Subject must be between 3 and 200 characters." });
    }

    if (cleanMessage.length < 15 || cleanMessage.length > 5000) {
        return response.status(400).json({ error: "Message must be between 15 and 5000 characters." });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
        console.error("Missing RESEND_API_KEY environment variable.");
        return response.status(502).json({
            error: "Email delivery service is currently unconfigured. Please use direct email."
        });
    }

    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "ebnulhasanmahi001@gmail.com";
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Portfolio Contact <onboarding@resend.dev>";

    // Plain text email body with provenance details
    const textBody = [
        `New message received via ebnulhasanmahi.me portfolio contact form`,
        `--------------------------------------------------`,
        `From:    ${cleanName}`,
        `Email:   ${cleanEmail}`,
        `Subject: ${cleanSubject}`,
        `IP:      ${getClientIp(request)}`,
        `Date:    ${new Date().toISOString()}`,
        `--------------------------------------------------`,
        `Message:`,
        cleanMessage
    ].join("\n");

    // 6. Send through Resend with 8-second request timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
        const resendResponse = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${resendApiKey}`,
                "Content-Type": "application/json"
            },
            signal: controller.signal,
            body: JSON.stringify({
                from: fromEmail,
                to: [receiverEmail],
                reply_to: cleanEmail,
                subject: `[Portfolio] ${cleanSubject} from ${cleanName}`,
                text: textBody
            })
        });

        clearTimeout(timeoutId);

        if (!resendResponse.ok) {
            const errData = await resendResponse.text();
            console.error("Resend API returned error:", resendResponse.status, errData);
            return response.status(502).json({
                error: "Unable to deliver message right now. Please use the direct email link below."
            });
        }

        return response.status(200).json({
            success: true,
            message: "Thanks — your message has been received."
        });
    } catch (err) {
        clearTimeout(timeoutId);
        const isTimeout = err.name === "AbortError";
        console.error("Delivery failure:", isTimeout ? "Request timed out after 8s" : err.message);
        return response.status(502).json({
            error: isTimeout
                ? "Delivery timed out. Please contact directly via email."
                : "Email delivery failed. Please use direct email below."
        });
    }
};
