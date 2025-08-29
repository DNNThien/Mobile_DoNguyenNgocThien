"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Carr {
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    displayInfo() {
        console.log(`Brand: ${this.brand}\nModel: ${this.model}\nYear: ${this.year}`);
    }
}
class Bike {
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
    displayInfo() {
        console.log(`Brand: ${this.brand}\nModel: ${this.model}\nYear: ${this.year}`);
    }
}
var vf9 = new Carr('Vinfast', 'VF9', 2025);
vf9.displayInfo();
var future125 = new Bike('Honda', 'Future 125', 2020);
future125.displayInfo();
