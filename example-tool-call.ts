import { ChatOpenAI, tools } from "@langchain/openai";
import { createAgent } from "langchain";

import { tool } from "langchain/tools";
import { z } from "zod";

const getWeather = tool(
    async ({ city }) => `The weather in ${city} is sunny.`,
    {
        name: "get_weather",
        description: "Get the weather for a city",
        schema: z.object({ city: z.string() }),
    }
);

const model = new ChatOpenAI({
    model: "gemma-4",
    apiKey: "sk-xxx",
    configuration: {
        baseURL: "http://192.168.0.209:8080/v1",
    },
});

const agent = createAgent({
    model,
    tools: [getWeather],
});

const response = await agent.invoke({
    messages: [
        {
            role: "user",
            content: "Qual é a previsão do tempo para São Paulo?",
        },
    ],
});
console.log(response);