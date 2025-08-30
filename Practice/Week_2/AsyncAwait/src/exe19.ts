interface User2 {
  id: number;
  name: string;
  email: string;
}

async function fetchUser19(id: number): Promise<User2> {
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
}

async function fetchAllUsers(ids: number[]) {
//   const results = [];
//   for (const id of ids) {
//     const user = await fetchUser19(id);
//     results.push(user);
//   }
    var result = ids.map(id => fetchUser19(id));
    var results = await Promise.all(result);
    return results;
}

(async()=> {
    var result = await fetchAllUsers([1, 2, 3, 4]);
    console.log(result);
})();


