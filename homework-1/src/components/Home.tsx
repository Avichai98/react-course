import { useState } from "react";

export default function Home() {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h1>Welcome to the Home Page</h1>
            <p>Current count: {count}</p>
            <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
            </button>
        </div>
    );
}