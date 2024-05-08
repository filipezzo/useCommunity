import { Badge } from "../../../components/Badge";

const items = [
	{
		id: 1,
		badge: <Badge elo={1250} />,
		award: "PC gamer",
		pts: 1250,
	},

	{
		id: 2,
		badge: <Badge elo={1000} />,
		award: "Samsung s24",
		pts: 1000,
	},

	{
		id: 3,
		badge: <Badge elo={750} />,
		award: "Ticket Rock in Rio",
		pts: 750,
	},

	{
		id: 4,
		badge: <Badge elo={500} />,
		award: "Ticket R$100,00",
		pts: 500,
	},

	{
		id: 5,
		badge: <Badge elo={250} />,
		award: "Ticket R$50,00",
		pts: 250,
	},
];

export function Table() {
	return (
		<div className="my-4 flex flex-col overflow-hidden  ">
			<table className="w-full table-auto">
				<thead className="bg-transparent">
					<tr>
						<th className="p-2 text-center">Patente</th>
						<th>Prêmio</th>
						<th>Pontos</th>
					</tr>
				</thead>
				<tbody className=" bg-transparent p-4">
					{items.map(({ id, award, badge, pts }) => (
						<tr key={id}>
							<td className="p-4 text-center">{badge}</td>
							<td className="p-4 text-center">{award}</td>
							<td className="p-4 text-center font-bold">{pts}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
