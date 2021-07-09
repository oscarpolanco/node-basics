const chalk = require('chalk');
const getNotes = require('./notes');

const notes = getNotes();
console.log(notes);

// Challenge: Use the chalk library in your project
//
// 1. Install chalk
// 2. Load chalk into app.js
// 3. Use it to print the string "Success!" to the console in green
// 4. Test your work
//
// Bonus: Use the docs to mess around with other styles. Make test bold and inversed.
console.log(chalk.green('Success!'));
console.log(chalk.bold('This is my bold text!'));
console.log(chalk.inverse.green('Inverse Success!'));
