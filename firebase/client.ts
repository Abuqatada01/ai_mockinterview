import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBp8EUJ76lggx3WmmGYfd3QJhvwej0h8vY",
  authDomain: "prepwise-9d223.firebaseapp.com",
  projectId: "prepwise-9d223",
  storageBucket: "prepwise-9d223.firebasestorage.app",
  messagingSenderId: "199525219113",
  appId: "1:199525219113:web:3edf52c88dbf2fbe785538",
  measurementId: "G-MCGJKEH6WV",
};

const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
