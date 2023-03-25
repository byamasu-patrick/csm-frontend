import React, { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../..//libs/store";

import { SearchUserProducts, GetAllProducts, ProductSelector } from "../../libs/store/Catalog";
const { products, productUserSearch, isGetting, productsOwner } =
 useAppSelector(ProductSelector);
 const dispatch = useAppDispatch();

const SearchField = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  /* use effect to change call api of search action when search filed changes
  useEffect(() => {
    const fetchProducts = async () => {
     var page = 1
      const searchData = {keyword: searchTerm, page};
      await dispatch(SearchUserProducts(searchData));
    };
    fetchProducts().catch((error) => console.log(error));
  }, [searchTerm]);
// end  */
  return (
    <div className="hidden lg:flex items-center w-full border-2  rounded-xl border-amber-500 ">
      <select
        className="block appearance-non px-4 py-2 rounded-l-lg leading-tight focus:outline-none text-sm font-medium border-r"
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="Electronics">Electronics</option>
        <option value="Fashion">Fashion</option>
        <option value="Home & Kitchen">Home & Kitchen</option>
      </select>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="flex-1 px-4 py-2 focus:outline-none"
        placeholder="Search products..."
      />
      <button
        className="bg-amber-500 text-white py-2 px-4 rounded-r-lg hover:bg-amber-600 focus:outline-none"
        type="button"
      >
        Search
      </button>
    </div>
  );
};

export default SearchField;
