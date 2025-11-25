import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore, setDoc, doc } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// const firebaseConfig = {
//     apiKey: "AIzaSyA_DoWrEIRA0yM8gmvKg5TOl8xPDNS4mF0",
//     authDomain: "ezen-test2.firebaseapp.com",
//     projectId: "ezen-test2",
//     storageBucket: "ezen-test2.firebasestorage.app",
//     messagingSenderId: "1094099913191",
//     appId: "1:1094099913191:web:05ad44c1a06d2a84275542"
// };
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AuthDomain,
  projectId: process.env.REACT_APP_FIREBASE_ProjectId,
  storageBucket: process.env.REACT_APP_FIREBASE_StorageBucket,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MessagingSenderId,
  appId: process.env.REACT_APP_FIREBASE_AppId,
  measurementId: process.env.REACT_APP_FIREBASE_MeasurementId,
};

// Initialize Firebase

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);

// 🔹 Firestore에 주소 저장하는 함수 (옵션)
export const saveUserAddress = async (userId, address) => {
  try {
    await setDoc(doc(db, "users", userId), {
      address: address,
    });
    console.log(" 주소 저장 성공!");
  } catch (error) {
    console.error(" 주소 저장 실패:", error);
  }
};
