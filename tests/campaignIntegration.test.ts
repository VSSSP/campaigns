import request from 'supertest';

describe('Campaign Integration Tests', () => {
  const baseUrl = 'http://localhost:3000';
  let token: string;
  let campaignId: string;

  beforeAll(async () => {
    const uniqueEmail = `campaignuser${Date.now()}@example.com`;

    await request(baseUrl)
      .post('/register')
      .send({
        email: uniqueEmail,
        password: 'password123',
      });

    const loginResponse = await request(baseUrl)
      .post('/login')
      .send({
        email: uniqueEmail,
        password: 'password123',
      });
    token = loginResponse.body.token;
  });

  test('should create a new campaign', async () => {
    const response = await request(baseUrl)
      .post('/campaigns')
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Test Campaign',
        dataInicio: new Date(Date.now() + 86400000).toISOString(),
        dataFim: new Date(Date.now() + 172800000).toISOString(),
        status: 'ativa',
        categoria: 'Marketing',
      });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.nome).toBe('Test Campaign');
    campaignId = response.body.id;
  });

  test('should retrieve all campaigns', async () => {
    const response = await request(baseUrl)
      .get('/campaigns')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test('should retrieve a campaign by ID', async () => {
    const response = await request(baseUrl)
      .get(`/campaigns/${campaignId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', campaignId);
  });

  test('should update a campaign', async () => {
    const response = await request(baseUrl)
      .put(`/campaigns/${campaignId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        nome: 'Updated Campaign',
        dataInicio: new Date(Date.now() + 86400000).toISOString(),
        dataFim: new Date(Date.now() + 259200000).toISOString(),
        status: 'pausada',
        categoria: 'Marketing',
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('nome', 'Updated Campaign');
    expect(response.body).toHaveProperty('status', 'pausada');
    expect(response.body).toHaveProperty('categoria', 'Marketing');
  });

  test('should delete a campaign', async () => {
    const response = await request(baseUrl)
      .delete(`/campaigns/${campaignId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(204);
  });

  test('should not find a deleted campaign', async () => {
    const response = await request(baseUrl)
      .get(`/campaigns/${campaignId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });
});
