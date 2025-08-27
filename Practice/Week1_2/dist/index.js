"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rectangle = exports.Car = exports.Student = exports.Person = void 0;
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
