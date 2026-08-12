jest.mock('../models/department', () => ({
  find: jest.fn(),
  findById: jest.fn()
}));

const request = require('supertest');
const Department = require('../models/department');
const app = require('../server');

const testId = '507f1f77bcf86cd799439011';

describe('Departments GET endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /departments returns all departments', async () => {
    Department.find.mockResolvedValue([
      {
        _id: testId,
        name: 'Engineering'
      }
    ]);

    const response = await request(app).get('/departments');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  test('GET /departments/:id returns one department', async () => {
    Department.findById.mockResolvedValue({
      _id: testId,
      name: 'Engineering'
    });

    const response = await request(app).get(`/departments/${testId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Engineering');
  });
});
