import { ref, update } from "firebase/database";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/hooks/useAuth";
import { db } from "../../../app/lib/firebase";
import { api } from "../../../app/utils/api";
import { InputLabel } from "../../components/InputLabel";
import { Layout } from "../../components/Layout";
import { Loader } from "../../components/Loader";

export function CreatePost() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const { user, setUser } = useAuth();
	const nav = useNavigate();
	console.log(user.points);
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
			username: user.username,
		};
		console.log(post);
		try {
			await api.post(`/teste.json`, post);
			const userRef = ref(db, `/users/${user.id}`);
			const points = +user.points + 5;

			await update(userRef, { ...user, points });
			setUser({ ...user, points });
			nav("/");
		} catch (e) {
			toast.error("Erro ao criar post");
			console.error(e);
		} finally {
			setIsLoading(false);
		}
	};
	return (
		<Layout>
			<main className="mx-auto h-full w-full max-w-5xl border-l border-r border-neutral-400 p-8">
				<form onSubmit={handleSubmit} className="flex h-full flex-col gap-8">
					<fieldset>
						<legend className="mb-4 text-3xl font-medium">
							Título do Post
						</legend>
						<InputLabel
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="bg-transparent text-white"
						/>
					</fieldset>
					<fieldset className="h-full flex-1 ">
						<legend className="mb-4 text-3xl font-medium">
							Conteúdo do Post
						</legend>
						<textarea
							className="h-full w-full flex-1 resize-none rounded-md bg-transparent p-3 outline-none ring-1 ring-white focus:ring-sky-500"
							value={content}
							onChange={(e) => setContent(e.target.value)}
						/>
					</fieldset>

					<button
						type="submit"
						className="text-medium  max-w-fit rounded-md bg-blue-500/70 px-4 py-2 transition-colors duration-300 hover:scale-105 hover:opacity-80"
					>
						{isLoading ? <Loader variant /> : "Publicar"}
					</button>
				</form>
			</main>
		</Layout>
	);
}

export default CreatePost;
