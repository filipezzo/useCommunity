import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../lib/userStore";

export function PrivateRoute({ children }) {
	const { currentUser } = useUserStore();
	const nav = useNavigate();

	useEffect(() => {
		if (currentUser === null) {
			nav("/login", { replace: true });
		}
	}, [currentUser, nav]);

	return children;
}
