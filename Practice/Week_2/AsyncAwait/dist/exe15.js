"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function task1() {
    return new Promise(resolve => {
        setTimeout(() => resolve("Task 1 done"), 1000);
    });
}
function task2() {
    return new Promise(resolve => {
        setTimeout(() => resolve("Task 2 done"), 1000);
    });
}
function task3() {
    return new Promise(resolve => {
        setTimeout(() => resolve("Task 3 done"), 1000);
    });
}
function run15() {
    return __awaiter(this, void 0, void 0, function* () {
        const result1 = yield task1();
        console.log(result1);
        const result2 = yield task2();
        console.log(result2);
        const result3 = yield task3();
        console.log(result3);
        console.log("All tasks completed sequentially!");
    });
}
run15();
