import { OpenAIApi } from "openai";

class OpenAIApiMockBuilder {
  private choices: { message: { content: string } }[] = [];

  withResponse = (content: string) => {
    this.choices = [{ message: { content } }];
    return this;
  };

  build = () =>
    ({
      createChatCompletion: jest.fn(() =>
        Promise.resolve({
          data: { choices: this.choices },
        })
      ),
    } as unknown as OpenAIApi);
}

export const anOpenAIApiMock = () => new OpenAIApiMockBuilder();
