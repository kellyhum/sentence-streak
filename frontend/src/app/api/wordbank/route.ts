import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

const firebaseConfig = {
    apiKey: `${process.env.FIREBASE}`,
    authDomain: "sentencestreak.firebaseapp.com",
    projectId: "sentencestreak",
    storageBucket: "sentencestreak.firebasestorage.app",
    messagingSenderId: `${process.env.FIREBASE_SENDERID}`,
    appId: `${process.env.FIREBASE_APPID}`,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
