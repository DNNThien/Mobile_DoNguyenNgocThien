"use strict";
function simulateTask(time) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Time delay: ${time}`);
            resolve("Task done!!!");
        }, time);
    });
}
simulateTask(Math.floor(Math.random() * 10)).then((messenger) => {
    console.log(messenger);
});
