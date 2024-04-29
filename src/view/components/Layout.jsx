import { Header } from "./Header";

export function Layout({ children }) {
	return (
		<div className="flex h-full w-full flex-col">
			<Header />
			{children}
		</div>
	);
}
