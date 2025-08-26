import { BankAccount } from ".";

var customer = new BankAccount(100000000);

customer.getBalance();
customer.deposit(100000);
customer.withdraw(1000000);