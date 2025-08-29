"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.task3 = exports.task2 = exports.task1 = void 0;
exports.multipleTask = multipleTask;
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
exports.task1 = multipleTask('Task 1', 1000, Math.floor(Math.random() * 10));
exports.task2 = multipleTask('Task 2', 2000, Math.floor(Math.random() * 10));
exports.task3 = multipleTask('Task 3', 3000, Math.floor(Math.random() * 10));
Promise.all([exports.task1, exports.task2, exports.task3])
    .then((results) => {
    console.log(results);
})
    .catch((error) => {
    console.log(error);
});
