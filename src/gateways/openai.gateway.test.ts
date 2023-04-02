import { SdkOpenAIGateway } from "./openai.gateway";
import { anOpenAIApiMock } from "./__mock__/openai";

describe("OpenAI Gateway", () => {
  it("should complete chat using given model and system message", async () => {
    const openAIApi = anOpenAIApiMock().withResponse("Test response").build();
    const openaiGateway = new SdkOpenAIGateway(
      openAIApi,
      "test-model",
      "Test system message"
    );
    await openaiGateway.completion([{ role: "user", content: "Hello world!" }]);
    expect(openAIApi.createChatCompletion).toHaveBeenCalledWith({
      model: "test-model",
      messages: [
        { role: "system", content: "Test system message" },
        { role: "user", content: "Hello world!" },
      ],
    });
  });

  it("should say oops if there are no choices in response", async () => {
    const openAIApi = anOpenAIApiMock().build();
    const openaiGateway = new SdkOpenAIGateway(
      openAIApi,
      "test-model",
      "Test system message"
    );
    const response = await openaiGateway.completion([
      { role: "user", content: "Hello world!" },
    ]);
    expect(response).toBe("Oops, something went wrong");
  });
});
