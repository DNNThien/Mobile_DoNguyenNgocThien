import { User } from ".";

var user = new User('Thien');

console.log(`Your name is: ${user.getName()}`);
user.setName('Do Nguyen Ngoc Thien');
console.log(`Your name is: ${user.getName()}`);
// console.log(`${user.name}`) error because 'name' is private