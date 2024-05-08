import { cn } from "../../app/utils/cn";

export function Loader({ className, variant = false }) {
	return (
		<div
			className={cn(
				"flex h-full w-full items-center justify-center",
				variant && "items-start justify-start",
			)}
		>
			<div
				className={cn(
					"size-5 animate-spin rounded-full border-r border-t-2 border-t-blue-500/70",
					className,
				)}
			/>
		</div>
	);
}
