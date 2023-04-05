import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { TelegramConfig } from "../config";
import { ChatMessage, MessageId } from "../models/message";

export interface TelegramGateway {
  launch(): Promise<void>;

  onReceiveMessage(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    eventHandler: (event: ReceiveMessageEvent) => Promise<any>
  ): void;

  stop(signal: string): void;
}

export interface ReceiveMessageEvent {
  message: ChatMessage;
  replay: (content: string) => Promise<MessageId>;
}

class TelegrafTelegramGateway implements TelegramGateway {
  constructor(private readonly bot: Telegraf) {}

  launch() {
    return this.bot.launch();
  }

  onReceiveMessage(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    eventHandler: (event: ReceiveMessageEvent) => Promise<any>
  ) {
    this.bot.on(message("text"), async (ctx) => {
      await ctx.persistentChatAction("typing", async () => {
        const { message_id, reply_to_message, text } = ctx.message;
        await eventHandler({
          message: {
            id: message_id,
            repliedTo: reply_to_message?.message_id,
            role: "user",
            content: text,
          },
          replay: async (content) =>
            (
              await ctx.reply(content, { reply_to_message_id: message_id })
            ).message_id,
        });
      });
    });
  }

  stop(signal: string) {
    this.bot.stop(signal);
  }
}

export const telegramGatewayFactory = (config: TelegramConfig) => {
  const bot = new Telegraf(config.telegram.token);
  return new TelegrafTelegramGateway(bot);
};
