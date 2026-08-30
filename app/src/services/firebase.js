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
  apiKey:
    process.env.VUE_APP_FIREBASE_API_KEY ||
    "AIzaSyBQM4tdqU98u1DzXlbWMdiLnpx6k-LIcEQ",
  authDomain:
    process.env.VUE_APP_FIREBASE_AUTH_DOMAIN || "poultry-d16aa.firebaseapp.com",
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID || "poultry-d16aa",
  storageBucket:
    process.env.VUE_APP_FIREBASE_STORAGE_BUCKET || "poultry-d16aa.appspot.com",
  messagingSenderId:
    process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID || "164374560790",
  appId:
    process.env.VUE_APP_FIREBASE_APP_ID ||
    "1:164374560790:web:25384d58258d127a01f537",
  measurementId: process.env.VUE_APP_FIREBASE_MEASUREMENT_ID || "G-W4ZW4GN1W6",
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
