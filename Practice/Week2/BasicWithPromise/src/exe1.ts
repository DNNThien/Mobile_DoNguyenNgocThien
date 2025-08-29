var helloPromise: Promise<string> = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Hello Async");
    }, 2000);
});

helloPromise.then((messenger) => {
    console.log(messenger);
})