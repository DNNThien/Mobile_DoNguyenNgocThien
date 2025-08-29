class Repository<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    getAll(): T[] {
        return this.items;
    }
}

var component1 = new Repository<string>();
component1.add('Keo');
component1.add('Kim');
component1.getAll();