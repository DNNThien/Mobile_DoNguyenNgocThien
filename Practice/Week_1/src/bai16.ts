class Box<T> {
    private value: T;

    constructor(value: T) {
        this.value = value;
    }

    public getValue(): T {
        return this.value;
    }

    public setValue(value: T): void {
        this.value = value;
    }

    public show(): void {
        console.log(`Box contains: ${this.value}`);
    }
}

const numberBox = new Box<number>(123);
numberBox.show();
numberBox.setValue(456);
console.log(numberBox.getValue());

const stringBox = new Box<string>("Hello");
stringBox.show();
stringBox.setValue("World");
console.log(stringBox.getValue());

const booleanBox = new Box<boolean>(true);
booleanBox.show();
