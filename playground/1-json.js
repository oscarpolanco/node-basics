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
