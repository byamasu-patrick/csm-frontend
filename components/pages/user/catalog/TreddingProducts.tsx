import { useAppSelector } from "../../../../libs/store";
import { ProductSelector } from "../../../../libs/store/Catalog";
import { useState } from 'react';
import { ProductModel } from "../../../../libs/models/shops/catalogs/ProductModels";
import ProductDialog from "./ProductDialog";

const TredingProducts = () => {
    const [isOpen, setIsOpen] = useState<boolean>(false);    
    const { products } = useAppSelector(ProductSelector);
    const [product, setProduct] = useState<ProductModel | null>(null);
    let treding: number = 0;

    
    const handleOnProductClicked = (product: ProductModel) => {
        // console.log("Clicked")
        setProduct(product);
        setIsOpen(!isOpen);
    }

    const displayTredingProducts = () => {
        return products?.results.map((product, index) => {
            treding++;
            return (
                treding <= 4 ? (                    
                    <div  
                        onClick={() => handleOnProductClicked(product)}
                        key={index} className="group relative mx-8">
                        <div
                            className="min-h-80 hover:cursor-pointer aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                            <img src={product.imageFile} alt="Front of men&#039;s Basic Tee in black." className="h-full w-full hover:cursor-pointer object-center lg:h-full lg:w-full"/>
                        </div>
                        <div className="mt-4 flex justify-between">
                            <div>
                                <h3 className="text-sm text-gray-700">
                                <p>
                                    <span aria-hidden="true" className="absolute inset-0"></span>
                                    {product.name}
                                </p>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">K {product.price}.00</p>
                        </div>
                    </div>
                ) : <></>
            )
        })
    }

    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>
                <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                    {
                        
                        displayTredingProducts()
                    }
                </div>
            </div>
            {
                isOpen ? <ProductDialog isOpen={isOpen} setIsOpen={setIsOpen} data={product as ProductModel}/> : (<></>)
            }
        </div>
    )
}

export default TredingProducts;