import { TelegramGateway } from "../telegram.gateway";

class TelegramGatewayMock implements jest.Mocked<TelegramGateway> {
  private respond = (message: string) => Promise.resolve(message);

  launch = jest.fn();

  onReceiveMessage = jest.fn((respond) => {
    this.respond = respond;
  });

  sendMessage = (message: string) => this.respond(message);
}

export const aTelegramGatewayMock = () => new TelegramGatewayMock();
