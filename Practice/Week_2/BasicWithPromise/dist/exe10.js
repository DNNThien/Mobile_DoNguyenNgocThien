"use strict";
function filterEvenNumber2(arr) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            var evenNumbers = arr.filter(num => num % 2 === 0 && num != 0);
            resolve(evenNumbers);
        }, 1000);
    });
}
filterEvenNumber2([1, 2, 3, 4, 5, 6, 7, 8, 9, 0])
    .then(result => {
    console.log("Even number: ", result);
})
    .catch(error => {
    console.log("Error: ", error);
})
    .finally(() => {
    console.log('This is FINALLY. Done task!');
});
