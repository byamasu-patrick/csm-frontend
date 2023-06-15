/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ProductModel } from "../../../../libs/models/shops/catalogs/ProductModels";

interface Props {
  searchResults: ProductModel[];
}

const SearchResultsPage: React.FC<Props> = ({ searchResults }) => {
  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {searchResults.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <img src={product.imageFile} alt={product.name} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchResultsPage;
