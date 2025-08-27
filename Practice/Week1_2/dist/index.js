"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
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
