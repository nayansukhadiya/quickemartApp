// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB28eErB3f9sz1NG9VZQhZ6XXopCIw2hJs",
  authDomain: "rapidshop-92067.firebaseapp.com",
  projectId: "rapidshop-92067",
  storageBucket: "rapidshop-92067.appspot.com",
  messagingSenderId: "890522427557",
  appId: "1:890522427557:web:414a1c3fc0224a58d9ad4c",
  measurementId: "G-PSB9L9THMM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);