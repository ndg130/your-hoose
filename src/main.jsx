import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { PropertiesProvider } from './context/properties.jsx'
import { EstateAgentsProvider } from './context/estateAgents.jsx'
import { AuthProvider } from './context/authContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <PropertiesProvider>
            <EstateAgentsProvider>
                <AuthProvider>
                    <App />     
                </AuthProvider>
            </EstateAgentsProvider>          
        </PropertiesProvider>
    </BrowserRouter>
  </StrictMode>,
)
