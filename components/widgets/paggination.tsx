import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../libs/store";
import { GetAllProducts, ProductSelector } from "../../libs/store/Catalog";

const Pagination = () => {

    const { products } = useAppSelector(ProductSelector);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setCurrentPage(products.currentPage);
    }, []);

    const fetchPageData = (currentPage: number) => {
        const fetchProducts = async () => {
            await dispatch(GetAllProducts(currentPage));
       };
       fetchProducts().catch((error) => console.log(error));
    }

    return (
        <>
            <div 
                className="
                    bg-white
                    rounded-md
                    items-center 
                    justify-center 
                    flex
                    py-6
                    lg:px-0 
                    sm:px-6 px-4">
                <div 
                    className="
                        lg:w-3/5
                        w-full  
                        flex 
                        items-center 
                        justify-between">
                    <div 
                        onClick={() => fetchPageData(
                            currentPage === 1 ? 1 : currentPage - 1 
                        )}
                        className="
                            flex 
                            items-center                            
                            text-gray-600 
                            border
                            rounded-md
                            hover:text-orange-500 
                            py-3 
                            px-3
                            hover:bg-white
                            hover:rounded-md
                            hover:border-orange-500
                            justify-center
                            cursor-pointer">
                        <svg width={14} height={8} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.1665 4H12.8332" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1.1665 4L4.49984 7.33333" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M1.1665 4.00002L4.49984 0.666687" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-sm ml-3 font-medium leading-none ">Previous</p>
                    </div>
                    <div className="sm:flex hidden">
                        {
                            [...Array(products.totalPages)].map((page, index) => {
                                
                                return index + 1 === products.currentPage ? (<p 
                                    onClick={() => fetchPageData(products.currentPage)}
                                    className="
                                        text-sm 
                                        font-medium 
                                        leading-none 
                                        cursor-pointer 
                                        text-white 
                                        bg-orange-500 
                                        border
                                        border-orange-500 
                                        rounded-md
                                        py-3 
                                        mr-2 
                                        px-3">{products.currentPage}</p>)
                                : (<p 
                                    onClick={() => fetchPageData(index + 1)}
                                    className="
                                        text-sm 
                                        font-medium 
                                        leading-none 
                                        cursor-pointer 
                                        text-gray-600 
                                        hover:text-orange-500 
                                        rounded-md
                                        border 
                                        border-transparent 
                                        hover:border-orange-500 
                                        pt-3 
                                        mr-2 
                                        px-3">{index + 1}</p>)
                            })
                        }                        
                        
                    </div>
                    <div 
                        onClick={() => fetchPageData(
                            currentPage < products.totalPages ? currentPage + 1 : 1
                        )}
                        className="
                            flex 
                            items-center                            
                            text-gray-600 
                            border
                            rounded-md
                            hover:text-orange-500 
                            py-3 
                            px-4
                            hover:bg-white
                            hover:rounded-md
                            hover:border-orange-500
                            justify-center
                            cursor-pointer">
                        <p className="text-sm font-medium leading-none mr-3">Next</p>
                        <svg 
                            width={14} 
                            height={8} 
                            viewBox="0 0 14 8" 
                            fill="none" 
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.1665 4H12.8332" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.5 7.33333L12.8333 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.5 0.666687L12.8333 4.00002" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
                <div 
                    className="
                        flex 
                        items-center 
                        py-3 
                        text-gray-600">
                    <p
                        className="
                        text-md
                        leading-none 
                        text-gray-600 
                        mr-4 
                        px-2"
                    >
                        Total {products.totalPages} pages Go to Page 
                    </p>                    
                    <input 
                        type="text" 
                        placeholder="Go To" 
                        className="
                            w-[80px]
                            text-base  
                            placeholder-gray-700     
                            leading-4         
                            py-2
                            pl-2
                            focus:outline-none 
                            focus:ring-2 
                            focus:ring-offset 
                            focus:ring-gray-600 
                            rounded " />
                </div>
            </div>
        </>
    );
}
export default Pagination;