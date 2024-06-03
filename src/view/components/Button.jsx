import { cn } from "../../app/utils/cn";

export function Button({ children, className, ...rest }) {
	return (
		<button
			className={cn(
				"effect max-w-fit  rounded-md px-4 py-2 font-medium  transition-colors duration-300 hover:text-transparent",
				className,
			)}
			{...rest}
		>
			{children}
		</button>
	);
}
