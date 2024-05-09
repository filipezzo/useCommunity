import { get, ref, update } from "firebase/database";
import { ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../app/hooks/useAuth";
import { db } from "../../../app/lib/firebase";
import { cn } from "../../../app/utils/cn";
import { textFormatted } from "../../../app/utils/textFormatted";
import { Badge } from "../../components/Badge";
import { Likes } from "../../components/Likes";
import { Loader } from "../../components/Loader";
import { PageLayout } from "../layout/PageLayout";
import { Comments } from "./components/Comments";

function PostPage() {
	const [post, setPost] = useState(null);
	const [postUser, setPostUser] = useState(null);
	const [isAlreadyLiked, setIsAlreadyLiked] = useState(false);
	const [isAlreadyDisliked, setIsAlreadyDisliked] = useState(false);
	const [liked, setLiked] = useState(false);
	const [loading, setLoading] = useState(true);

	const { id } = useParams();
	const { user, setUser } = useAuth();
	const isUserNotTheAuthor = post && post.id !== user.id;

	useEffect(() => {
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

				setLoading(false);
			} catch (error) {
				console.error("Erro ao buscar dados do post:", error);
				toast.error("Erro ao carregar o post");
				setLoading(false);
			}
		};

		fetchPostData();
	}, [id]);

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
				await update(userRef, { points: updatedUserPoints });
				await update(authorRef, { ...postUser, points: authorPoints });
				setUser({ ...user, points: updatedUserPoints });

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

	const handleDislike = async () => {
		setLiked(false);
		setIsAlreadyDisliked(true);

		if (!isAlreadyDisliked) {
			try {
				const postRef = ref(db, `/teste/${id}`);
				const updatedLikesCount = post.likes - 1;
				await update(postRef, { likes: updatedLikesCount });
				setPost({ ...post, likes: updatedLikesCount });
			} catch (error) {
				console.error("Erro ao curtir o post:", error);
				toast.error("Erro ao curtir o post");
			}
		} else {
			const postRef = ref(db, `/teste/${id}`);
			const updatedLikesCount = post.likes - 1;
			await update(postRef, { likes: updatedLikesCount });
			setPost({ ...post, likes: updatedLikesCount });
		}
	};

	if (loading) return <Loader />;

	return (
		<PageLayout>
			<div className="max-h-fit min-h-[400px] w-full flex-1 rounded-xl bg-neutral-900/40 p-5 ">
				<section>
					{post && (
						<div className="flex flex-col">
							<header className="flex items-center gap-2">
								<img
									className="size-14 rounded-full object-cover"
									src={post.avatar}
									alt="foto de perfil"
								/>
								<strong>{post.username}</strong>
								<Badge className="mx-0 size-8" elo={postUser?.points} />
							</header>
							<h1 className="my-4 bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-4xl font-bold  text-transparent">
								{post.titulo}
							</h1>
							{textFormatted(post.conteudo).map((paragraph, index) => (
								<p
									className={cn(
										"my-1",
										paragraph.length < 40 && "my-2 font-semibold ",
									)}
									key={index}
								>
									{paragraph}
								</p>
							))}
							{isUserNotTheAuthor ? (
								<footer className="my-2 flex items-center justify-end gap-2 p-2">
									<Likes
										onLike={handleLike}
										onDislike={handleDislike}
										isAlreadyLiked={isAlreadyLiked}
										isAlreadyDisliked={isAlreadyDisliked}
										liked={liked}
										post={post}
									/>
								</footer>
							) : (
								<div className="  flex items-center gap-2 self-end ">
									<ThumbsUp size={16} />
									<span className=" effect border-none text-lg  font-semibold  text-transparent">
										{post?.likes}
									</span>
								</div>
							)}
						</div>
					)}
				</section>
				{isUserNotTheAuthor && (
					<Comments
						user={user}
						post={post}
						author={postUser}
						setAuthor={setPostUser}
					/>
				)}
			</div>
		</PageLayout>
	);
}

export default PostPage;
