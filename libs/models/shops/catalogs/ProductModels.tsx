import slugify from "slugify";
export interface ProductModel {
  id: string;
  name: string;
  category: string;
  summary: string;
  description: string;
  imageFile: string;
  price: number;
  itemsInStock: number;
  userId: string;
  slug: string;
}

export interface ProductResponse {
  currentPage: number;
  results: ProductModel[];
  totalPages: number;
}

export interface AddProductModel {
  name: string;
  category: string;
  summary: string;
  description: string;
  imageFile: string;
  price: number;
  itemsInStock: number;
  userId: string;
}

export interface ProductSearchModel {
  searchResult: ProductModel | null;
  isSearching: boolean;
  error: string | null;
}

export interface GetProductByCategoryModel {
  catName: string;
  page: number;
}
