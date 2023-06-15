import Link from "next/link";
import React, { useState } from "react";
import { useAppDispatch } from "../../../../libs/store";
import { GetAllProductsByCategory } from "../../../../libs/store/Catalog";
import { ProductCategories } from "../../../../libs/utils/common";
import { BiCategoryAlt } from "react-icons/bi";

interface ProductProps {
  isProductPage: boolean;
}

const ProductSort: React.FC<ProductProps> = (props) => {
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();

  const displayProductByCategory = async (categoryName: string) => {
    await dispatch(
      GetAllProductsByCategory({
        catName: categoryName?.toString(),
        page: 1,
      })
    );
  };

  return (
    <div className="lg:w-1/4 lg:flex bg-white text-gray-800 hidden rounded-t-lg">
      <div className="space-y-2 w-full">
        <div className="flex items-center space-x-2 text-gray-50 bg-orange-500 p-2 rounded-t-lg pl-2">
          <BiCategoryAlt className=" h-6 w-6" />
          <h2 className="font-semibold ">All Categories</h2>
        </div>

        <div className="flex-1 px-3">
          <ul className=" pb-1 space-y-1 text-sm">
            {ProductCategories.map((categoryName, index) => {
              if (!props.isProductPage) {
                return (
                  <Link key={index} href={`/product/${categoryName.name}`}>
                    <a
                      rel="noopener noreferrer"
                      href="#"
                      className="flex items-center p-2 space-x-3 rounded-md text-sm hover:text-orange-500 font-normal hover:font-medium hover:bg-gray-50 hover:border-l-2 border-orange-500 rounded-t-lg"
                    >
                      <span>{categoryName.icon}</span>
                      <span>{categoryName.name}</span>
                    </a>
                  </Link>
                );
              }
              return (
                <button
                  key={index}
                  onClick={() => displayProductByCategory(categoryName.name)}
                  className="focus:outline-none mx-2 flex justify-start hover:text-gray-800 hover:cursor-pointer text-gray-600 rounded py-3 pl-4 items-center space-x-2 w-full "
                >
                  <p className="text-base leading-4 ">{categoryName.name}</p>
                </button>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default ProductSort;
