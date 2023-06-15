import { useState, useEffect } from "react";
import { GetProductsByName } from "../../../../libs/services/CatalogService/ProductService";
import { ProductModel } from "../../../../libs/models/shops/catalogs/ProductModels";
import axios from "axios";
import { catalogClient } from "../../../../libs/services/CatalogService/catalogClient";

interface Props {
  onSearch: (products: ProductModel[]) => void;
}

const SearchField: React.FC<Props> = ({ onSearch }) => {
  const [searchResults, setSearchResults] = useState<ProductModel[]>([]);
  const [keyword, setKeyword] = useState("");

  const handleSearch = (results: ProductModel[]) => {
    setSearchResults(results);
  };

  useEffect(() => {
    if (searchResults.length > 0) {
      handleSearch(searchResults);
    }
  }, [searchResults]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchTerm = keyword;

    try {
      const response = await catalogClient.get(
        `/Catalog/GetProductByName/${searchTerm}`
      );

      const searchResults = response.data as ProductModel[];
      onSearch(searchResults);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
          className="block w-full px-4 py-2 text-gray-800 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="Search products..."
        />
        <button
          type="submit"
          className="absolute top-0 right-0 px-3 py-2 text-gray-400 hover:text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
      </form>
      {searchResults.length > 0 && (
        <div className="absolute z-10 w-full mt-2 bg-white rounded-md shadow-lg">
          {searchResults.map((product) => (
            <div key={product.id} className="px-4 py-2">
              <p className="text-gray-800">{product.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchField;
