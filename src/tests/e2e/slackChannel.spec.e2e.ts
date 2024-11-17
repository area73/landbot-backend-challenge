import { config } from '../../config';
import request from 'supertest';
import app from '../../app';
import { authRoutes } from '../../routes/authRoutes';

it('should login and return token', async () => {
  const realUser = {
    username: 'admin',
    password: 'HASH-123456',
  };

  await request(app)
    .post(config.authEntryPoint + authRoutes.login)
    .send(realUser)
    .expect(200)
    .then((response) => {
      expect(response.body.token).toBeDefined();
    });
});
