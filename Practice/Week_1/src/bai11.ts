class Animal {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    makeSound() : void {
        console.log(`${this.name} makes a sound.`);
    }
}

class Dog extends Animal {
    constructor(name: string) {
        super(name);
    }
    
    bark(): void {
        console.log(`${this.name} says: Woof! Woof!`);
    }
}

class Meow extends Animal {
    constructor(name: string) {
        super(name);
    }

    meow(): void {
        console.log(`${this.name} says: Meowwwwwwwwwwww!`);
    }
}

var peter = new Dog("Peter");
peter.bark();

var anna = new Meow("Anna");
anna.meow();