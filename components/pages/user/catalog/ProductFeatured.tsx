import React from "react";
import { useAppSelector } from "../../../../libs/store";
import { ProductSelector } from "../../../../libs/store/Catalog";

const  FeaturedProduct = () => {
    
    const { products } = useAppSelector(ProductSelector);
    let featured: number = 0;

    const displayFeaturedProducts = () => {
        return products?.results.map((product, index) => {
            featured++;
            return (
                featured < 4 ? (
                    <div key={index} className="relative flex flex-col sm:my-6">
                        <img src={product.imageFile} alt="two girls" width={406} height={570} className="w-[406px] h-[520px]" />
                        <img src="https://i.ibb.co/Tb5CKHn/Rectangle-49.png" alt="opacity bg" className="absolute w-full top-0" />
                        <div className="absolute m-6 bottom-0 z-30">
                            <p className="text-sm leading-none text-white">{product.category}</p>
                            <h1 className="w-64 text-2xl font-semibold leading-8 mt-2 text-white">{product.name}</h1>
                            <p className="mt-4 text-base font-medium cursor-pointer leading-4 underline text-white">Discover</p>
                        </div>
                    </div>
                ) : <></>
            )
        })
    }

    return (
        <div className="2xl:mx-auto 2xl:container bg-white">
            <div className="lg:px-20 md:px-6 px-4 md:py-12 py-8">
                <h1 className="lg:text-4xl text-3xl font-semibold text-gray-800 text-center">Featured Products</h1>
                <div className="flex justify-center">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 lg:mt-16 md:mt-12 mt-8 items-center">
                        {
                            displayFeaturedProducts()
                        }
                    </div>
                </div>
            </div>
            <div>
            </div>
        </div>
        
    );
};

export default FeaturedProduct;
