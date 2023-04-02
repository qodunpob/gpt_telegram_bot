import { OpenAIGateway } from "./gateways/openai.gateway";
import { TelegramGateway } from "./gateways/telegram.gateway";

export class App {
  constructor(
    private readonly telegramGateway: TelegramGateway,
    private readonly openaiGateway: OpenAIGateway
  ) {
    this.setHandler();
  }

  launch(): Promise<void> {
    console.log("Running application...");
    return this.telegramGateway.launch();
  }

  stop(signal: string) {
    console.log("Stopping application...");
    this.telegramGateway.stop(signal);
  }

  private setHandler() {
    this.telegramGateway.onReceiveMessage((content) =>
      this.openaiGateway.complete([{ role: "user", content }])
    );
  }
}
