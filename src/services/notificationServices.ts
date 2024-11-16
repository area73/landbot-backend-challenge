import { ChannelFactory } from "./channels/channelFactory";

export class NotificationService {
  async notify(topic: string, message: string) {
    try {
      const channel = ChannelFactory.getChannel(topic);
      await channel.send(message);
      console.log(`Message sent to ${topic} channel`);
    } catch (error) {
      console.error(`Failed to send notification: ${(error as any).message}`);
      throw error;
    }
  }
}
