import type { Mock } from 'vitest';
import { createUser, validateUser } from './authService';
import bcrypt from 'bcrypt';
import { getUserByUsername } from '../data/userRepository';

vi.mock(import('../data/userRepository'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getUserByUsername: vi.fn(),
  };
});

vi.mock('bcrypt');

describe('authService', () => {
  it('should create a new user', async () => {
    // Arrange
    const newUser = {
      username: 'testuser',
      password: 'password',
      email: 'wadus@gmail.com',
    };
    // just make sure that we are not using a user that is already in the database
    (getUserByUsername as Mock).mockResolvedValueOnce(null);
    // Act
    const result = await createUser(newUser);
    // Assert
    expect(result).toBeDefined();
    expect(result.username).toBe(newUser.username);
    expect(result.email).toBe(newUser.email);
  });

  it('should not create a user if the username already exists', async () => {
    // Arrange
    const existingUser = {
      id: 1,
      username: 'existing user',
      password: 'password',
      email: 'user@gmail.com',
    };
    (getUserByUsername as Mock).mockResolvedValueOnce(existingUser);
    // Assert
    await expect(createUser(existingUser)).rejects.toThrow(
      'Username already exists'
    );
  });

  it('should validate a user', async () => {
    // Arrange
    const user = {
      username: 'test user',
      password: 'password',
      email: 'user@gmail.com',
    };
    // Act
    (getUserByUsername as Mock).mockResolvedValueOnce(user);
    (bcrypt.compare as Mock).mockResolvedValueOnce(true);
    const result = await validateUser(user.username, user.password);
    // Assert
    expect(result).toBe(true);
  });
});
