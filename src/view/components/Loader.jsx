import { cn } from "../../app/utils/cn";

export function Loader({ className }) {
	return (
		<div className="flex h-full w-full items-center justify-center">
			<div
				className={cn(
					"size-5 animate-spin rounded-full border-r border-t-2 border-t-blue-500/70",
					className,
				)}
			/>
		</div>
	);
}
