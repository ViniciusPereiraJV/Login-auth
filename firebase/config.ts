
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAyYgl39urntIMk7isKlmCAKehUtEO4F8I",
  authDomain: "login-auth2025.firebaseapp.com",
  projectId: "login-auth2025",
  storageBucket: "login-auth2025.firebasestorage.app",
  messagingSenderId: "801583943960",
  appId: "1:801583943960:web:be2cf6a8f297bd5e928e6d",
  measurementId: "G-W3HKB4SFNJ"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);