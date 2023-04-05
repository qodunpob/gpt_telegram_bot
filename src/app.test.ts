import { App } from "./app";
import { aTelegramGatewayMock } from "./gateways/__mock__/telegram.gateway";
import { anOpenaiGatewayMock } from "./gateways/__mock__/openai.gateway";
import { aStorageGatewayMock } from "./gateways/__mock__/storage.gateway";

describe("App", () => {
  it("should run telegram bot when application starts", async () => {
    const telegramGatewayMock = aTelegramGatewayMock();
    const app = new App(
      telegramGatewayMock,
      anOpenaiGatewayMock(),
      aStorageGatewayMock()
    );

    await app.launch();
    expect(telegramGatewayMock.launch).toHaveBeenCalled();
  });

  it("should reply to the message using the response from openai", async () => {
    const telegramGatewayMock = aTelegramGatewayMock();
    new App(telegramGatewayMock, anOpenaiGatewayMock(), aStorageGatewayMock());

    const replay = jest.fn(() => Promise.resolve(2));
    await telegramGatewayMock.triggerReceiveMessageEvent({
      message: {
        id: 1,
        role: "user",
        content: "Hello world!",
      },
      replay,
    });
    expect(replay).toHaveBeenCalledWith("!dlrow olleH");
  });

  it("should save response to storage", async () => {
    const telegramGatewayMock = aTelegramGatewayMock();
    const storageGatewayMock = aStorageGatewayMock();
    new App(telegramGatewayMock, anOpenaiGatewayMock(), storageGatewayMock);

    await telegramGatewayMock.triggerReceiveMessageEvent({
      message: {
        id: 1,
        role: "user",
        content: "Hello world!",
      },
      replay: () => Promise.resolve(2),
    });
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(storageGatewayMock.saveMessage).toHaveBeenCalledWith({
      id: 2,
      repliedTo: 1,
      role: "assistant",
      content: "!dlrow olleH",
    });
  });

  it("should stop telegram bot with the given signal", () => {
    const telegramGatewayMock = aTelegramGatewayMock();
    const app = new App(
      telegramGatewayMock,
      anOpenaiGatewayMock(),
      aStorageGatewayMock()
    );

    app.stop("TEST");
    expect(telegramGatewayMock.stop).toHaveBeenCalledWith("TEST");
  });
});
