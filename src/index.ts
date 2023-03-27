import { telegramGatewayFactory } from "./gateways/telegram.gateway";
import { config } from "./config";
import { openAIGatewayFactory } from "./gateways/openai.gateway";
import { App } from "./app";

const telegramGateway = telegramGatewayFactory(config);
const openaiGateway = openAIGatewayFactory(config);

const app = new App(telegramGateway, openaiGateway);
void app.launch();

// Enable graceful stop
process.once("SIGINT", () => app.stop("SIGINT"));
process.once("SIGTERM", () => app.stop("SIGTERM"));
