"use strict";
function multipleTask(name, timeDelay, value) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Task name: ${name} - Delay time: ${timeDelay} - Value of task: ${value}`);
            if (value >= 5)
                resolve('Successfully');
            else
                reject('Failure');
        }, timeDelay);
    });
}
var task1 = multipleTask('Task 1', 1000, Math.floor(Math.random() * 10));
var task2 = multipleTask('Task 2', 2000, Math.floor(Math.random() * 10));
var task3 = multipleTask('Task 3', 3000, Math.floor(Math.random() * 10));
Promise.all([task1, task2, task3])
    .then((results) => {
    console.log(results);
})
    .catch((error) => {
    console.log(error);
});
