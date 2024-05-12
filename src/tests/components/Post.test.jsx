import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { describe, expect, it } from "vitest";
import { Post } from "../../view/pages/home/components/Post";

const testPost = {
	avatar: "2",
	comentarios: ["test"],
	tags: ["", ""],
	conteudo: "test",
	likes: 1,
	postid: "test",
	titulo: "test",
	username: "user",
};

describe("Post", () => {
	it("Deve renderizar um post quando o recebe via props", () => {
		render(
			<BrowserRouter>
				<Post post={testPost} />
			</BrowserRouter>,
		);
		const image = screen.getByRole("img");

		expect(image).toBeInTheDocument();
	});
});
