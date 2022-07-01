require('../src/db/mongoose');
const Task = require('../src/models/task');

// Goal: Use async/await
//
// 1. Create deleteTaskAndCount as an async function
// - Accept id of task to remove
// 2. Use await to delete task and count up incomplete tasks
// 3. Return the count
// 4. Call the function and attach then/catch to log results
// 5. Test your work!

const deleteTaskAndCount = async (id) => {
    const task = await Task.findByIdAndDelete(id);
    const count = await Task.countDocuments({ completed: false });
    return count;
}

deleteTaskAndCount('62b33c459de37af45b3f03bf').then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
});
