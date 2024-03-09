import app from '../index';
import request from 'supertest';

describe('Handling Dog and Cat API calls', () => {
  test('standard dog/cat api call is functional', async () => {
    const queryOptions = {
      animal: 'dog',
      limit: '1',
      page: '0'
    };
    let requestString = `/api/dogapi/breeds?animal=${queryOptions.animal}&limit=${queryOptions.limit}&page=${queryOptions.page}`;
    console.log(requestString);
    let response = await request(app)
      .get(requestString)
      .expect('Content-Type', /application\/json/)
      .expect(200);

    expect(response.body).toHaveLength(1);
    expect(response.body[0].id).toBe(1);
    expect(response.body[0].type).toBe('dog');

    queryOptions.animal = 'cat';
    requestString = `/api/dogapi/breeds?animal=${queryOptions.animal}&limit=${queryOptions.limit}&page=${queryOptions.page}`;
    response = await request(app)
      .get(requestString)
      .expect('Content-Type', /application\/json/)
      .expect(200);

    expect(response.body).toHaveLength(1);
    expect(response.body[0].type).toBe('cat');
  });
});
