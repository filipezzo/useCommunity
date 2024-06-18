import { get, ref, update } from "firebase/database";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useParams } from "react-router-dom";
import { useAuth } from "../../../app/hooks/useAuth";
import { db } from "../../../app/lib/firebase";

export function usePostPageController() {
	const [post, setPost] = useState(null);
	const [postUser, setPostUser] = useState(null);
	const [isAlreadyLiked, setIsAlreadyLiked] = useState(false);
	const [liked, setLiked] = useState(false);
	const [loading, setLoading] = useState(true);
	const [report, setReport] = useState(false);
	const [copy, setCopy] = useState(false);

	const { id } = useParams();
	const { pathname } = useLocation();
	const { user, setUser } = useAuth();
	const isUserNotTheAuthor = post && post.id !== user.id;

	useEffect(() => {
		console.log("executou");
		const fetchPostData = async () => {
			try {
				const postRef = ref(db, `/teste/${id}`);
				const snapshot = await get(postRef);
				const postData = snapshot.val();
				setPost(postData);

				const userRef = ref(db, `/users/${postData.id}`);
				const userSnapshot = await get(userRef);
				const userData = userSnapshot.val();
				setPostUser(userData);
				if (user && postData && postData.likes && user.likedPosts) {
					setIsAlreadyLiked(user.likedPosts.includes(postData.postid));
				}

				setLoading(false);
			} catch (error) {
				console.error("Erro ao buscar dados do post:", error);
				toast.error("Erro ao carregar o post");
				setLoading(false);
			}
		};

		fetchPostData();
	}, [id, user, setUser]);

	const handleLike = async () => {
		setIsAlreadyLiked(true);
		setLiked(true);

		if (!isAlreadyLiked) {
			try {
				const postRef = ref(db, `/teste/${id}`);
				const updatedLikesCount = post.likes + 1;
				await update(postRef, { likes: updatedLikesCount });
				setPost({ ...post, likes: updatedLikesCount });
				const userRef = ref(db, `/users/${user.id}`);
				const authorRef = ref(db, `/users/${post.id}`);
				const updatedUserPoints = user.points + 1;
				const authorPoints = postUser.points + 1;
				const newLikedPost = [...(user.likedPosts || []), post.postid];
				await update(userRef, {
					...user,
					points: updatedUserPoints,
					likedPosts: newLikedPost,
				});
				await update(authorRef, { ...postUser, points: authorPoints });
				setUser({
					...user,
					points: updatedUserPoints,
					likedPosts: newLikedPost,
				});

				toast.success("Post curtido com sucesso!");
			} catch (error) {
				console.error("Erro ao curtir o post:", error);
				toast.error("Erro ao curtir o post");
			}
		} else {
			const postRef = ref(db, `/teste/${id}`);
			const updatedLikesCount = post.likes + 1;
			await update(postRef, { likes: updatedLikesCount });
			setPost({ ...post, likes: updatedLikesCount });
		}
	};

	const handleReport = () => {
		setReport(true);
	};

	const handleLinkCopy = () => {
		setCopy(true);
		const link = `https://use-community.vercel.app/${pathname}`;

		navigator.clipboard.writeText(link).then(() => {
			toast.success("Link do post copiado com sucesso!");
		});
	};

	return {
		post,
		handleLike,
		loading,
		postUser,
		isUserNotTheAuthor,
		isAlreadyLiked,
		liked,
		user,
		setPostUser,
		handleReport,
		report,
		handleLinkCopy,
		copy,
	};
}
