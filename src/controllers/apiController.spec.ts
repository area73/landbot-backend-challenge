import request from 'supertest';
import app from '../app';
import { config } from '../config';
import { apiRoutes } from '../routes/apiRoutes';
import { generateToken } from '../utils/jwtUtils';
import { messages } from '../middleware/notifyPayloadMiddleware';

const validToken = 'Bearer ' + generateToken({ username: 'admin' });

vi.mock('../services/notificationService', () => {
  return {
    NotificationService: vi.fn(() => ({
      notify: vi.fn(),
    })),
  };
});

describe('API: Notify', () => {
  it('should respond to POST  with status code 403 forbidden if no authorization send', async () => {
    await request(app)
      .post(config.apiEntryPoint + apiRoutes.notify)
      .expect(401);
  });

  it('should respond to POST  with status code 200  if valid authorization is used', async () => {
    await request(app)
      .post(config.apiEntryPoint + apiRoutes.notify)
      .send({ topic: 'slack', message: 'new message' })
      .set('Authorization', validToken)
      .expect(200);
  });

  it('should return 400 for missing payload fields', async () => {
    const noTopicResponse = await request(app)
      .post(config.apiEntryPoint + apiRoutes.notify)
      .send({ message: 'Missing topic' })
      .set('Authorization', validToken);
    expect(noTopicResponse.status).toBe(400);
    expect(noTopicResponse.body.error).toBe(messages.noTopic);

    const response = await request(app)
      .post(config.apiEntryPoint + apiRoutes.notify)
      .send({ topic: 'slack' })
      .set('Authorization', validToken);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe(messages.noMessage);
  });
});
