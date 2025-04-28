import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SearchHeader() {

    const [searchValue, setSearchValue] = useState("");
    const [showSoldProperties, setShowSoldProperties] = useState(false);

    const navigate = useNavigate();

    const createUrlParams = () => {
        const params = new URLSearchParams();
    
        if (searchValue.trim()) { // Only add if not empty
            params.append('search', searchValue.trim());
        }
    
        if (showSoldProperties) {
            params.append('sold', true);
        }
        
        return `/properties?${params.toString()}`;
    }

    return (
        <section className='flex flex-col items-center gap-y-10 justify-center max-w-7xl mx-auto relative h-fit-content md:h-[25rem] p-4 pt-10'>
            <img src="https://www.keepmoat.com/cdn-cgi/image/format=webp,width=512/getmedia/620a4883-89ec-4681-bd96-e567d0f968e9/2-HeatonQuarter-Photo.jpg?width=1024&height=683&ext=.jpg" alt="" className='opacity-80 absolute w-full h-full inset-0 rounded-lg object-cover z-0'/>
            <div className='w-full z-[1] max-w-xl text-center'>
                <h1 className="text-2xl text-complement-deep font-semibold">believe in finding it</h1>
                <h2 className="text-lg font-medium text-white">with the UK&apos;s largest choice of homes</h2>
            </div>
            <div className='w-full z-[1] max-w-xl'>
                <div className="rounded-lg bg-primary px-5 py-5">
                    <h2 className="text-base font-semibold mb-4">Search properties for sale and to rent</h2>
                    <form 
                        className="flex flex-col"
                        onSubmit={(e) => {
                            e.preventDefault();
                            navigate(createUrlParams());
                        }}
                    >
                        <div className="flex flex-col md:flex-row gap-y-5 gap-x-5">
                        <input 
                            value={searchValue} 
                            onChange={(e) => setSearchValue(e.target.value)} 
                            className="rounded-lg px-3 py-4 lg:py-2 flex-1 w-full placeholder-shown:text-xs h-12" 
                            placeholder="eg. Rowlands Gill, NE39, or Semi-detached" 
                            type="text" 
                        />
                            <div className="grid md:flex md:flex-nowrap grid-cols-2 gap-x-5 justify-between md:justify-end flex-shrink-0">
                                <button 
                                    type="submit"
                                    className="flex items-center justify-center text-center px-4 py-3 md:py-1 rounded-lg text-sm font-medium bg-complement-medium hover:bg-complement-deep hover:text-white transition-colors duration-200"
                                >
                                For sale
                                </button>
                                <Link to={`/properties`} className="flex items-center justify-center text-center px-4 py-3 md:py-1 rounded-lg text-sm font-medium bg-complement-medium hover:bg-complement-deep hover:text-white transition-colors duration-200">
                                To rent
                                </Link>
                            </div>                            
                        </div>

                        <div className='w-full flex items-center gap-x-2 mt-3'>
                            <label className="block mb-0.5 text-xs font-medium text-gray-800">Show Sold Properties</label>
                            <input 
                                onChange={(e) => setShowSoldProperties(e.target.checked)} 
                                checked={showSoldProperties} 
                                type='checkbox' 
                                className='h-4 w-4 accent-complement-medium'
                            />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
