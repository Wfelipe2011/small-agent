import { ChatOpenAI, tools } from "@langchain/openai";
import { createAgent } from "langchain";
import { z } from "zod";

const model = new ChatOpenAI({
    model: "gemma-4",
    apiKey: "sk-xxx",
    configuration: {
        baseURL: "http://192.168.0.209:8080/v1",
    },
});

const ContactInfo = z.object({
    name: z.string(),
    email: z.string(),
    phone: z.string(),
});

const agent = createAgent({
    model,
    responseFormat: ContactInfo,
});

const result = await agent.invoke({
    messages: [
        {
            role: "user",
            content: "Extract contact info from: John Doe, john@example.com, (555) 123-4567",
        },
    ],
});

console.log(result);