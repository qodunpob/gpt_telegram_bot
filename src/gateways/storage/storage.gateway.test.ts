import { PrismaStorageGateway } from "./storage.gateway";

describe("Storage Gateway", () => {
  it("should return only the given message in the conversation style when the conversation mode is off", async () => {
    const storageGateway = new PrismaStorageGateway({
      conversationMode: false,
    });
    const conversation = await storageGateway.makeConversation({
      id: 1,
      content: "Hello world!",
    });
    expect(conversation).toEqual([{ role: "user", content: "Hello world!" }]);
  });
});
