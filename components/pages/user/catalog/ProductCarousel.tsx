import React, { useEffect, useState } from "react";
import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { useAppDispatch, useAppSelector } from "../../../../libs/store";
import { useRouter } from "next/router";
import { AuthSelector } from "../../../../libs/store/Auth";
import { BasketSelector } from "../../../../libs/store/Basket";
import { ProductSelector } from "../../../../libs/store/Catalog";


const ProductCarousel = () => {
    const { isAuthenticated, error, isLoading, tokenModel, user } = useAppSelector(AuthSelector);
    const { cart, basketSearch } = useAppSelector(BasketSelector);
    const { products } = useAppSelector(ProductSelector);
    const dispatch: any = useAppDispatch();
    const router = useRouter();

    const [trendingProduct, setTrendingProduct] = useState<string>('');

    useEffect(() => {
        if(products.results.length >= 1){
            setTrendingProduct(products.results.filter((products) => products.price < 50000 )[0].imageFile);
        }
    }, [products]);

    return (
        <>
        <div className="w-full bg-white">
            <div className="w-full relative">
            <div className="">
                <div className="flex flex-col-reverse justify-center lg:flex-row">              
                <div className="bg-orange-500 h-auto sm:w-full lg:w-5/12 py-8">
                    <div className="px-14 lg:py-10 md:py-10 py-6">
                    <p className="text-base leading-none text-center text-white">
                        #lookgoodfeelgood
                    </p>
                    <p className="md:text-4xl text-3xl font-semibold leading-9 text-center text-white py-3">
                        Brand Deal of the Month
                    </p>
                    <p className="text-2xl leading-normal text-center text-white py-3">
                        Get up to 20% off
                    </p>
                    <div className="flex justify-center gap-7 pt-3">
                        <svg
                        width={69}
                        height={11}
                        viewBox="0 0 69 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                            d="M5.70805 0.4375C2.83235 0.4375 0.459961 2.54109 0.459961 5.49758C0.459961 8.45387 2.83235 10.5577 5.70805 10.5577C7.67789 10.5577 9.41769 9.54075 10.3091 7.97293L8.52622 6.99667C8.00862 8.01404 6.95897 8.63274 5.70805 8.63274C3.91073 8.63274 2.54491 7.35391 2.54491 5.49758C2.54491 3.64124 3.91073 2.36241 5.70805 2.36241C6.95897 2.36241 8.00862 2.98129 8.52622 3.99885L10.3091 3.02258C9.41769 1.45514 7.67789 0.4375 5.70805 0.4375ZM12.8249 0.684927V10.3099H14.8381V6.18499H19.8704V10.3102H21.8831V0.684927H19.8704V4.26008H14.8381V0.684927H12.8249ZM28.3534 0.684927L23.8959 10.3102H26.096L27.0879 8.11027H32.35L33.3424 10.3102H35.542L31.0853 0.684927H28.3534ZM37.5552 0.684927V10.3102H39.424V2.73374L44.816 10.3102H46.6134V0.684927H44.7442V7.06534L40.2153 0.684927H37.5552ZM50.495 0.684927V10.3102L57.972 10.3106V8.52302H52.3641V6.32307H56.9652V4.53513H52.3641V2.47251H57.684V0.684935H50.495V0.684927ZM61.2069 0.684927V10.3102V10.3106H68.5399V8.38568H63.2201V0.684935H61.2069V0.684927ZM29.7192 2.26613L31.5454 6.3227H27.8929L29.7192 2.26613Z"
                            fill="white"
                        />
                        </svg>
                        <svg
                        width={69}
                        height={11}
                        viewBox="0 0 69 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <g clipPath="url(#clip0_2854_2865)">
                            <path
                            d="M6.98926 5.21234L8.04613 6.81896L10.172 3.57116V10.7656H12.0033V0.300484H10.1345L6.98926 5.21234Z"
                            fill="white"
                            />
                            <path
                            d="M1.8522 0.300483H0V10.7656H1.83588V3.57116L6.00393 9.95939L7.06713 8.32919L1.8522 0.300483Z"
                            fill="white"
                            />
                            <path
                            d="M23.0161 7.52179L24.7105 10.7656H26.919L21.3785 0.300715H19.3875L19.3858 0.303984L22.1599 5.85377H18.4736L19.4357 4.04454L18.4322 2.07844L13.7637 10.7656H15.8292L17.5742 7.52249L23.0161 7.52179Z"
                            fill="white"
                            />
                            <path
                            d="M39.1459 0.298736H37.3096V5.38075L39.1459 7.14844V0.298736Z"
                            fill="white"
                            />
                            <path
                            d="M30.2833 0.300483H28.415V10.7656H30.2521V2.94583L37.7788 10.7656H39.1461V9.49395L30.2833 0.300483Z"
                            fill="white"
                            />
                            <path
                            d="M51.9786 3.20275C51.1041 2.33233 49.7557 1.77492 48.243 1.77492C45.8288 1.77492 43.8334 3.19551 43.5151 5.03906H41.4932C41.7574 2.17757 44.8121 0.0683889 48.2678 0.0683889C50.3231 0.0683889 52.1697 0.802027 53.4129 1.98243L51.9786 3.20275Z"
                            fill="white"
                            />
                            <path
                            d="M48.0727 9.3035C46.0571 9.3035 44.3412 8.25662 43.7013 6.79214H41.6387C42.3208 9.31634 45.0026 11 48.1869 11C48.9262 11 49.777 10.93 50.4835 10.7619C52.0778 10.3838 53.8189 9.39057 53.8189 7.82269V5.04033H48.0515L48.0473 6.79214H51.9758V7.5874C51.9758 8.46553 50.6069 8.97345 49.7692 9.15178C49.3185 9.24772 48.7399 9.3035 48.2728 9.3035H48.0727Z"
                            fill="white"
                            />
                            <path
                            d="M69 5.54118C69 2.42012 66.0444 -0.00114059 62.414 -0.00114059C58.8988 -0.00114059 55.8105 2.30831 55.8105 5.37312C55.8105 8.26285 58.236 10.5781 61.5033 10.9453V9.197C59.3657 8.85947 57.7502 7.32871 57.7502 5.48772C57.7502 3.39932 59.8276 1.70516 62.3892 1.70516C64.952 1.70516 67.0287 3.39932 67.0287 5.48772C67.0287 7.31447 65.4385 8.83496 63.3258 9.1886V10.9406C66.4608 10.5753 69 8.34642 69 5.54118Z"
                            fill="white"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_2854_2865">
                            <rect width={69} height={11} fill="white" />
                            </clipPath>
                        </defs>
                        </svg>
                        <svg
                        width={69}
                        height={11}
                        viewBox="0 0 69 11"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <g clipPath="url(#clip0_2854_2885)">
                            <path
                            d="M1.25268 10.9991H0.28401C0.203187 10.9991 0.000976562 10.9991 0.000976562 10.8747C0.000976562 10.7923 0.0415397 10.7503 0.162624 10.7086C1.05168 10.4178 1.25238 9.92022 1.25238 9.21581V1.78513C1.25238 1.12084 1.05017 0.62293 0.162624 0.292338C0.0415397 0.292338 0.000976562 0.209302 0.000976562 0.167939C0.000976562 0.00217699 0.203187 0.0435398 0.28401 0.0435398H8.28191C10.0997 0.0435398 11.5948 1.53633 11.5948 3.40512C11.5948 5.27391 10.0997 6.76484 8.28191 6.76484H4.24225V9.29667C4.28281 9.96065 4.48441 10.4163 5.332 10.7077C5.45309 10.7493 5.49335 10.791 5.49335 10.8737C5.49335 10.9981 5.29144 10.9981 5.21061 10.9981H1.25268V10.9991ZM60.8805 6.9732H62.7791L60.8805 3.65268L60.678 3.32053L58.9828 6.9732H60.8805ZM60.8805 0.000932995H62.1734L67.5861 9.79738C67.7481 10.0462 67.9494 10.295 68.1915 10.4194C68.3934 10.5858 68.6356 10.6277 68.8375 10.7102C68.9186 10.7521 68.9992 10.7938 68.9992 10.8765C68.9992 11.0009 68.7973 11.0009 68.7161 11.0009H63.9091C63.8286 11.0009 63.5855 11.0009 63.5855 10.8765C63.5855 10.7938 63.6666 10.7521 63.7481 10.7102C63.9902 10.6277 64.1513 10.503 64.2324 10.2542C64.3135 9.96314 64.2324 9.798 64.0305 9.42356C63.7562 8.82458 63.4737 8.22974 63.1829 7.63905H58.6583L58.6183 7.72178C58.5775 7.88816 58.2551 8.46817 58.0129 9.09173C57.6902 9.75571 57.5688 9.92147 57.6497 10.2536C57.6905 10.5024 57.8918 10.6268 58.134 10.7098C58.2154 10.7518 58.2551 10.7935 58.2551 10.8759C58.2551 11.0003 58.0526 11.0003 57.972 11.0003H55.7499C55.6693 11.0003 55.4668 11.0003 55.4668 10.8759C55.4668 10.7935 55.5077 10.7515 55.6285 10.7098C55.831 10.6271 56.0725 10.5855 56.2748 10.4191C56.5169 10.2947 56.7194 10.0459 56.8802 9.79707L57.1632 9.17507L60.2336 2.57382L59.7886 1.78513C59.3854 1.12084 58.981 0.705966 58.5366 0.456857C58.3347 0.332457 58.1325 0.332457 57.9312 0.249421C57.8101 0.207747 57.7692 0.166073 57.8101 0.0830366C57.8101 0 57.8906 0.0416738 57.9312 0H60.8808L60.8805 0.000932995ZM48.8024 10.9571H48.964C56.3977 10.9571 56.3171 0.0410518 48.964 0.0410518H42.8641C42.743 0.0410518 42.5414 -0.000621996 42.5414 0.165451C42.5414 0.206814 42.6219 0.28985 42.7024 0.28985C43.5912 0.580323 43.7922 1.07854 43.8334 1.70147V9.29885C43.7934 9.96252 43.5912 10.4184 42.7024 10.7095C42.6219 10.7515 42.5414 10.7932 42.5414 10.8759C42.5414 11.0003 42.7433 11.0003 42.8641 11.0003H46.7827V10.9583H48.8024V10.9571ZM48.8024 0.830366C49.3482 0.832575 49.8711 1.05626 50.2571 1.4527C50.6432 1.84915 50.8611 2.38624 50.8635 2.94702V8.01069C50.8612 8.5715 50.6433 9.10864 50.2572 9.5051C49.8711 9.90156 49.3482 10.1252 48.8024 10.1273H46.7812V0.830366H48.8024ZM33.4099 6.9732H35.3085L33.4099 3.65268L33.2076 3.32053L31.5125 6.9732H33.4099ZM33.4099 0.000932995H34.7418L40.1551 9.79738C40.2762 10.0462 40.4784 10.295 40.7209 10.4194C40.9225 10.5858 41.1656 10.6277 41.4078 10.7102C41.4883 10.7521 41.5688 10.7938 41.5688 10.8765C41.5688 11.0009 41.3266 11.0009 41.2461 11.0009H36.4406C36.3595 11.0009 36.1576 11.0009 36.1576 10.8765C36.1576 10.7938 36.1975 10.7521 36.3186 10.7102C36.5211 10.6277 36.7224 10.503 36.7633 10.2542C36.8438 9.96314 36.7633 9.798 36.6016 9.42356C36.3186 8.80156 35.9962 8.22 35.7135 7.63905H31.1877L31.1474 7.72178C31.1071 7.88816 30.8241 8.46817 30.542 9.09173C30.2593 9.75571 30.0979 9.92147 30.1787 10.2536C30.2596 10.5024 30.4209 10.6268 30.6631 10.7098C30.7436 10.7518 30.8244 10.7935 30.8244 10.8759C30.8244 11.0003 30.6225 11.0003 30.5017 11.0003H28.3195C28.2387 11.0003 27.9962 11.0003 27.9962 10.8759C27.9962 10.7935 28.077 10.7515 28.1578 10.7098C28.4 10.6271 28.6022 10.5855 28.845 10.4191C29.0466 10.2947 29.2894 10.0459 29.4102 9.79707L29.6929 9.17507L32.8038 2.57382L32.3601 1.78513C31.9562 1.12084 31.5125 0.705966 31.1078 0.456857C30.8656 0.332457 30.7036 0.332457 30.4612 0.249421C30.38 0.207747 30.2992 0.166073 30.3401 0.0830366C30.3809 0 30.4612 0.0416738 30.502 0H33.4105L33.4099 0.000932995ZM20.0782 7.26399C21.0075 7.59551 22.1388 7.67824 23.0272 7.38839L26.5423 10.5015L26.825 10.7503C26.8405 10.7665 26.8521 10.7862 26.8592 10.8077C26.8663 10.8292 26.8686 10.8521 26.8659 10.8747C26.8659 10.9991 26.6637 10.9991 26.5825 10.9991H22.8662L20.0788 8.63331L17.8161 6.76515V9.33897C17.8569 9.96097 18.0991 10.4178 18.9473 10.7074C19.0281 10.7493 19.0684 10.7907 19.0684 10.8734C19.0684 10.9978 18.8662 10.9978 18.785 10.9978H13.8972C13.7761 10.9978 13.5739 10.9978 13.5739 10.8734C13.5739 10.7907 13.655 10.749 13.7352 10.7074C14.7039 10.3758 14.825 9.87762 14.8665 9.09017V1.90953C14.8259 1.16313 14.7048 0.62293 13.7352 0.292338C13.6544 0.292338 13.5739 0.209302 13.5739 0.167939C13.5739 0.00217699 13.7761 0.0435398 13.8972 0.0435398H21.7749C22.2028 0.0416571 22.6269 0.126392 23.023 0.292907C23.419 0.459421 23.7792 0.704453 24.0831 1.01401C24.387 1.32357 24.6285 1.69159 24.7939 2.09705C24.9594 2.50252 25.0454 2.93749 25.0472 3.37713V3.40512C25.0503 4.29256 24.7102 5.14493 24.1019 5.77492C23.4935 6.40491 22.6665 6.76097 21.8028 6.76484H19.2297C19.3508 7.01363 19.6335 7.09698 19.8757 7.22169C19.9568 7.22169 19.9968 7.26399 20.0779 7.26399H20.0782ZM20.0782 5.97739H20.403C21.4531 5.97739 22.3422 4.81488 22.3422 3.32053C22.3404 1.86786 21.4516 0.705966 20.403 0.705966H17.8158V5.97739H20.0782ZM6.54466 0.706277H4.24225V5.9777H6.90882C7.99857 5.9777 8.84616 4.81519 8.84616 3.32084C8.84616 1.86848 7.99857 0.706277 6.90882 0.706277H6.54466Z"
                            fill="white"
                            />
                        </g>
                        <defs>
                            <clipPath id="clip0_2854_2885">
                            <rect width={69} height={11} fill="white" />
                            </clipPath>
                        </defs>,
                        </svg>
                    </div>
                    <button
                      type="button"
                      className="mx-12 inline-flex my-8 justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-orange-500 hover:text-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      Shop Now
                    </button>
                    <button
                      type="button"
                      className="inline-flex my-8 justify-center rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-orange-500 hover:text-orange-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    >
                      View Similar Products
                    </button>
                    </div>
                </div>
                <div className="sm:w-full lg:w-7/12 p-12 h-[330px]">
                    <img
                    src={ trendingProduct }
                    className="w-[400px] mx-auto lg:block md:block hidden h-full"
                    />
                    <img
                    src="https://tuk-cdn.s3.amazonaws.com/can-uploader/ec4.png"
                    className="w-[400px] lg:hidden md:hidden block "
                    />
                </div>
                </div>
            </div>
            </div>
        </div>

        <style>
            {`
        
            `}
        </style>
        </>
    );
}


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