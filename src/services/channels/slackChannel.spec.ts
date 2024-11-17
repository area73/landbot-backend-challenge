import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { WebClient } from "@slack/web-api";
import { SlackChannel } from "./slackChannel";

vi.mock("@slack/web-api", () => ({
  WebClient: vi.fn(() => ({
    chat: {
      postMessage: vi.fn(),
    },
  })),
}));

describe("SlackChannel", () => {
  let slackChannel: SlackChannel;
  const mockSlackToken = "mock-slack-token";
  const mockSlackChannelId = "mock-channel-id";
  const mockWebClient = WebClient as unknown as Mock;

  beforeEach(() => {
    // Reset all mocks before each test
    // vi.clearAllMocks();
    // slackChannel = new SlackChannel(mockSlackToken, mockSlackChannelId);
  });

  it("should throw an error if slackToken or slackChannelId is missing", () => {
    expect(() => new SlackChannel("", mockSlackChannelId)).toThrow(
      "Missing Slack configuration (SLACK_BOT_TOKEN or SLACK_CHANNEL_ID)"
    );

    expect(() => new SlackChannel(mockSlackToken, "")).toThrow(
      "Missing Slack configuration (SLACK_BOT_TOKEN or SLACK_CHANNEL_ID)"
    );
  });

  it("should send a message successfully using the Slack API", async () => {
    const mockPostMessage = mockWebClient().chat.postMessage as Mock;
    // Simular una respuesta exitosa del Slack API
    mockPostMessage.mockResolvedValue({ ts: "1234567890.123456" });
    const message = "Hello, Slack!";
    slackChannel = new SlackChannel(mockSlackToken, mockSlackChannelId);
    // Llamar a la función que queremos probar
    await slackChannel.send(message);

    // Verificar que el mock se haya llamado una vez
    expect(mockPostMessage).toHaveBeenCalledOnce();

    // Verificar que se haya llamado con los argumentos esperados
    expect(mockPostMessage).toHaveBeenCalledWith({
      channel: mockSlackChannelId,
      text: message,
    });

    // Agregar un chequeo opcional para verificar si se está logueando el mensaje
    const consoleLogSpy = vi.spyOn(console, "log");
    expect(consoleLogSpy).toHaveBeenCalledWith(
      "[Slack] Message sent successfully: 1234567890.123456"
    );
    consoleLogSpy.mockRestore(); // Restaurar console.log después del test
  });

  /*
  it("should log an error and throw if sending the message fails", async () => {
    const mockPostMessage = mockWebClient().chat.postMessage as Mock;
    mockPostMessage.mockRejectedValue(new Error("Slack API error")); // Simulate API error

    const message = "This will fail";

    await expect(slackChannel.send(message)).rejects.toThrow(
      "Slack notification failed: Cannot read properties of undefined (reading 'ts')"
    );

    expect(mockPostMessage).toHaveBeenCalledOnce();
    expect(mockPostMessage).toHaveBeenCalledWith({
      channel: mockSlackChannelId,
      text: message,
    });
  });
  */
});
