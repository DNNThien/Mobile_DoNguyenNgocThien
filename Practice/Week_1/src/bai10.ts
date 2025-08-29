import { Account } from ".";

var user1 = new Account('acb123', 'Thien', 2000000000);

console.log(`Your balance is ${user1.getBalance()}`);

user1.deposit(1000000000);

user1.withdraw(2000000000);

// Don't run because access private and readonly element
// user1.accountID = '124455';
// user1.getBalance = 1999999999;