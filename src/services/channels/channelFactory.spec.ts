import { ChannelFactory } from "./channelFactory";
import { SlackChannel } from "./slackChannel";
import { EmailChannel } from "./emailChannel";

describe("ChannelFactory", () => {
  it('should return an instance of SlackChannel for the "slack" topic', () => {
    const channel = ChannelFactory.getChannel("slack");
    expect(channel).toBeInstanceOf(SlackChannel);
  });

  it('should return an instance of EmailChannel for the "email" topic', () => {
    const channel = ChannelFactory.getChannel("email");
    expect(channel).toBeInstanceOf(EmailChannel);
  });

  it("should throw an error for an unsupported topic", () => {
    expect(() => ChannelFactory.getChannel("unsupported")).toThrow(
      "Unsupported channel for topic: unsupported"
    );
  });
});
