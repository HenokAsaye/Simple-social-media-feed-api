import request from 'supertest';
import app from '../app.js';


describe("Authentication Api",()=>{
    it('should signup a user',async()=>{
        const res = await response(app)
        .post('/auth/signup')
        .send({
            username:'testuser',
            email:'testuser@gmail.com',
            password:'testpassword'
        })
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
    });
    it('should login a user',async()=>{
        const res = await  response(app)
        .post('/auth/login')
        .send({
            email:'testuser@gmail.com',
            password:'test@password'

        })
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('token');
    });

})

