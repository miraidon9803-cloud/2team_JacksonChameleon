// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";




const firebaseConfig = {
  apiKey: "AIzaSyBYgPImJeFGA8o0vp3TYU0YFGyjrxBJ0iE",
  authDomain: "ezen-test-3470f.firebaseapp.com",
  projectId: "ezen-test-3470f",
  storageBucket: "ezen-test-3470f.firebasestorage.app",
  messagingSenderId: "698610339021",
  appId: "1:698610339021:web:a1e0a90a14ed1c2647ad84"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db=getFirestore(app);
export const storage = getStorage(app);
