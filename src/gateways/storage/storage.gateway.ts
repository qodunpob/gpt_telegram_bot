import { ChatMessage, ConversationMessage } from "../../models/message";

export interface StorageGateway {
  makeConversation(message: ChatMessage): Promise<ConversationMessage[]>;
}

export class PrismaStorageGateway {
  async makeConversation({
    content,
  }: ChatMessage): Promise<ConversationMessage[]> {
    return [{ role: "user", content }];
  }
}

export const storageGatewayFactory = () => {
  return new PrismaStorageGateway();
};
