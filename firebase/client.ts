/* eslint-disable @typescript-eslint/no-unused-vars */
// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBp8EUJ76lggx3WmmGYfd3QJhvwej0h8vY",
    authDomain: "prepwise-9d223.firebaseapp.com",
    projectId: "prepwise-9d223",
    storageBucket: "prepwise-9d223.firebasestorage.app",
    messagingSenderId: "199525219113",
    appId: "1:199525219113:web:3edf52c88dbf2fbe785538",
    measurementId: "G-MCGJKEH6WV"
  };

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);