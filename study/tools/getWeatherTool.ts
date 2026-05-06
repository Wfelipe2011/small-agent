import { AIMessage, createAgent, HumanMessage, SystemMessage, ToolMessage } from "langchain";

import { tool } from "langchain/tools";
import { z } from "zod";
import { model } from "../../infra/model";

async function getWeather({ city }: { city: string }): Promise<string> {
    console.log(`[FUNCTION] Buscar a previsão do tempo para ${city}...`);
    return `30C`;
}

const getWeatherToolConfig = {
    name: "get_weather",
    description: "Obter a previsão do tempo para uma cidade",
    schema: z.object({ city: z.string() }),
};

const getWeatherTool = tool(
    getWeather,
    getWeatherToolConfig
);

const agent = createAgent({
    model,
    tools: [getWeatherTool],
    name: "WeatherAgent",
});

const response = await agent.invoke({
    messages: [
        new SystemMessage("Você é um assistente útil que fornece informações sobre o clima."),
        {
            role: "user",
            content: "Qual é a previsão do tempo para São Paulo?",
        },
    ],
});

response.messages.forEach((message) => {
    if (message instanceof HumanMessage || message instanceof AIMessage) {
        console.log(message.content);
    } else if (message instanceof ToolMessage) {
        console.debug(`[Tool] ${message.name} was called with output: ${JSON.stringify(message.content)}`);
    }
});