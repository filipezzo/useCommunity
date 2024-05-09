import { ref, set, update } from "firebase/database";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/hooks/useAuth";
import { db } from "../../../app/lib/firebase";
import { Button } from "../../components/Button";
import { InputLabel } from "../../components/InputLabel";
import { Loader } from "../../components/Loader";
import { PageLayout } from "../layout/PageLayout";

export function CreatePost() {
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
			await update(userRef, { ...user, points });
			setUser({ ...user, points });
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
	return (
		<PageLayout>
			<section className="mx-auto h-full min-h-[600px]  w-full max-w-[80ch]  rounded-xl  bg-zinc-900/40  p-8 xl:h-[700px]">
				<form onSubmit={handleSubmit} className="flex h-full flex-col gap-8">
					<fieldset>
						<legend className="mb-4 text-xl font-medium">Título do Post</legend>
						<InputLabel
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="bg-transparent text-white"
						/>
					</fieldset>
					<fieldset className="h-full flex-1 ">
						<legend className="mb-4 text-xl font-medium">
							Conteúdo do Post
						</legend>
						<textarea
							className="h-full w-full flex-1 resize-none rounded-md bg-transparent p-3 outline-none ring-1 ring-white focus:ring-sky-500"
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
					</fieldset>

					<Button type="submit">{isLoading ? <Loader /> : "Publicar"}</Button>
				</form>
			</section>
		</PageLayout>
	);
}

export default CreatePost;
