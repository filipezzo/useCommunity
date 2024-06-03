import { cn } from "../../app/utils/cn";
import { useLayoutController } from "../pages/controllers/useLayoutController";
import { Drawer } from "./Drawer";
import { Header } from "./Header";

export function Layout({ children, className }) {
	const { handleDrawerClick, handleDrawerClose, isDrawerOpen } =
		useLayoutController();
	return (
		<div className={cn(" flex h-full w-full flex-col", className)}>
			<Header onDrawerClick={handleDrawerClick} />
			{isDrawerOpen && <Drawer onClose={handleDrawerClose} />}
			{children}
		</div>
	);
}
