import { useContext } from 'react'
import { useAuth } from '../context/authContext'


export default function SignInPromptBanner() {

    const { user } = useAuth()
    
    if(user) return;

    return (
        <div className='w-full lg:max-w-2xl mx-auto bg-accent-light px-4 py-4 rounded-lg flex items-center justify-center gap-x-10 my-8'>
            <div className='hidden xs:block'>
                <h2 className='text-base font-semibold mb-1 text-accent-dark'>Sign in to streamline your search</h2>
                <p className='text-sm hidden sm:block'>Save properties, create alerts and keep track of the enquiries you send to agents.</p>
            </div>
            <svg className="xs:hidden" width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path fill="currentColor" fillRule="evenodd" d="M16 6c0 2.2091-1.7909 4-4 4S8 8.2091 8 6s1.7909-4 4-4 4 1.7909 4 4m-2 0c0 1.1046-.8954 2-2 2s-2-.8954-2-2 .8954-2 2-2 2 .8954 2 2M4 19c0-4.4183 3.5817-8 8-8s8 3.5817 8 8v1c0 1.1046-.8954 2-2 2H6c-1.1046 0-2-.8954-2-2zm14 0v1H6v-1c0-3.3137 2.6863-6 6-6s6 2.6863 6 6" clip-rule="evenodd"></path>
            </svg>
            <button className="h-[3rem] bg-white px-3 py-1 flex-nowrap items-center flex w-fit border-2 border-solid border-accent-dark rounded-lg min-w-max hover:bg-primary transition-colors duration-200 ease-linear">
                <span className="text-sm whitespace-nowrap">Sign in or create an account</span>
            </button>
        </div>
    )
}
