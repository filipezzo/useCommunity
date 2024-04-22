import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { Cpu } from "lucide-react";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { InputLabel } from "../../components/InputLabel";
import { Loader } from "../../components/Loader";
import { auth } from "../../lib/firebase";
import { useUserStore } from "../../lib/userStore";

export function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const nav = useNavigate();
	const { currentUser, fetchUser } = useUserStore();
	console.log(currentUser);

	const handleLogin = async (e) => {
		e.preventDefault();
		if (!email || !password) {
			return toast.error("Por favor, preencha todos os campos");
		}
		setLoading(true);
		try {
			await signInWithEmailAndPassword(auth, email, password);
		} catch (error) {
			if (
				error.message.startsWith("Firebase: Error (auth/invalid-credential).")
			) {
				return toast.error("Email ou senha inválidos");
			}
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		const unsub = onAuthStateChanged(auth, async (user) => {
			await fetchUser(user?.uid);
			if (user?.uid) {
				nav("/");
			}
		});

		return () => {
			unsub();
		};
	}, [fetchUser, nav]);
	return (
		<>
			<main className="mt-8 flex min-h-screen w-full flex-col items-center  p-4  ">
				<div className=" w-full max-w-3xl">
					<Cpu size={48} className="mx-auto" />
					<h1 className="my-4 text-center text-3xl font-medium text-blue-500/70 xl:text-4xl">
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
						<div className="flex items-center justify-end">
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
							{loading ? <Loader variant /> : "Entrar"}
						</button>
					</form>
				</div>
			</main>
			<Toaster />
		</>
	);
}

export default Login;
