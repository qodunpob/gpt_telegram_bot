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

    const response = await telegramGatewayMock.sendMessage({
      id: 1,
      content: "Hello world!",
    });
    expect(response).toBe("!dlrow olleH");
  });

  it("should stop telegram bot with given signal", () => {
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
