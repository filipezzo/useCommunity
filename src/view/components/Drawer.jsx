import {
	Badge,
	Home,
	LogInIcon,
	LogOut,
	PodcastIcon,
	User,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../app/hooks/useAuth";
import { auth } from "../../app/lib/firebase";
import { cn } from "../../app/utils/cn";

let active;

export function Drawer({ onClose }) {
	const ref = useRef(null);
	const { setUser, user } = useAuth();
	const { pathname } = useLocation();

	const isAuth = user !== null;
	const handleLogout = async () => {
		await auth.signOut();
		setUser(null);
	};

	const navList = [
		{
			icon: <Home />,
			label: "Home",
			link: "/",
		},

		isAuth && {
			icon: <PodcastIcon />,
			label: "Criar Post",
			link: "/criar",
		},

		{
			icon: <Badge />,
			label: "Prêmios",
			link: "/premios",
		},

		!isAuth && {
			icon: <User />,
			label: "Criar conta",
			link: "/cadastro",
		},

		!isAuth && {
			icon: <LogInIcon />,
			label: "Login",
			link: "/login",
		},

		isAuth && {
			icon: <LogOut />,
			label: "Sair",
		},
	].filter((item) => item);

	if (pathname === "/") {
		active = "Home";
	} else if (pathname === "/pontos") {
		active = "Pontos";
	} else if (pathname === "/criar") {
		active = "Criar Post";
	} else if (pathname === "/premios") {
		active = "Prêmios";
	}

	useEffect(() => {
		if (ref.current === null) return;

		const handleCloseModal = (e) => {
			const element = ref.current;

			if (element && !element.contains(e.target)) {
				onClose();
			}
		};

		document.addEventListener("pointerdown", handleCloseModal);

		return () => document.removeEventListener("pointerdown", handleCloseModal);
	}, []);
	return (
		<nav
			ref={ref}
			className=" bg-filter absolute bottom-0 left-0  flex h-screen  items-center justify-center"
		>
			<ul className="z-10 flex h-screen w-[200px] flex-col gap-5 bg-black p-5 ">
				{navList.map((item, index) => (
					<li key={index}>
						<Link
							onClick={item?.label === "Sair" ? handleLogout : null}
							to={item?.link}
							className={cn(
								"flex cursor-pointer items-center gap-2 transition-colors duration-300 hover:text-blue-500/70",
								active === item.label && "text-blue-500/70",
								item.label === "" && " border",
							)}
						>
							{item.icon}
							<span className="text-sm">{item.label}</span>
						</Link>
					</li>
				))}
			</ul>
		</nav>
	);
}
