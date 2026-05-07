import { invokeAgent } from "../agent/index";

export async function chatHandler(req: Request): Promise<Response> {
    let body: unknown;
    try {
        body = await req.json();
    } catch {
        return Response.json({ error: "Missing required field: message" }, { status: 400 });
    }

    if (
        typeof body !== "object" ||
        body === null ||
        !("message" in body) ||
        typeof (body as Record<string, unknown>).message !== "string"
    ) {
        return Response.json({ error: "Missing required field: message" }, { status: 400 });
    }

    const reply = await invokeAgent((body as { message: string }).message);
    return Response.json({ reply });
}
