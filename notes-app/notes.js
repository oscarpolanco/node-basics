// Challenge: Define and use a function in a new file
//
// 1. Create a new file called note.js
// 2. Create a getNotes function that returns "Your notes..."
// 3. Export getNotes function
// 4. From app.js, load in and call the function printing message to console

function getNotes() {
    return "Your notes...";
}

module.exports = getNotes;
