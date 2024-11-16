import jwt from "jsonwebtoken";
import { config } from "../config";
// todo: we could provide a better type for the payload
export const generateToken = (payload: object, expiresIn = "1h") => {
  return jwt.sign(payload, config.secretKey, { expiresIn });
};
