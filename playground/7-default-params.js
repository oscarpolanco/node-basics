const greeter = (name = 'user') => {
    console.log('Hello ' + name);
}

greeter('Test');
greeter();

const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
};

const transaction = (type, { label, stock = 0 } = {}) => {
    console.log(type, label, stock);
}

transaction('order');
transaction('order 2', product);
