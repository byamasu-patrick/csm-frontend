import React, { useState } from "react";

export default function ProductSort() {
  const [show, setShow] = useState(false);

  return (
    <div className="">
      <div className="bg-white xl:hidden flex text-gray-800  hover:text-black focus:outline-none focus:text-black justify-between w-full p-6 items-center ">
        <button className="flex justify-between  items-center space-x-3">          
          <p className="text-2xl leading-6 ">Search or Filter</p>
        </button>
        <div aria-label="toggler" className="flex justify-center items-center">
          <button id="open" onClick={() => setShow(!show)} aria-label="open" className={`${show ? "" : "hidden"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800`}>
            <svg className="text-gray-800" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 12H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M4 18H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button id="close" onClick={() => setShow(!show)} aria-label="close" className={`${show ? "hidden" : ""} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800`}>
            <svg className="text-gray-800" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      <div id="Main" className={`${show ? "-translate-x-full" : "translate-x-0"} bg-white transform  xl:translate-x-0 ease-in-out transition duration-500 flex justify-start items-start w-full sm:w-64  flex-col h-full`}>
        <button className="hidden xl:flex text-gray-800 hover:text-black focus:outline-none focus:text-black justify-start px-6 pt-6 items-center space-x-3 w-full">
          
          <p className="text-2xl leading-6 ">Search or  Filter</p>
        </button>
        
        <div className="xl:mt-6 flex flex-col justify-start items-start  px-4 w-full space-y-3 pb-5 ">
          <div className=" relative focus:outline-none flex jusitfy-start w-full   text-gray-800 rounded  items-center border-gray-300 focus:border-gray-400 border  ">
            <input type="text" placeholder="Search" className="placeholder-gray-800 text-base placeholder-text-base leading-4 py-3 pl-8 w-full pl-16 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 rounded " />
            <svg className="absolute left-4" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 21L15 15" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <button className="focus:outline-none flex jusitfy-start   hover:bg-gray-100 text-gray-600 rounded py-3 pl-4 items-center space-x-6 w-full ">
            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-orange-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <p className="text-base leading-4 ">Filter by Name</p>
          </button>
          <button className="focus:outline-none flex jusitfy-start   hover:bg-gray-100 text-gray-600 rounded py-3 pl-4  items-center w-full  space-x-6">
            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-orange-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <p className="text-base leading-4 ">Sort by Date</p>
          </button>
          <button className="focus:outline-none flex justify-start items-center space-x-6   hover:bg-gray-100 text-gray-600 rounded  py-3 pl-4  w-full ">
            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-orange-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <p className="text-base leading-4  ">High Rated Product</p>
          </button>
          <button className="flex justify-start items-center space-x-6  focus:outline-none  hover:bg-gray-100 text-gray-600 rounded py-3 pl-4  w-full ">
            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-orange-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <p className="text-base leading-4  ">High Rated Shop</p>
          </button>
        </div>
        <div className="w-full px-4">
          <hr className=" border-gray-100 w-full" />
        </div>
        <div className="mt-6 flex flex-col justify-start items-start  px-4 w-full space-y-3 pb-5 ">
          <button className="focus:outline-none flex justify-start items-center    hover:bg-gray-100 text-gray-600 rounded py-3 pl-4  w-full ">
            <div className="flex justify-between items-center  w-full">
              <div className="flex justify-start items-center">
                <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                <p className="text-base leading-4  ml-6">Last Shoped</p>
              </div>
            </div>
          </button>
          <button className="focus:outline-none flex justify-start items-center space-x-6   hover:bg-gray-100 text-gray-600 rounded  py-3 pl-4  w-full ">
            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <p className="text-base leading-4  ">Sort by Category</p>
          </button>
        </div>
        <div className="w-full px-4">
          <hr className=" border-gray-100 w-full" />
        </div>
        <div className="mt-6 flex flex-col justify-start items-start  px-4 w-full space-y-3 pb-5 ">
          <button className="focus:outline-none flex justify-start items-center space-x-6   hover:bg-gray-100 text-gray-600 rounded  py-3 pl-4  w-full ">
            <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
            <p className="text-base leading-4  ">Featured Products</p>
          </button>
        </div>
       
      </div>
    </div>
  );
}
