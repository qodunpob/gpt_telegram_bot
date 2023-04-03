import { OpenAIGateway } from "./gateways/openai.gateway";
import { TelegramGateway } from "./gateways/telegram.gateway";
import { StorageGateway } from "./gateways/storage/storage.gateway";

export class App {
  constructor(
    private readonly telegramGateway: TelegramGateway,
    private readonly openaiGateway: OpenAIGateway,
    private readonly storageGateway: StorageGateway
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
    this.telegramGateway.onReceiveMessage(async (message) =>
      this.openaiGateway.complete(
        await this.storageGateway.makeConversation(message)
      )
    );
  }
}
