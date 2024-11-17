import { Request, Response } from 'express';
import { validateUser } from '../services/authService';
import { generateToken } from '../utils/jwtUtils';

export const messages = {
  invalidCredentials: 'Invalid credentials',
  userRegistered: 'User registered',
  noUserSet: 'No user set',
} as const;

/**
 * @param req Request
 * @param res Response
 * @returns {Response}
 * @description Prior to make an API call we request the user to be logged in and to have a valid JWT, this way when we access the API user will be authorized, minimizing DOS attacks.
 */
export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const isValidUser = await validateUser(username, password);

  isValidUser
    ? res.status(200).json({ token: generateToken({ username, password }) })
    : res.status(401).json({ message: messages.invalidCredentials });
};

/**
 *
 * @param req Request
 * @param res Response
 * @returns {Response}
 * @description Register a new user
 * @example
 * POST /register
 * {
 *  "username": "admin",
 * "password": "password"
 * }
 **/
export const register = (req: Request, res: Response) => {
  /**
   * TODO: Implement user registration
   * This is only a placeholder for the user registration logic.
   * Since the challenge is focused on the API, you can leave this as is.
   * In a real application, you should hash the password and save the user to a database.
   * Probably you will ask for mor information like email, name, etc.
   */
  const { username } = req.body;
  username
    ? res.status(200).json({ message: messages.userRegistered, username })
    : res.status(401).json({ message: messages.noUserSet });
};
