import { useEffect, useState } from "react";
import { Aside } from "../../components/Aside";
import { Layout } from "../../components/Layout";
import { Loader } from "../../components/Loader";
import { api } from "../../utils/api";
import { Post } from "./components/Post";
import { PostsList } from "./components/PostsList";
import { Topics } from "./components/Topics";
export function Home() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		setLoading(true);
		setError(null);

		const fetchPosts = async () => {
			try {
				const response = await api.get("/posts.json");
				if (response.status !== 200) {
					throw new Error("Algo deu errado ao buscar os posts");
				}
				setPosts(response.data);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		};

		fetchPosts();
	}, []);

	return (
		<Layout>
			<main className="mx-auto mt-4 flex w-full max-w-7xl md:p-4 xl:p-0">
				<Aside />
				<section className="flex w-full flex-col gap-5 pb-4  pt-4  md:ml-auto md:max-w-[1000px] md:flex-row">
					{loading && <Loader />}
					{error && <p className="text-xl text-rose-500">{error}</p>}
					<PostsList>
						{posts.length > 0 ? (
							posts.map((post) => <Post key={post.id} post={post} />)
						) : (
							<p>Sem posts</p>
						)}
					</PostsList>

					<Topics />
				</section>
			</main>
		</Layout>
	);
}
