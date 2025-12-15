import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { fetchPosts } from "./api/posts";




export function Posts() {
    const { data, error, isLoading } = useQuery({ queryKey: ['posts'], queryFn: fetchPosts });

    if (isLoading) return <div>Loading posts...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

    return (
        <ul>
            {data?.map((post) => (
                <li key={post.id}><Link to={`/posts/${post.id}`}>{post.title}</Link></li>
            ))}
        </ul>
    );
}