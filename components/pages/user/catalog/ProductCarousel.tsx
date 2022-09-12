import React, { useState } from "react";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { useAppDispatch, useAppSelector } from "../../../../libs/store";
import { useRouter } from "next/router";
import { AuthSelector } from "../../../../libs/store/Auth";
import { BasketSelector } from "../../../../libs/store/Basket";
import { ProductSelector } from "../../../../libs/store/Catalog";

/* Install pure-react-carousel using -> npm i pure-react-carousel */

const ProductCarousel = () => {
    const { isAuthenticated, error, isLoading, tokenModel, user } = useAppSelector(AuthSelector);
    const { cart, basketSearch } = useAppSelector(BasketSelector);
    const { products } = useAppSelector(ProductSelector);
    const dispatch: any = useAppDispatch();
    const router = useRouter();

   

    const displayCarousel = () => {
        var counter: number = 0;

        return [...products].reverse().map((product, index) => {
            counter++;
            return (            
                (counter) < 5 ? 
                    <Slide index={counter - 1} key={index}>
                        <div className="gallery-cell lg:mr-7 mr-6 lg:w-1/2 sm:w-96 w-full h-full">
                            <div className="relative w-full h-full lg:block hidden">
                                <img src={product.imageFile} alt="sitting area" className="object-center object-cover w-full h-full" />
                                <div className="pl-6 pb-6 lg:pl-8 lg:pb-8 absolute left-0 bottom-0">
                                    <h1 className="text-xl leading-5 lg:text-2xl lg:leading-normal font-medium text-white">{product.name}</h1>
                                </div>
                            </div>
                            <div className="relative w-full h-full lg:hidden">
                                <img src={product.imageFile} alt="sitting area" className="object-center object-cover w-full h-full" />
                                <div className="pl-6 pb-6 lg:pl-8 lg:pb-8 absolute left-0 bottom-0">
                                    <h1 className="text-xl leading-5 lg:text-2xl lg:leading-normal font-medium text-white">{product.name}</h1>
                                </div>
                            </div>
                        </div>
                    </Slide>
                : <></>
            )
        })
    }
    const displayCarouselLargeScreen = () => {
        var counter: number = 0;

        return [...products].reverse().map((product, index) => {
            counter++;
            return (            
                (counter) < 6 ? 
                    <Slide index={counter - 1} key={index}>
                        <div className="gallery-cell w-full h-full">
                            <div className="bg-gray-800 bg-opacity-30 relative w-full h-full lg:block hidden">
                                <img src={product.imageFile} alt="sitting area" className="object-center object-cover w-full h-full" />
                                <img src="https://i.ibb.co/Tb5CKHn/Rectangle-49.png" alt="opacity bg" className="absolute w-full top-0" />
                                <div className="pl-6 pb-6 lg:pl-8 lg:pb-8 absolute left-0 bottom-0">
                                    <h1 className="text-xl leading-5 lg:text-2xl lg:leading-normal font-medium text-white">{product.name}</h1>
                                </div>
                            </div>
                            {/* <div className="relative w-full h-full lg:hidden">
                                <img src={product.imageFile} alt="sitting area" className="object-center object-cover w-full h-full" />
                                <div className="pl-6 pb-6 lg:pl-8 lg:pb-8 absolute left-0 bottom-0">
                                    <h1 className="text-xl leading-5 lg:text-2xl lg:leading-normal font-medium text-white">{product.name}</h1>
                                </div>
                            </div> */}
                        </div>
                    </Slide>
                : <></>
            )
        })
    }

    return (
        <div className="2xl:mx-auto 2xl:container flex justify-center bg-white">
            <div className="pb-12 w-full">
                {/* Carousel for Small-Sized Screen */}
                <CarouselProvider className="relative block sm:hidden" naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={5} visibleSlides={1} step={1} infinite={true}>
                    <div className="js-flickity flex justify-center items-center">
                        <ButtonBack role="button" aria-label="slide backward" className="w-12 h-12 md:w-14 md:h-14 rounded-full flex justify-center items-center bg-white border border-orange-300 hover:bg-orange-400 absolute z-30 left-0 ml-8 focus:outline-none focus:bg-orange-400 focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 cursor-pointer" id="prev">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 1L1 7L7 13" stroke="black" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonBack>
                        <Slider>
                            {
                                displayCarousel()
                            }
                        </Slider>
                        <ButtonNext role="button" aria-label="slide forward" className="w-12 h-12 md:w-14 md:h-14 rounded-full flex justify-center items-center bg-white border border-orange-300 hover:bg-orange-400 absolute z-30 right-0 mr-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500" id="next">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 7L1 13" stroke="black" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonNext>
                    </div>
                </CarouselProvider>
                {/* Carousel for Medium and Large-Sized Screen */}
                <CarouselProvider className="relative hidden sm:block" naturalSlideWidth={100} isIntrinsicHeight={true} totalSlides={5} visibleSlides={1} step={1} infinite={true} currentSlide={1}>
                    <div className="js-flickity flex justify-center items-center">
                        <ButtonBack role="button" aria-label="slide backward" className="w-12 h-12 md:w-14 md:h-14 rounded-full flex justify-center items-center bg-white border border-orange-300 hover:bg-orange-400 absolute z-30 left-0 ml-8 focus:outline-none focus:bg-orange-400 focus:ring-2 focus:ring-offset-2 focus:ring-orange-400 cursor-pointer" id="prev">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7 1L1 7L7 13" stroke="black" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonBack>
                        <Slider className="carousel__sliderLarge">
                            {
                                displayCarouselLargeScreen()
                            }
                        </Slider>
                        <ButtonNext role="button" aria-label="slide forward" className="w-12 h-12 md:w-14 md:h-14 rounded-full flex justify-center items-center bg-white border border-orange-300 hover:bg-orange-400 absolute z-30 right-0 mr-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500" id="next">
                            <svg width={8} height={14} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 1L7 7L1 13" stroke="black" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </ButtonNext>
                    </div>
                </CarouselProvider>
            </div>

            <style>
                {`
                    .gallery-cell {
                        height: 500px;
                        padding-right:15px;
                    }
                    @media (min-width: 300px) and (max-width: 420px) {
                        .gallery-cell {
                            height: 286px !important;
                            
                        }
                    }
                    
                    @media (max-width: 640px) {
                        .gallery-cell {
                            padding-right:0;
                        }
                    }

                    .carousel__sliderLarge {
                        padding-left: 20%;
                        padding-right: 20%;
                    }

                    /* gives us the illusion of spaces between the slides */
                    .carousel__inner-slideLarge {
                        width: calc(100% - 20px);
                        height: calc(100% - 20px);
                        left: 10px;
                        top: 10px;
                        
                    }
                `}
            </style>
        </div>
    );
}

export default ProductCarousel;