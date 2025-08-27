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