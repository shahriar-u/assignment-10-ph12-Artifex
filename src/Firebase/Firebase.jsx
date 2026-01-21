// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPSn3iJrHD8QWgLyLXYBP6IobikeBVT5c",
  authDomain: "assignment9-auth.firebaseapp.com",
  projectId: "assignment9-auth",
  storageBucket: "assignment9-auth.firebasestorage.app",
  messagingSenderId: "399105380668",
  appId: "1:399105380668:web:2977d07e5b4b9db29f8e39",
  measurementId: "G-PYRKEMSNJ6"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;