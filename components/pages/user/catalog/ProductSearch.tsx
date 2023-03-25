import React, { useState } from "react";
import { ProductModel } from "../../../../libs/models/shops/catalogs/ProductModels";
import SearchField from "./SearchField";
import SearchResultsPage from "./SearchResultsPage";

const ProductSearch = () => {
  const [searchResults, setSearchResults] = useState<ProductModel[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = (results: ProductModel[]) => {
    setSearchResults(results);
    setShowResults(true);
  };

  return (
    <div>
      <h1>Product Search</h1>
      <SearchField onSearch={handleSearch} />
      {showResults && <SearchResultsPage searchResults={searchResults} />}
    </div>
  );
};

export default ProductSearch;
