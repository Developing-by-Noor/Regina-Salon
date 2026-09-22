
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDhA7lNpoEkjD3nxlcwAIcM1C5Npo4Yqcg",
  authDomain: "regina-salon.firebaseapp.com",
  projectId: "regina-salon",
  storageBucket: "regina-salon.firebasestorage.app",
  messagingSenderId: "326027021554",
  appId: "1:326027021554:web:cb52d351904bcdeb9f146b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const fireDB = getFirestore(app);
export const auth = getAuth(app);