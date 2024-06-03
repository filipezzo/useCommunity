import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../app/hooks/useAuth";
import { auth, db } from "../../../app/lib/firebase";
import { upload } from "../../../app/lib/upload";

export function useCreateController() {
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

	const { setUser } = useAuth();

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
				id: createUser.user.uid,
				password,
				avatar: imgUrl,
				points: 0,
			});
			setUser({ ...createUser, avatar: imgUrl });
			toast.success("Conta criada com sucesso!");
			nav("/");
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

	return {
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
	};
}
