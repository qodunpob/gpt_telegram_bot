import { OpenAIApi } from "openai";

class OpenAIApiMockBuilder {
  private choices: { message: { content: string } }[] = [];

  withResponse(content: string) {
    this.choices = [{ message: { content } }];
    return this;
  }

  build() {
    const choices = this.choices;
    return {
      createChatCompletion: jest.fn(() =>
        Promise.resolve({
          data: { choices },
        })
      ),
    } as unknown as jest.Mocked<OpenAIApi>;
  }
}

export const anOpenAIApiMock = () => new OpenAIApiMockBuilder();
