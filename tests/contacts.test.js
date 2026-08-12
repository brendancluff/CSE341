jest.mock('../models/contact', () => ({
  find: jest.fn(),
  findById: jest.fn()
}));

const request = require('supertest');
const Contact = require('../models/contact');
const app = require('../server');

const testId = '507f1f77bcf86cd799439011';

describe('Contacts GET endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /contacts returns all contacts', async () => {
    Contact.find.mockResolvedValue([
      {
        _id: testId,
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com'
      }
    ]);

    const response = await request(app).get('/contacts');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  test('GET /contacts/:id returns one contact', async () => {
    Contact.findById.mockResolvedValue({
      _id: testId,
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com'
    });

    const response = await request(app).get(`/contacts/${testId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.firstName).toBe('Test');
  });
});
