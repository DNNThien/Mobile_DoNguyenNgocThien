"use strict";
class Shape {
}
class Square extends Shape {
    constructor(side) {
        super();
        this.side = side;
    }
    area() {
        return this.side * this.side;
    }
}
class Circle extends Shape {
    constructor(radius) {
        super();
        this.radius = radius;
    }
    area() {
        return Math.PI * this.radius * this.radius;
    }
}
var square = new Square(10);
console.log(`Area of square: ${square.area()}`);
var circle = new Circle(2.54);
console.log(`Area of circle: ${circle.area()}`);
