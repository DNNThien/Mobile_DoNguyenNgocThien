"use strict";
var randomNumber = new Promise((resolve, reject) => {
    var num = Math.floor(Math.random() * 10);
    if (num >= 5)
        resolve('Correct! Your random number is ' + num);
    else
        reject('Incorrect! Your random number is ' + num);
});
randomNumber.then((messenger) => {
    console.log(messenger);
}).catch((messenger) => {
    console.log(messenger);
});
