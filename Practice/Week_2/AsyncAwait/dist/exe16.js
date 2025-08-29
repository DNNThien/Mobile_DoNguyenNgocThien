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
function task11() {
    return new Promise(resolve => {
        setTimeout(() => resolve("Task 1 done"), 1000);
    });
}
function task22() {
    return new Promise(resolve => {
        setTimeout(() => resolve("Task 2 done"), 2000);
    });
}
function task33() {
    return new Promise(resolve => {
        setTimeout(() => resolve("Task 3 done"), 1500);
    });
}
function run16() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const results = yield Promise.all([task11(), task22(), task33()]);
            console.log(results); // In ra mảng kết quả từ cả 3 task
        }
        catch (error) {
            console.error("Error:", error);
        }
    });
}
run16();
