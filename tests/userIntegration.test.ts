import request from 'supertest';

describe('User Integration Tests', () => {
  const baseUrl = 'http://localhost:3000'; // Adjust to your application's base URL

  let uniqueEmail: string;

  beforeAll(() => {
    uniqueEmail = `testuser${Date.now()}@example.com`;
  });

  test('should register a new user', async () => {
    const response = await request(baseUrl)
      .post('/register')
      .send({
        email: uniqueEmail,
        password: 'password123',
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe(uniqueEmail);
  });

  test('should not register a user with existing email', async () => {
    const response = await request(baseUrl)
      .post('/register')
      .send({
        email: uniqueEmail,
        password: 'password123',
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  test('should login an existing user', async () => {
    const response = await request(baseUrl)
      .post('/login')
      .send({
        email: uniqueEmail,
        password: 'password123',
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('should not login with incorrect password', async () => {
    const response = await request(baseUrl)
      .post('/login')
      .send({
        email: uniqueEmail,
        password: 'wrongpassword',
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });

  test('should not login non-existent user', async () => {
    const response = await request(baseUrl)
      .post('/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'password123',
      });
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message');
  });
});
