
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBYoUwWcPptjIReImk0GIgo1YaJgvdqki0",
    authDomain: "codegen-uncertainty.firebaseapp.com",
    databaseURL: "https://codegen-uncertainty-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "codegen-uncertainty",
    storageBucket: "codegen-uncertainty.firebasestorage.app",
    messagingSenderId: "905454948743",
    appId: "1:905454948743:web:c8bb20dadf031c073e4322"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);