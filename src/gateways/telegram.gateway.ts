export interface TelegramGateway {
  launch(): Promise<void>;

  onReceiveMessage(respond: (message: string) => Promise<string>): void;
}
