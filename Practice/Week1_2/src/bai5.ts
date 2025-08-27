import { BankAccount } from ".";

var user1 = new BankAccount(1000000000); // 1 milion

user1.getBalance();
user1.deposit(100000); // deposit 100,000VND

user1.withdraw(200000); // withdraw 200,000VND


user1.deposit(100);
user1.withdraw(200);