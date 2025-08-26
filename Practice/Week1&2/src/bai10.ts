import { Account } from ".";

const acc = new Account("A123", 500);
console.log(acc.accountNumber); // A123 (public)
console.log(acc.getBalance());  // 500