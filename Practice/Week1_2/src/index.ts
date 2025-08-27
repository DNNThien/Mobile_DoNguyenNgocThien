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