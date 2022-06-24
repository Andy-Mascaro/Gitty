const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('auth routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('should redirect to github oauth upon login', async () => {
    const resp = await request(app).get('/api/v1/github/login');
    expect(resp.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/callback/i
    );
  });

  it('should login and redirect users to api/v1/github/dashboard', async () => {
    const resp = await request
      .agent(app)
      .get('/api/v1/github/callback?code=42')
      .redirects(1);

    expect(resp.body).toEqual({
      id: expect.any(String),
      username: 'Bob',
      email: 'bob@bob.com',
      avatar: expect.any(String),
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });

  afterAll(() => {
    pool.end();
  });
});
