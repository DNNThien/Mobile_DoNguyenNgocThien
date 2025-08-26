export class Person {
    name: string;
    age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    displayInfo(): void {
        console.log(`Name: ${this.name}.\nAge: ${this.age}.`);
    }
}

export class Student extends Person {
    grade: number;
    constructor(name: string, age: number, grade: number) {
        super(name, age);
        this.grade = grade;
    }

    displayStudentInfo(): void {
        super.displayInfo();
        console.log(`Grade: ${this.grade}.`);
    }
}

export class Car {
    brand: string;
    model: string;
    year: number;

    constructor(brand:string, model: string, year: number){
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    displayCarInfo(): void {
        console.log(`Brand: ${this.brand}.\nModel: ${this.model}.\nYear: ${this.year}.`);
    }
}

export class Rectangle {
    width: number;
    height: number;
    
    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    Area(): number {
        return this.width * this.height;
    }

    Parameter(): number {
        return (this.width + this.height) * 2;
    }
}

export class BankAccount {
    balance: number = 0;
    
    constructor(balance?: number) {
        if(balance) this.balance = balance;
    }

    getBalance(): void {
        console.log(`Your balance is ${this.balance} VND.`);
    }

    deposit(amount: number): void {
        if(amount < 100000)
            console.log(`The deposit amount must be greather then 100,000 VND.`);
        else {
            this.balance += amount;
            this.getBalance();
        }
    }

    withdraw(amount: number): void {
        if(amount % 50000 != 0)
            console.log(`The withdrawal amount must be a multiple of 50,000 VND.`);
        else if(this.balance - amount < 0)
            console.log(`Your balance is insufficient.`);
        else {
            this.balance -= amount;
            this.getBalance();
        }
    }
}

export class Book {
    title: string;
    author: string;
    year: number;

    constructor(title:string, author: string, year: number) {
        this.title = title;
        this.author = author;
        this.year = year;
    }

    displayBookInfo(): void {
        console.log(`Title: ${this.title}.\nAuthor: ${this.author}.\nYear: ${this.year}.`);
    }
}

export class User {
    private name: string;
    
    constructor(name: string) {
        this.name = name;
    }

    getName(): string {
        return this.name;
    }
    
    setName(str: string): void {
        this.name = str;
    }
}

export class Product {
    name: string;
    price: number;
    
    constructor(name:string, price: number) {
        this.name = name;
        this.price = price;
    }
}

interface Animal {
    name: string;
    sound(): void;
}

export class Dog implements Animal {
    name: string;
    
    constructor(name: string) {
        this.name = name;
    }

    sound(): void {
        console.log(`Gau Gau...`);
    }
}

export class Account {
    public accountNumber: string;   // public: có thể truy cập từ bên ngoài
    private balance: number;        // private: chỉ truy cập trong class
    readonly createdAt: Date;       // readonly: chỉ đọc, không thể gán lại sau khi khởi tạo

    constructor(accountNumber: string, initialBalance: number) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
        this.createdAt = new Date(); // khởi tạo readonly
    }

    getBalance(): number {
        return this.balance;
    }

    deposit(amount: number): void {
        if (amount > 0) {
            this.balance += amount;
            console.log(`Deposited ${amount}. New balance: ${this.balance}`);
        }
    }

    withdraw(amount: number): void {
        if (amount > 0 && amount <= this.balance) {
            this.balance -= amount;
            console.log(`Withdrawn ${amount}. New balance: ${this.balance}`);
        } else {
            console.log("Insufficient balance or invalid amount");
        }
    }
}