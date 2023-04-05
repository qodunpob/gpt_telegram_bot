import { ReceiveMessageEvent, TelegramGateway } from "../telegram.gateway";

class TelegramGatewayMock implements jest.Mocked<TelegramGateway> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private eventHandler: (event: ReceiveMessageEvent) => Promise<any> = () => {
    throw new Error("NIY");
  };

  launch = jest.fn();

  onReceiveMessage = jest.fn(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (eventHandler: (event: ReceiveMessageEvent) => Promise<any>) => {
      this.eventHandler = eventHandler;
    }
  );

  stop = jest.fn();

  triggerReceiveMessageEvent = (event: ReceiveMessageEvent) =>
    this.eventHandler(event);
}

export const aTelegramGatewayMock = () => new TelegramGatewayMock();
