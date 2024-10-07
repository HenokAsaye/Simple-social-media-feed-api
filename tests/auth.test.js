import request from "supertest";
import app from "../app";
import User from "../models/userModel.js"; 

describe("Authentication API", () => {
  beforeEach(async () => {
    await User.deleteMany();
  });

  it('should sign up a user', async () => {
    const res = await request(app)
      .post('/auth/signup')
      .send({
        username: 'testuser',
        email: 'testuser@gmail.com',
        password: 'testpassword'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('token');
  }, 20000);

  it('should log in a user', async () => {
    await request(app)
      .post('/auth/signup')
      .send({
        username: 'testuser',
        email: 'testuser@gmail.com',
        password: 'testpassword'
      });
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'testuser@gmail.com',
        password: 'testpassword'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  }, 20000);
});


