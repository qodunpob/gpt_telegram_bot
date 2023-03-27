import { TelegramGateway } from "../telegram.gateway";

class TelegramGatewayMock implements jest.Mocked<TelegramGateway> {
  private respond = (userMessage: string) => Promise.resolve(userMessage);

  launch = jest.fn();

  onReceiveMessage = jest.fn((respond) => {
    this.respond = respond;
  });

  stop = jest.fn();

  sendMessage = (userMessage: string) => this.respond(userMessage);
}

export const aTelegramGatewayMock = () => new TelegramGatewayMock();
