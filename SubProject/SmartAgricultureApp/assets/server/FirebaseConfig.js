// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Thông tin này lấy trong Firebase console > Project settings > General > Your apps
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

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
