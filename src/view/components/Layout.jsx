import { cn } from "../../app/utils/cn";
import { Header } from "./Header";

export function Layout({ children, className }) {
	return (
		<div className={cn("flex h-full w-full flex-col", className)}>
			<Header />

			{children}
		</div>
	);
}
