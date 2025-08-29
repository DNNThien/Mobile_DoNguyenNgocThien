"use strict";
function filterEvenNumber(arr) {
    return new Promise((resolve) => {
        setTimeout(() => {
            var evenNumbers = arr.filter(num => num % 2 === 0 && num != 0);
            resolve(evenNumbers);
        }, 1000);
    });
}
filterEvenNumber([1, 2, 3, 4, 5, 6, 7, 8, 9, 0]).then(result => {
    console.log("Even number: ", result);
});
