"use strict";
class Logger {
    constructor() { }
    static getInstance() {
        if (!Logger.instance)
            Logger.instance = new Logger();
        return Logger.instance;
    }
    log(messenger) {
        console.log(`[INFO]: ${messenger}`);
    }
}
class UserService {
    constructor() {
        this.logger = Logger.getInstance();
    }
    addUser(name) {
        this.logger.log(`Add user: ${name}`);
    }
    removeUser(name) {
        this.logger.log(`Remove user: ${name}`);
    }
}
class AuthService {
    constructor() {
        this.logger = Logger.getInstance();
    }
    login(username) {
        this.logger.log(`User logged in: ${username}`);
    }
    logout(username) {
        this.logger.log(`User logged out: ${username}`);
    }
}
const userService = new UserService();
const authService = new AuthService();
userService.addUser("Alice");
authService.login("Alice");
authService.logout("Alice");
userService.removeUser("Alice");
