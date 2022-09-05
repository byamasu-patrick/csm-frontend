import React from "react";
import Pagination from "../../../widgets/paggination";
import ProductSort from "./ProductSort";
const Products = () => {
    return (
        <>
        <div className="w-full md:flex md:flex-cols bg-gray-100 py-8 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-12">  
            <div className="w-full sm:w-full md:w-4/12 lg:w-3/12 bg-white mr-12">
                <ProductSort />
            </div>          
            <div className="w-full  sm:w-full md:w-8/12 lg:w-9/12 bg-gray-100 ">
                <div className="mx-auto container pb-8">
                    <div className="flex flex-wrap items-center lg:justify-between justify-center">
                        <div className="mx-2 w-64 lg:mb-4 mb-8 hover:cursor-pointer hover:shadow">
                            <div>
                                <img src="https://cdn.tuk.dev/assets/templates/classified/Bitmap (1).png" className="w-full h-44" />
                            </div>
                            <div className="bg-white">
                                <div className="flex items-center justify-between px-4 pt-4">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bookmark" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2" />
                                        </svg>
                                    </div>
                                    <div className="main-bg py-1.5 px-6 rounded">
                                        <p className="text-xs text-white">Add To Cart</p>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center">
                                        <h2 className="text-lg font-semibold">iphone XS</h2>
                                        <p className="text-xs text-gray-600 pl-5">4 days ago</p>
                                    </div>
                                    <p className="text-xs text-gray-600 mt-2">The Apple iPhone XS is available in 3 colors with 64GB memory. Shoot amazing videos</p>
                                    <div className="flex mt-4">
                                        <div>
                                            <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">12 months warranty</p>
                                        </div>
                                        <div className="pl-2">
                                            <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">Complete box</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <h2 className="text-gray-800 text-xs font-semibold">Bay Area, San Francisco</h2>
                                        <h3 className="text-gray-800 text-xl font-semibold">$350</h3>
                                    </div>                                    
                                    <div className="flex justify-center xl:justify-end w-full">
                                        <div className="flex items-center">
                                            <svg className="w-4 mr-1 text-yellow-400 icon icon-tabler icon-tabler-star" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" fill="none" d="M0 0h24v24H0z" />
                                                <path fill="currentColor" d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" />
                                            </svg>
                                            <svg className="w-4 mr-1 text-yellow-400 icon icon-tabler icon-tabler-star" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" fill="none" d="M0 0h24v24H0z" />
                                                <path fill="currentColor" d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" />
                                            </svg>
                                            <svg className="w-4 mr-1 text-yellow-400 icon icon-tabler icon-tabler-star" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" fill="none" d="M0 0h24v24H0z" />
                                                <path fill="currentColor" d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" />
                                            </svg>
                                            <svg className="w-4 mr-1 text-yellow-400 icon icon-tabler icon-tabler-star" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" fill="none" d="M0 0h24v24H0z" />
                                                <path fill="currentColor" d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" />
                                            </svg>
                                            <svg className="w-4 text-gray-200 icon icon-tabler icon-tabler-star" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" fill="none" d="M0 0h24v24H0z" />
                                                <path fill="currentColor" d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mx-2 w-64 lg:mb-4 mb-8 hover:cursor-pointer hover:shadow">
                            <div>
                                <img src="https://cdn.tuk.dev/assets/templates/classified/Bitmap (1).png" className="w-full h-44" />
                            </div>
                            <div className="bg-white">
                                <div className="flex items-center justify-between px-4 pt-4">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bookmark" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2" />
                                        </svg>
                                    </div>
                                    <div className="main-bg py-1.5 px-6 rounded">
                                        <p className="text-xs text-white">Add To Cart</p>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center">
                                        <h2 className="text-lg font-semibold">iphone XS</h2>
                                        <p className="text-xs text-gray-600 pl-5">4 days ago</p>
                                    </div>
                                    <p className="text-xs text-gray-600 mt-2">The Apple iPhone XS is available in 3 colors with 64GB memory. Shoot amazing videos</p>
                                    <div className="flex mt-4">
                                        <div>
                                            <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">12 months warranty</p>
                                        </div>
                                        <div className="pl-2">
                                            <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">Complete box</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <h2 className="text-gray-800 text-xs font-semibold">Bay Area, San Francisco</h2>
                                        <h3 className="text-gray-800 text-xl font-semibold">$350</h3>
                                    </div>                                    
                                    <div className="flex justify-center xl:justify-end w-full">
                                        <div className="flex items-center">
                                            <svg className="w-4 mr-1 text-yellow-400 icon icon-tabler icon-tabler-star" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" fill="none" d="M0 0h24v24H0z" />
                                                <path fill="currentColor" d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" />
                                            </svg>
                                            <svg className="w-4 mr-1 text-yellow-400 icon icon-tabler icon-tabler-star" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" fill="none" d="M0 0h24v24H0z" />
                                                <path fill="currentColor" d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" />
                                            </svg>
                                            <svg className="w-4 mr-1 text-yellow-400 icon icon-tabler icon-tabler-star" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" fill="none" d="M0 0h24v24H0z" />
                                                <path fill="currentColor" d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" />
                                            </svg>
                                            <svg className="w-4 mr-1 text-yellow-400 icon icon-tabler icon-tabler-star" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" fill="none" d="M0 0h24v24H0z" />
                                                <path fill="currentColor" d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" />
                                            </svg>
                                            <svg className="w-4 text-gray-200 icon icon-tabler icon-tabler-star" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" fill="none" d="M0 0h24v24H0z" />
                                                <path fill="currentColor" d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mx-2 w-64 lg:mb-4 mb-8 hover:cursor-pointer hover:shadow">
                            <div>
                                <img src="https://cdn.tuk.dev/assets/templates/classified/Bitmap (1).png" className="w-full h-44" />
                            </div>
                            <div className="bg-white">
                                <div className="flex items-center justify-between px-4 pt-4">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bookmark" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2" />
                                        </svg>
                                    </div>
                                    <div className="main-bg py-1.5 px-6 rounded">
                                        <p className="text-xs text-white">Add To Cart</p>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center">
                                        <h2 className="text-lg font-semibold">iphone XS</h2>
                                        <p className="text-xs text-gray-600 pl-5">4 days ago</p>
                                    </div>
                                    <p className="text-xs text-gray-600 mt-2">The Apple iPhone XS is available in 3 colors with 64GB memory. Shoot amazing videos</p>
                                    <div className="flex mt-4">
                                        <div>
                                            <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">12 months warranty</p>
                                        </div>
                                        <div className="pl-2">
                                            <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">Complete box</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <h2 className="text-gray-800 text-xs font-semibold">Bay Area, San Francisco</h2>
                                        <h3 className="text-gray-800 text-xl font-semibold">$350</h3>
                                    </div>
                                    
                                    <div className="flex justify-center xl:justify-end w-full">
                                        <div className="flex items-center">
                                            <svg className="w-4 mr-1 text-yellow-400 icon icon-tabler icon-tabler-star" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" fill="none" d="M0 0h24v24H0z" />
                                                <path fill="currentColor" d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" />
                                            </svg>
                                            <svg className="w-4 mr-1 text-yellow-400 icon icon-tabler icon-tabler-star" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" fill="none" d="M0 0h24v24H0z" />
                                                <path fill="currentColor" d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" />
                                            </svg>
                                            <svg className="w-4 mr-1 text-yellow-400 icon icon-tabler icon-tabler-star" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" fill="none" d="M0 0h24v24H0z" />
                                                <path fill="currentColor" d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" />
                                            </svg>
                                            <svg className="w-4 mr-1 text-yellow-400 icon icon-tabler icon-tabler-star" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" fill="none" d="M0 0h24v24H0z" />
                                                <path fill="currentColor" d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" />
                                            </svg>
                                            <svg className="w-4 text-gray-200 icon icon-tabler icon-tabler-star" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" fill="none" d="M0 0h24v24H0z" />
                                                <path fill="currentColor" d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-64 mx-2 lg:mb-4 mb-8 hover:cursor-pointer hover:shadow">
                            <div>
                                <img src="https://cdn.tuk.dev/assets/templates/classified/Bitmap (1).png" className="w-full h-44" />
                            </div>
                            <div className="bg-white">
                                <div className="flex items-center justify-between px-4 pt-4">
                                    <div>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-bookmark" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2" />
                                        </svg>
                                    </div>
                                    <div className="main-bg py-1.5 px-6 rounded">
                                        <p className="text-xs text-white">Add To Cart</p>
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex items-center">
                                        <h2 className="text-lg font-semibold">iphone XS</h2>
                                        <p className="text-xs text-gray-600 pl-5">4 days ago</p>
                                    </div>
                                    <p className="text-xs text-gray-600 mt-2">The Apple iPhone XS is available in 3 colors with 64GB memory. Shoot amazing videos</p>
                                    <div className="flex mt-4">
                                        <div>
                                            <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">12 months warranty</p>
                                        </div>
                                        <div className="pl-2">
                                            <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">Complete box</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <h2 className="text-gray-800 text-xs font-semibold">Bay Area, San Francisco</h2>
                                        <h3 className="text-gray-800 text-xl font-semibold">$350</h3>
                                    </div>
                                    <div className="flex justify-center xl:justify-end w-full">
                                        <div className="flex items-center">
                                            <svg className="w-4 mr-1 text-yellow-400 icon icon-tabler icon-tabler-star" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" fill="none" d="M0 0h24v24H0z" />
                                                <path fill="currentColor" d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" />
                                            </svg>
                                            <svg className="w-4 mr-1 text-yellow-400 icon icon-tabler icon-tabler-star" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" fill="none" d="M0 0h24v24H0z" />
                                                <path fill="currentColor" d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" />
                                            </svg>
                                            <svg className="w-4 mr-1 text-yellow-400 icon icon-tabler icon-tabler-star" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" fill="none" d="M0 0h24v24H0z" />
                                                <path fill="currentColor" d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" />
                                            </svg>
                                            <svg className="w-4 mr-1 text-yellow-400 icon icon-tabler icon-tabler-star" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" fill="none" d="M0 0h24v24H0z" />
                                                <path fill="currentColor" d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" />
                                            </svg>
                                            <svg className="w-4 text-gray-200 icon icon-tabler icon-tabler-star" xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" fill="none" d="M0 0h24v24H0z" />
                                                <path fill="currentColor" d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Pagination />
            </div>
            
            </div>
        </>
    );
}

export default Products;
