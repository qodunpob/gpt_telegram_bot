import { StorageGateway } from "../storage/storage.gateway.mjs";

export const aStorageGatewayMock = (): jest.Mocked<StorageGateway> => ({
  makeConversation: jest.fn(({ content }) =>
    Promise.resolve([{ role: "user", content }])
  ),

  saveMessage: jest.fn(),
});
