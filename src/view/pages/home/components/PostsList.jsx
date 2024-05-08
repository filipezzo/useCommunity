export function PostsList({ children }) {
	return (
		<ul className="flex h-full flex-1 flex-col gap-4   p-4 md:p-0 xl:h-[700px] ">
			{children}
		</ul>
	);
}
