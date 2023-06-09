export interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatMessage {
  id: MessageId;
  repliedTo?: MessageId;
  role: "user" | "assistant";
  content: string;
}

export type MessageId = number;
