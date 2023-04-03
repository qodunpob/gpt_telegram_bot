export interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatMessage {
  id: number;
  repliedTo?: number;
  content: string;
}
