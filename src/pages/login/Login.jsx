import { Cpu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { InputLabel } from "../../components/InputLabel";

export function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	return (
		<>
			<main className="mt-16 flex min-h-screen w-full flex-col items-center  p-4  ">
				<div className=" w-full max-w-3xl">
					<Cpu size={48} className="mx-auto" />
					<h1 className="my-4 text-center text-3xl font-medium text-blue-500/70 xl:text-4xl">
						Realize Login
					</h1>
					<form className="flex flex-col gap-4">
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
						<button className="my-8 rounded-xl bg-blue-500/70 px-4 py-2 font-medium text-white duration-300 hover:scale-105">
							Entrar
						</button>
					</form>
				</div>
			</main>
		</>
	);
}

export default Login;
