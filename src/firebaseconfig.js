import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCsSv7lWP-fNzunMA6dcwjJiOJvfySD5E0",
  authDomain: "instagram-9aa59.firebaseapp.com",
  databaseURL: "https://instagram-9aa59.firebaseio.com",
  projectId: "instagram-9aa59",
  storageBucket: "instagram-9aa59.appspot.com",
  messagingSenderId: "960886655759",
  appId: "1:960886655759:web:138d0102c483c2eecd8c7a",
  measurementId: "G-CP9R6XWZMX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
