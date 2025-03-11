import { useEffect, createContext, useState } from "react";

export const PropertiesContext = createContext();

export const PropertiesProvider = ({ children }) => {
    const [properties, setProperties] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchProperties = async () => {
        setLoading(true);
        setError(null); // Reset error state on new fetch

        const endpoint = import.meta.env.VITE_API_PROPERTIES_ENDPOINT;

        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            setProperties(data.properties || data);
        } catch (error) {
            console.error('Failed to fetch properties', error);
            setError(error.message); // Store error for UI handling
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    return (
        <PropertiesContext.Provider value={{ properties, loading, error, setProperties, fetchProperties }}>
            {children}
        </PropertiesContext.Provider>
    );
};