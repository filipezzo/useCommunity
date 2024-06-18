import { get, query, ref, update } from "firebase/database";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../../app/hooks/useAuth";
import { db } from "../../../app/lib/firebase";

export function useCommentsController({ post, user, author, setAuthor }) {
	const [comment, setComment] = useState("");
	const [comments, setComments] = useState(post?.comentarios || []);
	const [loading, setLoading] = useState(false);
	const [showUsersFromComment, setShowUsersFromComment] = useState(false);
	const [mentionList, setMentionList] = useState([]);
	const { setUser } = useAuth();

	if (!post || !user || !author || !setAuthor) return;

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!comment.trim()) return;
		setLoading(true);

		try {
			const newComment = {
				id: crypto.randomUUID(),
				autor: user.username,
				avatar: user.avatar,
				conteudo: comment,
			};
			const postRef = ref(db, `teste/${post?.postid}`);
			const postSnapshot = await get(postRef);
			if (postSnapshot.exists()) {
				const updatedComments = [...(post?.comentarios || []), newComment];
				await update(postRef, { ...post, comentarios: updatedComments });
				setComment("");
				setComments([...comments, newComment]);
				const userRef = ref(db, `/users/${user.id}`);
				const postUserRef = ref(db, `/users/${post?.id}`);
				const userPoints = +user.points + 2;
				const authorPoints = +author.points + 2;
				await update(userRef, { ...user, points: userPoints });
				await update(postUserRef, { ...author, points: authorPoints });
				setUser({ ...user, points: userPoints });
				setAuthor({ ...author, points: authorPoints });
			} else {
				toast.error("Erro ao adicionar comentário");
			}
		} catch (e) {
			console.log(e);
			toast.error("Erro ao adicionar comentário");
		} finally {
			setLoading(false);
		}
	};

	const handleChange = async (e) => {
		const newComment = e.target.value;
		setComment(newComment);
		setShowUsersFromComment(false);
		if (comment.length > 2 && comment.startsWith("@")) {
			const searchUser = comment.toLowerCase().split("@").at(-1).split(" ");

			if (searchUser.length === 1) {
				setShowUsersFromComment(true);
				try {
					const userRef = query(ref(db, "/users"));
					const snapshot = await get(userRef);
					if (snapshot.exists()) {
						const userData = snapshot.val();
						const allUsers = Object.values(userData);
						const findUser = allUsers.filter((user) =>
							user.username.includes(searchUser),
						);

						setMentionList(findUser);
					}
				} catch (e) {
					toast.error("algo deu errado ao marcar users");
					setShowUsersFromComment(false);
				}
			} else {
				setShowUsersFromComment(false);
			}
		}
	};

	return {
		handleSubmit,
		loading,
		comment,
		setUser,
		comments,
		setComment,
		handleChange,
		showUsersFromComment,
		mentionList,
	};
}
