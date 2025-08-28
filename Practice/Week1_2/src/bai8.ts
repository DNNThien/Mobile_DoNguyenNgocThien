import { Product } from ".";

const products: Product[] = [
    new Product("Laptop", 1200),
    new Product("Mouse", 25),
    new Product("Keyboard", 80),
    new Product("Monitor", 200),
    new Product("USB", 15),
];

console.log(`Products with price greater than 100:`);

products.forEach(p => {
    if(p.price > 100)
        console.log(`Name: ${p.name} - Price: ${p.price}`)
});