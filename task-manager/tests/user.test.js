const request = require('supertest');
const app = require('../src/app');

test('Should signup a new user', async () => {
    await request(app).post('/users').send({
        name: 'test',
        email: 'test@example.com',
        password: 'MyPass7771'
    }).expect(201);
});
