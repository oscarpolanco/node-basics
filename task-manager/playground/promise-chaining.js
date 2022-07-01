require('../src/db/mongoose');
const User = require('../src/models/user');

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, { age });
    const count = await User.countDocuments({ age });
    return count;
}

updateAgeAndCount('62b4e3a601ce7e7c799ee107', 2).then((count) => {
    console.log(count);
}).catch((e) => {
    console.log(e);
});
