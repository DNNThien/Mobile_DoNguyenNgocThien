"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
var user = new _1.User('Thien');
console.log(`Your name is: ${user.getName()}`);
user.setName('Do Nguyen Ngoc Thien');
console.log(`Your name is: ${user.getName()}`);
// console.log(`${user.name}`) error because 'name' is private
