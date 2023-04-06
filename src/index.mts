import {
  openAIGatewayFactory,
  storageGatewayFactory,
  telegramGatewayFactory,
} from "./gateways/index.mjs";
import { config } from "./config.mjs";
import { App } from "./app.mjs";

const telegramGateway = telegramGatewayFactory(config);
const openaiGateway = openAIGatewayFactory(config);
const storageGateway = storageGatewayFactory(config);

const app = new App(telegramGateway, openaiGateway, storageGateway);

// Enable graceful stop
process.once("SIGINT", () => app.stop("SIGINT"));
process.once("SIGTERM", () => app.stop("SIGTERM"));

await app.launch();
