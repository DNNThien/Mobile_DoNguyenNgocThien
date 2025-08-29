interface Flyable {
    name: string;
    howToMove(): void;
}

interface Swimmable {
    name: string;
    howToMove(): void;
}

class Bird implements Flyable {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    howToMove(): void {
        console.log(`${this.name} can fly`);
    }
}

class Fish implements Swimmable {
    name: string;
    constructor(name: string) {
        this.name = name;
    }

    howToMove(): void {
        console.log(`${this.name} can swim`);
    }
}

var ChimBoCau = new Bird('Chim Bo Cau');
ChimBoCau.howToMove();

var CaTre = new Fish('Ca Tre');
CaTre.howToMove();