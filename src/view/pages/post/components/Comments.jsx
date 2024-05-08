import { Button } from "../../../components/Button";

export function Comments() {
	return (
		<form className="my-4 flex flex-col gap-2">
			<textarea
				placeholder="Adicione seu comentário"
				className=" h-[200px] w-full  resize-none rounded-md bg-transparent p-3 outline-none ring-1 ring-blue-500/70 focus:ring-sky-500"
			/>
			<Button type="submit">Enviar</Button>
		</form>
	);
}
