import { useIsFetching } from '@tanstack/react-query';
import { Outlet } from 'react-router-dom';

export function Layout() {
    const isFetching = useIsFetching();

    return (
        <div className="container">
            <header>
                <h1>My Posts</h1>
                {isFetching > 0 && <div className="fetching-indicator">Fetching...</div>}
            </header>
            <main>
                <Outlet />
            </main>
        </div>
    );
}