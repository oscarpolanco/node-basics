const express = require('express');
require('./db/mongoose');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
    console.log('Server is running on port ' + port);
});

const Task = require('./models/task');
const User = require('./models/user');

const main = async () => {
    // const task = await Task.findById('62e1eede1fbe839a93483017');
    // await task.populate('owner');
    // console.log(task.owner);

    const user = await User.findById('62e1eea31fbe839a93483012');
    await user.populate('tasks');
    console.log(user.tasks);
}

main();
