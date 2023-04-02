import { Configuration, OpenAIApi } from "openai";
import { OpenAIConfig } from "../config";
import { Message } from "../models/message";

export interface OpenAIGateway {
  completion(messages: Message[]): Promise<string>;
}

export class SdkOpenAIGateway implements OpenAIGateway {
  constructor(
    private readonly openai: OpenAIApi,
    private readonly model: string,
    private readonly systemMessage: string
  ) {}

  async completion(messages: Message[]): Promise<string> {
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
