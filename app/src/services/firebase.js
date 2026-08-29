import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
  deleteDoc,
  addDoc,
  deleteField,
  enableIndexedDbPersistence,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  fetchSignInMethodsForEmail, // ✅ Add this
} from "firebase/auth";

// 🔥 Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBQM4tdqU98u1DzXlbWMdiLnpx6k-LIcEQ",
  authDomain: "poultry-d16aa.firebaseapp.com",
  projectId: "poultry-d16aa",
  storageBucket: "poultry-d16aa.appspot.com",
  messagingSenderId: "164374560790",
  appId: "1:164374560790:web:25384d58258d127a01f537",
  measurementId: "G-W4ZW4GN1W6",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

// Firestore Persistence
enableIndexedDbPersistence(db).catch((err) => {
  if (err.code === "failed-precondition") {
    console.warn("⚠️ Multiple tabs open, persistence may not be supported.");
  } else if (err.code === "unimplemented") {
    console.warn("⚠️ IndexedDB is not available on this browser.");
  }
});

// ✅ Export Firebase services (including auth methods like createUserWithEmailAndPassword)
export {
  deleteField,
  app,
  db,
  auth,
  googleProvider,
  signInWithPopup,
  signOut,
  serverTimestamp,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  fetchSignInMethodsForEmail, // ✅ <- Ad
  collection,
  onSnapshot,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  addDoc,
  query,
  where,
};
