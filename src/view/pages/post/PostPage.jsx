import { ThumbsUp } from "lucide-react";
import { cn } from "../../../app/utils/cn";
import { textFormatted } from "../../../app/utils/textFormatted";
import { Badge } from "../../components/Badge";
import { Likes } from "../../components/Likes";
import { Loader } from "../../components/Loader";
import { usePostPageController } from "../controllers/usePostPageController";
import { PageLayout } from "../layout/PageLayout";
import { Comments } from "./components/Comments";

function PostPage() {
	const {
		post,
		handleLike,
		loading,
		postUser,
		isUserNotTheAuthor,
		isAlreadyLiked,
		liked,
		user,
		setPostUser,
	} = usePostPageController();

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
										isAlreadyLiked={isAlreadyLiked}
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

				<Comments
					user={user}
					post={post}
					author={postUser}
					setAuthor={setPostUser}
					isUserNotTheAuthor={isUserNotTheAuthor}
				/>
			</div>
		</PageLayout>
	);
}

export default PostPage;
