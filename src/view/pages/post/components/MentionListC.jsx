export function MentionListC({ list }) {
	if (!list) return;

	return (
		<div className="rounded-md bg-neutral-900 p-4 text-blue-500/80">
			<div className="item-center flex gap-1 ">
				{list.map((item) => (
					<>
						<img src={item.avatar} className="size-6 rounded-full " />
						<small>{item.username}</small>
					</>
				))}
			</div>
		</div>
	);
}
