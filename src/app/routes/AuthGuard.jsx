import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function AuthGuard({ isProtected }) {
	const { user } = useAuth();

	if (!user && isProtected) {
		return <Navigate to="/" replace />;
	}

	return <Outlet />;
}
