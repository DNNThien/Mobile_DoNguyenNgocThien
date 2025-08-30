// Giả lập kiểu dữ liệu User
type User20 = {
  id: number;
  name: string;
};

// Giả lập API fetchUser20 (mất 1-3 giây mới trả về)
function fetchUser20(id: number): Promise<User20> {
  return new Promise((resolve) => {
    const delay = Math.floor(Math.random() * 3000) + 500; // 0.5s - 3.5s
    setTimeout(() => {
      resolve({ id, name: `User${id}` });
    }, delay);
  });
}

// Hàm fetchUser có timeout 2s
function fetchUserWithTimeout20(id: number, timeout = 2000): Promise<User20> {
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
async function fetchUsers20(ids: number[]) {
  const promises = ids.map(id => fetchUserWithTimeout20(id, 2000));
  const users = await Promise.all(promises);
  return users;
}

// ---- Test ----
(async () => {
  try {
    const users = await fetchUsers20([1, 2, 3, 4, 5]);
    console.log("Fetched users:", users);
  } catch (err) {
    console.error("Error:", err);
  }
})();
