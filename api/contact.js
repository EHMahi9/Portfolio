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
    if (![name, email, subject, message].every((value) => typeof value === "string" && value.trim())) {
        return response.status(400).json({ error: "Name, email, subject, and message are required." });
    }

    // Add third-party email delivery here. Never expose its API key to the client.
    return response.status(200).json({
        success: true,
        message: "Thanks - your message has been received."
    });
};
