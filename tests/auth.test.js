import request from 'supertest'
import app from '../index.js'
import { User } from '../models/user.model.js';

describe('POST /api/v1/auth/signUp', () => {
  it('should return a user if found', async () => {
    const user = new User({ name: 'John Doe' });
    await user.save();

    const res = await request(app).post(`/users/${user._id}`);

    expect(res.status).toBe(200);
    expect(res.body.name).toBe('John Doe');
  });

  it('should return 404 if user not found', async () => {
    const res = await request(app).get('/users/5f50c31b4f4ddef1fc8dfb34');

    expect(res.status).toBe(404);
  });
});
