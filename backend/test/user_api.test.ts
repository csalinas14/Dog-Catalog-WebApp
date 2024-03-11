//import { Sequelize } from 'sequelize';
//import app from '../index';
//import request from 'supertest';

describe('user creation', () => {
  //dummy test for now
  test('creation succeeds', () => {
    const newUser = {
      username: 'tester',
      name: 'Admin',
      password: 'banana'
    };

    expect(newUser.username).toBe(newUser.username);
  });
});
