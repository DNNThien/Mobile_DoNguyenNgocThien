class Logger {
    private static instance: Logger;

    private constructor() {}

    public static getInstance(): Logger {
        if(!Logger.instance)
            Logger.instance = new Logger();
        return Logger.instance;
    }

    public log(messenger: string): void {
        console.log(`[INFO]: ${messenger}`);
    }
}

class UserService {
    private logger = Logger.getInstance();

    addUser(name: string) {
        this.logger.log(`Add user: ${name}`);
    }

    removeUser(name: string) {
        this.logger.log(`Remove user: ${name}`);
    }
}

class AuthService {
    private logger = Logger.getInstance();

    login(username: string) {
        this.logger.log(`User logged in: ${username}`);
    }

    logout(username: string) {
        this.logger.log(`User logged out: ${username}`);
    }
}

const userService = new UserService();
const authService = new AuthService();

userService.addUser("Alice");
authService.login("Alice");
authService.logout("Alice");
userService.removeUser("Alice");