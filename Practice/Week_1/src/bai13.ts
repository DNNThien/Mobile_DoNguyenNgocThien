abstract class Shape {
    abstract area(): number;
}

class Square extends Shape {
    side: number;

    constructor(side: number) {
        super();
        this.side = side;
    }

    area(): number {
        return this.side * this.side;
    }
}

class Circle extends Shape {
    radius: number;

    constructor(radius: number) {
        super();
        this.radius = radius;
    }

    area(): number {
        return Math.PI * this.radius * this.radius;
    }
}

var square = new Square(10);
console.log(`Area of square: ${square.area()}`);

var circle = new Circle(2.54);
console.log(`Area of circle: ${circle.area()}`);
