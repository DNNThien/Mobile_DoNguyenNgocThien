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
// Giả lập API fetchUser20 (mất 1-3 giây mới trả về)
function fetchUser20(id) {
    return new Promise((resolve) => {
        const delay = Math.floor(Math.random() * 3000) + 500; // 0.5s - 3.5s
        setTimeout(() => {
            resolve({ id, name: `User${id}` });
        }, delay);
    });
}
// Hàm fetchUser có timeout 2s
function fetchUserWithTimeout20(id, timeout = 2000) {
    return new Promise((resolve, reject) => {
        const timer = setTimeout(() => {
            reject(new Error(`Timeout: Fetching user ${id} took too long`));
        }, timeout);
        fetchUser20(id)
            .then(user => {
            clearTimeout(timer);
            resolve(user);
        })
            .catch(err => {
            clearTimeout(timer);
            reject(err);
        });
    });
}
// Hàm fetch nhiều user cùng lúc
function fetchUsers20(ids) {
    return __awaiter(this, void 0, void 0, function* () {
        const promises = ids.map(id => fetchUserWithTimeout20(id, 2000));
        const users = yield Promise.all(promises);
        return users;
    });
}
// ---- Test ----
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield fetchUsers20([1, 2, 3, 4, 5]);
        console.log("Fetched users:", users);
    }
    catch (err) {
        console.error("Error:", err);
    }
}))();
