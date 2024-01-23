import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBJBcatIFYzgJYUoiBpP4P4-XugoDZKm6c",
  authDomain: "dvd1-e092a.firebaseapp.com",
  projectId: "dvd1-e092a",
  storageBucket: "dvd1-e092a.appspot.com",
  messagingSenderId: "717316898679",
  appId: "1:717316898679:web:e20ae9bac2ccf1b61dab72"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, query, where, getDocs, deleteDoc, doc, updateDoc };