// firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Cấu hình Firebase (có thể dùng .env để bảo mật)
const firebaseConfig = {
  apiKey: "AIzaSyC5DJvOYT-gWT2PAKuIoBS2aEuXfmMTyiA",
  authDomain: "smartagriculture-4edb5.firebaseapp.com",
  databaseURL:
    "https://smartagriculture-4edb5-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "smartagriculture-4edb5",
  storageBucket: "smartagriculture-4edb5.firebasestorage.app",
  messagingSenderId: "569456048563",
  appId: "1:569456048563:web:8114fbbf36ed16e131b3c6",
  measurementId: "G-4C9FP47DEK",
};

// Khởi tạo Firebase app (tránh duplicate)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getDatabase(app);

export { db };
