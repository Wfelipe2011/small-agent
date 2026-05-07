import { createAgent, HumanMessage } from "langchain";
import { model } from "../infra/model";

const agent = createAgent({ model });

export async function invokeAgent(message: string): Promise<string> {
    const response = await agent.invoke({
        messages: [new HumanMessage(message)],
    });

    const last = response.messages.at(-1);
    return typeof last?.content === "string" ? last.content : JSON.stringify(last?.content ?? "");
}
