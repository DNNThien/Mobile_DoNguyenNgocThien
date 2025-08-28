"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Book = exports.BankAccount = exports.Rectangle = exports.Car = exports.Student = exports.Person = void 0;
class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    displayPersonInfo() {
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
        this.displayPersonInfo();
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
        console.log(`Brand: ${this.brand}\nModel: ${this.model}\nYear: ${this.year}`);
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
        console.log(`Your balance is ${this.balance}VND`);
    }
    deposit(amount) {
        if (amount > 0 && amount % 50000 == 0) {
            this.balance += amount;
            console.log(`Deposit successfully`);
            this.getBalance();
        }
        else
            console.log(`The additional deposit must be greater than zero and in multiples of 50,000VND.`);
    }
    withdraw(amount) {
        if (amount > 0 && amount % 50000 == 0) {
            this.balance -= amount;
            console.log(`Withdrawal successful`);
            this.getBalance();
        }
        else if (amount <= 0 || amount % 50000 != 0)
            console.log(`Withdrawal must be greater than zero and in multiples of 50,000VND.`);
        else if (this.balance - amount < 0)
            console.log(`Insufficient balance`);
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
        console.log(`Title: ${this.title}\nAuthor: ${this.author}\nYear: ${this.year}`);
    }
}
exports.Book = Book;
class User {
    constructor(name) {
        this.name = name;
    }
    setName(str) {
        this.name = str;
    }
    getName() {
        return this.name;
    }
}
exports.User = User;
