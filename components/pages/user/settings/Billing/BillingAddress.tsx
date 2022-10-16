import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { MalawiDistricts, MalawiRegions } from "../../../../../libs/utils/common";
import CurrentBillingAddress from "./CurrentBillingAddress";

const BillingAddress = () => {
    const [isDistrict, setIsDistrict] = useState<boolean>(false);
    const [isRegion, setIsRegion] = useState<boolean>(false);
    const [isCountry, setIsCountry] = useState<boolean>(false);

    const [district, setDistrict] = useState<string>("City");
    const [region, setRegion] = useState<string>("Region");
    const [country, setCountry] = useState<string>("Contry");
    const [cardName, setCardName] = useState<string>("");
    const [cardNumber, setCardNumber] = useState<string>("");
    const [expireDate, setExpireDate] = useState<string>("");
    const [cvv, setCvv]  = useState<string>("");
    const [zipCode, setZipCode] = useState<string>("");
    const [email, setEmail]  = useState<string>("");
    const [addressLine, setAddressLine] = useState<string>("");
    const router = useRouter();
    
    var tax = 2500;
    var shippment = 12000;

    const handleDistrict: Function = (dist: string) => {
        setDistrict(dist);
        setIsDistrict(false);
    };
    const handleRegion: Function = (regionVal: string) => {
        setRegion(regionVal);
        setIsRegion(false);
    }
    const handleCoutry: Function = (ctry: string) => {
        setCountry(ctry);
        setIsCountry(false);
    }

    // const getProductId = (products: Array<BasketItem>): Array<string> => {
    //     return products.map((product) => product.productId);
    // }

    const handleSubmit = async () => {
        // if(cardName && cardNumber && cvv && zipCode ){
        //     var productIds = cart !== null ? getProductId(cart.items) : getProductId(basketSearch?.searchResult?.items);

        //     var shopInfo: OrderDetails = {
        //         userName: cart !== null ? String(cart?.userName) : String(basketSearch.searchResult?.userName),
        //         products: productIds,
        //         firstName: String( user?.profile?.firstName),
        //         lastName: String( user?.profile?.lastName),
        //         cardName: cardName,
        //         cardNumber: cardNumber,
        //         addressLine: addressLine,
        //         cvv: cvv,
        //         state: district,
        //         country: country,
        //         emailAddress: email,
        //         expiration: expireDate,
        //         paymentMethod: 1,
        //         totalPrice: Number(cart?.totalPrice),
        //         zipCode: zipCode
        //     };
        //     await dispatch(CheckoutBasket(shopInfo));        
        //     setCardName("");
        //     setCardNumber("");
        //     setAddressLine("");
        //     setCvv("");
        //     setCountry("Country");
        //     setDistrict("City");
        //     setEmail("");
        //     setExpireDate("");
        //     setZipCode("");
        //     setAddressLine("");
        //     setRegion("Region");

        //     router.push("/user/order-summary");
    
        // }
        // else{
        //     Swal.fire({
        //         icon: 'error',
        //         title: 'Oops...',
        //         text: "Please fill all the input",
        //         confirmButtonText: 'OK',
        //         confirmButtonColor: 'rgb(249 115 22)',
        //     });
        // }
    }

    return (
        <div className="overflow-y-hidden flex justify-between">            
            {/* <div className="flex justify-start items-start 2xl:container 2xl:mx-auto lg:py-8 md:py-12 py-9 px-4 md:px-6 lg:px-20 xl:px-44 "> */}
                <div className="flex w-6/12 flex-col lg:flex-row justify-center items-center lg:space-x-10 2xl:space-x-36 space-y-12 lg:space-y-0">
                    <div className="flex w-full flex-col justify-start items-start">
                        
                        <div className="mt-8 flex flex-col justify-start items-start w-full space-y-8 ">
                            <input 
                                value={cardName}
                                onChange={(evt) => setCardName(evt.target.value)}
                                className="px-2 py-3 appearance-none block w-full border border-gray-600 shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm focus:ring-orange-500 focus:border-orange-500" type="text" placeholder="Car Name" />                            
                            <input 
                                value={cardNumber}
                                onChange={(evt) => setCardNumber(evt.target.value)}
                                className="px-2 py-3 appearance-none block w-full border border-gray-600 shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm focus:ring-orange-500 focus:border-orange-500" type="text" placeholder="Card Number" />
                            <div className="flex justify-between flex-col sm:flex-row w-full items-start space-y-8 sm:space-y-0 sm:space-x-8">
                                <div className="w-full">
                                    <input 
                                        value={expireDate}
                                        onChange={(evt) => setExpireDate(evt.target.value)}
                                        className="px-2 py-3 appearance-none block w-full border border-gray-600 shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm focus:ring-orange-500 focus:border-orange-500" type="text" placeholder="Expiration date (03/23)" />
                                </div>
                                <div className="w-full">
                                    <input 
                                        value={cvv}
                                        onChange={(evt) => setCvv(evt.target.value)}
                                        className="px-2 py-3 appearance-none block w-full border border-gray-600 shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm focus:ring-orange-500 focus:border-orange-500" type="text" placeholder="CVV" />
                                </div>
                            </div>   
                            <input 
                                value={email}
                                onChange={(evt) => setEmail(evt.target.value)}
                                className="px-2 py-3 appearance-none block w-full border border-gray-600 shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm focus:ring-orange-500 focus:border-orange-500" type="text" placeholder="Email Address" />
                            <input                                
                                onChange={(evt) => setAddressLine(evt.target.value)}
                                className="px-2 py-3 appearance-none block w-full border border-gray-600 shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm focus:ring-orange-500 focus:border-orange-500" type="text" placeholder="Address (line 02)" />
                            <div className="flex justify-between flex-col sm:flex-row w-full items-start space-y-8 sm:space-y-0 sm:space-x-8">
                                <div className="relative w-full">
                                    <p id="button1" className=" px-2 border border-gray-600 text-left leading-4 text-base text-gray-600 py-4 w-full">
                                        {district}
                                    </p>
                                    <button onClick={() => setIsDistrict(!isDistrict)} className="focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full cursor-pointer absolute bottom-4 right-0 mr-4">
                                        <svg id="close" className={`transform ${isDistrict ? "rotate-180" : ""} `} width={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 6L8 10L4 6" stroke="#4B5563" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <div className={`shadow absolute z-10 bg-white top-10 overflow-y-auto w-full mt-3 ${isDistrict ? "" : "hidden"}`}>
                                        <div className="flex flex-col  w-full">
                                            {
                                                MalawiDistricts.map((district, index) => {
                                                    return (
                                                        <p key={index} tabIndex={0} onClick={() => handleDistrict(district)} className="focus:outline-none cursor-pointer px-3 hover:text-white hover:bg-orange-600 focus:bg-orange-600 focus:text-white text-left  text-base text-gray-600 py-2 w-full">
                                                            {district}
                                                        </p>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="relative w-full">
                                    <p id="button2" className=" px-2 border border-gray-600 text-left leading-4 text-base text-gray-600 py-4 w-full">
                                        {region}
                                        <span className="text-gray-400"> (opt)</span>
                                    </p>
                                    <button onClick={() => setIsRegion(!isRegion)} className="focus:outline-none  focus:ring-2 focus:ring-gray-500 rounded-full cursor-pointer absolute bottom-4 right-0 mr-4">
                                        <svg id="close2" className={` transform ${isRegion ? "rotate-180" : ""}  `} width={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 6L8 10L4 6" stroke="#4B5563" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <div className={`shadow absolute z-10 bg-white top-10  w-full mt-3 ${isRegion ? "" : "hidden"}`}>
                                        <div className="flex flex-col  w-full">

                                            {
                                                MalawiRegions.map((region, index) => {
                                                    return (
                                                        <p key={index} tabIndex={0} onClick={() => handleRegion(region)} className="                                            
                                                            focus:outline-none cursor-pointer px-3 hover:text-white 
                                                            hover:bg-orange-600 focus:bg-orange-600 focus:text-white text-left
                                                            text-base text-gray-600 py-2 w-full">
                                                                {region}
                                                        </p>
                                                    )
                                                })
                                            }
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-between flex-col sm:flex-row w-full items-start space-y-8 sm:space-y-0 sm:space-x-8">
                                <div className="relative w-full">
                                    <p id="button3" className=" px-2 border border-gray-600 text-left leading-4 text-base text-gray-600 py-4 w-full">
                                        {country}
                                    </p>
                                    <button onClick={() => setIsCountry(!isCountry)} className="focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full cursor-pointer absolute bottom-4 right-0 mr-4">
                                        <svg id="close3" className={` transform ${isCountry ? "rotate-180" : ""}  `} width={16} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 6L8 10L4 6" stroke="#4B5563" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <div id="menu3" className={`shadow absolute z-10 bg-white top-10  w-full mt-3 ${isCountry ? "" : "hidden"}`}>
                                        <div className="flex flex-col  w-full">
                                            <p tabIndex={0} onClick={() => handleCoutry("Malawi")}  className="                                            
                                            focus:outline-none cursor-pointer px-3 hover:text-white 
                                            hover:bg-orange-600 focus:bg-orange-600 focus:text-white text-left
                                            text-base text-gray-600 py-2 w-full">
                                                Malawi
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full">
                                    <input                                        
                                        value={zipCode}
                                        onChange={(evt) => setZipCode(evt.target.value)}
                                        className="px-2 py-3 appearance-none block w-full border border-gray-600 shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm focus:ring-orange-500 focus:border-orange-500" type="text" placeholder="Zip Code" />
                                </div>
                            </div>
                        </div>
                        <button 
                            onClick={() => handleSubmit()}
                            className="focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 mt-8 text-base font-medium focus:ring-2 focus:ring-ocus:ring-orange-800 leading-4 hover:bg-orange py-4 w-full md:w-4/12 lg:w-full text-white bg-orange-600">Proceed to payment</button>
                        <div className="mt-4 flex justify-start items-center w-full">
                            <Link href={`/user/carts`}>
                                <a href="#" className="text-base leading-4 underline focus:outline-none focus:text-gray-500  hover:text-gray-800 text-gray-600">
                                    Back to my bag
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex w-5/12 flex-col lg:flex-row justify-center items-center lg:space-x-10 2xl:space-x-36 lg:space-y-0">
                    <CurrentBillingAddress />
                </div>
            {/* </div> */}
        </div>
    );
}

export default BillingAddress;
