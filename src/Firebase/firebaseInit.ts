require("dotenv").config();

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.DB_KEY,
  authDomain: "bg-tournaments.firebaseapp.com",
  projectId: "bg-tournaments",
  storageBucket: "bg-tournaments.appspot.com",
  messagingSenderId: process.env.DB_S_ID,
  appId: process.env.DB_A_ID,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
