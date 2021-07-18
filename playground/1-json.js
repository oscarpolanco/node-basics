const fs = require('fs');
const book = {
    title: 'Ego is the enemy',
    author: 'Ryan Holiday'
}

const bookJSON = JSON.stringify(book);
console.log(bookJSON);

const parseData = JSON.parse(bookJSON);
console.log(parseData.author);

fs.writeFileSync('1-json.json', bookJSON);

const dataBuffer = fs.readFileSync('1-json.json');
const dataJSON = dataBuffer.toString();
const data = JSON.parse(dataJSON);
console.log(data.title);

const dataBuffer2 = fs.readFileSync('2-json.json');
const dataJSON2 = dataBuffer2.toString();
const user = JSON.parse(dataJSON2);

user.name = 'testing';
user.age = '33';

const userJSON = JSON.stringify(user);
fs.writeFileSync('2-json.json', userJSON);

