import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc, query, where, orderBy } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDrfP6WXEZJNbq04dfb_jdZODm9Z1GgoL8",
  authDomain: "grand-justice-rmvz5.firebaseapp.com",
  projectId: "grand-justice-rmvz5",
  storageBucket: "grand-justice-rmvz5.firebasestorage.app",
  messagingSenderId: "120244208243",
  appId: "1:120244208243:web:4fbda55e0932d8749fa006"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app, "ai-studio-4b389880-8134-42a8-bec1-c566a05c47a4");
const auth = getAuth(app);

export { app, db, auth };
