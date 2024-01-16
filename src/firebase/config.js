// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_qr26VKb9ZLCpwJmoLph7Uxel8nJq-NM",
  authDomain: "twitter-39155.firebaseapp.com",
  projectId: "twitter-39155",
  storageBucket: "twitter-39155.appspot.com",
  messagingSenderId: "695815022873",
  appId: "1:695815022873:web:fdcd356d39ac11fd3a7d88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// auth alanının referansını alma
export const auth = getAuth(app);

// google sağlayıcı oluşturma
export const provider = new GoogleAuthProvider();

// veritabanı referansını alma
export const db = getFirestore(app);

// medya depolama alanının referansını alma
export const storage = getStorage(app);
