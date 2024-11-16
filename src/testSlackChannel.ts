import { SlackChannel } from "./services/channels/slackChannel";
import { config } from "./config";

(async ({ slackToken, slackChannelId }) => {
  const slackChannel = new SlackChannel(slackToken, slackChannelId);
  console.debug("USING TOKENS:", slackToken, slackChannelId);
  try {
    await slackChannel.send("Hola Mundo");
    console.log("Message sent successfully!");
  } catch (error) {
    console.error("Failed to send message:", (error as any).message);
  }
})(config);
