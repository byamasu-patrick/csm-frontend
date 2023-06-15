import React, { useEffect, useState } from "react";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { useAppDispatch, useAppSelector } from "../../../../libs/store";
import { useRouter } from "next/router";
import { AuthSelector } from "../../../../libs/store/Auth";
import { BasketSelector } from "../../../../libs/store/Basket";
import { ProductSelector } from "../../../../libs/store/Catalog";
import { DiscountSelector } from "../../../../libs/store/Discount";
import { DiscountModel } from "../../../../libs/models/discount/DiscountModel";
import ProductSort from "./ProductSort";
import Carousel from "./Carousel";
import MarketingBanner from "./MarketingBanner";
import ProductDetail from "../../../../pages/user/settings/ProductPage";

const ProductCarousel = () => {
  const { isAuthenticated, error, isLoading, tokenModel, user } =
    useAppSelector(AuthSelector);
  const { cart, basketSearch } = useAppSelector(BasketSelector);
  const { products } = useAppSelector(ProductSelector);

  const filterProducts = (discountProd: DiscountModel) => {
    return products.results.filter((product) => {
      if (discountProd !== undefined) {
        return product.id === discountProd.productId ? product : undefined;
      } else {
        return undefined;
      }
    })[0];
  };

  const { discounts } = useAppSelector(DiscountSelector);
  var discountProduct: DiscountModel | null = discounts[0];
  var indexValue: number = 0;

  const [trendingProduct, setTrendingProduct] = useState<string>("");

  useEffect(() => {
    if (products.results.length >= 1) {
      setTrendingProduct(
        products.results.filter((products) => products.price < 50000)[0]
          .imageFile
      );
    }
  }, [products]);

  useEffect(() => {
    for (let i = 0; i < discounts.length; i++) {
      setTimeout(function timer() {
        let product = filterProducts(discounts[i]);
        console.log("Here is the discount: ", product);

        // if(product !== undefined){
        // }
        discountProduct = discounts[i];

        indexValue++;
        if (i === discounts.length) {
          i = 0;
        }
      }, 3000);
    }
  }, [products]);

  return (
    <>
      <div className=" max-w-7xl mx-auto rounded-lg mt-5 ">
        <div className="flex justify-between">
          <ProductSort isProductPage={false} />

          <div className="w-full px-5  lg:px-0 lg:pl-5 lg:w-3/4">
            <Carousel />
            <MarketingBanner />
          </div>
        </div>
      </div>

      <style>
        {`
        
            `}
      </style>
    </>
  );
};

export default ProductCarousel;
