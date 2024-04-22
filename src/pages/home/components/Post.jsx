import { CircleFadingPlus, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import avatar from "/profile7.svg";
export function Post({ post }) {
	return (
		<li>
			<Link
				to={`/post/${post.id}`}
				className="group flex flex-col gap-2.5 rounded-md border-neutral-700 bg-neutral-900/40 p-4 hover:cursor-pointer hover:opacity-80"
			>
				<header className="flex items-center gap-1">
					<img src={avatar} className="size-10" />
					<h3>{post.username}</h3>
				</header>
				<h2 className="flex-1  text-xl font-medium duration-300 hover:cursor-pointer group-hover:text-blue-500/70">
					{post.titulo}
				</h2>
				<ul className="flex items-center gap-1 text-sm">
					{post.tags.length > 0 &&
						post.tags.map((tag, index) => <li key={index}>{tag}</li>)}
				</ul>
				<footer className="flex items-center justify-between">
					<div className="flex items-end gap-2">
						<MessageCircle />
						<strong>{post?.comentarios.length}</strong>
					</div>

					<CircleFadingPlus />
				</footer>
			</Link>
		</li>
	);
}
