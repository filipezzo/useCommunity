import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./app/contexts/AuthContext";
import { Router } from "./app/routes/Router";

function App() {
	return (
		<AuthProvider>
			<Router />
			<Toaster />
		</AuthProvider>
	);
}

export default App;
