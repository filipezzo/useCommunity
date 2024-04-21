import { Cpu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { InputLabel } from "../../components/InputLabel";
import defaultProfile from "/profile7.svg";
export function Create() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [avatar, setAvatar] = useState({
		file: null,
		url: "",
	});

	const handleAvatar = (e) => {
		if (e.target.files[0]) {
			setAvatar({
				file: e.target.files[0],
				url: URL.createObjectURL(e.target.files[0]),
			});
		}
	};

	return (
		<>
			<main className="flex min-h-screen w-full flex-col  items-center p-4">
				<div className=" w-full max-w-3xl">
					<Cpu size={48} className="mx-auto" />
					<h1 className="my-4 text-center text-3xl font-medium text-blue-500/70 xl:text-4xl">
						Crie sua conta
					</h1>
					<form className="flex flex-col gap-4">
						<div className="mx-auto mt-4 flex size-48  items-center justify-center  rounded-full border-2 border-neutral-500">
							{avatar?.url ? (
								<img
									className="size-44 rounded-full object-cover"
									src={avatar?.url || defaultProfile}
								/>
							) : (
								<label
									htmlFor="avatar"
									className="cursor-pointer text-xl underline"
								>
									Avatar
								</label>
							)}
							<input
								id="avatar"
								onChange={handleAvatar}
								type="file"
								className="hidden"
								name="avatar"
							/>
						</div>
						<InputLabel
							text="Usuário"
							label="username"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
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
								to="/login"
							>
								Já tenho uma conta
							</Link>
						</div>
						<button className="my-8 rounded-xl bg-blue-500/70 px-4 py-2 font-medium text-white duration-300 hover:scale-105">
							Criar Conta
						</button>
					</form>
				</div>
			</main>
		</>
	);
}
