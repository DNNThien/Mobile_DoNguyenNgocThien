"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const bigPrice = 100;
const products = [
    new _1.Product("Laptop", 1200),
    new _1.Product("Mouse", 25),
    new _1.Product("Keyboard", 80),
    new _1.Product("Monitor", 200),
    new _1.Product("USB", 15),
    new _1.Product("Tivi", 10000),
    new _1.Product("Motobike", 2000)
];
console.log(`Products with price greater than 100:`);
const productsBigPrice = products.filter(p => p.price > bigPrice);
console.table(productsBigPrice, ["name", "price"]);
// products.forEach(p => {
//     if(p.price > 100)
//         console.log(`Name: ${p.name} - Price: ${p.price}`)
// });
