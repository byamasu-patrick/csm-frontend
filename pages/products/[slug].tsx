/* eslint-disable @next/next/no-img-element */
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import { ProductModel } from "../../libs/models/shops/catalogs/ProductModels";
import { GetAllProducts } from "../../libs/store/Catalog";

const ProductScreen = ({ product }: { product: ProductModel }) => {
  return <div>ProductScreen</div>;
};

export default ProductScreen;
