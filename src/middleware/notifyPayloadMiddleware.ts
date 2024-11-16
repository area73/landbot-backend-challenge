import { Request, Response, NextFunction } from "express";

export const messages = {
  noTopic: "Invalid or missing 'topic'",
  noMessage: "Invalid or missing 'message'",
} as const;

export const notifyPayload = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { topic, message } = req.body;
  if (!topic || typeof topic !== "string") {
    res.status(400).json({ error: messages.noTopic });
    return;
  }

  if (!message || typeof message !== "string") {
    res.status(400).json({ error: messages.noMessage });
    return;
  }

  next();
};
