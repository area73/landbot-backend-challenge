import { Request, Response } from "express";
import { NotificationService } from "../services/notificationServices";
/*
export const messages = {
  userNotAllowed: "Invalid credentials",
  notLoggedIn: "User registered",
  undefined: "No user set",
  success: "Success",
} as const;
*/
const notificationService = new NotificationService();

export const notify = async (req: Request, res: Response) => {
  const { topic, message } = req.body;

  try {
    await notificationService.notify(topic, message);
    res.status(200).json({ message: `Notification sent to ${topic} channel` });
  } catch (error) {
    res.status(500).json({ error: (error as any).message });
  }
};
