"use strict";
// Lớp cơ sở Employee
class Employee {
    constructor(ID, name, salary, address) {
        this.ID = ID;
        this.name = name;
        this.salary = salary;
        this.address = address;
    }
    displayInfo() {
        console.log(`ID: ${this.ID}, Name: ${this.name}, Salary: ${this.salary}, Address: ${this.address}`);
    }
    getSalary() {
        return this.salary;
    }
    setSalary(newSalary) {
        this.salary = newSalary;
    }
}
class Manager extends Employee {
    constructor(ID, name, salary, address, department) {
        super(ID, name, salary, address);
        this.department = department;
    }
    manageProject() {
        console.log(`${this.name} is managing the ${this.department} department.`);
    }
}
class Developer extends Employee {
    constructor(ID, name, salary, address, programmingLanguage) {
        super(ID, name, salary, address);
        this.programmingLanguage = programmingLanguage;
    }
    writeCode() {
        console.log(`${this.name} is writing code in ${this.programmingLanguage}.`);
    }
}
const emp1 = new Manager("M001", "Alice", 5000, "New York", "IT");
emp1.displayInfo();
emp1.manageProject();
const emp2 = new Developer("D001", "Bob", 4000, "Los Angeles", "TypeScript");
emp2.displayInfo();
emp2.writeCode();
