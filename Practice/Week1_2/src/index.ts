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