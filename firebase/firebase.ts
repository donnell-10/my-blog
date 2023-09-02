// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import firebase from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBP1eZunil6pFMLDfNQ5EFXnB53wqIU96c",
  authDomain: "blog-pw.firebaseapp.com",
  databaseURL: "https://blog-pw-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "blog-pw",
  storageBucket: "blog-pw.appspot.com",
  messagingSenderId: "573038367545",
  appId: "1:573038367545:web:fb6766371f99e9f6de0ee8",
  measurementId: "G-E44C6R4G7J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export {app, db}