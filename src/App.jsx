import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { Create } from "./pages/create/Create";
import { Home } from "./pages/home/Home";
import Login from "./pages/login/Login";

function App() {
	const { fetchUser } = useUserStore();
	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (user) => fetchUser(user?.uid));

		return () => unsub();
	}, [fetchUser]);

	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/cadastro" element={<Create />} />
			<Route path="/login" element={<Login />} />
		</Routes>
	);
}

export default App;
