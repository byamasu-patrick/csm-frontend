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
import { Alert, Carousel } from "flowbite-react";
import MarketingBanner from "./MarketingBanner";

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
      <div className="mt-5 max-w-7xl mx-auto rounded-lg h-auto mb-5">
        <div className="flex justify-between">
          <div className="w-full sm:w-full md:w-4/12 lg:w-3/12 bg-red mr-6 h-[530px] mb-6 p-1 rounded-lg z-0">
            <ProductSort isProductPage={false} />
          </div>
          <div className="flex-1 h-96 sm:h-64 rounded-lg xl:h-96 2xl:h-96 bg-[url('https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2532&q=80')]">
            <Carousel>
              <div className="flex h-full items-center justify-center  dark:text-black px-20">
                <section className="flex-1">
                  <h1 className="text-4xl font-semibold font-serif mb-6">
                    <span className="text-orange-500">
                      Buy with{" "}
                      {discountProduct !== undefined &&
                      filterProducts(discountProduct) !== undefined
                        ? (discountProduct.amount * 100) /
                          filterProducts(discountProduct).price
                        : 20}
                      % Off
                    </span>{" "}
                    <br />
                    <span>
                      On{" "}
                      {discountProduct !== undefined
                        ? discountProduct.productName
                        : "Everything"}
                    </span>
                  </h1>
                  <p className="text-lg max-w-md">
                    Explicabo esse amet error repudiandae earum suscipit fugiat
                    molestias, veniam, vel architecto veritatis delectus
                    repellat modi impedit sequi.
                  </p>
                  <a
                    href="#product"
                    className="inline-block mt-10 px-10 py-3 bg-orange-500 text-lg text-white font-semibold rounded-full"
                  >
                    Shop Now
                  </a>
                </section>
                <section className="">
                  <img src="../../iphone.png" height={200} width={200} />
                </section>
              </div>

              {/*second slider*/}
              <div className="flex h-full items-center justify-center dark:text-black">
                <div className="flex h-full items-center justify-center  dark:text-black px-20">
                  <section className="flex-1">
                    <h1 className="text-4xl font-semibold font-serif mb-6">
                      <span className="text-orange-500">
                        Buy with{" "}
                        {discountProduct !== undefined &&
                        filterProducts(discountProduct) !== undefined
                          ? (discountProduct.amount * 100) /
                            filterProducts(discountProduct).price
                          : 20}
                        % Off
                      </span>{" "}
                      <br />
                      <span>
                        On{" "}
                        {discountProduct !== undefined
                          ? discountProduct.productName
                          : "Everything"}
                      </span>
                    </h1>
                    <p className="text-lg max-w-md">
                      Explicabo esse amet error repudiandae earum suscipit
                      fugiat molestias, veniam, vel architecto veritatis
                      delectus repellat modi impedit sequi.
                    </p>
                    <a
                      href="#product"
                      className="inline-block mt-10 px-10 py-3 bg-orange-500 text-lg text-white font-semibold rounded-full"
                    >
                      Shop Now
                    </a>
                  </section>
                  <section className="">
                    <img src="../../iphone.png" height={200} width={200} />
                  </section>
                </div>
              </div>

              <div className="flex h-full items-center justify-center dark:text-black">
                Slide 3
              </div>
            </Carousel>
            <MarketingBanner />
          </div>
        </div>
      </div>
      {/* <div className="w-full flex pl-14 pt-3 bg-white mt-5 max-w-7xl mx-auto rounded-lg" >
       
            <div className="w-full sm:w-full md:w-4/12 lg:w-3/12 bg-white mr-6 h-[530px] mb-6 p-1 rounded-xl z-0" >
                <ProductSort isProductPage={false}/>
            </div>
            <div className="flex items-center space-x-10 justify-between pl-14">
            <div className="flex-1 ">
                        <h1 className="text-4xl font-semibold font-serif mb-6">
                            <span className="text-orange-500">Buy with {
                              discountProduct !== undefined && filterProducts(discountProduct) !== undefined ? ((discountProduct.amount * 100) / filterProducts(discountProduct).price) : 20
                            }% Off</span> <br />
                            <span>On {discountProduct !== undefined ? discountProduct.productName : "Everything"}</span>
                        </h1>
                        <p className="text-lg max-w-md">Explicabo esse amet error repudiandae earum suscipit fugiat molestias, veniam, vel architecto veritatis delectus repellat modi impedit sequi.</p>
                        <a href="#product" className="inline-block mt-10 px-10 py-3 bg-orange-500 text-lg text-white font-semibold">Shop Now</a>
                </div>
                <section >
                <img src="../../iphone.png" height={200} width={200}/>
                
                </section>
            </div> 
        </div>*/}

      {/*<div className="w-full bg-white">
            <div className="bg-gray-50 relative">
            <section className="">
                <div className="bg-[url('https://i.imgur.com/cZ1pVu9.png')] h-screen bg-cover bg-center flex justify-items-center items-center">
                    <div className="px-10 lg:px-28 xl:px-38">
                        <h1 className="text-6xl font-semibold font-serif mb-6">
                            <span className="text-orange-500">Buy with {
                              discountProduct !== undefined && filterProducts(discountProduct) !== undefined ? ((discountProduct.amount * 100) / filterProducts(discountProduct).price) : 20
                            }% Off</span> <br />
                            <span>On {discountProduct !== undefined ? discountProduct.productName : "Everything"}</span>
                        </h1>
                        <p className="text-lg max-w-md">Explicabo esse amet tempora quibusdam laudantium, laborum eaque magnam fugiat hic? Esse dicta aliquid error repudiandae earum suscipit fugiat molestias, veniam, vel architecto veritatis delectus repellat modi impedit sequi.</p>
                        <a href="#product" className="inline-block mt-10 px-10 py-3 bg-orange-500 text-lg text-white font-semibold">Shop Now</a>
                    </div>
                </div>
            </section>
            <section></section>
            </div>
                        </div>*/}

      <style>
        {`
        
            `}
      </style>
    </>
  );
};

// import React, { useEffect, useState } from "react";
// import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
// import "pure-react-carousel/dist/react-carousel.es.css";
// import { useAppDispatch, useAppSelector } from "../../../../libs/store";
// import { useRouter } from "next/router";
// import { AuthSelector } from "../../../../libs/store/Auth";
// import { BasketSelector } from "../../../../libs/store/Basket";
// import { ProductSelector } from "../../../../libs/store/Catalog";

// /* Install pure-react-carousel using -> npm i pure-react-carousel */

// const ProductCarousel = () => {
//     const { isAuthenticated, error, isLoading, tokenModel, user } = useAppSelector(AuthSelector);
//     const { cart, basketSearch } = useAppSelector(BasketSelector);
//     const { products } = useAppSelector(ProductSelector);
//     const dispatch: any = useAppDispatch();
//     const router = useRouter();

//    useEffect(() => {
//     // setInterval(() => {
//     //     //   let newSlide = this.state.currentSlide === CarouselData.length - 1 ? 0 : this.state.currentSlide + 1
//     //       setState({currentSlide: newSlide})
//     //     }
//     //   }, 3000)
//    }, []);

//     const displayCarousel = () => {
//         var counter: number = 0;

//         return [...products.results].reverse().map((product, index) => {
//             counter++;
//             return (
//                 (counter) < 5 ?
//                     <Slide index={counter - 1} key={index}>
//                         <div className="gallery-cell lg:mr-7 mr-6 lg:w-1/2 sm:w-96 w-full h-full">
//                             <div className="relative w-full h-full lg:block hidden">
//                                 <img src={product.imageFile} alt="sitting area" className="object-center object-cover w-full h-full" />
//                                 <div className="pl-6 pb-6 lg:pl-8 lg:pb-8 absolute left-0 bottom-0">
//                                     <h1 className="text-xl leading-5 lg:text-2xl lg:leading-normal font-medium text-white">{product.name}</h1>
//                                 </div>
//                             </div>
//                             <div className="relative w-full h-full lg:hidden">
//                                 <img src={product.imageFile} alt="sitting area" className="object-center object-cover w-full h-full" />
//                                 <div className="pl-6 pb-6 lg:pl-8 lg:pb-8 absolute left-0 bottom-0">
//                                     <h1 className="text-xl leading-5 lg:text-2xl lg:leading-normal font-medium text-white">{product.name}</h1>
//                                 </div>
//                             </div>
//                         </div>
//                     </Slide>
//                 : <></>
//             )
//         })
//     }
//     const displayCarouselLargeScreen = () => {
//         var counter: number = 0;

//         return [...products.results].reverse().map((product, index) => {
//             counter++;
//             return (
//                 (counter) < 6 ?
//                     <Slide index={counter - 1} key={index}>
//                         <div className="gallery-cell w-full h-full">
//                             <div className="bg-gray-800 bg-opacity-30 relative w-full h-full lg:block hidden">
//                                 <img src={product.imageFile} alt="sitting area" className="object-center object-cover w-full h-full" />
//                                 <img src="https://i.ibb.co/Tb5CKHn/Rectangle-49.png" alt="opacity bg" className="absolute w-full top-0" />
//                                 <div className="pl-6 pb-6 lg:pl-8 lg:pb-8 absolute left-0 bottom-0">
//                                     <h1 className="text-xl leading-5 lg:text-2xl lg:leading-normal font-medium text-white">{product.name}</h1>
//                                 </div>
//                             </div>
//                             <div className="relative w-full h-full lg:hidden">
//                                 <img src={product.imageFile} alt="sitting area" className="object-center object-cover w-full h-full" />
//                                 <div className="pl-6 pb-6 lg:pl-8 lg:pb-8 absolute left-0 bottom-0">
//                                     <h1 className="text-xl leading-5 lg:text-2xl lg:leading-normal font-medium text-white">{product.name}</h1>
//                                 </div>
//                             </div>
//                         </div>
//                     </Slide>
//                 : <></>
//             )
//         })
//     }

//     return (
//         <div className="2xl:mx-auto 2xl:container flex justify-center bg-white">
//             <div className="pb-12 w-full">
//                 {/* Carousel for Small-Sized Screen */}
//                 <CarouselProvider className="relative block sm:hidden" naturalSlideWidth={100} naturalSlideHeight={80} isIntrinsicHeight={true} totalSlides={5} visibleSlides={1} step={1} infinite={true}>
//                     <div className="js-flickity flex justify-center items-center">
//                         <ButtonBack role="button" aria-label="slide backward" className="w-12 h-12 md:w-14 md:h-14 rounded-full flex justify-center items-center bg-white border border-orange-300 hover:bg-orange-400 absolute z-30 left-0 ml-8 focus:outline-none focus:bg-orange-400 focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 cursor-pointer" id="prev">
//                             <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path d="M7 1L1 7L7 13" stroke="black" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
//                             </svg>
//                         </ButtonBack>
//                         <Slider>
//                             {
//                                 displayCarousel()
//                             }
//                         </Slider>
//                         <ButtonNext role="button" aria-label="slide forward" className="w-12 h-12 md:w-14 md:h-14 rounded-full flex justify-center items-center bg-white border border-orange-300 hover:bg-orange-400 absolute z-30 right-0 mr-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500" id="next">
//                             <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path d="M1 1L7 7L1 13" stroke="black" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
//                             </svg>
//                         </ButtonNext>
//                     </div>
//                 </CarouselProvider>
//                 {/* Carousel for Medium and Large-Sized Screen */}
//                 <CarouselProvider className="relative hidden sm:block" naturalSlideWidth={100} naturalSlideHeight={80} isIntrinsicHeight={true} totalSlides={5} visibleSlides={1} step={1} infinite={true} currentSlide={1}>
//                     <div className="js-flickity flex justify-center items-center">
//                         <ButtonBack role="button" aria-label="slide backward" className="w-12 h-12 md:w-14 md:h-14 rounded-full flex justify-center items-center bg-white border border-orange-300 hover:bg-orange-400 absolute z-30 left-0 ml-8 focus:outline-none focus:bg-orange-400 focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 cursor-pointer" id="prev">
//                             <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path d="M7 1L1 7L7 13" stroke="black" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
//                             </svg>
//                         </ButtonBack>
//                         <Slider className="carousel__sliderLarge">
//                             {
//                                 displayCarouselLargeScreen()
//                             }
//                         </Slider>
//                         <ButtonNext role="button" aria-label="slide forward" className="w-12 h-12 md:w-14 md:h-14 rounded-full flex justify-center items-center bg-white border border-orange-300 hover:bg-orange-400 absolute z-30 right-0 mr-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500" id="next">
//                             <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
//                                 <path d="M1 1L7 7L1 13" stroke="black" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
//                             </svg>
//                         </ButtonNext>
//                     </div>
//                 </CarouselProvider>
//             </div>

//             <style>
//                 {`
//                     .gallery-cell {
//                         height: 500px;
//                         padding-right:15px;
//                     }
//                     @media (min-width: 300px) and (max-width: 420px) {
//                         .gallery-cell {
//                             height: 286px !important;

//                         }
//                     }

//                     @media (max-width: 640px) {
//                         .gallery-cell {
//                             padding-right:0;
//                         }
//                     }

//                     .carousel__sliderLarge {
//                         padding-left: 20%;
//                         padding-right: 20%;
//                     }

//                     /* gives us the illusion of spaces between the slides */
//                     .carousel__inner-slideLarge {
//                         width: calc(100% - 20px);
//                         height: calc(100% - 20px);
//                         left: 10px;
//                         top: 10px;

//                     }
//                 `}
//             </style>
//         </div>
//     );
// }

export default ProductCarousel;
