import { SlackChannel } from "./slackChannel";
import { EmailChannel } from "./emailChannel";

export class ChannelFactory {
  static getChannel(topic: string) {
    switch (topic) {
      case "slack":
        return new SlackChannel();
      case "email":
        return new EmailChannel();
      default:
        throw new Error(`Unsupported channel for topic: ${topic}`);
    }
  }
}
