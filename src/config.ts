import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { getRequiredEnv } from "./utils/common.util";

dotenv.config();

export interface TelegramConfig {
  telegram: {
    token: string;
  };
}

export interface OpenAIConfig {
  openai: {
    token: string;
    model: string;
  };
}

export type Config = TelegramConfig & OpenAIConfig;

export const config: Config = {
  telegram: { token: getRequiredEnv("TELEGRAM_TOKEN") },
  openai: {
    token: getRequiredEnv("OPENAI_TOKEN"),
    model: process.env.OPENAI_MODEL ?? "gpt-3.5-turbo",
  },
};