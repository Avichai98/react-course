export interface PostData {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export async function fetchPostById(id: string): Promise<PostData> {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export async function fetchPosts(): Promise<Post[]> {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}