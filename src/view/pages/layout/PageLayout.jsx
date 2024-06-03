import { cn } from "../../../app/utils/cn";
import { Aside } from "../../components/Aside";
import { Layout } from "../../components/Layout";
import { Topics } from "../home/components/Topics";
export function PageLayout({ children, className }) {
	return (
		<Layout>
			<main className="mx-auto mt-4 flex w-full max-w-7xl  md:p-4 xl:p-0">
				<Aside />
				<section
					className={cn(
						"flex w-full flex-col gap-5 p-4   md:max-w-[1000px] md:flex-row",
						className,
					)}
				>
					{children}

					<Topics />
				</section>
			</main>
		</Layout>
	);
}
