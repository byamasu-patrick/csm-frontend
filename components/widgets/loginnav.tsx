import Link from 'next/link'
import React from 'react'
//import { MenuIcon } from '@heroicons/react/solid'


type Props = {}

function LoginNav({}: Props) {
  return (
    <header className='sticky top-0 z-100 bg-gray-500 '>      
        <div className='flex items-center space-x-4 justify-end pr-6'>      
            <Link href="/">
                <a
                    className="
                    text-white  
                    rounded-sm
                    focus:outline-none 
                    font-medium 
                    text-xs                   
                    "
                    >
                    <svg 
                        className="
                        text-white h-6 w-6 "
                        viewBox="0 0 32 32">
                       
                        <g 
                            data-name="Layer 2" id="Layer_2">
                            <path d="M16,29a4,4,0,0,1-4-4,1,1,0,0,1,1-1h6a1,1,0,0,1,1,1A4,4,0,0,1,16,29Zm-1.73-3a2,2,0,0,0,3.46,0Z"/>
                            <path d="M18,7H14a1,1,0,0,1-1-1,3,3,0,0,1,6,0A1,1,0,0,1,18,7ZM16,5h0Z"/>
                            <path d="M27,26H5a1,1,0,0,1-1-1,7,7,0,0,1,3-5.75V14a9,9,0,0,1,8.94-9h.11a9,9,0,0,1,9,9v5.25A7,7,0,0,1,28,25h0A1,1,0,0,1,27,26ZM6.1,24H25.9a5,5,0,0,0-2.4-3.33,1,1,0,0,1-.5-.87V14A7,7,0,1,0,9,14v5.8a1,1,0,0,1-.5.87A5,5,0,0,0,6.1,24Z"/>
                        </g>
                    </svg>
                </a>   
            </Link>                                               
            <Link href="/signup">
                <a 
                    type="button" 
                    className="
                        text-white                 
                        bg-gray-500 
                        border 
                        focus:ring-offset-2 
                        rounded-sm
                        hover:bg-gray-500 
                        focus:outline-none 
                        focus:ring-2 
                        focus:ring-orange-500 
                        font-medium 
                        text-xs 
                        px-2
                        py-1
                        my-1
                        ">Sign Up</a>
            </Link>
            <Link href="/signin">
                <a 
                    type="button" 
                    className="         
                        text-white 
                        bg-gray-500 
                        border 
                        rounded-sm
                        hover:text-white
                        border-gray-300 
                        focus:outline-none 
                        focus:ringf-4 
                        focus:ring-gray-200 
                        font-medium 
                        text-xs 
                        px-2
                        py-1
                        my-1
                        ">Log in</a>
            </Link>               
        </div>      
    </header>
   
  )
}

export default LoginNav;