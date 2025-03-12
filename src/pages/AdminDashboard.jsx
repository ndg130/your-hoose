import { Link, Outlet, useLocation } from 'react-router-dom'
export default function AdminDashboard() {
    const location = useLocation(); // Get current route

    const isBaseRoute = location.pathname === "/admin"; // Check if we're on the main page

    return (
        <div className=''>
            {isBaseRoute && (
                <>
                    <h1>Admin Dashboard</h1>
                    <nav>
                        <ul className='grid grid-cols-2 md:grid-cols-3 gap-5'>
                        
                        </ul>
                    </nav>
                </>
            )}

            {/* This ensures only child routes show when navigating deeper */}
            <Outlet />
        </div>
    );
}
