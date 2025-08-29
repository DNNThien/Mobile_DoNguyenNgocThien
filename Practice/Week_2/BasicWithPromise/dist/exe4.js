"use strict";
function randomNumber() {
    return new Promise((resolve, reject) => {
        var num = Math.floor(Math.random() * 10);
        if (num >= 5) {
            console.log('RESOLVE');
            resolve(num);
        }
        else {
            console.log('REJECT');
            reject(num);
        }
    });
}
randomNumber().then(num => {
    console.log(num);
}).catch(num => {
    console.log(num);
});
