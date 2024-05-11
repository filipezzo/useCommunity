import { MessageCircle, ThumbsUpIcon } from "lucide-react";
import { Link } from "react-router-dom";
import avatar from "/profile7.svg";
export function Post({ post }) {
	return (
		<li>
			<Link
				to={`/post/${post.postid}`}
				className="group flex flex-col gap-2.5 rounded-md border-neutral-700 bg-neutral-900/40 p-4 hover:cursor-pointer hover:opacity-80"
			>
				<header className="flex items-center gap-1.5">
					<img
						src={post.avatar || avatar}
						className="size-10  rounded-full object-cover"
					/>
					<h3>{post.username}</h3>
				</header>
				<h2 className="group-hover:effect flex-1  text-xl font-medium duration-300 hover:cursor-pointer group-hover:border-none  group-hover:bg-zinc-900/0 group-hover:text-transparent">
					{post.titulo}
				</h2>
				<ul className="flex items-center gap-1 text-sm">
					{post.tags.length > 0 &&
						post.tags.map((tag, index) => <li key={index}>{tag}</li>)}
				</ul>
				<footer className="flex items-center justify-between">
					<div className="flex items-end gap-2">
						<MessageCircle />
						<strong>
							{
								post?.comentarios.filter((item) => item && item.autor != "")
									.length
							}
						</strong>
					</div>

					<div className="flex  gap-2">
						{post.likes}
						<ThumbsUpIcon />
					</div>
				</footer>
			</Link>
		</li>
	);
}
