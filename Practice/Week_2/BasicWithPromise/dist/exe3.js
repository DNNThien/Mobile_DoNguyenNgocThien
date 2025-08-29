"use strict";
function testPromise2() {
    return new Promise((resolce, reject) => {
        setTimeout(() => {
            console.log('Something went wrong');
        }, 1000);
    });
}
testPromise2().catch(messenger => {
    console.log(messenger);
});
