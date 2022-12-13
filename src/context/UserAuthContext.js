import { createContext, useContext, useEffect, useState } from "react";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signOut,
	GoogleAuthProvider,
	signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { storage, db } from "./../firebase";
import { onSnapshot, orderBy, query } from "firebase/firestore";
import { Timestamp, collection, addDoc } from "firebase/firestore";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
	const [user, setUser] = useState({});

	const [category, setCategories] = useState([]);
	useEffect(() => {
		const categoryRef = collection(db, "categories");
		const q = query(categoryRef);
		onSnapshot(q, (snapshot) => {
			const category = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setCategories(category);
			console.log(category);
		});
	}, []);

	const [articles, setArticles] = useState([]);
	useEffect(() => {
		const articleRef = collection(db, "Articles");
		const q = query(articleRef, orderBy("createdAt", "desc"));
		onSnapshot(q, (snapshot) => {
			const articles = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setArticles(articles);
			console.log(articles);
		});
	}, []);

	const [comments, setComments] = useState([]);
    useEffect(() => {
        const commentRef = collection(db, "comments");
        const q = query(commentRef);
        onSnapshot(q, (snapshot) => {
            const comments = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setComments(comments);
            console.log(comments);
        });
    }, []);

	function logIn(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}
	function signUp(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}
	function logOut() {
		return signOut(auth);
	}
	function googleSignIn() {
		const googleAuthProvider = new GoogleAuthProvider();
		return signInWithPopup(auth, googleAuthProvider);
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
			console.log("Auth", currentuser);
			setUser(currentuser);
		});
		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<userAuthContext.Provider
			value={{
				user,
				logIn,
				signUp,
				logOut,
				googleSignIn,
				category,
				articles,
				comments,
			}}
		>
			{children}
		</userAuthContext.Provider>
	);
}

export function useUserAuth() {
	return useContext(userAuthContext);
}
