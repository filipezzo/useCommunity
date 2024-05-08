import { cn } from "../../app/utils/cn";
import badge4 from "../assets/Level4.svg";
import badge5 from "../assets/Level5.svg";
import badge6 from "../assets/Level6.svg";
import badge7 from "../assets/Level7.svg";
import badge8 from "../assets/Level8.svg";

export function Badge({ elo, className }) {
	let src = badge4;

	if (elo >= 250 && elo < 500) {
		src = badge4;
	} else if (elo === 500 && elo < 750) {
		src = badge5;
	} else if (elo === 750 && elo < 1000) {
		src = badge6;
	} else if (elo === 1000 && elo < 1250) {
		src = badge7;
	} else if (elo >= 1250) {
		src = badge8;
	}

	return (
		<img
			className={cn("mx-auto size-16", className)}
			src={src}
			alt="img da badge"
		/>
	);
}
