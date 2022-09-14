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
            <div className="flex items-center justify-center py-10 lg:px-0 sm:px-6 px-4">
                <div className="lg:w-3/5 w-full  flex items-center justify-between border-t border-gray-200">
                    <div 
                        onClick={() => fetchPageData(
                            currentPage === 1 ? 1 : currentPage - 1 
                        )}
                        className="flex items-center pt-3 text-gray-600 hover:text-orange-500 cursor-pointer">
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
                                        text-orange-500 
                                        border-t 
                                        border-orange-500 
                                        pt-3 
                                        mr-4 
                                        px-2">{products.currentPage}</p>)
                                : (<p 
                                    onClick={() => fetchPageData(index + 1)}
                                    className="
                                        text-sm 
                                        font-medium 
                                        leading-none 
                                        cursor-pointer t
                                        ext-gray-600 
                                        hover:text-orange-500 
                                        border-t border-transparent 
                                        hover:border-orange-500 
                                        pt-3 mr-4 
                                        px-2">{index + 1}</p>)
                            })
                        }
                        
                        
                    </div>
                    <div 
                        onClick={() => fetchPageData(
                            currentPage < products.totalPages ? currentPage + 1 : 1
                        )}className="flex items-center pt-3 text-gray-600 hover:text-orange-500 cursor-pointer">
                        <p className="text-sm font-medium leading-none mr-3">Next</p>
                        <svg width={14} height={8} viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.1665 4H12.8332" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.5 7.33333L12.8333 4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M9.5 0.666687L12.8333 4.00002" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
            </div>
        </>
    );
}
export default Pagination;