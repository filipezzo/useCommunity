import { useParams } from "react-router-dom";

function PostPage() {
	const { id } = useParams();
	return <div>PostPage</div>;
}

export default PostPage;
