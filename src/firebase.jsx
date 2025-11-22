import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBrPdAGZamAepmcP1tevROa54PwEfId48Y",
  authDomain: "trip-planner-6af8c.firebaseapp.com",
  projectId: "trip-planner-6af8c",
  storageBucket: "trip-planner-6af8c.firebasestorage.app",
  messagingSenderId: "435287885049",
  appId: "1:435287885049:web:06560f9e0f05ad7d384e28",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const signInWithGoogle = () => signInWithPopup(auth, provider);
export const logout = () => signOut(auth);
