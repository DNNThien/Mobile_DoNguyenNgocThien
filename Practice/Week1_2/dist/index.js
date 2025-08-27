"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Student = exports.Person = void 0;
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
