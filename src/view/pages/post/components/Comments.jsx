import { get, ref, update } from "firebase/database";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuth } from "../../../../app/hooks/useAuth";
import { db } from "../../../../app/lib/firebase";
import { Button } from "../../../components/Button";
import { Loader } from "../../../components/Loader";

export function Comments({ user, post, author, setAuthor }) {
	const [comment, setComment] = useState("");
	const [comments, setComments] = useState(post.comentarios);
	const [loading, setLoading] = useState(false);
	const { setUser } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!comment.trim()) return;
		setLoading(true);
		const newComment = {
			id: crypto.randomUUID(),
			autor: user.username,
			avatar: user.avatar,
			conteudo: comment,
		};

		try {
			const postRef = ref(db, `teste/${post.postid}`);
			const postSnapshot = await get(postRef);
			if (postSnapshot.exists()) {
				const updatedComments = [...(post.comentarios || []), newComment];
				await update(postRef, { ...post, comentarios: updatedComments });
				setComment("");
				setComments([...comments, newComment]);
				const userRef = ref(db, `/users/${user.id}`);
				const postUserRef = ref(db, `/users/${post.id}`);
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

	return (
		<section>
			<form onSubmit={handleSubmit} className="my-4 flex flex-col gap-2">
				<textarea
					onChange={(e) => setComment(e.target.value)}
					placeholder="Adicione seu comentário"
					value={comment}
					required
					className=" effect h-[200px] w-full resize-none rounded-md p-3 "
				/>
				<Button disabled={loading} className="mt-4" type="submit">
					{loading ? <Loader /> : "Enviar"}
				</Button>
			</form>
			<ul className="flex max-h-[360px] flex-col gap-4 overflow-y-scroll">
				<h2 className="my-4 text-xl font-semibold">Comentários</h2>
				{comments &&
					comments
						?.filter((item) => item && item.autor !== "")
						.map(({ id, autor, conteudo, avatar }) => (
							<li className="effect rounded-md" key={id}>
								<div className="flex flex-col gap-4 p-4">
									<div className="flex items-center gap-1.5 ">
										<img
											src={avatar}
											className="size-10  rounded-full object-cover"
										/>
										<h3>{autor}</h3>
									</div>
									{conteudo}
								</div>
							</li>
						))}
			</ul>
		</section>
	);
}
