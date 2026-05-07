import { invokeAgent } from "../agent/index";
import { sendChatAction, sendText } from "./client";
import type { TelegramUpdate } from "./types";

export async function webhookHandler(req: Request): Promise<Response> {
    const expectedSecret = process.env.TELEGRAM_WEBHOOK_SECRET;
    const receivedSecret = req.headers.get("x-telegram-bot-api-secret-token");

    if (!receivedSecret || receivedSecret !== expectedSecret) {
        return new Response("Forbidden", { status: 403 });
    }

    let update: TelegramUpdate;
    try {
        update = (await req.json()) as TelegramUpdate;
    } catch {
        return new Response("Bad Request", { status: 400 });
    }

    if (!update.message && !update.callback_query) {
        return new Response("OK");
    }

    const chatId =
        update.message?.chat.id ?? update.callback_query?.message?.chat.id ?? update.callback_query?.from.id;

    if (!chatId) {
        return new Response("OK");
    }

    const text = update.message?.text ?? update.callback_query?.data ?? "";

    await sendChatAction(chatId, "typing");
    const reply = await invokeAgent(text);
    await sendText(chatId, reply);

    return new Response("OK");
}
