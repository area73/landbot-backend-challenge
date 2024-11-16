import { getUserByUsername, saveUser, type User } from "../data/userRepository";
import bcrypt from "bcrypt";

export const validateUser = async (
  username: string,
  password: string
): Promise<boolean> => {
  const user = await getUserByUsername(username);
  if (!user) {
    return false; // User does not exist
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  return user.password === hashedPassword;
};

interface NewUser {
  username: string;
  password: string;
  email: string;
}

export const createUser = async ({ username, password, email }: NewUser) => {
  // Check if the username or email already exists
  const existingUser = await getUserByUsername(username);

  if (existingUser) {
    const error = new Error("Username already exists");
    (error as any).code = "USER_EXISTS";
    throw error;
  }
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create user object
  const user: User = {
    username,
    password: hashedPassword,
    email,
  };
  // Save the user to the database
  return await saveUser(user);
};
