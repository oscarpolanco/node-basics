const request = require('supertest');
const app = require('../src/app');
const User = require('../src/models/user');
const { userOneId, userOne, setupDatabase, closeConnection } = require('./fixtures/db');

beforeEach(setupDatabase);
afterAll(closeConnection);

test('Should signup a new user', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            name: 'test',
            email: 'test@example.com',
            password: 'MyPass7771'
        })
        .expect(201);

    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id);
    expect(user).not.toBeNull();

    // Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: 'test',
            email: 'test@example.com',
        },
        token: user.tokens[0].token
    });

    expect(user.password).not.toBe('MyPass7771');
});

test('Should not signup user with invalid name', async () => {
    await request(app)
        .post('/users')
        .send({
            name: '',
            email: 'test@otherexample.com',
            password: 'MyPass7771'
        })
        .expect(400);
});

test('Should not signup user with invalid email', async () => {
    await request(app)
        .post('/users')
        .send({
            name: 'test',
            email: 'test.com',
            password: 'MyPass7771'
        })
        .expect(400);
});

test('Should not signup user with invalid password', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            name: 'test',
            email: 'test@otherexample.com',
            password: 'Pass'
        })
        .expect(400);
});

test('Should login existing user', async () => {
    const response = await request(app)
        .post('/users/login')
        .send({
            email: userOne.email,
            password: userOne.password
        })
        .expect(200);

    const user = await User.findById(userOneId);
    expect(user).not.toBeNull();
    expect(response.body.token).toBe(user.tokens[1].token);
});

test('Should not login nonexistent user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: 'test@testing.com',
            password: 'testingPass'
        })
        .expect(400);
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

test('Should delete account for user', async () => {
    await request(app)
        .delete('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200)

    const user = await User.findById(userOneId);
    expect(user).toBeNull();
});

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
});

test('Should upload avatar image', async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'tests/fixtures/profile-pic.jpg')
        .expect(200)

    const user = await User.findById(userOneId);
    expect(user.avatar).toEqual(expect.any(Buffer));
});

test('Should update valid user fields', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: 'Test'
        })
        .expect(200);

        const user = await User.findById(userOneId);
        expect(user.name).toEqual('Test');
});

test('Should not update unauthenticated user', async () => {
    await request(app)
        .patch('/users/me')
        .send({
            name: 'NotAuthenticated'
        })
        .expect(401);

    const user = await User.findById(userOneId);
    expect(user.name).not.toEqual('NotAuthenticated');
});

test('Should not update user with a invalid name', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            name: ''
        })
        .expect(400);

    const user = await User.findById(userOneId);
    expect(user.name).toEqual('Testing');
});

test('Should not update user with a invalid email', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            email: 'test'
        })
        .expect(400);

    const user = await User.findById(userOneId);
    expect(user.email).toEqual('testing@example.com');
});

// Note: Check how to safely add a comparison process
test('Should not update user with a invalid password', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            password: 'PASS'
        })
        .expect(400);
});

test('Should not update a invalid user field', async () => {
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            location: 'Testing'
        })
        .expect(400);
});
