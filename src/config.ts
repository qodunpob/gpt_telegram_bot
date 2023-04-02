import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import { getDependedEnv, getRequiredEnv } from "./utils/common.util";

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
    systemMessage: string;
  };
}

export interface DbConfig {
  db: {
    provider?: string;
    url?: string;
  };
}

export interface FeatureConfig {
  feature: {
    conversationMode: boolean;
  };
}

export type Config = TelegramConfig & OpenAIConfig & DbConfig & FeatureConfig;

export const config: Config = {
  telegram: { token: getRequiredEnv("TELEGRAM_TOKEN") },
  openai: {
    token: getRequiredEnv("OPENAI_TOKEN"),
    model: process.env.OPENAI_MODEL ?? "gpt-3.5-turbo",
    systemMessage:
      process.env.OPENAI_SYSTEM_MESSAGE ?? "You are a helpful assistant",
  },
  db: {
    provider: getDependedEnv("DB_PROVIDER", "FEATURE_CONVERSATION_MODE"),
    url: getDependedEnv("DB_URL", "FEATURE_CONVERSATION_MODE"),
  },
  feature: {
    conversationMode: process.env.FEATURE_CONVERSATION_MODE === "true",
  },
};
