const request = require('supertest');
const app = require('../src/app');
const Task = require('../src/models/task');
const {
    userOne,
    setupDatabase,
    userTwo,
    taskOne
} = require('./fixtures/db');

beforeEach(setupDatabase);

test('Should create task for user', async () => {
    const response = await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'From my test'
        })
        .expect(201);
    
    const task = await Task.findById(response.body._id);
    expect(task).not.toBeNull();
    expect(task.completed).toBe(false);
});

test('Should not create task with invalid description', async () => {
    await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: ''
        })
        .expect(400);
});

test('Should not create task with invalid description', async () => {
    await request(app)
        .post('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'Test task',
            completed: 2
        })
        .expect(400);
});

test('Should update task', async () => {
    const response = await request(app)
        .patch(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: 'Update description'
        })
        .expect(200);

    const task = await Task.findById(response.body._id);
    expect(task.description).toEqual('Update description');
});

test('Should not update task for unauthenticated user', async () => {
    await request(app)
        .patch(`/tasks/${taskOne._id}`)
        .send({
            description: 'Update description'
        })
        .expect(401);

    const task = await Task.findById(taskOne._id);
    expect(task.description).toEqual('First task');
});

test('Should not update task for invalid description', async () => {
    await request(app)
        .patch(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            description: ''
        })
        .expect(400);

    const task = await Task.findById(taskOne);
    expect(task.description).toEqual('First task');
});

test('Should not update task for invalid completed field', async () => {
    await request(app)
        .patch(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({
            completed: ''
        })
        .expect(400);

    const task = await Task.findById(taskOne);
    expect(task.completed).toEqual(false);
});

test('Should not update other user task', async () => {
    await request(app)
        .patch(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send({
            description: 'Update description'
        })
        .expect(404);

    const task = await Task.findById(taskOne);
    expect(task.description).toEqual('First task');
});

test('Should fetch user tasks', async () => {
    const response = await request(app)
        .get('/tasks')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    expect(response.body.length).toEqual(2);
});

test('Should fetch task by id', async () => {
    await request(app)
        .get(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);
});

test('Should not fetch task by id if user unauthenticated', async () => {
    await request(app)
        .get(`/tasks/${taskOne._id}`)
        .send()
        .expect(401);
});

test('Should not fetch task by id of other user', async () => {
    await request(app)
        .get(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404);
});

test('Should fetch only completed task', async () => {
    const response = await request(app)
        .get('/tasks?completed=true')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    expect(response.body.length).toEqual(1);
    expect(response.body[0].completed).toEqual(true);
});

test('Should fetch only incomplete task', async () => {
    const response = await request(app)
        .get('/tasks?completed=false')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    expect(response.body.length).toEqual(1);
    expect(response.body[0].completed).toEqual(false);
});

test('Should sort task by description', async () => {
    const response = await request(app)
        .get('/tasks?sortBy=description:desc')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    expect(response.body.length).toEqual(2);
    expect(response.body[0].description).toEqual('Second task');
});

test('Should sort task by completed field', async () => {
    const response = await request(app)
        .get('/tasks?sortBy=sortBy=completed:desc')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    expect(response.body.length).toEqual(2);
    expect(response.body[0].completed).toEqual(false);
});

test('Should sort task by createdAt field', async () => {
    const response = await request(app)
        .get('/tasks?sortBy=createdAt:desc')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    expect(response.body.length).toEqual(2);
    expect(response.body[0].description).toEqual('Second task');
});

test('Should sort task by updateAt field', async () => {
    const response = await request(app)
        .get('/tasks?sortBy=updateAt:desc')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    expect(response.body.length).toEqual(2);
    expect(response.body[0].description).toEqual('First task');
});

test('Should fetch page of tasks', async () => {
    const response = await request(app)
        .get('/tasks?limit=1&skip=1')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    expect(response.body.length).toEqual(1);
    expect(response.body[0].description).toEqual('Second task');
});

test('Should user delete task', async () => {
    const response = await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send()
        .expect(200);

    const task = await Task.findById(response.body._id);
    expect(task).toBeNull();
});

test('Should user not delete task if unauthenticated', async () => {
    await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .send()
        .expect(401);

    const task = await Task.findById(taskOne._id);
    expect(task).not.toBeNull();
});

test('Should not delete a task other users tasks', async () => {
    await request(app)
        .delete(`/tasks/${taskOne._id}`)
        .set('Authorization', `Bearer ${userTwo.tokens[0].token}`)
        .send()
        .expect(404)

    const task = await Task.findById(taskOne._id);
    expect(task).not.toBeNull();
});
