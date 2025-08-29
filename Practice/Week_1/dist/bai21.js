"use strict";
class Repository {
    constructor() {
        this.items = [];
    }
    add(item) {
        this.items.push(item);
    }
    getAll() {
        return this.items;
    }
}
var component1 = new Repository();
component1.add('Keo');
component1.add('Kim');
component1.getAll();
