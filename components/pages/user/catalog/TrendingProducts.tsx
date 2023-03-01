import { useAppSelector } from "../../../../libs/store";
import { ProductSelector } from "../../../../libs/store/Catalog";
import { useState } from "react";
import { ProductModel } from "../../../../libs/models/shops/catalogs/ProductModels";
import ProductDialog from "./ProductDialog";
import { AiOutlineHeart } from "react-icons/ai";
import { BiGitCompare } from "react-icons/bi";
import { VscGitCompare } from "react-icons/vsc";
import { TfiShoppingCartFull } from "react-icons/tfi";
import { FiEye } from "react-icons/fi";
import { FaCartArrowDown } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import Link from "next/link";
import SectionDivider from "./SectionDivider";

const TrendingProducts = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { products } = useAppSelector(ProductSelector);
  const [product, setProduct] = useState<ProductModel | null>(null);
  let trending: number = 0;

  const [isHovered, setIsHovered] = useState(false);

  const handleOnProductClicked = (product: ProductModel) => {
    // console.log("Clicked")
    setProduct(product);
    setIsOpen(!isOpen);
  };

  const displayTrendingProducts = () => {
    return products?.results.map((product, index) => {
      trending++;
      return trending <= 4 ? (
        <div>
          <div
            onClick={() => handleOnProductClicked(product)}
            key={index}
            className="group h-96 flex items-end bg-white rounded-lg overflow-hidden shadow-lg relative p-4"
          >
            <img
              src={product.imageFile}
              loading="lazy"
              alt="Photo by Austin Wade"
              className="w-full h-full object-cover object-center absolute inset-0 group-hover:scale-110 transition duration-200"
            />

            <div className="w-full flex items-center flex-col bg-white shadow-lg text-center rounded-lg relative p-4">
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
    <div className="max-w-7xl mx-auto rounded-lg mt-5 mb-5 pb-8">
      <div className="max-w-screen-2xl  mx-auto">
        <SectionDivider title="Featured Products" />

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
  );
};

export default TrendingProducts;
