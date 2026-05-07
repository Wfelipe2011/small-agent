function getBotToken(): string {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) throw new Error("TELEGRAM_BOT_TOKEN is not defined");
    return token;
}

function apiUrl(method: string): string {
    return `https://api.telegram.org/bot${getBotToken()}/${method}`;
}

async function post(method: string, body: Record<string, unknown>): Promise<void> {
    const res = await fetch(apiUrl(method), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
    });

    if (!res.ok) {
        throw new Error(`Telegram API error [${method}]: ${res.status} ${res.statusText}`);
    }
}

export async function sendText(chatId: string | number, text: string): Promise<void> {
    await post("sendMessage", { chat_id: chatId, text });
}

export async function sendChatAction(chatId: string | number, action: string): Promise<void> {
    await post("sendChatAction", { chat_id: chatId, action });
}
