const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

jest.mock('../lib/services/github.js');

const posting = async () => {
  const agent = request.agent(app);

  await agent.get('/api/v1/github/callback?code=24');
  return agent;
};

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

  it('should login and redirect users to /api/v1/github/dashboard', async () => {
    const resp = await request
      .agent(app)
      .get('/api/v1/github/callback?code=24')
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

  it('Should get all posts', async () => {
    const resp = await request(app).get('/api/v1/posts');
    expect(resp.body.length).toEqual(1);
    const post = resp.body.find((info) => info.id === '1');
    expect(post).toHaveProperty('repo', 'SQL is fun');
  });

  it('Test to confirm post is successful when logged in', async () => {
    const agent = await posting();
    const resp = await agent.post('/api/v1/posts').send({
      repo: 'Ice cream shop',
      memo: 'An app to locate ice cream shops near you',
    });

    expect(resp.status).toEqual(200);
    expect(resp.body).toHaveProperty('repo', 'Ice cream shop');
    expect(resp.body).toHaveProperty(
      'memo',
      'An app to locate ice cream shops near you'
    );
  });
  afterAll(() => {
    pool.end();
  });
});
