import { Layout } from "../../components/Layout";
import { Post } from "./components/Post";
import { PostsList } from "./components/PostsList";
import { Topics } from "./components/Topics";

export function Home() {
	return (
		<Layout>
			<main className="mx-auto mt-4 flex w-full max-w-7xl md:p-4 xl:p-0">
				<section className="flex w-full flex-col gap-5 pb-4  pt-4  md:ml-auto md:max-w-[1000px] md:flex-row">
					<PostsList>
						<Post />
						<Post />
						<Post />
						<Post />
						<Post />
						<Post />
						<Post />
						<Post />
						<Post />
						<Post />
					</PostsList>

					<Topics />
				</section>
			</main>
		</Layout>
	);
}
