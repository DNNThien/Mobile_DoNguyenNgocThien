"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
var products = [
    new _1.Product("Laptop", 1200),
    new _1.Product("Mouse", 50),
    new _1.Product("Keyboard", 150),
    new _1.Product("USB Cable", 30),
    new _1.Product("Monitor", 300)
];
const expensiveProducts = products.filter(product => product.price > 100);
console.log("Products with price > 100:");
expensiveProducts.forEach(product => {
    console.log(`${product.name}: ${product.price}`);
});
