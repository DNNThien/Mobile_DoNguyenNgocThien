export class Person {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    displayPersonInfo(): void {
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
        this.displayPersonInfo();
        console.log(`Grade: ${this.grade}.`);
    }
}

export class Car {
    brand: string;
    model: string;
    year: number;

    constructor(brand: string, model: string, year: number) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    displayCarInfo(): void {
        console.log(`Brand: ${this.brand}\nModel: ${this.model}\nYear: ${this.year}`);
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
        console.log(`Your balance is ${this.balance}VND`);
    }

    deposit(amount: number): void {
        if(amount > 0 && amount % 50000 == 0) {
            this.balance += amount;
            console.log(`Deposit successfully`);
            this.getBalance();
        }
        else console.log(`The additional deposit must be greater than zero and in multiples of 50,000VND.`); 
    }

    withdraw(amount: number): void {
        
        if (amount > 0 && amount % 50000 == 0) {
            this.balance -= amount;
            console.log(`Withdrawal successful`);
            this.getBalance();
        }
        else if(amount <= 0 || amount % 50000 != 0)
            console.log(`Withdrawal must be greater than zero and in multiples of 50,000VND.`);
        else if(this.balance - amount < 0)
            console.log(`Insufficient balance`);
    }
}

export class Book {
    title: string;
    author: string;
    year: number;

    constructor(title: string, author: string, year: number) {
        this.title = title;
        this.author = author;
        this.year = year;
    }

    displayBookInfo(): void {
        console.log(`Title: ${this.title}\nAuthor: ${this.author}\nYear: ${this.year}`);
    }
}

export class User {
    private name: string;

    constructor(name: string) {
        this.name = name;
    }

    setName(str: string): void {
        this.name = str;
    }

    getName(): string {
        return this.name;
    }
}

export class Product {
    name: string;
    price: number;

    constructor(name: string, price: number) {
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
        console.log(`Woof! Woof!`);
    }
}

export class Account {

    readonly accountID: string;
    public username: string;
    private balance: number;

    constructor(accountID:string, username:string, balance:number) {
        this.accountID = accountID;
        this.username = username;
        this.balance = balance;
    }

    public getBalance(): number {
        return this.balance;
    }

    public getUsername(): string {
        return this.username;
    }

    public deposit(amount: number): void {
        if(amount > 0 && amount % 50000 == 0) {
            this.balance += amount;
            console.log(`Deposit successfully`);
            console.log(`Your balance is ${this.getBalance()}`);
        }
        else console.log(`The additional deposit must be greater than zero and in multiples of 50,000VND.`); 
    }

    public withdraw(amount: number): void {
        
        if (amount > 0 && amount % 50000 == 0) {
            this.balance -= amount;
            console.log(`Withdrawal successful`);
            console.log(`Your balance is ${this.getBalance()}`);
        }
        else if(amount <= 0 || amount % 50000 != 0)
            console.log(`Withdrawal must be greater than zero and in multiples of 50,000VND.`);
        else if(this.balance - amount < 0)
            console.log(`Insufficient balance`);
    }
}