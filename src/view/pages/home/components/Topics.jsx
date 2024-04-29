import { Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../../app/utils/api";

export function Topics() {
	const [topRanking, setTopRanking] = useState([]);
	const ranks = Object.values(topRanking);
	const orderedByPoints = ranks.sort((a, b) => b.points - a.points);

	useEffect(() => {
		const fetchRanking = async () => {
			try {
				const { data } = await api.get(`/users.json`);
				setTopRanking(data);
			} catch (e) {
				console.error(e);
				toast.error("Erro Ao buscar ranking");
			}
		};
		fetchRanking();
	}, []);
	return (
		<section className=" hidden overflow-hidden md:block md:h-[500px] md:max-w-[200px] md:rounded-md md:bg-neutral-900/40 md:p-5 xl:w-full xl:max-w-[250px] 2xl:max-w-[300px]">
			<header className="mb-6 flex items-center  justify-between">
				<h2 className="text-xl">Ranking </h2>
				<Trophy size={20} />
			</header>

			<ul className="flex flex-col gap-6 ">
				{orderedByPoints &&
					orderedByPoints.map(({ id, points, username }, index) => (
						<li className="flex items-center justify-between" key={id}>
							<strong>
								<span className="mr-1 text-blue-500/70">#{index + 1}</span>
								{username}
							</strong>
							<small className="font-bold">{points} pts</small>
						</li>
					))}
			</ul>
		</section>
	);
}
