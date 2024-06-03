export function textFormatted(text) {
	const paragraphs = text.split("\n").filter((item) => item.trim() !== "");

	return paragraphs;
}
