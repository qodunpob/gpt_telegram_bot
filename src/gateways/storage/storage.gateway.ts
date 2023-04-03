import { ChatMessage, ConversationMessage } from "../../models/message";
import { FeatureConfig } from "../../config";

export interface StorageGateway {
  makeConversation(message: ChatMessage): Promise<ConversationMessage[]>;
}

type StorageRelatedFeatures = Pick<
  FeatureConfig["feature"],
  "conversationMode"
>;

export class PrismaStorageGateway {
  constructor(private readonly feature: StorageRelatedFeatures) {}

  async makeConversation({
    content,
  }: ChatMessage): Promise<ConversationMessage[]> {
    return [{ role: "user", content }];
  }
}

export const storageGatewayFactory = (config: FeatureConfig) => {
  const storageRelatedFeatures: (keyof StorageRelatedFeatures)[] = [
    "conversationMode",
  ];
  const isStorageActive = storageRelatedFeatures.some(
    (feature) => config.feature[feature]
  );
  return new PrismaStorageGateway(config.feature);
};
