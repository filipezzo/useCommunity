import { useState } from "react";

export function useLayoutController() {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const handleDrawerClose = () => setIsDrawerOpen(false);
	const handleDrawerClick = () => setIsDrawerOpen((c) => !c);

	return {
		isDrawerOpen,
		handleDrawerClose,
		handleDrawerClick,
	};
}
