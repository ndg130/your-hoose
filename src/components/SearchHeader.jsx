import Button from "./Button"
export default function SearchHeader() {
  return (
    <section className='flex flex-col items-center gap-y-10 justify-center max-w-5xl mx-auto relative h-fit-content md:h-[25rem] p-4 pt-10'>
        <img src="https://www.keepmoat.com/cdn-cgi/image/format=webp,width=512/getmedia/620a4883-89ec-4681-bd96-e567d0f968e9/2-HeatonQuarter-Photo.jpg?width=1024&height=683&ext=.jpg" alt="" className='opacity-80 absolute w-full h-full inset-0 rounded-lg object-cover z-0'/>
        <div className='w-full z-[1] max-w-xl text-center'>
            <h1 className="text-2xl text-complement-deep font-semibold">believe in finding it</h1>
            <h2 className="text-lg font-medium text-white">with the UK&apos;s largest choice of homes</h2>
        </div>
        <div className='w-full z-[1] max-w-xl'>
            <div className="rounded-lg bg-primary px-5 py-5">
                <h2 className="text-base font-semibold mb-4">Search properties for sale and to rent</h2>
                <div className="flex flex-col md:flex-row gap-y-5 gap-x-5">
                    <input className="rounded-lg px-3 py-4 lg:py-2 flex-1 w-full placeholder-shown:text-xs h-12" placeholder="eg. Gateshead, NE39, or Dunston Station" type="text" />
                    <div className="grid md:flex md:flex-nowrap grid-cols-2 gap-x-5 justify-between md:justify-end flex-shrink-0">
                        <button className="flex items-center justify-center text-center px-4 py-3 md:py-1 rounded-lg text-sm font-medium bg-complement-medium hover:bg-complement-deep hover:text-white transition-colors duration-200">
                        For sale
                        </button>
                        <button className="flex items-center justify-center text-center px-4 py-3 md:py-1 rounded-lg text-sm font-medium bg-complement-medium hover:bg-complement-deep hover:text-white transition-colors duration-200">
                        To rent
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  )
}
