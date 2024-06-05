import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import bcrypt from 'bcrypt';
import app from '../app'; // Your Express app
import User from '../models/user.model.js';

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await User.deleteMany({});
});

describe('POST /api/v1/auth/signup', () => {
  it('should create a new user and return 201 status', async () => {
    const res = await request(app)
      .post('/signup')
      .send({ username: 'testuser', password: 'password123' });

    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe('success');
    expect(res.body.data.user).toHaveProperty('_id');
    expect(res.body.data.user).toHaveProperty('username', 'testuser');

    // Ensure the password is hashed
    const savedUser = await User.findOne({ username: 'testuser' });
    const isPasswordCorrect = await bcrypt.compare('password123', savedUser.password);
    expect(isPasswordCorrect).toBe(true);
  });

  it('should return 401 if username or password is missing', async () => {
    const res1 = await request(app)
      .post('/signup')
      .send({ username: 'testuser' });

    expect(res1.statusCode).toBe(401);
    expect(res1.body.status).toBe('failure');
    expect(res1.body.message).toBe('Username or password cannot be empty');

    const res2 = await request(app)
      .post('/signup')
      .send({ password: 'password123' });

    expect(res2.statusCode).toBe(401);
    expect(res2.body.status).toBe('failure');
    expect(res2.body.message).toBe('Username or password cannot be empty');
  });

  it('should return 400 if there is an error creating the user', async () => {
    // Simulate a MongoDB error
    jest.spyOn(User, 'create').mockImplementationOnce(() => {
      throw new Error();
    });

    const res = await request(app)
      .post('/signup')
      .send({ username: 'testuser', password: 'password123' });

    expect(res.statusCode).toBe(400);
    expect(res.body.status).toBe('failure');
  });
});

