import { useAppSelector } from "../../../../libs/store";
import { ProductSelector } from "../../../../libs/store/Catalog";
import { useState } from "react";
import { ProductModel } from "../../../../libs/models/shops/catalogs/ProductModels";
import ProductDialog from "./ProductDialog";

const TrendingProducts = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { products } = useAppSelector(ProductSelector);
  const [product, setProduct] = useState<ProductModel | null>(null);
  let trending: number = 0;

  const handleOnProductClicked = (product: ProductModel) => {
    // console.log("Clicked")
    setProduct(product);
    setIsOpen(!isOpen);
  };

  const displayTrendingProducts = () => {
    return products?.results.map((product, index) => {
      trending++;
      return trending <= 4 ? (
        /* <div 
                        onClick={() => handleOnProductClicked(product)}
                        key={index} className="group h-96 items-end bg-gray-100 rounded-lg overflow-hidden shadow-lg relative p-4">
        
                        <div
                            className="">
                            <img src={product.imageFile} alt="Front of men&#039;s Basic Tee in black." className="h-full w-full hover:cursor-pointer object-center lg:h-full lg:w-full"/>
                        </div>
                        <div className="w-full flex flex-col bg-white text-center rounded-lg relative p-4">
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
                       
                       
                    </div>*/
        <div>
          <div
            onClick={() => handleOnProductClicked(product)}
            key={index}
            className="group h-96 flex items-end bg-gray-200 rounded-lg overflow-hidden shadow-lg relative p-4"
          >
            <img
              src={product.imageFile}
              loading="lazy"
              alt="Photo by Austin Wade"
              className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200"
            />

            <div className="w-full flex items-center flex-col bg-white text-center rounded-lg relative p-4">
              <span className="text-gray-500">{product.name}</span>
              <span className="text-gray-500 ext-lg lg:text-xl font-bold">
                {product.category}
              </span>
              {/* <span className="text-gray-800 text-lg lg:text-xl font-bold">{product.price}.00</span>*/}
            </div>
          </div>
        </div>
      ) : (
        <></>
      );
    });
  };

  return (
    <div className="bg-white max-w-7xl mx-auto rounded-lg mt-5 mb-5 pb-8">
      <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
        <div className="inline-flex justify-center items-center w-full">
          <hr className="my-8 w-80 h-1 bg-gray-200 rounded border-0 dark:bg-gray-700" />
          <div className="absolute left-1/2 px-4 bg-white -translate-x-1/2 ">
            <h2 className="text-gray-800 text-xl lg:text-2xl font-bold text-left mb-8 md:mb-2">
              Featured Products
            </h2>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {displayTrendingProducts()}
        </div>
      </div>
      {isOpen ? (
        <ProductDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          data={product as ProductModel}
        />
      ) : (
        <></>
      )}
    </div>
    /* <div className="bg-white py-6 sm:py-8 lg:py-12">
    <div className="max-w-screen-2xl px-4 md:px-8 mx-auto">
      <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold text-center mb-8 md:mb-12">Collections</h2>
  
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      
        <div>
          <a href="#" className="group h-96 flex items-end bg-gray-100 rounded-lg overflow-hidden shadow-lg relative p-4">
            <img src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&q=75&fit=crop&crop=top&w=600&h=700" loading="lazy" alt="Photo by Austin Wade" className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200" />
  
            <div className="w-full flex flex-col bg-white text-center rounded-lg relative p-4">
              <span className="text-gray-500">Men</span>
              <span className="text-gray-800 text-lg lg:text-xl font-bold">Business Causual</span>
            </div>
          </a>
        </div>
       
        <div>
          <a href="#" className="group h-96 flex items-end bg-gray-100 rounded-lg overflow-hidden shadow-lg relative p-4">
            <img src="https://images.unsplash.com/photo-1603344797033-f0f4f587ab60?auto=format&q=75&fit=crop&crop=top&w=600&h=700" loading="lazy" alt="Photo by engin akyurt" className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200" />
  
            <div className="w-full flex flex-col bg-white text-center rounded-lg relative p-4">
              <span className="text-gray-500">Women</span>
              <span className="text-gray-800 text-lg lg:text-xl font-bold">Summer Season</span>
            </div>
          </a>
        </div>
       
        <div>
          <a href="#" className="group h-96 flex items-end bg-gray-100 rounded-lg overflow-hidden shadow-lg relative p-4">
            <img src="https://images.unsplash.com/photo-1552668693-d0738e00eca8?auto=format&q=75&fit=crop&crop=top&w=600&h=700" loading="lazy" alt="Photo by Austin Wade" className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200" />
  
            <div className="w-full flex flex-col bg-white text-center rounded-lg relative p-4">
              <span className="text-gray-500">Men</span>
              <span className="text-gray-800 text-lg lg:text-xl font-bold">Streetwear</span>
            </div>
          </a>
        </div>
       
        <div>
          <a href="#" className="group h-96 flex items-end bg-gray-100 rounded-lg overflow-hidden shadow-lg relative p-4">
            <img src="https://images.unsplash.com/photo-1560269999-cef6ebd23ad3?auto=format&q=75&fit=crop&w=600&h=700" loading="lazy" alt="Photo by Austin Wade" className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200" />
  
            <div className="w-full flex flex-col bg-white text-center rounded-lg relative p-4">
              <span className="text-gray-500">Women</span>
              <span className="text-gray-800 text-lg lg:text-xl font-bold">Sale</span>
            </div>
          </a>
        </div>
       
      </div>
    </div>
  </div>*/
  );
};

export default TrendingProducts;
