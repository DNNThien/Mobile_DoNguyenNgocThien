"use strict";
class Box {
    constructor(value) {
        this.value = value;
    }
    getValue() {
        return this.value;
    }
    setValue(value) {
        this.value = value;
    }
    show() {
        console.log(`Box contains: ${this.value}`);
    }
}
const numberBox = new Box(123);
numberBox.show();
numberBox.setValue(456);
console.log(numberBox.getValue());
const stringBox = new Box("Hello");
stringBox.show();
stringBox.setValue("World");
console.log(stringBox.getValue());
const booleanBox = new Box(true);
booleanBox.show();
