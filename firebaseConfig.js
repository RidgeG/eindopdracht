import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDPYG2whLAkqg4YAVlvjt9i3GFXKV0XJCM",
    authDomain: "kalenderapp94.firebaseapp.com",
    projectId: "kalenderapp94",
    storageBucket: "kalenderapp94.appspot.com",
    messagingSenderId: "94274665132",
    appId: "1:94274665132:web:f48aacbde3f59f4e56bd09",
    measurementId: "G-HLMXJCWMB2"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);
export const storage = getStorage(app);

export default app;