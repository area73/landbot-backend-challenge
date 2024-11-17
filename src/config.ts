import dotenv from 'dotenv';

dotenv.config();

export const config = {
  // These values are read from environment variables , so we can keep them safe and secure
  port: Number(process.env.PORT) || 3000,
  secretKey: process.env.SECRET_KEY || 'super-secret-key',
  environment: process.env.NODE_ENV || 'development',
  slackToken: process.env.SLACK_BOT_TOKEN || 'xoxb-slack-bot-token',
  slackChannelId: process.env.SLACK_CHANNEL_ID || 'C01xxxxxx',
  // here are other constants that we can define that may or may not be read from environment variables
  apiEntryPoint: process.env.API_ENTRY_PATH || '/api/v1',
  authEntryPoint: process.env.AUTH_ENTRY_PATH || '/auth',
} as const;
