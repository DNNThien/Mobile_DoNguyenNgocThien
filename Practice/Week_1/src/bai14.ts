// Lớp cơ sở Employee
class Employee {
    protected ID: string;
    protected name: string;
    protected salary: number;
    protected address: string;

    constructor(ID: string, name: string, salary: number, address: string) {
        this.ID = ID;
        this.name = name;
        this.salary = salary;
        this.address = address;
    }

    public displayInfo(): void {
        console.log(`ID: ${this.ID}, Name: ${this.name}, Salary: ${this.salary}, Address: ${this.address}`);
    }

    public getSalary(): number {
        return this.salary;
    }

    public setSalary(newSalary: number): void {
        this.salary = newSalary;
    }
}

class Manager extends Employee {
    private department: string;

    constructor(ID: string, name: string, salary: number, address: string, department: string) {
        super(ID, name, salary, address);
        this.department = department;
    }

    public manageProject(): void {
        console.log(`${this.name} is managing the ${this.department} department.`);
    }
}

class Developer extends Employee {
    private programmingLanguage: string;

    constructor(ID: string, name: string, salary: number, address: string, programmingLanguage: string) {
        super(ID, name, salary, address);
        this.programmingLanguage = programmingLanguage;
    }

    public writeCode(): void {
        console.log(`${this.name} is writing code in ${this.programmingLanguage}.`);
    }
}

const emp1 = new Manager("M001", "Alice", 5000, "New York", "IT");
emp1.displayInfo();
emp1.manageProject();

const emp2 = new Developer("D001", "Bob", 4000, "Los Angeles", "TypeScript");
emp2.displayInfo();
emp2.writeCode();
