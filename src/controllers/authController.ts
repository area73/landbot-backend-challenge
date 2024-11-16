import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "your_secret_key";

/**
 *
 * @param req Request
 * @param res Response
 * @returns {Response}
 */
export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  // This is hardcoded as an example. In a real application, you should check the credentials against a database or a service like Auth0.
  if (username === "admin" && password === "password") {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: "1h" });
    res.status(200).json({ token });
    return;
  }
  res.status(401).json({ message: "Invalid credentials" });
};

export const register = (req: Request, res: Response) => {
  const { username, password } = req.body;
  // Aquí iría la lógica para registrar usuarios.
  res.status(200).json({ message: "User registered", username });
};
