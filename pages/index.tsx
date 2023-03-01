import type { NextPage } from "next";
import React, { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Products from "../components/pages/user/catalog/Products";
import Order from "../components/pages/user/ordering/OrderDetails";
import Footer from "../components/widgets/footer";
import Navigation from "../components/widgets/navigation";
import Header from "../components/widgets/header";
import Testimonials from "../components/widgets/testimonials/testimonials";
import { useAppDispatch } from "../libs/store";
import { useRouter } from "next/router";
import ProductCarousel from "../components/pages/user/catalog/ProductCarousel";
import FeaturedProduct from "../components/pages/user/catalog/ProductFeatured";
import LoginNav from "../components/widgets/loginnav";
import SubscribeBanner from "../components/pages/user/catalog/SubscribeBanner";
import MarketingBanner from "../components/pages/user/catalog/MarketingBanner";
import TrendingProducts from "../components/pages/user/catalog/TrendingProducts";
import DisplayShops from "../components/pages/user/shops/DisplayShops";
import { getDiscountService } from "../libs/services/DiscountService/DiscountService";
import { getDiscountsSuccess } from "../libs/store/Discount";
import { DiscountModel } from "../libs/models/discount/DiscountModel";
import MarketingCTA from "../components/pages/user/catalog/MarketingCTA";
import ProductCarousell from "../components/widgets/ProductCarousel";

interface PageProps {
  discountData: DiscountModel[];
}

const Home: NextPage<PageProps> = ({ discountData }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const saveDiscounts = async () => {
      await dispatch(getDiscountsSuccess(discountData));
    };

    saveDiscounts().catch((error) => console.log("error has occurred"));
  });

  return (
    <div className="bg-gray-100">
      {/* <LoginNav /> */}
      {/* <Header /> */}
      <Navigation />
      {/*<Carousel />*/}
      <ProductCarousel />
      {/*<MarketingBanner />*/}
      <TrendingProducts />
      <Products isHome={true} />
      <MarketingCTA />
      <DisplayShops />
      {/*<FeaturedProduct />*/}
      {/* <Testimonials />*/}
      {/*<SubscribeBanner />*/}
      <Footer />
    </div>
  );
};

export async function getStaticProps() {
  var result = await getDiscountService();

  return {
    props: {
      discountData: result,
    },
  };
}

export default Home;
