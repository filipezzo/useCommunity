import { Cpu, Menu, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../app/hooks/useAuth";
import { Button } from "./Button";
import avatar from "/profile7.svg";

export function Header() {
	const { user } = useAuth();
	const { pathname } = useLocation();
	const isHome = pathname === "/";
	return (
		<header className="sticky gap-4 border-b border-neutral-400 p-4 ">
			<div className=" mx-auto flex w-full max-w-[1200px] items-center justify-between ">
				<div className="flex items-center gap-5">
					<Menu className="cursor-pointer md:hidden" />
					<Link to="/">
						<Cpu />
					</Link>

					{isHome && user && (
						<div className="md:effect hidden gap-2 px-2 py-1 md:border xl:ml-[180px] xl:flex xl:w-[698px] xl:items-center xl:justify-center xl:rounded-md ">
							<input
								className="flex-1 bg-transparent outline-none"
								placeholder="Pesquise..."
							/>
							<Search size={16} />
						</div>
					)}
				</div>

				<div className="flex items-center gap-5">
					<Search className="cursor-pointer xl:hidden" />

					{user && (
						<Button>
							<Link to="/criar">Criar Post</Link>
						</Button>
					)}

					{user ? (
						<div className="size-10 ">
							<img
								className="h-full w-full rounded-full object-cover"
								src={user.avatar ?? avatar}
								alt="foto de perfil"
							/>
						</div>
					) : (
						<Button>
							<Link to="/cadastro">Criar conta</Link>
						</Button>
					)}
				</div>
			</div>
		</header>
	);
}
