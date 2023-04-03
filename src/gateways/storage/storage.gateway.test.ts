import { PrismaStorageGateway } from "./storage.gateway";

describe("Storage Gateway", () => {
  it("should return only the given message if the replied message id wasn't provided", async () => {
    const storageGateway = new PrismaStorageGateway();
    const conversation = await storageGateway.makeConversation({
      id: 1,
      content: "Hello world!",
    });
    expect(conversation).toEqual([{ role: "user", content: "Hello world!" }]);
  });
});
