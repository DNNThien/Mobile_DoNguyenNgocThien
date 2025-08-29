"use strict";
class Book {
    constructor(id, title, author) {
        this.id = id;
        this.title = title;
        this.author = author;
    }
    getInfo() {
        return `${this.title} by ${this.author}`;
    }
    getId() {
        return this.id;
    }
}
class User {
    constructor(id, name) {
        this.id = id;
        this.name = name;
    }
    getInfo() {
        return `${this.name} (ID: ${this.id})`;
    }
}
class Library {
    constructor() {
        this.books = [];
        this.users = [];
    }
    addBook(book) {
        this.books.push(book);
        console.log(`Book added: ${book.getInfo()}`);
    }
    addUser(user) {
        this.users.push(user);
        console.log(`User added: ${user.getInfo()}`);
    }
    showBooks() {
        console.log("Library books:");
        // this.books.forEach(b => console.log(b.getInfo()));
        console.table(this.books, ["id", "title"]);
    }
    showUsers() {
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
