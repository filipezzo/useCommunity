import { Flame, Home, User2 } from "lucide-react";

const navList = [
	{
		icon: <Home />,
		label: "Home",
	},

	{
		icon: <Flame />,
		label: "Popular",
	},

	{
		icon: <User2 />,
		label: "Perfil",
	},
];

export function Aside() {
	return (
		<aside className=" hidden md:ml-4  md:mt-12 md:block md:h-[500px]  md:w-full md:max-w-[200px]  md:rounded-md md:bg-neutral-900/40 md:p-5 xl:ml-0 xl:mt-8 xl:max-w-[250px]  ">
			<nav>
				<ul className="flex flex-col gap-5">
					{navList.map((item, index) => (
						<li
							className="flex cursor-pointer items-center gap-2 duration-300 hover:text-blue-500/70"
							key={index}
						>
							{item.icon}
							<span className="text-sm">{item.label}</span>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
}
