jest.mock('../models/company', () => ({
  find: jest.fn(),
  findById: jest.fn()
}));

const request = require('supertest');
const Company = require('../models/company');
const app = require('../server');

const testId = '507f1f77bcf86cd799439011';

describe('Companies GET endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /companies returns all companies', async () => {
    Company.find.mockResolvedValue([
      {
        _id: testId,
        name: 'Test Company'
      }
    ]);

    const response = await request(app).get('/companies');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  test('GET /companies/:id returns one company', async () => {
    Company.findById.mockResolvedValue({
      _id: testId,
      name: 'Test Company'
    });

    const response = await request(app).get(`/companies/${testId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Test Company');
  });
});
