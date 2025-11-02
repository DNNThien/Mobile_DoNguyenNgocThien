// UserService.js
import { db } from "./Firebase";
import { ref, onValue, push, set } from "firebase/database";

// Lấy danh sách users realtime
export const subscribeUsers = (callback) => {
  const usersRef = ref(db, "user");
  const unsubscribe = onValue(usersRef, (snapshot) => {
    const data = snapshot.val() || {};
    const list = Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));
    callback(list);
  });

  return unsubscribe; // trả về để component cleanup khi unmount
};

// Thêm user mới (tự tạo key)
export const addUser = (user) => {
  const usersRef = ref(db, "user");
  return push(usersRef, user);
};

// Cập nhật hoặc ghi đè user theo key
export const setUser = (key, user) => {
  const userRef = ref(db, `user/${key}`);
  return set(userRef, user);
};
