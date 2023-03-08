import React, { useState } from "react";
import { ProductModel } from "../../../../libs/models/shops/catalogs/ProductModels";
import SearchField from "./SearchField";

const ProductSearch = () => {
  const [searchResults, setSearchResults] = useState<ProductModel[]>([]);

  const handleSearch = (results: ProductModel[]) => {
    setSearchResults(results);
  };

  return (
    <div>
      <h1>Product Search</h1>
      <SearchField onSearch={handleSearch} />
      {searchResults.length > 0 && (
        <div>
          <h2>Search Results</h2>
          <ul>
            {searchResults.map((product) => (
              <li key={product.id}>{product.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProductSearch;
