class Animall {
    name: string;

    constructor(name: string) {
        this.name = name;
    }

    makeSound(): void {
        console.log(`${this.name} makes a sound`);
    }
}

class Dogg extends Animall {
    constructor(name: string) {
        super(name);
    }

    makeSound(): void {
        console.log(`${this.name} says: Woof!`);
    }
}

class Catt extends Animall {
    constructor(name: string) {
        super(name);
    }

    makeSound(): void {
        console.log(`${this.name} says: Meow!`);
    }
}

function animalSound(animal: Animall) {
    animal.makeSound();
}

let myDog = new Dogg("Buddy");
let myCat = new Catt("Kitty");
let genericAnimal = new Animall("SomeAnimal");

animalSound(myDog);       // Buddy says: Woof!
animalSound(myCat);       // Kitty says: Meow!
animalSound(genericAnimal); // SomeAnimal makes a sound
