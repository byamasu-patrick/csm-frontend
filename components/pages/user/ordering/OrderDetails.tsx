import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { BillingAddressModel } from "../../../../libs/models/billing/BillingAddressModel";
import { BasketItem, OrderDetails } from "../../../../libs/models/user/basket/BasketModels";
import { useAppDispatch, useAppSelector } from "../../../../libs/store";
import { AuthSelector } from "../../../../libs/store/Auth";
import { BasketSelector, CheckoutBasket } from "../../../../libs/store/Basket";
import { BillingSelector, searchBillingAddressData } from "../../../../libs/store/Billing";
import { ProductSelector } from "../../../../libs/store/Catalog";
import { MalawiDistricts, MalawiRegions } from "../../../../libs/utils/common";

const OrderDetails = () => {
    const [isDistrict, setIsDistrict] = useState<boolean>(false);
    const [isRegion, setIsRegion] = useState<boolean>(false);
    const [isCountry, setIsCountry] = useState<boolean>(false);
    const [zipCode, setZipCode] = useState<string>("");
    const [email, setEmail]  = useState<string>("");
    const [addressLine, setAddressLine] = useState<string>("");
    const [district, setDistrict] = useState<string>("City");
    const [region, setRegion] = useState<string>("Region");
    const [country, setCountry] = useState<string>("Contry");
    const [cardName, setCardName] = useState<string>("");
    const [cardNumber, setCardNumber] = useState<string>("");
    const [expireDate, setExpireDate] = useState<string>("");
    const [cvv, setCvv]  = useState<string>("");
    const [ checked, setChecked ] = useState<string>('');
    // Redux Stores
    const { cart, basketSearch, isCheckingOut } = useAppSelector(BasketSelector);
    const { user } = useAppSelector(AuthSelector);
    const { products } = useAppSelector(ProductSelector);
    const { billingAddresses } = useAppSelector(BillingSelector);
    const dispatch = useAppDispatch();
    const router = useRouter();
    var tax = 2500;
    var shippment = 12000;
    let billingData: BillingAddressModel | null = null;

    
    useEffect(() => {

        const getAllBillingAddresses = async () => {
            await dispatch(searchBillingAddressData(user?.email));
        }
        getAllBillingAddresses().catch(error => console.log("Error during searching billing informations"))

    }, []);

    useEffect(() => {

        if(billingAddresses.length > 0 && billingData === null){
            billingData = billingAddresses[0];
            setZipCode(billingData.zipCode);
            setEmail(billingData.emailAddress);
            setAddressLine(billingData.addressLine);
            setDistrict(billingData.state);
            setCountry(billingData.country);
            setCardName(billingData.cardName);
            setCardNumber(billingData.cardNumber);
            setExpireDate(billingData.expiration);
            setCvv(billingData.cvv);
        }

    }, [billingAddresses]);
    
    const handleChecked = (checkedString: string) => {
        setChecked(checkedString);
        billingData = billingAddresses.filter((billing) => billing.cardNumber === checkedString)[0];
        setZipCode(billingData.zipCode);
        setEmail(billingData.emailAddress);
        setAddressLine(billingData.addressLine);
        setDistrict(billingData.state);
        setCountry(billingData.country);
        setCardName(billingData.cardName);
        setCardNumber(billingData.cardNumber);
        setExpireDate(billingData.expiration);
        setCvv(billingData.cvv);
    }
    

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

    useEffect(() => {
        if(cart === null && basketSearch.searchResult === null){
            router.push('/');
        }
    }, []);

    useEffect(() => {
        if(cart === null && basketSearch.searchResult === null){            
            router.push('/');
        }
    }, [isCheckingOut]);

    const getProductId = (products: Array<BasketItem>): Array<string> => {
        return products.map((product) => product.productId);
    }

    const handleSubmit = async () => {
        if(cardName && cardNumber && cvv && zipCode ){
            var productIds = cart !== null ? getProductId(cart.items) : getProductId(basketSearch?.searchResult?.items);

            var shopInfo: OrderDetails = {
                userName: cart !== null ? String(cart?.userName) : String(basketSearch.searchResult?.userName),
                products: productIds,
                firstName: String( user?.profile?.firstName),
                lastName: String( user?.profile?.lastName),
                cardName: cardName,
                cardNumber: cardNumber,
                addressLine: addressLine,
                cvv: cvv,
                state: district,
                country: country,
                emailAddress: email,
                expiration: expireDate,
                paymentMethod: 1,
                totalPrice: Number(cart?.totalPrice),
                zipCode: zipCode
            };
            await dispatch(CheckoutBasket(shopInfo));        
            setCardName("");
            setCardNumber("");
            setAddressLine("");
            setCvv("");
            setCountry("Country");
            setDistrict("City");
            setEmail("");
            setExpireDate("");
            setZipCode("");
            setAddressLine("");
            setRegion("Region");

            router.push("/user/order-summary");
    
        }
        else{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Please fill all the input",
                confirmButtonText: 'OK',
                confirmButtonColor: 'rgb(249 115 22)',
            });
        }
    }

    return (
        <div className="overflow-y-hidden">            
            <div className="flex justify-center items-center 2xl:container 2xl:mx-auto lg:py-8 md:py-12 py-9 px-4 md:px-6 lg:px-20 xl:px-44 ">
                <div className="flex w-full sm:w-9/12 lg:w-full flex-col lg:flex-row justify-center items-center lg:space-x-10 2xl:space-x-36 space-y-12 lg:space-y-0">
                    <div className="flex w-full flex-col justify-start items-start">
                        <div>
                            <p className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9 text-gray-800">Check out</p>
                        </div>
                        <div className="mt-2">
                           <Link href="/user/carts">
                                <a className="text-base leading-4 underline  hover:text-gray-800 text-gray-600">
                                    Back to my bag
                                </a>
                           </Link>
                        </div>
                        <div className="mt-6">
                            <p className="text-xl font-semibold leading-5 text-gray-800">Shipping Details</p>
                        </div>
                        <div className="mb-2 mt-2 flex -mx-2">
                            <div className="px-2">
                                <label htmlFor="type1" className="flex items-center cursor-pointer">
                                    <input type="radio" className="form-radio h-5 w-5 text-orange-500" name="type" id="type1" checked />
                                    <img src="https://i.imgur.com/4JuWFSP.png" className="h-8 ml-3" />
                                </label>
                            </div>
                            {/* TNM Mpamba => https://i.imgur.com/bZJKUAr.png
                                Airtel Money => https://i.imgur.com/drWNyAg.png */}
                            <div className="px-2">
                                <label htmlFor="type2" className="flex items-center cursor-pointer">
                                    <input type="radio" className="form-radio h-5 w-5 text-orange-500" name="type" id="type2" />
                                    <img src="https://www.sketchappsources.com/resources/source-image/PayPalCard.png" className="h-8 ml-3" />
                                </label>
                            </div>
                            <div className="px-2">
                                <label htmlFor="type3" className="flex items-center cursor-pointer">
                                    <input type="radio" className="form-radio h-5 w-5 text-orange-500" name="type" id="type3" />
                                    <img src="https://i.imgur.com/bZJKUAr.png" className="h-8 ml-3" />
                                </label>
                            </div>
                            <div className="px-2">
                                <label htmlFor="type4" className="flex items-center cursor-pointer">
                                    <input type="radio" className="form-radio h-5 w-5 text-orange-500" name="type" id="type4" />
                                    <img src="https://i.imgur.com/drWNyAg.pngg" className="h-8 ml-3" />
                                </label>
                            </div>
                        </div>
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
                                value={addressLine}                          
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
                    <div className="flex flex-col justify-start items-start bg-gray-50 w-full p-6 md:p-14">                        
                               
                        <div className="flex justify-between xl:h-full  items-stretch w-full flex-col my-6 md:mt-0">
                            <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-4 md:space-y-0 md:flex-row  items-center md:items-start ">
                                
                                <div className="w-full bg-gray-100 px-4 py-4 rounded-md flex justify-center md:justify-start  items-center md:items-start">
                                    <p className="w-full text-base font-semibold text-center md:text-left text-gray-800">Credit Informations</p>
                                </div>
                                <p>Please select the credit card you want to use:</p>
                                {
                                    billingAddresses.length > 0 ? (
                                        billingAddresses.map((billing, index) => {
                                            return (
                                                <div 
                                                    onClick={() => handleChecked(billing.cardNumber)}
                                                    key={billing.firstName+billing.id} className="w-full shadow-sm bg-white hover:bg-gray-100 hover:cursor-pointer px-4 py-4 rounded-md flex justify-center md:justify-start  items-center md:items-start flex-col ">
                                                    <p className="w-full font-semibold text-center md:text-left text-sm leading-5 text-gray-600 text-md">{billing.cardName}</p>
                                                    <p className="flex justify-between w-full font-semibold text-center md:text-left text-sm leading-5 text-gray-600 "><span className="txt-lg">{billing.cardNumber.substring(0, 4)}-{billing.cardNumber.substring(4, 8)}-{billing.cardNumber.substring(8, 12)}****</span>
                                                       {
                                                        checked === billing.cardNumber ?
                                                            (
                                                            <svg fill="#000000" xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 26 26" width="20px" height="20px">
                                                                <path d="M 22.566406 4.730469 L 20.773438 3.511719 C 20.277344 3.175781 19.597656 3.304688 19.265625 3.796875 L 10.476563 16.757813 L 6.4375 12.71875 C 6.015625 12.296875 5.328125 12.296875 4.90625 12.71875 L 3.371094 14.253906 C 2.949219 14.675781 2.949219 15.363281 3.371094 15.789063 L 9.582031 22 C 9.929688 22.347656 10.476563 22.613281 10.96875 22.613281 C 11.460938 22.613281 11.957031 22.304688 12.277344 21.839844 L 22.855469 6.234375 C 23.191406 5.742188 23.0625 5.066406 22.566406 4.730469 Z"/>
                                                            </svg>
                                                            ) : <></>
                                                       }
                                                    </p>
                                                    {/* <p className="w-full text-center md:text-left text-sm leading-5 text-gray-600">Expires: {billing.expiration}</p> */}
                                                </div>
                                            )
                                        })
                                    ) : (<></>)
                                }
                            </div>
                        </div>
                        <div>
                            <h1 className="text-2xl font-semibold leading-6 text-gray-800">Order Summary</h1>
                        </div>
                        <div className="flex mt-7 flex-col items-end w-full space-y-6">
                            <div className="flex justify-between w-full items-center">
                                <p className="text-lg leading-4 text-gray-600">Total items</p>
                                <p className="text-lg font-semibold leading-4 text-gray-600">{(cart !== null) || (basketSearch.searchResult !== null) ? (cart !== null) ? cart.items.length : basketSearch.searchResult?.items.length : 0}</p>
                            </div>
                            <div className="flex justify-between w-full items-center">
                                <p className="text-lg leading-4 text-gray-600">Total Charges</p>
                                <p className="text-lg font-semibold leading-4 text-gray-600">MK {(cart !== null) || (basketSearch.searchResult !== null) ? (cart !== null) ? cart.totalPrice : basketSearch.searchResult?.totalPrice : 0}</p>
                            </div>
                            <div className="flex justify-between w-full items-center">
                                <p className="text-lg leading-4 text-gray-600">Shipping charges</p>
                                <p className="text-lg font-semibold leading-4 text-gray-600">MK {(cart !== null) || (basketSearch.searchResult !== null) ? shippment : 0}</p>
                            </div>
                            <div className="flex justify-between w-full items-center">
                                <p className="text-lg leading-4 text-gray-600">Tax charges</p>
                                <p className="text-lg font-semibold leading-4 text-gray-600">MK {(cart !== null) || (basketSearch.searchResult !== null) ? tax : 0}</p>
                            </div>
                            <div className="flex justify-between w-full items-center">
                                <p className="text-lg leading-4 text-gray-600">Sub total </p>
                                <p className="text-lg font-semibold leading-4 text-gray-600">MK { ((cart !== null) || (basketSearch.searchResult !== null)) ? (tax + shippment + (cart !== null ? cart?.totalPrice : basketSearch.searchResult?.totalPrice)) : 0}</p>
                            </div>
                        </div>
                        <div className="flex justify-between w-full items-center mt-32">
                            <p className="text-xl font-semibold leading-4 text-gray-800">Estimated Total </p>
                            <p className="text-lg font-semibold leading-4 text-gray-800">MK  {(cart !== null) || (basketSearch.searchResult !== null) ? (cart !== null) ? cart.totalPrice : basketSearch.searchResult?.totalPrice : 0}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderDetails;
