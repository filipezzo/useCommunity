export function Loader({ variant = false }) {
	return (
		<div className="flex h-full w-full items-center justify-center">
			<div
				className={`animate-spin rounded-full border-r border-t-2 border-t-blue-500/70 ${variant ? "size-6" : "size-20 "}`}
			/>
		</div>
	);
}
