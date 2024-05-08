import { Heart } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useAuth } from "../../../app/hooks/useAuth";
import { api } from "../../../app/utils/api";
import { cn } from "../../../app/utils/cn";
import { textFormatted } from "../../../app/utils/textFormatted";
import { Loader } from "../../components/Loader";
import { PageLayout } from "../layout/PageLayout";
import { Comments } from "./components/Comments";

function PostPage() {
	const [posts, setPosts] = useState([]);
	const [isAlreadyLiked, setIsAlreadyLiked] = useState(false);
	const [loading, setLoading] = useState(false);

	const handleAlreadyLiked = () => setIsAlreadyLiked(true);

	const { id } = useParams();
	const arr = Object.values(posts);
	const filteredPost = arr?.filter((item) => item.postid === id);
	const post = filteredPost[0];
	console.log(post);

	const { user } = useAuth();
	const isUserNotTheAuthor = post && user.username !== post.username;

	const handleSetLikes = () => {
		try {
			console.log("dclick");
		} catch (e) {
			console.log(e);
			toast.error("Erro ao curtir o post");
		}
	};

	useEffect(() => {
		setLoading(true);
		const fetchPosts = async () => {
			try {
				const { data } = await api.get(`/teste.json`);
				setPosts(data);
			} catch (e) {
				toast.error("Erro ao carregar posts");
				console.log(e);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, []);

	if (loading) return <Loader />;

	return (
		<PageLayout>
			<div className=" max-h-fit min-h-[400px] w-full flex-1 rounded-xl bg-neutral-900/40 p-5 ">
				<section>
					{post && (
						<div>
							<header className="flex items-center gap-2">
								<img
									className="size-14 rounded-full object-cover"
									src={post.avatar}
									alt="foto de perfil"
								/>
								<strong>{post.username}</strong>
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
							<footer className="my-2 flex items-center justify-end gap-2">
								{isAlreadyLiked ? (
									<button>
										<Heart
											fill="#ff0000"
											size={18}
											className="cursor-not-allowed border-black"
										/>
									</button>
								) : (
									<button onClick={handleSetLikes}>
										<Heart />
									</button>
								)}
								<span>{post.likes}</span>
							</footer>
						</div>
					)}
				</section>
				<h2 className="my-4 text-xl font-semibold">Comentários</h2>

				{isUserNotTheAuthor && <Comments />}
			</div>
		</PageLayout>
	);
}

export default PostPage;
