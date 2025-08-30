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
function fetchUser19(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => {
            if (id <= 0)
                reject(new Error("Invalid id"));
            else {
                setTimeout(() => {
                    resolve({
                        id,
                        name: `User ${id}`,
                        email: `user${id}@example.com`
                    });
                }, 1000);
            }
        });
    });
}
function fetchAllUsers(ids) {
    return __awaiter(this, void 0, void 0, function* () {
        //   const results = [];
        //   for (const id of ids) {
        //     const user = await fetchUser19(id);
        //     results.push(user);
        //   }
        var result = ids.map(id => fetchUser19(id));
        var results = yield Promise.all(result);
        return results;
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    var result = yield fetchAllUsers([1, 2, 3, 4]);
    console.log(result);
}))();
