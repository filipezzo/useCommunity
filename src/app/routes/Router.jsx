import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Awards } from "../../view/pages/awards/Awards";
import { Create } from "../../view/pages/create/Create";
import { Home } from "../../view/pages/home/Home";
import Login from "../../view/pages/login/Login";
import CreatePost from "../../view/pages/post/CreatePost";
import PostPage from "../../view/pages/post/PostPage";
import { AuthGuard } from "./AuthGuard";

export function Router() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<AuthGuard isProtected={false} />}>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route path="/cadastro" element={<Create />} />
					<Route path="/premios" element={<Awards />} />
				</Route>

				<Route element={<AuthGuard isProtected />}>
					<Route path="/post/:id" element={<PostPage />} />
					<Route path="/criar" element={<CreatePost />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
