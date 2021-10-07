// Object property shorthand
const name = 'test';
const userAge = 27;

const user = {
    name: name,
    age: userAge,
    location: 'Philadelphia'
};

const user2 = {
    name,
    age: userAge,
    location: 'Philadelphia'
};

console.log(user);
console.log(user2);

// Object destructuring

const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
};

// const label = product.label;
// const stock = product.stock;

const {label:productLabel, stock, rating = 5} = product;
// console.log(label);
console.log(productLabel);
console.log(stock);
console.log(rating);

const transaction = (type, { label, stock }) => {
    console.log(type, label, stock);
}

transaction('order', product);
