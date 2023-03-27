import { App } from "./app";
import { aTelegramGatewayMock } from "./gateways/__mock__/telegram.gateway";
import { anOpenaiGatewayMock } from "./gateways/__mock__/openai.gateway";

describe("App", () => {
  it("should run telegram bot when application starts", async () => {
    const telegramGatewayMock = aTelegramGatewayMock();
    const app = new App(telegramGatewayMock, anOpenaiGatewayMock());

    await app.launch();
    expect(telegramGatewayMock.launch).toHaveBeenCalled();
  });

  it("should reply to the message using the response from openai", async () => {
    const telegramGatewayMock = aTelegramGatewayMock();
    new App(telegramGatewayMock, anOpenaiGatewayMock());

    const response = await telegramGatewayMock.sendMessage("Hello world!");
    expect(response).toBe("!dlrow olleH");
  });

  it("should stop telegram bot with given signal", () => {
    const telegramGatewayMock = aTelegramGatewayMock();
    const app = new App(telegramGatewayMock, anOpenaiGatewayMock());

    app.stop("TEST");
    expect(telegramGatewayMock.stop).toHaveBeenCalledWith("TEST");
  });
});
