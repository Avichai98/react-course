import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchPostById } from "./api/posts";

export function Post() {
    const { id } = useParams<{ id: string }>();

    const { data, error, isLoading } = useQuery({
        queryKey: ['post', id],
        queryFn: () => fetchPostById(id!),
        enabled: !!id, // The query will not run until the id exists.
    });

    if (isLoading) return <div>Loading post...</div>;
    if (error) return <div>An error occurred: {error.message}</div>;

    return (
        <article>
            <h2>{data?.title}</h2>
            <p>{data?.body}</p>
        </article>
    );
}