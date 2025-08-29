function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function sayHello() {
    await delay(2000);
    console.log('Hello Async');
}

sayHello()