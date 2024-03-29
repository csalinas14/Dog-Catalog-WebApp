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

    expect(response.body.breeds).toHaveLength(1);
    expect(response.body.breeds[0].id).toBe(1);
    expect(response.body.breeds[0].type).toBe('dog');

    queryOptions.animal = 'cat';
    requestString = `/api/dogapi/breeds?animal=${queryOptions.animal}&limit=${queryOptions.limit}&page=${queryOptions.page}`;
    response = await request(app)
      .get(requestString)
      .expect('Content-Type', /application\/json/)
      .expect(200);

    expect(response.body.breeds).toHaveLength(1);
    expect(response.body.breeds[0].type).toBe('cat');
  });
  test('image api call for dog/cat is functional', async () => {
    const queryOptions = {
      animal: 'dog',
      limit: '1',
      page: '0'
    };
    let requestString = `/api/dogapi/images?animal=${queryOptions.animal}&limit=${queryOptions.limit}&page=${queryOptions.page}`;
    let response = await request(app)
      .get(requestString)
      .expect('Content-Type', /application\/json/)
      .expect(200);

    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty('breeds');
    expect(response.body[0]).toHaveProperty('url');

    queryOptions.animal = 'cat';
    requestString = `/api/dogapi/images?animal=${queryOptions.animal}&limit=${queryOptions.limit}&page=${queryOptions.page}`;
    response = await request(app)
      .get(requestString)
      .expect('Content-Type', /application\/json/)
      .expect(200);

    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty('breeds');
    expect(response.body[0]).toHaveProperty('url');
  });
});
