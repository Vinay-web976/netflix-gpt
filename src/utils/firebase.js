// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9sauyn2pO1IRkL4ryL3Lle687ZaAm6tM",
  authDomain: "netflixgpt-90d33.firebaseapp.com",
  projectId: "netflixgpt-90d33",
  storageBucket: "netflixgpt-90d33.appspot.com",
  messagingSenderId: "458696087831",
  appId: "1:458696087831:web:7249ab5ca6b0bd0fca3f52",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
