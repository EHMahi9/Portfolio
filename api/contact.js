const requestLog = new Map();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const getClientIp = (request) => request.headers?.["x-forwarded-for"]?.split(",")[0].trim()
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
    if (payload?.website) {
        return response.status(400).json({ error: "Unable to process this request." });
    }

    if (isRateLimited(getClientIp(request))) {
        return response.status(429).json({ error: "Too many messages. Please try again later." });
    }

    if (![name, email, subject, message].every((value) => typeof value === "string" && value.trim())) {
        return response.status(400).json({ error: "Name, email, subject, and message are required." });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        return response.status(400).json({ error: "Please provide a valid email address." });
    }

    // Add third-party email delivery here. Never expose its API key to the client.
    return response.status(200).json({
        success: true,
        message: "Thanks - your message has been received."
    });
};
