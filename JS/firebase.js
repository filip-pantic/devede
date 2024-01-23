import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore, collection, addDoc, query, where, getDocs, deleteDoc, doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBGA_YW6b95gnjAAhasGuWWLtKiuQ_Jh1k",
  authDomain: "devede-28650.firebaseapp.com",
  projectId: "devede-28650",
  storageBucket: "devede-28650.appspot.com",
  messagingSenderId: "126905402550",
  appId: "1:126905402550:web:bc99ff805be8f43874d217"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

