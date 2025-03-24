import { useContext } from 'react';
import { PropertiesContext } from '../../context/properties';
import { EstateAgentsContext } from '../../context/estateAgents';
import DashboardLinkCard from '../../components/Admin/DashboardLinkCard';
import Sidebar from '../../components/Admin/Sidebar';

export default function Dashboard() {

    const { properties, loading: propertiesLoading, error: propertiesError } = useContext(PropertiesContext);
    const { estateAgents, loading: estateAgentsLoading, error: estateAgentsError } = useContext(EstateAgentsContext)

    return (
        <div>
            <Sidebar />
            <div className='flex-1 lg:ml-72 max-w-2xl sm:max-w-5xl lg:max-w-7xl w-full h-full py-10 px-4'>
                <h1 className='text-accent-dark'>Dashboard</h1>
                <div className='grid grid-cols-3 gap-5 mt-10'>
                    <DashboardLinkCard data={properties} dataType="properties" loading={propertiesLoading} to="/admin/properties"/>
                    <DashboardLinkCard data={estateAgents} dataType="estate agents" loading={estateAgentsLoading} to="/admin/estate-agents" />
                </div>
            </div>
        </div>
    )
}
