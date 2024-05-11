import { ThumbsUp } from "lucide-react";

export function Likes({ onLike, isAlreadyLiked, liked, post }) {
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
					className="opacity-70 "
					disabled={isAlreadyLiked || liked}
					onClick={handleLikeClick}
				>
					<ThumbsUp
						className={isAlreadyLiked && "text-blue-500/70"}
						size={16}
					/>
				</button>
			</div>
		</>
	);
}
