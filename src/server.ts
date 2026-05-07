import { chatHandler } from "./api/chat-handler";
import { webhookHandler } from "./telegram/webhook-handler";

const port = Number(process.env.PORT ?? 3000);

Bun.serve({
    port,
    async fetch(req) {
        const url = new URL(req.url);

        try {
            if (req.method === "GET" && url.pathname === "/health") {
                return Response.json({ status: "ok" });
            }

            if (req.method === "POST" && url.pathname === "/chat") {
                return await chatHandler(req);
            }

            if (req.method === "POST" && url.pathname === "/telegram/webhook") {
                return await webhookHandler(req);
            }

            return Response.json({ error: "Not found" }, { status: 404 });
        } catch (err) {
            console.error("[server] Unhandled error:", err);
            return Response.json({ error: "Internal server error" }, { status: 500 });
        }
    },
});

console.log(`small-agent listening on port ${port}`);
