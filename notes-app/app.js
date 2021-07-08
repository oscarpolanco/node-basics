const validator = require('validator');
const getNotes = require('./notes');

const notes = getNotes();
console.log(notes);

console.log(validator.isEmail('test@example.com'));
console.log(validator.isURL('https://mead.io'));
