import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { TelegramConfig } from "../config";
import { ChatMessage } from "../models/message";

export interface TelegramGateway {
  launch(): Promise<void>;

  onReceiveMessage(respond: (message: ChatMessage) => Promise<string>): void;

  stop(signal: string): void;
}

class TelegrafTelegramGateway implements TelegramGateway {
  constructor(private readonly bot: Telegraf) {}

  launch() {
    return this.bot.launch();
  }

  onReceiveMessage(respond: (message: ChatMessage) => Promise<string>) {
    this.bot.on(message("text"), async (ctx) => {
      await ctx.persistentChatAction("typing", async () => {
        const { message_id, text } = ctx.message;
        const response = await respond({
          id: message_id,
          repliedTo: ctx.message.reply_to_message?.message_id,
          content: text,
        });
        await ctx.reply(response, {
          reply_to_message_id: message_id,
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
