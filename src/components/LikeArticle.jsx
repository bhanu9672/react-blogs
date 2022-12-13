import React, { useEffect, useState } from 'react'
import { useUserAuth } from "../context/UserAuthContext";
import { auth, db } from "../firebase";
import { arrayRemove, arrayUnion, doc, updateDoc, onSnapshot } from "firebase/firestore";
import { FaHeart } from "react-icons/fa";

export default function LikeArticle({ id, likes }) {
	const { user } = useUserAuth(auth);
	const likesRef = doc(db, "Articles", id);
	const handleLike = () => {
		if (likes?.includes(user.uid)) {
			updateDoc(likesRef, {
				likes: arrayRemove(user.uid),
			}).then(() => {
				console.log("unliked");
			}).catch((e) => {
				console.log(e);
			});
		}
		else {
			updateDoc(likesRef, {
				likes: arrayUnion(user.uid)
			}).then(() => {
				console.log("liked");
			}).catch((e) => {
				console.log(e);
			});
		}
	};
	return (
		<>
			<FaHeart
				style={{
					cursor: "pointer",
					color: likes?.includes(user.uid) ? "red" : null,
					margin: "10px"
				}}
				onClick={handleLike}
			/>
		</>
	);
}
