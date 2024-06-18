import { Button } from "../../../components/Button";
import { Loader } from "../../../components/Loader";
import { useCommentsController } from "../../controllers/useCommentsController";
import { MentionListC } from "./MentionListC";

export function Comments({
	user,
	post,
	author,
	setAuthor,
	isUserNotTheAuthor,
}) {
	const {
		comment,
		comments,
		loading,
		handleSubmit,
		handleChange,
		showUsersFromComment,
		mentionList,
	} = useCommentsController({ post, user, author, setAuthor });

	return (
		<section>
			{isUserNotTheAuthor && (
				<form onSubmit={handleSubmit} className="my-4 flex flex-col gap-2">
					<textarea
						onChange={handleChange}
						placeholder="Adicione seu comentário"
						value={comment}
						required
						className=" effect h-[200px] w-full resize-none rounded-md p-3 "
					/>
					{showUsersFromComment && mentionList && (
						<MentionListC list={mentionList} />
					)}
					<Button disabled={loading} className="mt-4" type="submit">
						{loading ? <Loader /> : "Enviar"}
					</Button>
				</form>
			)}
			<ul className="flex max-h-[360px] flex-col gap-4 overflow-y-scroll">
				<h2 className="my-4 text-xl font-semibold">Comentários</h2>
				{comments &&
					comments
						?.filter((item) => item && item.autor !== "")
						.map(({ id, autor, conteudo, avatar }) => (
							<li key={id}>
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
