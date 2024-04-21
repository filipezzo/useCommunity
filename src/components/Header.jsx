import { Cpu, Menu, Search } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export function Header() {
	const { pathname } = useLocation();
	const isHome = pathname === "/";
	return (
		<header className="sticky gap-4 border-b border-neutral-400 p-4 ">
			<div className=" mx-auto flex w-full max-w-7xl items-center justify-between ">
				<div className="flex items-center gap-5">
					<Menu className="cursor-pointer md:hidden" />
					<Cpu />
					<div className="hidden gap-2 px-2 py-1 ring-1 ring-blue-500/70 xl:flex xl:w-[500px] xl:items-center xl:justify-center xl:rounded-md xl:border-none">
						<input
							className="flex-1 bg-transparent outline-none"
							placeholder="Pesquise..."
						/>
						<Search size={16} />
					</div>
				</div>

				<div className="flex items-center gap-5">
					<Search className="cursor-pointer xl:hidden" />
					{isHome ? (
						<Link
							to="/cadastro"
							className="rounded-md border border-blue-500/70  px-4 py-2 text-blue-500/70 duration-300 focus-within:bg-blue-500/70 focus-within:text-white hover:bg-blue-500/70 hover:text-white"
						>
							Criar conta
						</Link>
					) : (
						<Link
							to="/"
							className="rounded-md border border-blue-500/70  px-4 py-2 text-blue-500/70 duration-300 focus-within:bg-blue-500/70 focus-within:text-white hover:bg-blue-500/70 hover:text-white"
						>
							Home
						</Link>
					)}
				</div>
			</div>
		</header>
	);
}
