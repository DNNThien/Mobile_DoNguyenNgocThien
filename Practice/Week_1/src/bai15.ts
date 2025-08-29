class Book {
    private id: string;
    private title: string;
    private author: string;

    constructor(id: string, title: string, author: string) {
        this.id = id;
        this.title = title;
        this.author = author;
    }

    public getInfo(): string {
        return `${this.title} by ${this.author}`;
    }

    public getId(): string {
        return this.id;
    }
}

class User {
    private id: string;
    private name: string;

    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }

    public getInfo(): string {
        return `${this.name} (ID: ${this.id})`;
    }
}

class Library {
    private books: Book[] = [];
    private users: User[] = [];

    public addBook(book: Book): void {
        this.books.push(book);
        console.log(`Book added: ${book.getInfo()}`);
    }

    public addUser(user: User): void {
        this.users.push(user);
        console.log(`User added: ${user.getInfo()}`);
    }

    public showBooks(): void {
        console.log("Library books:");
        // this.books.forEach(b => console.log(b.getInfo()));
        console.table(this.books, ["id", "title"]);
    }

    public showUsers(): void {
        console.log("Library users:");
        // this.users.forEach(u => console.log(u.getInfo()));
        console.table(this.users, ["id", "name"]);
    }
}

const lib = new Library();

const book1 = new Book("B001", "Clean Code", "Robert C. Martin");
const book2 = new Book("B002", "Design Patterns", "Erich Gamma");

const user1 = new User("U001", "Alice");
const user2 = new User("U002", "Bob");

lib.addBook(book1);
lib.addBook(book2);
lib.addUser(user1);
lib.addUser(user2);

lib.showBooks();
lib.showUsers();
