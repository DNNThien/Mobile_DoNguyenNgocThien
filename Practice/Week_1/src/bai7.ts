import { User } from ".";

var user = new User('Thien');

console.log(`Your name is ${user.getName()}`);

user.setName('Do Nguyen Ngoc Thien');

console.log(`Your name after change is ${user.getName()}`);
