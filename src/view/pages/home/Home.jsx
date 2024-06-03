import { Loader } from "../../components/Loader";
import NoUserBanner from "../../components/NoUserBanner";
import { useHomeController } from "../controllers/useHomeController";
import { PageLayout } from "../layout/PageLayout";
import { Post } from "./components/Post";
import { PostsList } from "./components/PostsList";

export function Home() {
	const { arr, loading, error, user } = useHomeController();
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
