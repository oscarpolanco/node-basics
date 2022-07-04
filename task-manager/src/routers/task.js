const express = require('express');
const Task = require('../models/task');
const router = new express.Router();

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        await task.save();
        res.status(201).send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/tasks', async  (req, res) => {
    try {
        const task = await Task.find({});
        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findById(_id);

        if (!task) {
            res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

// Goal: Change how tasks are updated
//
// 1. Find the task
// 2. Alter the task properties
// 3. Save the task
// 4. Test your work by updating a task from postman

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['description', 'completed'];
    const isValid = updates.every((update) => allowedUpdates.includes(update));

    if(!isValid) {
        res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        const task = await Task.findById(req.params.id);

        updates.forEach((update) => task[update] = req.body[update]);
        await task.save();

        if(!task) {
            res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(400).send(e);
    }
});

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);

        if(!task) {
            res.status(404).send();
        }

        res.send(task);
    } catch (e) {
        res.status(500).send();
    }
});

module.exports = router;
