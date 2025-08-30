interface User {
  id: number;
  name: string;
  email: string;
}

async function fetchUser(id: number): Promise<User> {
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

(async () => {
  try {
    const user = await fetchUser(2);
    console.log("Fetched (await):", user);
  } catch (err) {
    console.error("Error (await):", err);
  }
})();



