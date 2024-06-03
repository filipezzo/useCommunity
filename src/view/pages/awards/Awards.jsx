import { PageLayout } from "../layout/PageLayout";
import { Table } from "./components/Table";

export function Awards() {
	return (
		<PageLayout>
			<section className="mx-auto h-full min-h-[600px]  w-full max-w-[80ch]  rounded-xl  bg-zinc-900/40  p-8  xl:h-[700px]">
				<strong className="md:text-2xl">Prêmios</strong>
				<h2 className="my-4">
					No useCommunity você aprende, se conecta e ainda pode concorrer à
					prêmios. Evolua sua patente para concorrer a sorteios. Quanto maior o
					nvl maior o prêmio.
				</h2>
				<Table />
			</section>
		</PageLayout>
	);
}
