import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './App.css'
import { Route, Routes } from 'react-router-dom';


import Navigation from './components/Navigation'
import DesignSystem from './pages/DesignSystem'
import ButtonPage from './pages/DesignSystem/ButtonPage'
import PropertyListing from './pages/PropertyListing';

import HomePage from './pages/HomePage';
import Properties from './pages/Properties';
import Footer from './components/Footer';

function App() {

    return (
        <>
        <div className='h-screen bg-neutral-light font-base overflow-x-hidden'>
            <Navigation />
            <main className='pb-10'>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/properties" element={<Properties />} />
                    <Route path="/properties/:id" element={<PropertyListing />} />
                    <Route path="design-system" element={<DesignSystem />} >
                        <Route path="button" element={<ButtonPage />} />
                    </Route>
                </Routes>                
            </main>
            <Footer />
        </div>
    </>
    )
}

export default App
