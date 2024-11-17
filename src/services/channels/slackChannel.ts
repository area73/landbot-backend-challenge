import { WebClient } from "@slack/web-api";
export class SlackChannel {
  private slackClient: WebClient;
  private channelId: string;

  constructor(slackToken: string, slackChannelId: string) {
    if (!slackToken || !slackChannelId) {
      throw new Error(
        "Missing Slack configuration (SLACK_BOT_TOKEN or SLACK_CHANNEL_ID)"
      );
    }

    this.channelId = slackChannelId;
    this.slackClient = new WebClient(slackToken);
  }

  async send(message: string) {
    try {
      const response = await this.slackClient.chat.postMessage({
        channel: this.channelId,
        text: message,
      });
      console.log("RESPONSE::::::::::", response);
      console.log(`[Slack] Message sent successfully: ${response.ts}`);
    } catch (error) {
      console.error(
        `[Slack] Failed to send message: ${(error as any).message}`
      );
      throw new Error(`Slack notification failed: ${(error as any).message}`);
    }
  }
}
