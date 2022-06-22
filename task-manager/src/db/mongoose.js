const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if(value < 0) {
                throw new Error('Age must be a positive number');
            }
        }
    }
});

const me = new User({
    name: '    Test    ',
    email: 'TEST@ME.IO '
});

me.save().then(() => {
    console.log(me);
}).catch((error) => {
    console.log('Error!', error);
});

// Goal: Create a model for tasks
//
// 1. Define the model with description and completed fields
// 2. Create a new instance of the model
// 3. Save the model to the database
// 4. Test your work

const Task = mongoose.model('Task', {
    description: {
        type: String
    },
    completed: {
        type: Boolean
    }
});

// const task = new Task({
//     description: 'Clean office',
//     completed: true
// });

// task.save().then(() => {
//     console.log(task);
// }).catch((error) => {
//     console.log('Error', error);
// });
