import {
  OpenAIGateway,
  StorageGateway,
  TelegramGateway,
} from "./gateways/index.mjs";

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
    this.telegramGateway.onReceiveMessage(async ({ message, replay }) => {
      const response = await this.openaiGateway.complete(
        await this.storageGateway.makeConversation(message)
      );
      const responseId = await replay(response);
      await this.storageGateway.saveMessage({
        id: responseId,
        repliedTo: message.id,
        role: "assistant",
        content: response,
      });
    });
  }
}
