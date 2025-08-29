"use strict";
var helloPromise = new Promise((resolve) => {
    setTimeout(() => {
        resolve("Hello Async");
    }, 2000);
});
helloPromise.then((messenger) => {
    console.log(messenger);
});
