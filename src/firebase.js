import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyClVIdfs2v_y5g8MM5AyBaSMag3kAs2KBs",
	authDomain: "react-blog-site-a0d61.firebaseapp.com",
	projectId: "react-blog-site-a0d61",
	storageBucket: "react-blog-site-a0d61.appspot.com",
	messagingSenderId: "699256814772",
	appId: "1:699256814772:web:85069c1adb036d782f2be1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export default app;