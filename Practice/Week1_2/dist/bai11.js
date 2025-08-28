"use strict";
class Animal {
    constructor(name) {
        this.name = name;
    }
    makeSound() {
        console.log(`${this.name} makes a sound.`);
    }
}
class Dog extends Animal {
    constructor(name) {
        super(name);
    }
    bark() {
        console.log(`${this.name} says: Woof! Woof!`);
    }
}
class Meow extends Animal {
    constructor(name) {
        super(name);
    }
    meow() {
        console.log(`${this.name} says: Meowwwwwwwwwwww!`);
    }
}
var peter = new Dog("Peter");
peter.bark();
var anna = new Meow("Anna");
anna.meow();
