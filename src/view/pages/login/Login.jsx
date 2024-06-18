import { Cpu } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { InputLabel } from "../../components/InputLabel";
import { Loader } from "../../components/Loader";
import { useLoginController } from "../controllers/useLoginController";

export function Login() {
	const { email, password, handleLogin, loading, setEmail, setPassword } =
		useLoginController();

	return (
		<>
			<main className="mt-8 flex h-full w-full flex-col items-center gap-8 p-4  lg:flex-row lg:items-center lg:justify-center xl:gap-16 ">
				<div className=" w-full max-w-3xl   lg:w-1/2">
					<Cpu size={48} className="mx-auto" />
					<h1 className="my-4 text-center text-3xl font-medium text-blue-500/70 lg:text-4xl">
						Realize Login
					</h1>
					<form onSubmit={handleLogin} className="flex flex-col gap-4">
						<InputLabel
							text="Email"
							label="email"
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<InputLabel
							text="Senha"
							label="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<div className="flex items-center justify-between">
							<Link
								className="text-sm underline duration-300 hover:text-blue-500/70 focus:text-blue-500/70"
								to="/"
							>
								Voltar
							</Link>
							<Link
								className="text-sm underline duration-300 hover:text-blue-500/70 focus:text-blue-500/70"
								to="/cadastro"
							>
								Criar uma conta
							</Link>
						</div>
						<button
							type="submit"
							disabled={loading}
							className="my-8 rounded-xl bg-blue-500/70 px-4 py-2 font-medium text-white duration-300 hover:scale-105"
						>
							{loading ? <Loader /> : "Entrar"}
						</button>
					</form>
				</div>
				<div className=" hidden max-h-[700px]   overflow-hidden rounded-md    xl:flex xl:w-1/2 xl:max-w-[600px] xl:justify-center ">
					<img
						className="h-full rounded-md object-cover  sepia "
						src="https://images.unsplash.com/photo-1579567761406-4684ee0c75b6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					/>
				</div>
			</main>
			<Toaster />
		</>
	);
}

export default Login;
