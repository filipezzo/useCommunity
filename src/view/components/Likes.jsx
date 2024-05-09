import { ThumbsDown, ThumbsUp } from "lucide-react";
import { useState } from "react";

export function Likes({
	onDislike,
	onLike,
	isAlreadyLiked,

	liked,
	post,
}) {
	const [counter, setCounter] = useState(0);

	const handleDislikeClick = () => {
		onDislike();
		setCounter(0);
	};

	const handleLikeClick = () => {
		onLike();
		setCounter(1);
	};
	return (
		<>
			<span className="effect border-none text-lg  font-semibold  text-transparent">
				{post.likes}
			</span>
			<div className="flex items-center gap-4 ">
				<button
					className=" opacity-70"
					disabled={post.likes === 0 || counter === 0}
					onClick={handleDislikeClick}
				>
					<ThumbsDown size={16} />
				</button>

				<button
					className="opacity-70 "
					disabled={isAlreadyLiked && liked}
					onClick={handleLikeClick}
				>
					<ThumbsUp className={liked && "text-blue-500/70"} size={16} />
				</button>
			</div>
		</>
	);
}
