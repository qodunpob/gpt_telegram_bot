import { ChatMessage, ConversationMessage } from "../../models/message.mjs";
import { DbConfig } from "../../config.mjs";
import { initModels } from "./sequelize-models/index.mjs";
import { Message } from "./sequelize-models/message.mjs";
import { Sequelize } from "sequelize";

export interface StorageGateway {
  makeConversation(message: ChatMessage): Promise<ConversationMessage[]>;

  saveMessage(message: ChatMessage): Promise<void>;
}

export class SequelizeStorageGateway implements StorageGateway {
  async makeConversation({
    id,
    repliedTo,
    role,
    content,
  }: ChatMessage): Promise<ConversationMessage[]> {
    await this.saveMessage({ id, repliedTo, role, content });

    return [
      ...(repliedTo ? await this.loadHistory(repliedTo) : []),
      { role, content },
    ];
  }

  async saveMessage({
    id,
    repliedTo: givenRepliedTo,
    role,
    content,
  }: ChatMessage): Promise<void> {
    const repliedTo =
      givenRepliedTo && (await this.verifyId(givenRepliedTo))
        ? givenRepliedTo
        : undefined;
    await Message.create({ id, repliedTo, role, content });
  }

  private async verifyId(messageId: number) {
    return (await Message.count({ where: { id: messageId } })) > 0;
  }

  private async loadHistory(messageId: number): Promise<ConversationMessage[]> {
    const message = await Message.findByPk(messageId);
    if (!message) {
      console.error(`History is lost. Message ${messageId} wasn't found`);
      return [];
    }
    const { repliedTo, role, content } = message;
    return [
      ...(repliedTo ? await this.loadHistory(repliedTo) : []),
      { role, content },
    ];
  }
}

export const storageGatewayFactory = async (config: DbConfig) => {
  const sequelize = new Sequelize(config.db.url, {
    logging: config.db.logging ? console.debug : false,
  });
  initModels(sequelize);
  await sequelize.authenticate();
  console.log("Connection to storage has been established successfully.");
  if (config.db.sync) {
    await sequelize.sync();
  }
  return new SequelizeStorageGateway();
};
