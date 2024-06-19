import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import PageLoader from "../../view/components/PageLoader";
import { auth } from "../lib/firebase";
import { api } from "../utils/api";

export const AuthContext = createContext({});

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const updateUser = async (firebaseUser) => {
		if (firebaseUser) {
			const { uid } = firebaseUser;
			try {
				const { data } = await api.get(`/users/${uid}.json`);
				setUser(data);
			} catch {
				toast.error("Erro ao buscar dados do usuário");
			} finally {
				setIsLoading(false);
			}
		} else {
			setUser(null);
			setIsLoading(false);
		}
	};

	useEffect(() => {
		setIsLoading(true);

		const unsub = onAuthStateChanged(auth, updateUser);

		return () => unsub();
	}, []);

	if (isLoading) {
		return <PageLoader />;
	}

	return (
		<AuthContext.Provider value={{ user, isLoading, setUser, updateUser }}>
			{children}
		</AuthContext.Provider>
	);
}
