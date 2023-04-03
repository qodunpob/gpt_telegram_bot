export interface ConversationMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatMessage {
  id: number;
  repliedId?: number;
  content: string;
}
