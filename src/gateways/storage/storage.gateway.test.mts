import { SequelizeStorageGateway } from "./storage.gateway.mjs";
import { Sequelize } from "sequelize";
import { initModels } from "./sequelize-models/index.mjs";
import { Message } from "./sequelize-models/message.mjs";

describe("Storage Gateway", () => {
  let sequelize: Sequelize;
  beforeAll(async () => {
    sequelize = new Sequelize("sqlite::memory:", { logging: false });
    initModels(sequelize);
    await sequelize.sync();
  });

  describe("Make Conversation", () => {
    it("should return only the given message if the replied message id wasn't provided", async () => {
      const storageGateway = new SequelizeStorageGateway();
      const conversation = await storageGateway.makeConversation({
        id: 1,
        role: "user",
        content: "Hello world!",
      });
      expect(conversation).toEqual([{ role: "user", content: "Hello world!" }]);
    });

    it("should save the given message", async () => {
      const storageGateway = new SequelizeStorageGateway();
      await storageGateway.makeConversation({
        id: 1,
        role: "user",
        content: "Hello world!",
      });
      const message = await Message.findOne({ where: { id: 1 } });
      expect(message?.toJSON()).toMatchObject({
        id: 1,
        role: "user",
        content: "Hello world!",
      });
    });

    it("should return full conversation if the replied message id was provided", async () => {
      await Message.bulkCreate([
        { id: 1, role: "user", content: "Hi" },
        { id: 2, role: "user", content: "What color is the sky?" },
        { id: 3, repliedTo: 1, role: "assistant", content: "Hello" },
        { id: 4, repliedTo: 2, role: "assistant", content: "Blue" },
      ]);

      const storageGateway = new SequelizeStorageGateway();
      const conversation = await storageGateway.makeConversation({
        id: 5,
        repliedTo: 4,
        role: "user",
        content: "What else has the same color?",
      });
      expect(conversation).toEqual([
        { role: "user", content: "What color is the sky?" },
        { role: "assistant", content: "Blue" },
        { role: "user", content: "What else has the same color?" },
      ]);
    });

    it("should not fail if there is no message to reply", async () => {
      const storageGateway = new SequelizeStorageGateway();
      await expect(
        storageGateway.makeConversation({
          id: 2,
          repliedTo: 1,
          role: "user",
          content: "Hello world!",
        })
      ).resolves.not.toThrow();
    });
  });

  describe("Save Message", () => {
    it("should save message", async () => {
      const storageGateway = new SequelizeStorageGateway();
      await storageGateway.saveMessage({
        id: 1,
        role: "user",
        content: "Hello world!",
      });
      const message = await Message.findOne({ where: { id: 1 } });
      expect(message?.toJSON()).toMatchObject({
        id: 1,
        role: "user",
        content: "Hello world!",
      });
    });
  });

  afterEach(() => Message.truncate());
  afterAll(() => sequelize.close());
});
