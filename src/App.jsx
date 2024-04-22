import { Route, Routes } from "react-router-dom";
import { useUserStore } from "./lib/userStore";
import { Create } from "./pages/create/Create";
import { Home } from "./pages/home/Home";
import Login from "./pages/login/Login";
import PostPage from "./pages/post/PostPage";
import { PrivateRoute } from "./routes/PrivateRoute";

function App() {
	const { currentUser } = useUserStore();
	console.log(currentUser);
	return (
		<Routes>
			<Route
				path="/"
				element={
					<PrivateRoute>
						<Home />
					</PrivateRoute>
				}
			/>
			<Route path="/cadastro" element={<Create />} />
			<Route path="/login" element={<Login />} />
			<Route
				path="/post/:id"
				element={
					<PrivateRoute>
						<PostPage />
					</PrivateRoute>
				}
			/>
		</Routes>
	);
}

export default App;
