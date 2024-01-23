// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJBcatIFYzgJYUoiBpP4P4-XugoDZKm6c",
  authDomain: "dvd1-e092a.firebaseapp.com",
  projectId: "dvd1-e092a",
  storageBucket: "dvd1-e092a.appspot.com",
  messagingSenderId: "717316898679",
  appId: "1:717316898679:web:e20ae9bac2ccf1b61dab72"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Export the necessary Firestore functionalities
export { db, collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc };