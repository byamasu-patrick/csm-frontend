import Link from "next/link";
import React, { useState } from "react";
import { useAppDispatch } from "../../../../libs/store";
import { GetAllProductsByCategory } from "../../../../libs/store/Catalog";
import { ProductCategories } from "../../../../libs/utils/common";

interface ProductProps{
  isProductPage: boolean;
}

const ProductSort: React.FC<ProductProps> = (props) => {
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();

  const displayProductByCategory = async (categoryName: string) => {
    await dispatch(GetAllProductsByCategory({
      catName: categoryName?.toString(),
      page: 1                   
    }));
  };

  return (
    <div className="">
      <div className="bg-white xl:hidden flex text-gray-800  hover:text-black focus:outline-none focus:text-black justify-between w-full p-6 items-center ">
        <button className="flex justify-between  items-center space-x-3">          
          <p className="text-2xl leading-6 ">Categories</p>
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
      <div id="Main" className={`${show ? "-translate-x-full" : "translate-x-0"} bg-white transform  xl:translate-x-0 ease-in-out transition duration-500 flex justify-start items-start w-full  flex-col h-full`}>
        <button className="hidden xl:flex text-gray-800 hover:text-black focus:outline-none focus:text-black justify-start px-6 pt-6 items-center space-x-3 w-full">
          <p className="text-2xl leading-6 ">Categories</p>
        </button>        
        <div className="xl:mt-6 flex flex-col justify-start items-startpx-4 w-full space-y-1 pb-4">
          {/* <div className=" relative focus:outline-none flex jusitfy-start w-10/12 mx-6 mb-4 text-gray-800 rounded  items-center border-gray-300 focus:border-gray-400 border  ">
            <input type="text" placeholder="Search" className="placeholder-gray-800 text-base placeholder-text-base leading-4 w-full pl-16 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600 rounded " />
            <svg className="absolute left-4" width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17Z" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M21 21L15 15" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div> */}
          {
            ProductCategories.map((categoryName, index) => {
              if(!props.isProductPage){
                return (
                  <Link key={index} href={ `/product/${categoryName}`}>
                    <a className="focus:outline-none mx-2 flex jusitfy-start hover:text-orange-500 text-gray-600 rounded py-3 pl-4 items-center space-x-2 w-full ">
                      <p className="text-base leading-4 ">{categoryName}</p>
                    </a>
                  </Link>
                )
              }
              return (
                  <button key={index} onClick={() => displayProductByCategory(categoryName)} className="focus:outline-none mx-2 flex jusitfy-start hover:text-gray-800 hover:cursor-pointer text-gray-600 rounded py-3 pl-4 items-center space-x-2 w-full ">
                    <p className="text-base leading-4 ">{categoryName}</p>
                  </button>
              ) 
            })
          }
        </div>
        </div>
    </div>
  );
}
export default ProductSort;
