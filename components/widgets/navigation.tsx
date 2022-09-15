import Link from "next/link";
import React, { useState, useEffect } from "react";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { useRouter } from "next/router";
import { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "../../libs/store";
import { AuthSelector, logOut } from "../../libs/store/Auth";
import { Menu, Popover, Transition } from "@headlessui/react";
import { clientNavigation } from "../../libs/models/shops/ShopModels";
import { BasketSelector, searchBasketsData } from "../../libs/store/Basket";

const Navigation = () => {
    const [searchInput, setSearchInput] = useState(true);
    const [mdOptionsToggle, setMdOptionsToggle] = useState(true);
    const [showMenu, setShowMenu] = useState(false);

    
    const { isAuthenticated, error, isLoading, tokenModel, user } = useAppSelector(AuthSelector);
    const { cart, basketSearch } = useAppSelector(BasketSelector);
    const dispatch: any = useAppDispatch();
    const router = useRouter();

    const logout = () => {
        dispatch(logOut());
        router.push('/signin');
    }
    // useEffect(() => {        
    //    if(isAuthenticated && basketSearch.searchResult  ===  null){            
    //         const fetchShoppingCart = async () => {
    //             await dispatch(searchBasketsData(user?.profile?.firstName +" "+ user?.profile?.lastName));
    //             console.log("Cart Search: ", basketSearch.searchResult);
    //         }
    //         fetchShoppingCart().catch((error) => console.log(error));
    //     }
    // }, [isAuthenticated]);

    return (
        <div className="dark:bg-gray-900 bg-gray-50">
            <div className="flex md:flex-col bg-gray-50">
                <div className="relative">
                    {/* For md screen size */}
                    <div id="md-searchbar" className={`${mdOptionsToggle ? "hidden" : "flex"} bg-white dark:bg-gray-900 lg:hidden py-5 px-6 items-center justify-between`}>
                       
                        <div className="space-x-6">
                            <button aria-label="view favourites" className="text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800">
                                <svg className="fill-stroke" width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13.8921 3.07357C13.5516 2.73291 13.1473 2.46267 12.7023 2.2783C12.2574 2.09392 11.7804 1.99902 11.2988 1.99902C10.8171 1.99902 10.3402 2.09392 9.89521 2.2783C9.45023 2.46267 9.04595 2.73291 8.70544 3.07357L7.99878 3.78024L7.29211 3.07357C6.60432 2.38578 5.67147 1.99938 4.69878 1.99938C3.72609 1.99938 2.79324 2.38578 2.10544 3.07357C1.41765 3.76137 1.03125 4.69422 1.03125 5.66691C1.03125 6.6396 1.41765 7.57245 2.10544 8.26024L2.81211 8.96691L7.99878 14.1536L13.1854 8.96691L13.8921 8.26024C14.2328 7.91974 14.503 7.51545 14.6874 7.07048C14.8718 6.6255 14.9667 6.14857 14.9667 5.66691C14.9667 5.18525 14.8718 4.70831 14.6874 4.26334C14.503 3.81836 14.2328 3.41408 13.8921 3.07357V3.07357Z"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                            <button aria-label="go to cart" className="text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-800">
                                <svg className="fill-stroke" width={18} height={18} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.66667 1L1 4.2V15.4C1 15.8243 1.1873 16.2313 1.5207 16.5314C1.8541 16.8314 2.30628 17 2.77778 17H15.2222C15.6937 17 16.1459 16.8314 16.4793 16.5314C16.8127 16.2313 17 15.8243 17 15.4V4.2L14.3333 1H3.66667Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M1 4.2002H17" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12.5564 7.3999C12.5564 8.2486 12.1818 9.06253 11.515 9.66264C10.8482 10.2628 9.94386 10.5999 9.00087 10.5999C8.05788 10.5999 7.15351 10.2628 6.48671 9.66264C5.81991 9.06253 5.44531 8.2486 5.44531 7.3999" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    {/* For md screen size */}
                    {/* For large screens */}
                    <div className="dark:bg-gray-90 px-6 py-5">
                        <div className="container mx-auto flex items-center justify-between">
                            <h1 className="md:w-2/12 cursor-pointer text-orange-600 dark:text-white" aria-label="Cloud Stores MW">
                               
                                <img src="../../cloud-stores.png" width="60" height="60"/>
                            </h1>
                            <ul className="hidden w-6/12 md:flex items-center justify-center space-x-4">
                                <li>
                                    <Link href="/">
                                        <a className="dark:text-white text-base text-gray-800 focus:outline-nonehover:underline">
                                            Home
                                        </a>
                                    </Link>
                                </li>
                                <li>
                                    <a href="#" className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                        Shops
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                        New Products
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dark:text-white text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                        Support
                                    </a>
                                </li>
                            </ul>
                            <div className="md:w-6/12 justify-end flex items-center space-x-4 xl:space-x-8">
                                
                                <div className="hidden lg:flex items-center space-x-2 xl:space-x-8">                                    
                                    <Link href="/user/carts">
                                        <a aria-label="go to cart" className="text-gray-800 hover:cursor-pointer dark:hover:text-gray-300 hover:text-gray-900 dark:text-white">
                                            <AddShoppingCartIcon  sx={{ fontSize: 28 }}/>
                                            {
                                                (cart?.items.length >= 1) && (cart !== null) || (basketSearch.searchResult?.items.length >= 1) && (cart !== null)  ?
                                                (
                                                    <div className="inline-flex relative -top-4 right-2 justify-center items-center w-6 h-6 text-sm font-bold text-white bg-[rgb(11,115,164)] rounded-full border-2 border-white dark:border-gray-900">
                                                        { cart.items.length === 0 ?  basketSearch.searchResult.items.length : cart.items.length }
                                                    </div>
                                                ) : (<></>)
                                            }
                                        </a>
                                    </Link>
                                    {
                                        isAuthenticated ? ( 
                                            <Popover
                                                as="header"           
                                                >                                      
                                                <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
                                                    <div className="border-t border-gray-200 pt-4">
                                                        <div className="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
                                                            <div className="flex-shrink-0">
                                                            <span
                                                                className="
                                                                    inline-flex
                                                                    items-center
                                                                    px-3
                                                                    p-2
                                                                    rounded-full
                                                                    text-sm
                                                                    font-medium
                                                                    bg-orange-600
                                                                    text-white
                                                                    uppercase
                                                                    "
                                                            >
                                                                {user?.profile?.firstName +" "+ user?.profile?.lastName}
                                                            </span>
                                                            </div>
                                                            <div className="ml-3">
                                                            <div className="text-base font-medium text-gray-800">
                                                            {user?.profile?.firstName +" "+ user?.profile?.lastName}
                                                            </div>
                                                            <div className="text-sm font-medium text-gray-500">
                                                                {user?.email}
                                                            </div>
                                                            </div>
                                                        </div>
                                                        <div className="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
                                                            {clientNavigation.map((item: any) => (
                                                            <Link key={item.name} href={item.href}>
                                                                <a className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">
                                                                    {item.name}
                                                                </a>
                                                            </Link>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="mt-6 max-w-3xl mx-auto px-4 sm:px-6"></div>
                                                </Popover.Panel>
                                                
                                                <Menu as="div" className="flex-shrink-0 relative ml-5">
                                                    <div>
                                                    <Menu.Button
                                                        className="
                                                            rounded-full
                                                            flex
                                                            focus:outline-none
                                                            focus:ring-2
                                                            focus:ring-offset-2
                                                            focus:ring-orange-500
                                                        "
                                                    >
                                                        <span className="sr-only">Open user menu</span>
                                                        <span className="lowercase m-2"> {user?.email} </span>
                                                        <span
                                                        className="
                                                                inline-flex
                                                                items-center
                                                                px-3
                                                                rounded-full
                                                                text-sm
                                                                font-medium
                                                                bg-orange-600
                                                                text-white
                                                                uppercase
                                                            "
                                                        >
                                                        {user?.profile?.firstName +" "+ user?.profile?.lastName}
                                                        </span>
                                                    </Menu.Button>
                                                    </div>
                                                    <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                    >
                                                    <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                                                        {clientNavigation.map((item: any) => (
                                                        <Menu.Item key={item.name}>
                                                            {({ active }) => (
                                                            <Link href={item.href}>
                                                                <a
                                                                className = "block py-2 px-4 text-sm text-gray-700"
                                                                
                                                                >
                                                                {item.name}
                                                                </a>
                                                            </Link>
                                                            )}
                                                        </Menu.Item>
                                                        ))}
                                                        <Menu.Item key="signout">
                                                            <a
                                                            className="bg-gray-100 block py-2 px-4 text-sm text-gray-700"
                                                            onClick={() => logout()}
                                                            >
                                                            Sign out
                                                            </a>
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                    </Transition>
                                                </Menu>
                                            </Popover>     
                                        ) : (
                                            <>                                                            
                                                <Link href="/signup">
                                                <a 
                                                    type="button" 
                                                    className="
                                                        text-white bg-orange-500
                                                        focus:ring-offset-2 
                                                        rounded-sm
                                                        hover:bg-orange-600 focus:outline-none 
                                                        focus:ring-2 focus:ring-orange-500 
                                                        font-medium text-sm px-5 
                                                        py-2.5 mr-2 mb-2 dark:bg-orange-600 
                                                        dark:hover:bg-orange-700 
                                                        dark:focus:ring-orange-700 
                                                        dark:border-orange-700">Sign Up</a>
                                                </Link>
                                                <Link href="/signin">
                                                <a 
                                                    type="button" 
                                                    className="
                                                        text-gray-900 
                                                        bg-white border 
                                                        rounded-sm
                                                        hover:text-white
                                                        border-gray-300 focus:outline-none 
                                                        hover:bg-[#0b73a4] focus:ringf-4 
                                                        focus:ring-gray-200 font-medium 
                                                        text-sm px-5 py-2.5 
                                                        mr-2 mb-2 dark:bg-gray-800 
                                                        dark:text-white dark:border-gray-600 
                                                        dark:hover:bg-gray-700 
                                                        dark:hover:border-gray-600 
                                                        dark:focus:ring-gray-700">Sign In</a>
                                                </Link>
                                            </>
                                        )
                                    }
                                </div>
                                <div className="flex lg:hidden">
                                    <button aria-label="show options" onClick={() => setMdOptionsToggle(!mdOptionsToggle)} className="text-black dark:text-white dark:hover:text-gray-300 hidden md:flex focus:outline-none focus:ring-2 rounded focus:ring-gray-600">
                                        <svg className="fill-stroke" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M6 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <button aria-label="open menu" onClick={() => setShowMenu(true)} className="text-black dark:text-white dark:hover:text-gray-300 md:hidden focus:outline-none focus:ring-2 rounded focus:ring-gray-600">
                                        <svg className="fill-stroke" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M10 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M6 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* For small screen */}
                    <div id="mobile-menu" className={`${showMenu ? "flex" : "hidden"} absolute dark:bg-gray-900 z-10 inset-0 md:hidden bg-white flex-col h-screen w-full`}>
                        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-4 p-4">
                            <div className="flex items-center">
                                <div>
                                    <svg className="fill-stroke text-gray-800 dark:text-white" width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M9 17C13.4183 17 17 13.4183 17 9C17 4.58172 13.4183 1 9 1C4.58172 1 1 4.58172 1 9C1 13.4183 4.58172 17 9 17Z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M18.9984 18.9999L14.6484 14.6499" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                <input type="text" placeholder="Search for products" className="text-sm dark:bg-gray-900 text-gray-600 placeholder-gray-600 dark:placeholder-gray-300 focus:outline-none" />
                            </div>
                            <button onClick={() => setShowMenu(false)} aria-label="close menu" className="focus:outline-none focus:ring-2 rounded focus:ring-gray-600">
                                <svg className="fill-stroke text-gray-800 dark:text-white" width={16} height={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 4L4 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M4 4L12 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                        <div className="mt-6 p-4">
                            <ul className="flex flex-col space-y-6">
                                <li>
                                    <a href="#" className="dark:text-white flex items-center justify-between hover:underline text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800">
                                        Home
                                        <div>
                                            <svg className="fill-stroke text-black dark:text-white" width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dark:text-white flex items-center justify-between hover:underline text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800">
                                        Furniture
                                        <div>
                                            <svg className="fill-stroke text-black dark:text-white" width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dark:text-white flex items-center justify-between hover:underline text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800">
                                        Lookbook
                                        <div>
                                            <svg className="fill-stroke text-black dark:text-white" width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dark:text-white flex items-center justify-between hover:underline text-base text-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-800">
                                        Support
                                        <div>
                                            <svg className="fill-stroke text-black dark:text-white" width={12} height={12} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M4.5 3L7.5 6L4.5 9" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div className="h-full flex items-end">
                            <ul className="flex flex-col space-y-8 bg-gray-50 w-full py-10 p-4 dark:bg-gray-800">
                                <li>
                                    <a href="#" className="dark:text-white text-gray-800 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                        <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-cart" viewBox="0 0 22 22"> 
                                            <path 
                                            d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                                            /> 
                                        </svg>
                                        </div>
                                        <p className="text-base">Cart</p>
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="dark:text-white text-gray-800 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-gray-800 hover:underline">
                                        <div>
                                            <svg className="fill-stroke" width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    d="M17.3651 3.84172C16.9395 3.41589 16.4342 3.0781 15.8779 2.84763C15.3217 2.61716 14.7255 2.49854 14.1235 2.49854C13.5214 2.49854 12.9252 2.61716 12.369 2.84763C11.8128 3.0781 11.3074 3.41589 10.8818 3.84172L9.99847 4.72506L9.11514 3.84172C8.25539 2.98198 7.08933 2.49898 5.87347 2.49898C4.65761 2.49898 3.49155 2.98198 2.6318 3.84172C1.77206 4.70147 1.28906 5.86753 1.28906 7.08339C1.28906 8.29925 1.77206 9.46531 2.6318 10.3251L3.51514 11.2084L9.99847 17.6917L16.4818 11.2084L17.3651 10.3251C17.791 9.89943 18.1288 9.39407 18.3592 8.83785C18.5897 8.28164 18.7083 7.68546 18.7083 7.08339C18.7083 6.48132 18.5897 5.88514 18.3592 5.32893C18.1288 4.77271 17.791 4.26735 17.3651 3.84172V3.84172Z"
                                                    stroke="currentColor"
                                                    strokeWidth="1.5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-base">Wishlist</p>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Navigation;
