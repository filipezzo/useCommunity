import { useEffect, useState } from "react";
import { useAuth } from "../../../app/hooks/useAuth";
import { api } from "../../../app/utils/api";

export function useHomeController() {
	const [posts, setPosts] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const arr = Object.values(posts).sort((a, b) => {
		return b.likes - a.likes;
	}, 0);

	const { user } = useAuth();

	useEffect(() => {
		setLoading(true);
		setError(null);

		const fetchPosts = async () => {
			try {
				const response = await api.get("/teste.json");
				if (response.status !== 200) {
					throw new Error("Algo deu errado ao buscar os posts");
				}
				setPosts(response.data);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, []);
	return {
		loading,
		user,
		arr,
		error,
	};
}
