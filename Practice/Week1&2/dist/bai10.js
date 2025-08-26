"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const acc = new _1.Account("A123", 500);
console.log(acc.accountNumber); // A123 (public)
console.log(acc.getBalance()); // 500
