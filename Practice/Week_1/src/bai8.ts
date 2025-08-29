import { Product } from ".";

const bigPrice = 100;

const products: Product[] = [
    new Product("Laptop", 1200),
    new Product("Mouse", 25),
    new Product("Keyboard", 80),
    new Product("Monitor", 200),
    new Product("USB", 15),
    new Product("Tivi", 10000),
    new Product("Motobike", 2000)
];

console.log(`Products with price greater than 100:`);
const productsBigPrice = products.filter(p => p.price > bigPrice);

console.table(productsBigPrice, ["name", "price"]);

// products.forEach(p => {
//     if(p.price > 100)
//         console.log(`Name: ${p.name} - Price: ${p.price}`)
// });