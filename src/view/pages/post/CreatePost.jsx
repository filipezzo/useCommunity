import { Button } from "../../components/Button";
import { InputLabel } from "../../components/InputLabel";
import { Loader } from "../../components/Loader";
import { useCreatePostController } from "../controllers/useCreatePostController";
import { PageLayout } from "../layout/PageLayout";

export function CreatePost() {
	const { title, handleSubmit, setTitle, setContent, isLoading, content } =
		useCreatePostController();
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
