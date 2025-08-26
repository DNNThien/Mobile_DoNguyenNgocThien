"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = exports.Dog = exports.Product = exports.User = exports.Book = exports.BankAccount = exports.Rectangle = exports.Car = exports.Student = exports.Person = void 0;
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    displayInfo() {
        console.log(`Name: ${this.name}.\nAge: ${this.age}.`);
    }
}
exports.Person = Person;
class Student extends Person {
    constructor(name, age, grade) {
        super(name, age);
        this.grade = grade;
    }
    displayStudentInfo() {
        super.displayInfo();
        console.log(`Grade: ${this.grade}.`);
    }
}
exports.Student = Student;
class Car {
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    displayCarInfo() {
        console.log(`Brand: ${this.brand}.\nModel: ${this.model}.\nYear: ${this.year}.`);
    }
}
exports.Car = Car;
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    Area() {
        return this.width * this.height;
    }
    Parameter() {
        return (this.width + this.height) * 2;
    }
}
exports.Rectangle = Rectangle;
class BankAccount {
    constructor(balance) {
        this.balance = 0;
        if (balance)
            this.balance = balance;
    }
    getBalance() {
        console.log(`Your balance is ${this.balance} VND.`);
    }
    deposit(amount) {
        if (amount < 100000)
            console.log(`The deposit amount must be greather then 100,000 VND.`);
        else {
            this.balance += amount;
            this.getBalance();
        }
    }
    withdraw(amount) {
        if (amount % 50000 != 0)
            console.log(`The withdrawal amount must be a multiple of 50,000 VND.`);
        else if (this.balance - amount < 0)
            console.log(`Your balance is insufficient.`);
        else {
            this.balance -= amount;
            this.getBalance();
        }
    }
}
exports.BankAccount = BankAccount;
class Book {
    constructor(title, author, year) {
        this.title = title;
        this.author = author;
        this.year = year;
    }
    displayBookInfo() {
        console.log(`Title: ${this.title}.\nAuthor: ${this.author}.\nYear: ${this.year}.`);
    }
}
exports.Book = Book;
class User {
    constructor(name) {
        this.name = name;
    }
    getName() {
        return this.name;
    }
    setName(str) {
        this.name = str;
    }
}
exports.User = User;
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}
exports.Product = Product;
class Dog {
    constructor(name) {
        this.name = name;
    }
    sound() {
        console.log(`Gau Gau...`);
    }
}
exports.Dog = Dog;
class Account {
    constructor(accountNumber, initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
        this.createdAt = new Date(); // khởi tạo readonly
    }
    getBalance() {
        return this.balance;
    }
    deposit(amount) {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Deposited ${amount}. New balance: ${this.balance}`);
        }
    }
    withdraw(amount) {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            console.log(`Withdrawn ${amount}. New balance: ${this.balance}`);
        }
        else {
            console.log("Insufficient balance or invalid amount");
        }
    }
}
exports.Account = Account;
