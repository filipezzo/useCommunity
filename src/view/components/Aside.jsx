import { Flame, Home, LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../app/hooks/useAuth";
import { auth } from "../../app/lib/firebase";

const navList = [
	{
		icon: <Home />,
		label: "Home",
		link: "/",
	},

	{
		icon: <Flame />,
		label: "Popular",
	},

	{
		icon: <User2 />,
		label: "Perfil",
	},

	{
		icon: <LogOut />,
		label: "Sair",
	},
];

export function Aside() {
	const { user, setUser } = useAuth();
	console.log(user);
	const handleLogout = async () => {
		await auth.signOut();
		setUser(null);
		console.log("oi");
	};
	return (
		<aside className=" hidden md:ml-4 md:mr-4  md:mt-4 md:block md:h-[500px]  md:w-full md:max-w-[200px]  md:rounded-md md:bg-neutral-900/40 md:p-5 xl:ml-0 xl:max-w-[250px]  ">
			<nav>
				<ul className="flex flex-col gap-5">
					{navList.map((item, index) => (
						<li key={index}>
							<Link
								onClick={item?.label === "Sair" ? handleLogout : null}
								to={item?.link}
								className="flex cursor-pointer items-center gap-2 duration-300 hover:text-blue-500/70"
							>
								{item.icon}
								<span className="text-sm">{item.label}</span>
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</aside>
	);
}
