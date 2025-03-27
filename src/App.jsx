import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './App.css'

import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Navigation from './components/Navigation'
import DesignSystem from './pages/DesignSystem'
import ButtonPage from './pages/DesignSystem/ButtonPage'
import PropertyListing from './pages/PropertyListing';

import HomePage from './pages/HomePage';
import Properties from './pages/Properties';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';
import Dashboard from './pages/Admin/Dashboard';
import PropertiesDashboard from './pages/Admin/PropertiesDashboard';
import EstateAgentsDashboard from './pages/Admin/EstateAgentsDashboard';
import EditProperty from './pages/Admin/EditProperty';
import AddProperty from './pages/Admin/AddProperty';
import NotFound from './pages/NotFound';
import DummyPage from './pages/DummyPage';
import Login from './pages/User/Login';

function App() {
    const basename = import.meta.env.MODE === 'production' ? '/your-hoose' : '';
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
        console.log('scrolling')
    }, [pathname]);

    return (
        <>
            <div className='h-screen bg-neutral-light font-base overflow-x-hidden'>
                <Navigation />
                <main className='pb-10'>
                    <Routes basename={basename}>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/properties" element={<Properties />} />
                        <Route path="/properties/:id" element={<PropertyListing />} />
                        <Route path="/hold" element={<DummyPage />} />
                        <Route path="/design-system" element={<DesignSystem />} >
                            <Route path="button" element={<ButtonPage />} />
                        </Route>
                        <Route path="login" element={<Login />} />
                        <Route path="/admin" element={<AdminDashboard />} >
                            <Route path="dashboard" element={<Dashboard />} />
                            <Route path="properties" element={<PropertiesDashboard />} />
                            <Route path="estate-agents" element={<EstateAgentsDashboard />} />
                            <Route path="edit-property/:id" element={<EditProperty />} />
                            <Route path="add-property" element={<AddProperty />} />
                        </Route>
                        <Route path="*" element={<NotFound />} />
                    </Routes>                
                </main>
                <Footer />
            </div>            
        </>
    )
}

export default App
