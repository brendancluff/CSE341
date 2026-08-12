jest.mock('../models/project', () => ({
  find: jest.fn(),
  findById: jest.fn()
}));

const request = require('supertest');
const Project = require('../models/project');
const app = require('../server');

const testId = '507f1f77bcf86cd799439011';

describe('Projects GET endpoints', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /projects returns all projects', async () => {
    Project.find.mockResolvedValue([
      {
        _id: testId,
        name: 'Website Redesign',
        status: 'active'
      }
    ]);

    const response = await request(app).get('/projects');

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  test('GET /projects/:id returns one project', async () => {
    Project.findById.mockResolvedValue({
      _id: testId,
      name: 'Website Redesign',
      status: 'active'
    });

    const response = await request(app).get(`/projects/${testId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.name).toBe('Website Redesign');
  });
});
