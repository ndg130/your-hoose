import { useEffect, createContext, useState } from "react";

export const EstateAgentsContext = createContext();

export const EstateAgentsProvider = ({ children }) => {
    const [estateAgents, setEstateAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchEstateAgents = async () => {
        setLoading(true);
        setError(null); // Reset error state on new fetch

        const endpoint = import.meta.env.VITE_API_ESTATE_AGENTS_ENDPOINT

        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            setEstateAgents(data["estate-agents"] || data);
        } catch (error) {
            console.error('Failed to fetch estate agents', error);
            setError(error.message); // Store error for UI handling
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEstateAgents();
    }, []);

    return (
        <EstateAgentsContext.Provider value={{ estateAgents, loading, error, setEstateAgents, fetchEstateAgents }}>
            {children}
        </EstateAgentsContext.Provider>
    );
};