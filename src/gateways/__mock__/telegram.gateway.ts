import { TelegramGateway } from "../telegram.gateway";
import { ChatMessage } from "../../models/message";

class TelegramGatewayMock implements jest.Mocked<TelegramGateway> {
  private respond = ({ content }: ChatMessage) => Promise.resolve(content);

  launch = jest.fn();

  onReceiveMessage = jest.fn(
    (respond: (message: ChatMessage) => Promise<string>) => {
      this.respond = respond;
    }
  );

  stop = jest.fn();

  sendMessage = (message: ChatMessage) => this.respond(message);
}

export const aTelegramGatewayMock = () => new TelegramGatewayMock();
