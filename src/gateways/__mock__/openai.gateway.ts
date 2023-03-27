import { OpenAIGateway } from "../openai.gateway";

export const anOpenaiGatewayMock = (): jest.Mocked<OpenAIGateway> => ({
  completion: jest.fn((prompt) =>
    Promise.resolve(prompt.split("").reverse().join(""))
  ),
});
