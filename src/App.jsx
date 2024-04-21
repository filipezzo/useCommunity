import { Route, Routes } from "react-router-dom";
import { Create } from "./pages/create/Create";
import { Home } from "./pages/home/Home";
import Login from "./pages/login/Login";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/cadastro" element={<Create />} />
			<Route path="/login" element={<Login />} />
		</Routes>
	);
}

export default App;
