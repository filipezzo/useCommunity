import { ref, set, update } from "firebase/database";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/hooks/useAuth";
import { db } from "../../../app/lib/firebase";

export function useCreatePostController() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { user, setUser } = useAuth();
	const nav = useNavigate();
	const postid = crypto.randomUUID();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsLoading(true);

		if (!title.trim() || !content.trim()) {
			setIsLoading(false);
			return toast.error("Preencha os campos!");
		}
		const post = {
			avatar: user.avatar,
			comentarios: [{ autor: "", conteudo: "" }],
			conteudo: content,
			id: user.id,
			tags: [""],
			titulo: title,
			likes: 0,
			username: user.username,
			postid,
		};

		try {
			await set(ref(db, `/teste/${postid}`), post);
			const userRef = ref(db, `/users/${user.id}`);
			const points = +user.points + 3;
			await update(userRef, { points });
			setUser((prevUser) => ({ ...prevUser, points }));
			nav("/");
		} catch (e) {
			if (e.message.startsWith("update failed")) {
				return toast.error("Post longo demais! Reduza o seu texto.");
			}
			toast.error("Erro ao criar post");
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	};

	return {
		title,
		handleSubmit,
		setTitle,
		setContent,
		isLoading,
		content,
	};
}
