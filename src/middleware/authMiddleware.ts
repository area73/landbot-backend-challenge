import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { config } from '../config';

export const messages = {
  invalidCredentials: "'Invalid or expired credentials",
  authMalformed: 'Authorization token missing or malformed',
  tokenRequired: 'Token is required',
} as const;

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Check for the Authorization header
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    res.status(401).json({ message: messages.tokenRequired });
    return;
  }

  if (!authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: messages.authMalformed });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, config.secretKey) as jwt.JwtPayload;
    req.user = decoded as Record<string, string>;
    next();
  } catch (_err) {
    res.status(403).json({ message: messages.invalidCredentials });
  }
};
