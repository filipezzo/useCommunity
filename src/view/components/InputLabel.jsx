import { cn } from "../../app/utils/cn";

export function InputLabel({ text, className, label, ...props }) {
	if (!label) {
		return (
			<input
				id={label}
				className={cn(
					"block h-10 w-full appearance-none rounded-md bg-white px-3 text-slate-900 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-500 sm:text-sm",
					className,
				)}
				name={label}
				{...props}
			/>
		);
	}

	return (
		<div className="flex flex-col gap-2">
			<label htmlFor={label}>{text}</label>
			<input
				id={label}
				className={cn(
					"block h-10 w-full appearance-none rounded-md bg-white px-3 text-slate-900 shadow-sm ring-1 ring-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 sm:text-sm",
					className,
				)}
				name={label}
				{...props}
			/>
		</div>
	);
}
