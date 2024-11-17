import { describe, it, expect, vi, beforeEach, Mock } from "vitest";
import { WebClient } from "@slack/web-api";
import { SlackChannel } from "./slackChannel";

// Mock the entire @slack/web-api module
vi.mock("@slack/web-api", () => {
  return {
    WebClient: vi.fn(() => ({
      chat: {
        postMessage: vi.fn(),
      },
    })),
  };
});

describe("SlackChannel", () => {
  const mockToken = "mock-token";
  const mockChannelId = "mock-channel-id";
  let slackChannel: SlackChannel;

  // Spy on console methods
  beforeEach(() => {
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  // Clear all mocks after each test
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("constructor", () => {
    it("should create an instance with valid parameters", () => {
      expect(() => {
        new SlackChannel(mockToken, mockChannelId);
      }).not.toThrow();
    });

    it("should throw error when token is missing", () => {
      expect(() => {
        new SlackChannel("", mockChannelId);
      }).toThrow("Missing Slack configuration");
    });

    it("should throw error when channel ID is missing", () => {
      expect(() => {
        new SlackChannel(mockToken, "");
      }).toThrow("Missing Slack configuration");
    });
  });

  describe("send", () => {
    beforeEach(() => {
      slackChannel = new SlackChannel(mockToken, mockChannelId);
    });

    it("should successfully send a message", async () => {
      const mockTimestamp = "1234567890.123456";
      const mockMessage = "Test message";

      // Mock successful response
      const mockPostMessage = vi.fn().mockResolvedValue({ ts: mockTimestamp });
      (WebClient as unknown as Mock).mockImplementation(() => ({
        chat: {
          postMessage: mockPostMessage,
        },
      }));

      slackChannel = new SlackChannel(mockToken, mockChannelId);
      await slackChannel.send(mockMessage);

      // Verify postMessage was called with correct parameters
      expect(mockPostMessage).toHaveBeenCalledWith({
        channel: mockChannelId,
        text: mockMessage,
      });

      // Verify console.log was called with success message
      expect(console.log).toHaveBeenCalledWith(
        `[Slack] Message sent successfully: ${mockTimestamp}`
      );
    });

    it("should handle missing timestamp in response", async () => {
      // Mock response without timestamp
      const mockPostMessage = vi.fn().mockResolvedValue({});
      (WebClient as unknown as Mock).mockImplementation(() => ({
        chat: {
          postMessage: mockPostMessage,
        },
      }));

      slackChannel = new SlackChannel(mockToken, mockChannelId);
      await slackChannel.send("Test message");

      expect(console.log).toHaveBeenCalledWith(
        "[Slack] Message sent successfully: unknown"
      );
    });

    it("should throw error when message sending fails", async () => {
      const errorMessage = "API error";

      // Mock failed response
      const mockPostMessage = vi
        .fn()
        .mockRejectedValue(new Error(errorMessage));
      (WebClient as unknown as Mock).mockImplementation(() => ({
        chat: {
          postMessage: mockPostMessage,
        },
      }));

      slackChannel = new SlackChannel(mockToken, mockChannelId);

      await expect(slackChannel.send("Test message")).rejects.toThrow(
        `Slack notification failed: ${errorMessage}`
      );

      expect(console.error).toHaveBeenCalledWith(
        `[Slack] Failed to send message: ${errorMessage}`
      );
    });
  });
});
