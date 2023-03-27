import { OpenaiGateway } from "../openai.gateway";

export const anOpenaiGatewayMock = (): jest.Mocked<OpenaiGateway> => ({
  completion: jest.fn((message) =>
    Promise.resolve(message.split("").reverse().join(""))
  ),
});
