import { Cpu } from "lucide-react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { InputLabel } from "../../components/InputLabel";
import { Loader } from "../../components/Loader";
import { useCreateController } from "../controllers/useCreateController";
import defaultProfile from "/profile7.svg";
export function Create() {
	const {
		handleRegister,
		avatar,
		handleAvatar,
		username,
		setUsername,
		email,
		password,
		setEmail,
		setPassword,
		loading,
	} = useCreateController();

	return (
		<>
			<main className="flex h-full w-full flex-col  items-center gap-8 p-4 xl:flex-row xl:justify-center xl:gap-16">
				<div className=" w-full max-w-3xl lg:order-2">
					<Cpu size={48} className="mx-auto" />
					<h1 className="my-4 text-center text-3xl font-medium text-blue-500/70 xl:text-4xl">
						Crie sua conta
					</h1>

					<form onSubmit={handleRegister} className="flex flex-col gap-4">
						<div className="mx-auto mt-4 flex size-32 items-center  justify-center rounded-full  border-2 border-neutral-500 xl:size-48">
							{avatar?.url ? (
								<img
									className=" size-28 rounded-full object-cover xl:size-44"
									src={avatar?.url || defaultProfile}
								/>
							) : (
								<label
									htmlFor="avatar"
									className="cursor-pointer text-base underline xl:text-xl"
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
							text="Nome"
							label="username"
							type="text"
							value={username}
							onChange={(e) => setUsername(e.target.value.trim())}
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
							min={6}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						{!loading && (
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
						)}

						<button
							disabled={loading}
							className="my-8 rounded-xl bg-blue-500/70 px-4 py-2 font-medium text-white duration-300 hover:scale-105 disabled:cursor-not-allowed  disabled:bg-blue-500/20"
						>
							{loading ? <Loader /> : "Criar conta"}
						</button>
					</form>
				</div>

				<div className=" hidden max-h-[700px]   overflow-hidden rounded-md    xl:order-1 xl:flex xl:w-1/2 xl:max-w-[600px] xl:justify-center ">
					<img
						className="h-full rounded-md object-cover  sepia "
						src="https://images.unsplash.com/photo-1579567761406-4684ee0c75b6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					/>
				</div>
			</main>
			<Toaster position="top-center" />
		</>
	);
}
