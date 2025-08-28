import { Car } from ".";

interface Vehicle {
    brand: string;
    model: string;
    year: number;
    displayInfo(): void;
}

class Carr implements Vehicle {
    brand: string;
    model: string;
    year: number;

    constructor(brand: string, model: string, year: number) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    displayInfo(): void {
        console.log(`Brand: ${this.brand}\nModel: ${this.model}\nYear: ${this.year}`);
    }
}

class Bike implements Vehicle {
    brand: string;
    model: string;
    year: number;

    constructor(brand: string, model: string, year: number) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }

    displayInfo(): void {
        console.log(`Brand: ${this.brand}\nModel: ${this.model}\nYear: ${this.year}`);
    }
}

var vf9 = new Carr('Vinfast', 'VF9', 2025);
vf9.displayInfo();

var future125 = new Bike('Honda', 'Future 125', 2020);
future125.displayInfo();