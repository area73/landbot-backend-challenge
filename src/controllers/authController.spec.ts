import request from 'supertest';
import app from '../app';
import { config } from '../config';
import { messages } from '../controllers/authController';
import { authRoutes } from '../routes/authRoutes';
import { getUserByUsername } from '../data/userRepository';
import type { Mock } from 'vitest';
import bcrypt from 'bcrypt';

vi.mock(import('../data/userRepository'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getUserByUsername: vi.fn(),
  };
});

vi.mock('bcrypt');

describe('User login', () => {
  it('should respond to POST  with status code 200', async () => {
    const mockUser = {
      id: 1,
      username: 'admin',
      password: 'HASH-123456',
      email: 'admin@acme.com',
      createdAt: new Date('1995-12-17T03:24:00'),
    };
    (getUserByUsername as Mock).mockResolvedValueOnce(mockUser);
    (bcrypt.compare as Mock).mockResolvedValueOnce(true);
    await request(app)
      .post(config.authEntryPoint + authRoutes.login)
      .send({
        username: 'admin',
        password: 'password',
      })
      .expect(200)
      .then((response) => {
        expect(response.body.token).toBeDefined();
      });
  });
  it('should respond to POST  with status code 401 if user is not authorized', async () => {
    await request(app)
      .post(config.authEntryPoint + authRoutes.login)
      .send({
        username: 'not a user',
        password: 'wrong password',
      })
      .expect(401)
      .expect({ message: messages.invalidCredentials });
  });
});

describe('User Registration', () => {
  it('should return a 200 if user name is provided', async () => {
    await request(app)
      .post(config.authEntryPoint + authRoutes.register)
      .send({
        username: 'admin',
      })
      .expect(200, { message: messages.userRegistered, username: 'admin' });
    //
  });

  it('should return a 401 status and message if no user name provided', async () => {
    await request(app)
      .post(config.authEntryPoint + authRoutes.register)
      .expect(401, { message: messages.noUserSet });
  });
});
