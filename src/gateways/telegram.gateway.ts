import { Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { TelegramConfig } from "../config";

export interface TelegramGateway {
  launch(): Promise<void>;

  onReceiveMessage(respond: (userMessage: string) => Promise<string>): void;

  stop(signal: string): void;
}

class TelegrafTelegramGateway implements TelegramGateway {
  constructor(private readonly bot: Telegraf) {}

  launch() {
    return this.bot.launch();
  }

  onReceiveMessage(respond: (userMessage: string) => Promise<string>) {
    this.bot.on(message("text"), async (ctx) => {
      await ctx.persistentChatAction("typing", async () => {
        ctx.reply(await respond(ctx.message.text));
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
