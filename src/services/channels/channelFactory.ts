import { SlackChannel } from "./slackChannel";
import { EmailChannel } from "./emailChannel";
import { config } from "../../config";

export class ChannelFactory {
  static getChannel(topic: string) {
    switch (topic) {
      case "slack":
        return new SlackChannel(config.slackToken, config.slackChannelId);
      case "email":
        return new EmailChannel();
      default:
        throw new Error(`Unsupported channel for topic: ${topic}`);
    }
  }
}
