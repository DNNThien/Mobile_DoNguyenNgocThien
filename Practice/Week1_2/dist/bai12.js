"use strict";
class Bird {
    constructor(name) {
        this.name = name;
    }
    howToMove() {
        console.log(`${this.name} can fly`);
    }
}
class Fish {
    constructor(name) {
        this.name = name;
    }
    howToMove() {
        console.log(`${this.name} can swim`);
    }
}
var ChimBoCau = new Bird('Chim Bo Cau');
ChimBoCau.howToMove();
var CaTre = new Fish('Ca Tre');
CaTre.howToMove();
