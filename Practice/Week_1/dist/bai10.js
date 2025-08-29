"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
var user1 = new _1.Account('acb123', 'Thien', 2000000000);
console.log(`Your balance is ${user1.getBalance()}`);
user1.deposit(1000000000);
user1.withdraw(2000000000);
// Don't run because access private and readonly element
// user1.accountID = '124455';
// user1.getBalance = 1999999999;
