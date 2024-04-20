import { Topic } from "./Topic";

export function Topics() {
	return (
		<section className=" hidden md:block md:h-[500px] md:max-w-[200px] md:rounded-md md:bg-neutral-900/40 md:p-5 xl:w-full xl:max-w-[250px] 2xl:max-w-[300px]">
			<h2 className="mb-6 text-xl">Topicos em alta</h2>
			<ul className="flex flex-col gap-6 ">
				<Topic />
				<Topic />
				<Topic />
				<Topic />
				<Topic />
			</ul>
		</section>
	);
}
