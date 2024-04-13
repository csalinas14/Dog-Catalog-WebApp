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

  test('dog/cat api call with breed id paramater is functional', async () => {
    const queryOptions = {
      animal: 'cat',
      id: 'beng'
    };
    let requestString = `/api/dogapi/breeds/${queryOptions.id}?animal=${queryOptions.animal}`;
    let response = await request(app)
      .get(requestString)
      .expect('Content-Type', /application\/json/)
      .expect(200);

    expect(response.body.id).toBe('beng');
    expect(response.body.type).toBe('cat');
    expect(response.body).toHaveProperty('name');

    queryOptions.animal = 'dog';
    queryOptions.id = '1';
    requestString = `/api/dogapi/breeds/${queryOptions.id}?animal=${queryOptions.animal}`;
    response = await request(app)
      .get(requestString)
      .expect('Content-Type', /application\/json/)
      .expect(200);

    expect(response.body.id).toBe(1);
    expect(response.body.type).toBe('dog');
    expect(response.body).toHaveProperty('name');
  });

  test('image api call for dog/cat using image id is functional', async () => {
    const queryOptions = {
      animal: 'dog',
      id: 'hMyT4CDXR'
    };
    let requestString = `/api/dogapi/images/${queryOptions.id}?animal=${queryOptions.animal}`;
    let response = await request(app)
      .get(requestString)
      .expect('Content-Type', /application\/json/)
      .expect(200);

    expect(response.body).toHaveProperty('url');
    expect(response.body.id).toBe(queryOptions.id);
    expect(response.body.url).toBe(
      'https://cdn2.thedogapi.com/images/hMyT4CDXR.jpg'
    );

    queryOptions.animal = 'cat';
    queryOptions.id = 'ozEvzdVM-';
    requestString = `/api/dogapi/images/${queryOptions.id}?animal=${queryOptions.animal}`;
    response = await request(app)
      .get(requestString)
      .expect('Content-Type', /application\/json/)
      .expect(200);

    expect(response.body).toHaveProperty('url');
    expect(response.body.id).toBe(queryOptions.id);
    expect(response.body.url).toBe(
      'https://cdn2.thecatapi.com/images/ozEvzdVM-.jpg'
    );
  });

  test('image api call for dog/cat filtering by breed id is functional', async () => {
    const queryOptions = {
      animal: 'cat',
      breed_id: 'beng',
      limit: '1'
    };
    let requestString = `/api/dogapi/images?animal=${queryOptions.animal}&limit=${queryOptions.limit}&breed_id=${queryOptions.breed_id}`;
    let response = await request(app)
      .get(requestString)
      .expect('Content-Type', /application\/json/)
      .expect(200);

    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty('url');
    expect(response.body[0]).toHaveProperty('breeds');
    expect(response.body[0].breeds[0].id).toBe(queryOptions.breed_id);

    queryOptions.animal = 'dog';
    queryOptions.breed_id = '1';
    requestString = `/api/dogapi/images?animal=${queryOptions.animal}&limit=${queryOptions.limit}&breed_id=${queryOptions.breed_id}`;
    response = await request(app)
      .get(requestString)
      .expect('Content-Type', /application\/json/)
      .expect(200);

    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toHaveProperty('url');
    expect(response.body[0]).toHaveProperty('breeds');
    expect(response.body[0].breeds[0].id).toBe(Number(queryOptions.breed_id));
  });
});
