import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { Cpu } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { InputLabel } from "../../components/InputLabel";
import { Loader } from "../../components/Loader";
import { auth, db } from "../../lib/firebase";
import { upload } from "../../lib/upload";
import defaultProfile from "/profile7.svg";
export function Create() {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [avatar, setAvatar] = useState({
		file: null,
		url: "",
	});
	const [loading, setLoading] = useState(false);

	const nav = useNavigate();

	const handleAvatar = (e) => {
		if (e.target.files[0]) {
			setAvatar({
				file: e.target.files[0],
				url: URL.createObjectURL(e.target.files[0]),
			});
		}
	};

	const handleRegister = async (e) => {
		e.preventDefault();
		setLoading(true);

		if (!username || !email || !password || !avatar) {
			setLoading(false);
			return toast.error("Por favor, preencha todos os campos");
		}

		try {
			const imgUrl = await upload(avatar.file);
			const createUser = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);

			await set(ref(db, `users/${createUser.user.uid}`), {
				username,
				email,
				password,
				avatar: imgUrl,
				points: 0,
			});

			toast.success("Conta criada com sucesso");
			setTimeout(() => {
				nav("/login");
			}, 1500);
		} catch (error) {
			if (error.message === "file is null") {
				return toast.error("Por favor, adicione um Avatar");
			} else if (error.message.startsWith("Firebase: Password should be")) {
				return toast.error("Sua senha deve conter pelo menos 6 caracteres ");
			} else if (
				error.message.startsWith("Firebase: Error (auth/email-already-in-use)")
			) {
				return toast.error("Usuário ou email já em uso.");
			}
			toast.error(error.message);
		} finally {
			setLoading(false);
			clearInterval;
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
							text="Usuário"
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

						<button
							disabled={loading}
							className="my-8 rounded-xl bg-blue-500/70 px-4 py-2 font-medium text-white duration-300 hover:scale-105 disabled:cursor-not-allowed  disabled:bg-blue-500/20"
						>
							{loading ? <Loader variant /> : "Criar conta"}
						</button>
					</form>
				</div>
			</main>
			<Toaster position="top-center" />
		</>
	);
}
