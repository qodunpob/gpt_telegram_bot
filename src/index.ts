import { telegramGatewayFactory } from "./gateways/telegram.gateway";
import { config } from "./config";
import { openAIGatewayFactory } from "./gateways/openai.gateway";
import { App } from "./app";
import { storageGatewayFactory } from "./gateways/storage/storage.gateway";

const telegramGateway = telegramGatewayFactory(config);
const openaiGateway = openAIGatewayFactory(config);
const storageGateway = storageGatewayFactory(config);

const app = new App(telegramGateway, openaiGateway, storageGateway);
void app.launch();

// Enable graceful stop
process.once("SIGINT", () => app.stop("SIGINT"));
process.once("SIGTERM", () => app.stop("SIGTERM"));
