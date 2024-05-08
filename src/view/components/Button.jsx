import { cn } from "../../app/utils/cn";

export function Button({ children, className, ...rest }) {
	return (
		<button
			className={cn(
				" max-w-fit rounded-md bg-blue-900/70 px-4 py-2 font-medium transition-colors duration-300 hover:opacity-90",
				className,
			)}
			{...rest}
		>
			{children}
		</button>
	);
}
