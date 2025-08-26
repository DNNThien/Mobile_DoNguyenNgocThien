import { Product } from ".";

var products: Product [] = [
    new Product("Laptop", 1200),
    new Product("Mouse", 50),
    new Product("Keyboard", 150),
    new Product("USB Cable", 30),
    new Product("Monitor", 300)
];

const expensiveProducts = products.filter(product => product.price > 100);

console.log("Products with price > 100:");
expensiveProducts.forEach(product => {
    console.log(`${product.name}: ${product.price}`);
});