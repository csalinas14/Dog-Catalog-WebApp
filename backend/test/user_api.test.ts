import { sequelize } from '../utils/db';
import app from '../index';
import request from 'supertest';
import userService from '../services/userService';

describe('user creation', () => {
  beforeAll(async () => {
    //drop and recreate tables with only our test database
    await sequelize.sync({ force: true, match: /test$/ });
  });

  test('new user creation succeeds', async () => {
    const usersBefore = await userService.getUsers();
    const newUser = {
      username: 'tester@yahoo.com',
      name: 'Admin',
      password: 'banana'
    };

    const response = await request(app)
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/);

    const usersAfter = await userService.getUsers();

    expect(response.body.username).toBe(newUser.username);
    expect(usersAfter).toHaveLength(usersBefore.length + 1);
    expect(usersAfter[0].username).toContain(newUser.username);
  });

  afterAll(async () => {
    await sequelize.close();
  });
});
