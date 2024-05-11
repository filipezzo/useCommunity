import { useEffect, useState } from "react";
import { useAuth } from "../../../app/hooks/useAuth";
import { api } from "../../../app/utils/api";
import { Loader } from "../../components/Loader";
import NoUserBanner from "../../components/NoUserBanner";
import { PageLayout } from "../layout/PageLayout";
import { Post } from "./components/Post";
import { PostsList } from "./components/PostsList";

export function Home() {
	const [posts, setPosts] = useState({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const arr = Object.values(posts).sort((a, b) => {
		return b.likes - a.likes;
	}, 0);

	const { user } = useAuth();

	useEffect(() => {
		setLoading(true);
		setError(null);

		const fetchPosts = async () => {
			try {
				const response = await api.get("/teste.json");
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
		<PageLayout>
			{loading && <Loader />}

			<PostsList>
				{!user && !loading && <NoUserBanner />}
				{arr?.length > 0 ? (
					arr.map((post) => (
						<Post key={`${post.id} ${Math.random() * 100}`} post={post} />
					))
				) : (
					<p>Sem posts</p>
				)}
			</PostsList>

			{error && <p className="text-xl text-rose-500">{error}</p>}
		</PageLayout>
	);
}

export default Home;
