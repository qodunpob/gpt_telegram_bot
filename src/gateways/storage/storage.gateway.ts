import { ChatMessage, ConversationMessage } from "../../models/message";

export interface StorageGateway {
  makeConversation(message: ChatMessage): Promise<ConversationMessage[]>;

  saveMessage(message: ChatMessage): Promise<void>;
}

export class PrismaStorageGateway {
  async makeConversation({
    content,
  }: ChatMessage): Promise<ConversationMessage[]> {
    return [{ role: "user", content }];
  }

  async saveMessage(message: ChatMessage): Promise<void> {}
}

export const storageGatewayFactory = () => {
  return new PrismaStorageGateway();
};
