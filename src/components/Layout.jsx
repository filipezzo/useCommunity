import { Aside } from "./Aside";
import { Header } from "./Header";

export function Layout({ children }) {
	return (
		<div className="flex min-h-full w-full flex-col  ">
			<Header />
			<section className=" md:mx-auto md:flex  md:w-full md:max-w-7xl ">
				<Aside />
				{children}
			</section>
		</div>
	);
}
