import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

async function fetchPosts(): Promise<Post[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

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