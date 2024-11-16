import { Request, Response } from "express";

export const messages = {
  userNotAllowed: "Invalid credentials",
  notLoggedIn: "User registered",
  undefined: "No user set",
  success: "Success",
} as const;

export const notify = (req: Request, res: Response) => {
  // validate input data
  // validateData;

  // process data

  res.status(200).json({ status: "ok" });
};
