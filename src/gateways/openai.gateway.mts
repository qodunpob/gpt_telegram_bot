import { Configuration, OpenAIApi } from "openai";
import { OpenAIConfig } from "../config.mjs";
import { ConversationMessage } from "../models/message.mjs";

export interface OpenAIGateway {
  complete(messages: ConversationMessage[]): Promise<string>;
}

export class SdkOpenAIGateway implements OpenAIGateway {
  constructor(
    private readonly openai: OpenAIApi,
    private readonly model: string,
    private readonly systemMessage: string
  ) {}

  async complete(messages: ConversationMessage[]): Promise<string> {
    const completion = await this.openai.createChatCompletion({
      model: this.model,
      messages: [{ role: "system", content: this.systemMessage }, ...messages],
    });

    return (
      completion.data.choices[0]?.message?.content ??
      "Oops, something went wrong"
    );
  }
}

export const openAIGatewayFactory = (config: OpenAIConfig) => {
  const openai = new OpenAIApi(
    new Configuration({
      apiKey: config.openai.token,
    })
  );
  return new SdkOpenAIGateway(
    openai,
    config.openai.model,
    config.openai.systemMessage
  );
};
