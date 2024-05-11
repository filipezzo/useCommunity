import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../app/utils/api";

export function useRankingController() {
	const [topRanking, setTopRanking] = useState([]);
	const [loading, setLoading] = useState(false);
	const ranks = Object.values(topRanking);
	const orderedByPoints = ranks.sort((a, b) => b.points - a.points);

	useEffect(() => {
		const fetchRanking = async () => {
			setLoading(true);
			try {
				const { data } = await api.get(`/users.json`);
				setTopRanking(data);
			} catch (e) {
				console.error(e);
				toast.error("Erro Ao buscar ranking");
			} finally {
				setLoading(false);
			}
		};
		fetchRanking();
	}, []);

	return { loading, orderedByPoints, topRanking };
}
