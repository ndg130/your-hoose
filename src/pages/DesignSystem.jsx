import { Link, Outlet, useLocation } from 'react-router-dom'
import ComponentNavItem from '../components/Design System/ComponentNavItem';
export default function DesignSystem() {
    const location = useLocation(); // Get current route

    const isBaseRoute = location.pathname === "/design-system"; // Check if we're on the main page

    return (
        <div className='max-w-7xl mx-auto px-6'>
            {isBaseRoute && (
                <>
                    <h1>Design System</h1>
                    <nav>
                        <ul className='grid grid-cols-2 md:grid-cols-3 gap-5'>
                            <ComponentNavItem 
                                text='Button'
                                image='https://www.garrington.co.uk/wp-content/uploads/2023/02/London-Suburbs-Wimbledon-1024x647.jpg'
                                link='button'
                            />
                            <ComponentNavItem 
                                text='Header'
                                image='https://www.garrington.co.uk/wp-content/uploads/2023/02/London-Suburbs-Wimbledon-1024x647.jpg'
                                link='header'
                            />                            
                        </ul>
                    </nav>
                </>
            )}

            {/* This ensures only child routes show when navigating deeper */}
            <Outlet />
        </div>
    );
}
