import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../app/lib/firebase";

export function useLoginController() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const nav = useNavigate();

	const handleLogin = async (e) => {
		e.preventDefault();
		if (!email || !password) {
			return toast.error("Por favor, preencha todos os campos");
		}
		setLoading(true);
		try {
			await signInWithEmailAndPassword(auth, email, password);
			nav("/");
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
	return {
		email,
		handleLogin,
		loading,
		setEmail,
		setPassword,
		password,
	};
}
