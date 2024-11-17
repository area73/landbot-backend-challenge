import { config } from '../../config';
import request from 'supertest';
import app from '../../app';
import { authRoutes } from '../../routes/authRoutes';

const realUser = {
  username: 'admin',
  password: 'HASH-123456',
};

let jwtToken: string;

describe('User login', () => {
  it('should login and return token', async () => {
    await request(app)
      .post(config.authEntryPoint + authRoutes.login)
      .send(realUser)
      .expect(200)
      .then((response) => {
        jwtToken = response.body.token;
        expect(response.body.token).toBeDefined();
      });
  });
  it('should use JWToken and use the API for notification', async () => {
    await request(app)
      .post(config.apiEntryPoint + '/notify')
      .send({ topic: 'slack', message: 'new message from test' })
      .set('Authorization', `Bearer ${jwtToken}`)
      .expect(200);
  });
});
