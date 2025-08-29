"use strict";
var errorPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject("Something went wrong");
    }, 1000);
});
errorPromise.catch((messenger) => {
    console.log(messenger);
});
