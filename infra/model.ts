import { ChatOpenAI } from "@langchain/openai";

export const model = new ChatOpenAI({
    model: "gemma-4",
    apiKey: "sk-xxx",
    configuration: {
        baseURL: "http://192.168.0.209:8080/v1",
    },
});