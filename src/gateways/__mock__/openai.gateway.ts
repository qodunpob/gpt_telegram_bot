import { OpenAIGateway } from "../openai.gateway";

export const anOpenaiGatewayMock = (): jest.Mocked<OpenAIGateway> => ({
  complete: jest.fn((messages) =>
    Promise.resolve(
      messages[messages.length - 1].content.split("").reverse().join("")
    )
  ),
});
