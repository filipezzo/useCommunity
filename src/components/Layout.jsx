import { Header } from "./Header";

export function Layout({ children }) {
	return (
		<div className="flex min-h-full w-full flex-col">
			<Header />
			{children}
		</div>
	);
}
