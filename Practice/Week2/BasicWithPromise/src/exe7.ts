function multipleTask2(name: string, timeDelay: number, value: number): Promise<string> {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(`Task name: ${name} - Delay time: ${timeDelay} - Value of task: ${value}`);
            if(value >= 5)
                resolve('Successfully');
            else
                reject('Failure');
        }, timeDelay);
    })
}

var task4 = multipleTask2('Task 1', 1000, Math.floor(Math.random() * 10));
var task5 = multipleTask2('Task 2', 2000, Math.floor(Math.random() * 10));
var task6 = multipleTask2('Task 3', 3000, Math.floor(Math.random() * 10));

Promise.race([task4, task5, task6])
    .then((results) => {
        console.log(results);
    })
    .catch((error) => {
        console.log(error);
    })