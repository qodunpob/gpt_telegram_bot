import { OpenaiGateway } from "./gateways/openai.gateway";
import { TelegramGateway } from "./gateways/telegram.gateway";

export class App {
  constructor(
    private readonly telegramGateway: TelegramGateway,
    private readonly openaiGateway: OpenaiGateway
  ) {
    this.setHandler();
  }

  launch(): Promise<void> {
    return this.telegramGateway.launch();
  }

  private setHandler() {
    this.telegramGateway.onReceiveMessage((message) =>
      this.openaiGateway.completion(message)
    );
  }
}
