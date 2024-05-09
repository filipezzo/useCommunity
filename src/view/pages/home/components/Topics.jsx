import { Trophy } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../../../../app/utils/api";
import { Badge } from "../../../components/Badge";
import { Loader } from "../../../components/Loader";

export function Topics() {
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
	return (
		<section className="hidden overflow-hidden p-5 xl:block  xl:h-[700px] xl:w-full xl:max-w-[250px] xl:rounded-md xl:bg-neutral-900/40  ">
			<header className="mb-6 flex items-center  justify-between">
				<h2 className="text-xl">Ranking </h2>
				<Trophy size={20} />
			</header>
			{loading && <Loader variant />}
			<ul className="flex flex-col gap-6 ">
				{orderedByPoints &&
					orderedByPoints.map(({ id, points, username }, index) => (
						<li className="flex w-full items-center  justify-between " key={id}>
							<div className="flex flex-1 items-center gap-2">
								<span className="mr-1 text-blue-500/70">#{index + 1}</span>
								<strong className="max-w-[9ch] truncate ">{username}</strong>
							</div>
							<div className="flex w-fit items-center justify-center">
								<Badge elo={points} className="mx-0 size-8 flex-1 " />
							</div>
							<small className=" flex w-[60px] flex-1  justify-end  font-bold">
								{points} pts
							</small>
						</li>
					))}
			</ul>
		</section>
	);
}
