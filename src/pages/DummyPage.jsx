import React from 'react'
import SimpleHeader from '../components/SimpleHeader'
import ContentLinkCard from '../components/ContentLinkCard'
export default function DummyPage() {
    return (
        <div>
            <div className='pb-10 min-h-screen'>
                <SimpleHeader 
                    headerText="Dummy Page" 
                    style="light" 
                    backgroundImage="https://mr2.homeflow-assets.co.uk/files/site_asset/image/3738/7309/_x_/Home_propertyA.jpg"
                />
                <div className='py-20 px-4'>
                    <h2 className='text-3xl text-center mb-3 text-complement-deep font-semibold max-w-3xl mx-auto'>You've found our dummy page</h2>
                    <p className='max-w-3xl text-center mx-auto'>This is a test page for our ongoing project. While there is no content on this page, feel free to explore the rest of the website to see the features and design we are working on. We hope you are enjoying what you see!</p>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto mt-10'>
                        <ContentLinkCard 
                            to={"/"} 
                            header="Home page" 
                            description="Check out our landing page"
                            linkText="View the home page"
                            
                        />
                        <ContentLinkCard 
                            to={"/properties"} 
                            header="Local properties" 
                            description="See what properties are for sale in NE39"
                            linkText="Take a look"
                            
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
