import { Configuration, OpenAIApi } from "openai";
import { OpenAIConfig } from "../config";

export interface OpenAIGateway {
  completion(prompt: string): Promise<string>;
}

class SdkOpenAiGateway implements OpenAIGateway {
  constructor(
    private readonly openai: OpenAIApi,
    private readonly model: string
  ) {}

  async completion(prompt: string): Promise<string> {
    const completion = await this.openai.createChatCompletion({
      model: this.model,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    return (
      completion.data.choices[0].message?.content ??
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
  return new SdkOpenAiGateway(openai, config.openai.model);
};
