const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const app = require('../src/app');
const User = require('../src/models/user');

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
    _id: userOneId,
    name: 'Testing',
    email: 'testing@example.com',
    password: 'TestingPass!!',
    tokens: [{
        token: jwt.sign({ _id: userOneId }, process.env.JWT_SECRET)
    }]
}

beforeEach(async () => {
    await User.deleteMany();
    await new User(userOne).save();
});

test('Should signup a new user', async () => {
    await request(app)
        .post('/users')
        .send({
            name: 'test',
            email: 'test@example.com',
            password: 'MyPass7771'
        })
        .expect(201);
});

test('Should login existing user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password
        }).expect(200);
});

// Goal: Test login failure
//
// 1. Create "Should not login nonexistent user"
// 2. Send off the request with bad credentials
// 3. Expect the correct status response
// 4. Test your work!

test('Should not login nonexistent user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: 'test@testing.com',
            password: 'testingPass'
        }).expect(400);
});

test('Should get profile for user', async () => {
    await request(app)
        .get('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
});

test('Should not get profile for unauthenticated user', async () => {
    await request(app)
        .get('/users/me')
        .send()
        .expect(401)
});

// Goal: Test delete account
//
// 1. Create "Should delete account for user"
//  - Setup auth header and expect correct status code
// 2. Create "Should not delete account for uaunthenticated user"
//  - Expect the correct status code
// 3. Test your work

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)
});

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
});
