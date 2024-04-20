import { CircleFadingPlus, MessageCircle } from "lucide-react";
import avatar from "/profile7.svg";
export function Post() {
	return (
		<li className="group flex flex-col gap-2.5 border-neutral-700 bg-neutral-900/40 p-4 hover:cursor-pointer hover:opacity-80 md:rounded-md">
			<header className="flex items-center gap-1">
				<img src={avatar} className="size-10" />
				<h3>filipe</h3>
			</header>
			<h2 className="flex-1  text-xl font-medium duration-300 hover:cursor-pointer group-hover:text-blue-500/70">
				Como persistir data no React
			</h2>
			<ul className="flex items-center gap-1 text-sm">
				<li>#react</li>
				<li>#programacao</li>
				<li>#programacao</li>
			</ul>
			<footer className="flex items-center justify-between">
				<div className="flex items-end gap-2">
					<MessageCircle />
					<strong>0</strong>
				</div>

				<CircleFadingPlus />
			</footer>
		</li>
	);
}
