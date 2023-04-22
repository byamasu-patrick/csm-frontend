import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { BillingAddressModel } from "../../../../libs/models/billing/BillingAddressModel";
import {
  BasketItem,
  OrderDetails,
} from "../../../../libs/models/user/basket/BasketModels";
import { useAppDispatch, useAppSelector } from "../../../../libs/store";
import { AuthSelector } from "../../../../libs/store/Auth";
import { BasketSelector, CheckoutBasket } from "../../../../libs/store/Basket";
import { ShippingSelector, GetAllCouries } from "../../../../libs/store/shipping";
import {
  BillingSelector,
  searchBillingAddressData,
} from "../../../../libs/store/Billing";
import { ProductSelector } from "../../../../libs/store/Catalog";
import { MalawiDistricts, MalawiRegions } from "../../../../libs/utils/common";
import shop from "../../../../pages/shop";
import GetShops from "../shops/GetShops";
import { Disclosure, Tab } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { Tabs } from "flowbite-react";
import DeliveryAddress from "../../../widgets/deliveryAddress";
import PaymentOptions from "../../../widgets/paymentOptions";


const OrderDetails = () => {
  const { cart, basketSearch, isCheckingOut } = useAppSelector(BasketSelector);
  const { user } = useAppSelector(AuthSelector);
  const [userName, setUserName] = useState(cart.userName);
  const [shippingPrice, setShippingPrice] = useState<number>(0.0);
  const [totalPrice, setTotalPrice] = useState<number>(cart.totalPrice);
  const [totalWeight, setTotalWeight] = useState<number>(cart.totalWeight);
  const [email, setEmail] = useState<string>(user?.email);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [couriername, setCouriername] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState<string>("Airtel Money");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [nationaId, setNationalId] = useState<string>("");
  const [orderStatus, setOrderStatus] = useState<string>("pending");
  const [checked, setChecked] = useState<string>("");
  // Redux Stores

  const { products } = useAppSelector(ProductSelector);
  const { couriers, isGetting} = useAppSelector(ShippingSelector);
  const dispatch = useAppDispatch();
  const router = useRouter();

  type RadioOption = {
    id: string;
    name: string;
    imageUrl: string;
    imageSize: string;
  };
  
  const radioOptions: RadioOption[] = [
    {
      id: "1",
      name: "AirtelMoney",
      imageUrl: "../../airtel.jpg",
      imageSize: "w-32 h-24",
    },
    {
      id: "2",
      name: "TNM Mpamba",
      imageUrl: "../../tnm.jpg",
      imageSize: "w-32 h-24",
    },
    {
      id: "3",
      name: "Standard Bank",
      imageUrl: "../../sbl.jpg",
      imageSize: "w-32 h-24",
    },
  ];
  const handleCourierChange = (courierName: string) => {
    setCouriername(courierName);
  };
  
  const handleLocationChange = (locationName: string) => {
    setDestination(locationName);
    const deliveryPrice = couriers.results
    .find((courier) => courier.name === couriername)
    ?.locationAddresses.find((address) => address.destination === destination)
    ?.prices.find((price) => cart.totalWeight >= price.fromKg && cart.totalWeight <= price.toKg)?.price;
    setShippingPrice(deliveryPrice || 0);
  };
  const handlePhoneNumberChange = (phoneNumber: string) => {
    setPhoneNumber(phoneNumber);
  };
  const handleNationalIdChange = (nationalId: string) => {
    setNationalId(nationalId);
  };
  const handleFirstNameChange = (firstname: string) => {
    setFirstName(firstname);
  };
  const handleLastNameChange = (lastName: string) => {
    setLastName(lastName);
    console.log(lastName)
  };
  const handlePaymentMethodChange = (paymentMethod: string) => {
    setPaymentMethod(paymentMethod);
  };
  
  useEffect(() => {
    const fetchCouriers = async () => {
      await dispatch(GetAllCouries(1));
    };
    fetchCouriers().catch((error) => console.log(error));
    console.log(fetchCouriers);
  }, []);
  var tax = 0;

  const handleChecked = (checkedString: string) => {
    setChecked(checkedString);
    setUserName(cart.userName)
    setTotalPrice(cart.totalPrice)
    setTotalWeight(cart.totalWeight)
    setFirstName(firstName)
    setLastName(lastName)
    setEmail(cart.userName)
    setNationalId(nationaId)
    setCouriername(couriername)
    setDestination(destination)
    setPhoneNumber(phoneNumber)
    setShippingPrice(shippingPrice)
    setPaymentMethod(paymentMethod)
    setOrderStatus(orderStatus)
  };


  useEffect(() => {
    if (cart === null && basketSearch.searchResult === null) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (cart === null && basketSearch.searchResult === null) {
      router.push("/");
    }
  }, [isCheckingOut]);

  const getProductId = (products: Array<BasketItem>): Array<string> => {
    return products.map((product) => product.productId);
  };

  const handleSubmit = async () => {
    if (userName && shippingPrice && paymentMethod && couriername) {

      var shopInfo: OrderDetails = {
        userName: userName,
        totalPrice: totalPrice,
        totalWeight: totalWeight,
        products: cart.items,
        firstName: firstName,
        lastName: lastName,
        emailAddress: email,
        phoneNumber: phoneNumber,
        nationalId: nationaId,
        courierName: couriername,
        physicalAddress: destination,
        shippingPrice: shippingPrice,
        paymentMethod: paymentMethod,
        orderStatus: orderStatus,
      };
       console.log(shopInfo)
      await dispatch(CheckoutBasket(shopInfo));
     
      setChecked("");
      setUserName("")
      setTotalPrice(0.0)
      setFirstName("")
      setLastName("")
      setEmail("")
      setNationalId("")
      setCouriername("")
      setDestination("")
      setPhoneNumber("")
      setShippingPrice(0.0)
      setPaymentMethod("")
      setOrderStatus("")

      router.push("/user/order-summary");
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please fill all the input",
        confirmButtonText: "OK",
        confirmButtonColor: "rgb(249 115 22)",
      });
    }
  };
  const [activeStatus, setActiveStatus] = useState(1);

  return (
    <div className="flex flex-col md:items-stretch relative md:flex-row justify-between max-w-7xl mx-auto">
      <div className="flex-1 overflow-x-auto relative sm:rounded-lg  px-2">
        <div className="w-full">
          <div className="max-w-screen-2xl px-1 md:px-2 mx-auto">
            <div className="bg-white gap-4 p-4 md:p-8">
              <h2 className="text-lg leading-6 font-bold">Delivery Address</h2>

              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg">
                      <span className="flex items-center mt-5 text-[rgb(11,115,164)] space-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 mr-1"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 4.5v15m7.5-7.5h-15"
                          />
                        </svg>
                        Add Shipping Address
                      </span>
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                    <form>
                        <div className="space-y-12">
                          <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold leading-7 text-gray-900">
                              Personal Information
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-gray-600">
                              Use a permanent address where you can receive mail.
                            </p>

                            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                              <div className="relative sm:col-span-3">
                                <label
                                  htmlFor="name"
                                  className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                                >
                                  firstName
                                </label>
                                <input
                                  type="text"
                                  name="name"
                                  id="name"
                                  value={firstName}
                                  onChange={(e) =>
                                    handleFirstNameChange(e.target.value)
                                  }
                                  className="px-3 block w-full outline-none rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                                  placeholder="Lloyd"
                                />
                              </div>
                              <div className="relative sm:col-span-3">
                                <label
                                  htmlFor="name"
                                  className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                                >
                                  Surname
                                </label>
                                <input
                                  type="text"
                                  name="name"
                                  id="name"
                                  value={lastName}
                                  onChange={(e) =>
                                    handleLastNameChange(e.target.value)
                                  }
                                  className="px-3 block w-full outline-none rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                                  placeholder="Chunga"
                                />
                              </div>

                              <div className="sm:col-span-4">
                                <div className="relative mt-2 rounded-md shadow-sm">
                                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className="text-gray-500 sm:text-sm">+265</span>
                                  </div>
                                  <label
                                    htmlFor="name"
                                    className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                                  >
                                    Phone number
                                  </label>
                                  <input
                                    type="text"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    value={phoneNumber}
                                    onChange={(e) =>
                                      handlePhoneNumberChange(e.target.value)
                                    }
                                    className="block w-full rounded-md border-0 py-3 pl-12 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 outline-none sm:text-sm sm:leading-6"
                                    placeholder=""
                                    aria-describedby="price-currency"
                                  />
                                </div>
                              </div>
                              <div className="sm:col-span-full">
                                <div className="relative mt-2 rounded-md shadow-sm">
                                  <label
                                    htmlFor="name"
                                    className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                                  >
                                    Nation ID Number
                                  </label>
                                  <input
                                    type="text"
                                    name="price"
                                    value={nationaId}
                                    onChange={(e) =>
                                      handleNationalIdChange(e.target.value)
                                    }
                                    id="price"
                                    className="block w-full rounded-md border-0 py-3 pl-12 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 outline-none sm:text-sm sm:leading-6"
                                    placeholder=""
                                    aria-describedby="price-currency"
                                  />
                                </div>
                              </div>

                              <div className="sm:col-span-3 sm:col-start-1 rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-amber-500">
                                <label
                                  htmlFor="Location"
                                  className="block text-xs font-medium text-gray-900"
                                >
                                  Select Courier
                                </label>
                                <select
                                  id="courier"
                                  name="courier"
                                  value={couriername}
                                  onChange={(e) =>
                                    handleCourierChange(e.target.value)
                                  }
                                  autoComplete="courier-name"
                                  className="relative block w-full outline-none bg-transparent py-1.5 text-gray-900 r ring-gray-300 focus:z-10 sm:text-sm sm:leading-6"
                                >
                                    {couriers?.results.map((courier, index) => (
                                      <option key={index} value={courier.name}>
                                        {courier.name} 
                                      </option>
                                    ))}
                              
                                </select>
                              </div>

                              <div className="sm:col-span-3 rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-amber-500">
                                <label
                                  htmlFor="Location"
                                  className="block text-xs font-medium text-gray-900"
                                >
                                  Location
                                </label>
                                <select
                                  id="location"
                                  name="location"
                                  value={destination}
                                  onChange={(e) =>
                                    handleLocationChange(e.target.value)
                                  }
                                  autoComplete="location-name"
                                  className="relative block w-full outline-none bg-transparent py-1.5 text-gray-900 r ring-gray-300 focus:z-10 sm:text-sm sm:leading-6"
                                >
                                    {/* Render options based on the selectedCourier */}
                                  {couriername &&
                                    couriers?.results
                                      .find((courier) => courier.name === couriername)
                                      ?.locationAddresses?.map((location, index) => (
                                        <option key={index} value={location.destination}>
                                          {location.destination}
                                        </option>
                                        ))}
                                </select>
                              </div>

                              <div className="sm:col-span-2 rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-amber-500 ">
                                <label
                                  htmlFor="Location"
                                  className="block text-xs font-medium text-gray-900"
                                >
                                  delivery amount(k)
                                </label>
                                <input
                                  id="weightRange"
                                  name="weightRange"
                                  type="text"
                                  value={shippingPrice}
                                  autoComplete="weightRange"
                                  readOnly
                                  className="relative block w-full outline-none bg-transparent py-2 text-gray-900 ring-gray-300 focus:z-10 sm:text-sm sm:leading-6"
                                />
                                  
                              </div>
                            </div>
                          </div>
                        </div>
                      </form>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="max-w-screen-2xl px-1 md:px-2 mx-auto mt-2">
            <div className="bg-white gap-4 p-4 md:p-8">
              <h2 className="text-lg leading-6 font-bold">Payment Methods</h2>

              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex w-full justify-between rounded-lg">
                      <span className="flex items-center mt-5 text-[rgb(11,115,164)] space-x-2">
                        Select Payment Method
                      </span>
                    </Disclosure.Button>
                    <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                      <div className="relative sm:col-span-3">
                        <label
                          htmlFor="name"
                          className="absolute -top-2.5 left-1/2 transform -translate-x-1/2 inline-block bg-white px-1 text-md font-medium text-gray-900"
                        >
                          Available payment methods
                        </label>
                        <div className="px-3 block w-full outline-none rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6">
                        <div className="flex justify-center items-center space-x-4">
                          {radioOptions.map((option) => (
                            <label
                              key={option.id}
                              className="inline-flex flex-col items-center cursor-pointer py-10"
                            >
                              <img
                                src={option.imageUrl}
                                alt={option.name}
                                className={` ${option.imageSize} border-2 ${
                                  paymentMethod === option.name
                                    ? "border-indigo-600"
                                    : "border-gray-300"
                                }`}
                              />
                              <input
                                type="radio"
                                id={option.id}
                                name="options"
                                value={option.id}
                                checked={paymentMethod === option.name}
                                onChange={() => handlePaymentMethodChange(option.name)}
                                className="sr-only"
                              />
                              <span className="text-sm font-medium text-gray-900">
                                {option.name}
                              </span>
                            </label>
                          ))}
                        </div>
                        </div>
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            </div>
          </div>
        </div>

        <div className="mt-2">
          <div className="max-w-screen-2xl px-1 md:px-2 mx-auto">
            <div className="sm:flex-row justify-between items-center bg-white gap-4 p-4 md:p-4">
              {cart.items.length >= 0 ? (
                cart.items.map((productItem, index) => {
                  return products?.results
                    .filter((product) => product.id === productItem.productId)
                    .map((product) => {
                      return (
                        // eslint-disable-next-line react/jsx-key
                        <div className="">
                          {/*first row*/}
                          <div className="flex mb-5">
                            <div className=" flex flex-1 items-center space-x-2">
                              <span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path d="M5.223 2.25c-.497 0-.974.198-1.325.55l-1.3 1.298A3.75 3.75 0 007.5 9.75c.627.47 1.406.75 2.25.75.844 0 1.624-.28 2.25-.75.626.47 1.406.75 2.25.75.844 0 1.623-.28 2.25-.75a3.75 3.75 0 004.902-5.652l-1.3-1.299a1.875 1.875 0 00-1.325-.549H5.223z" />
                                  <path
                                    fillRule="evenodd"
                                    d="M3 20.25v-8.755c1.42.674 3.08.673 4.5 0A5.234 5.234 0 009.75 12c.804 0 1.568-.182 2.25-.506a5.234 5.234 0 002.25.506c.804 0 1.567-.182 2.25-.506 1.42.674 3.08.675 4.5.001v8.755h.75a.75.75 0 010 1.5H2.25a.75.75 0 010-1.5H3zm3-6a.75.75 0 01.75-.75h3a.75.75 0 01.75.75v3a.75.75 0 01-.75.75h-3a.75.75 0 01-.75-.75v-3zm8.25-.75a.75.75 0 00-.75.75v5.25c0 .414.336.75.75.75h3a.75.75 0 00.75-.75v-5.25a.75.75 0 00-.75-.75h-3z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </span>
                              <span className="leading-6 font-semibold text-base">
                                Cloud Stores
                              </span>
                            </div>
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5 text-gray-500"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                              </svg>
                            </div>
                          </div>
                          {/*second row*/}
                          <div className="">
                            <div className="flex ">
                              <div>
                                <div>
                                  <img
                                    src={product.imageFile}
                                    alt="Apple Watch"
                                    width={150}
                                    height={150}
                                  />
                                </div>
                              </div>
                              <div className="flex-1 pl-5">
                                <div>
                                  <p className="leading-5 text-gray-600 font-semibold text-base">
                                    {productItem.productName}
                                  </p>
                                  <p className="text-sm font-medium leading-6 text-gray-400">
                                    {productItem.color}
                                  </p>
                                </div>
                                <div className="flex mt-2 flex-col space-y-3 md:flex-row">
                                  <span className="flex-1 leading-6 font-semibold text-sm text-gray-900">
                                    {" "}
                                    MK {productItem.price}
                                  </span>
                                  <span>
                                    <div className="flex items-center space-x-3">
                                      <button
                                        className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white rounded-full border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:text-gray-400  dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                        type="button"
                                      >
                                        <span className="sr-only">
                                          Quantity button
                                        </span>
                                        <svg
                                          className="w-4 h-4"
                                          aria-hidden="true"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                            clipRule="evenodd"
                                          ></path>
                                        </svg>
                                      </button>
                                      <div>
                                        <input
                                          type="number"
                                          id="product"
                                          className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg  block px-2.5 py-1"
                                          placeholder="1"
                                          required
                                        />
                                      </div>
                                      <button
                                        className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white rounded-full border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:text-gray-400  dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                        type="button"
                                      >
                                        <span className="sr-only">
                                          Quantity button
                                        </span>
                                        <svg
                                          className="w-4 h-4"
                                          aria-hidden="true"
                                          fill="currentColor"
                                          viewBox="0 0 20 20"
                                          xmlns="http://www.w3.org/2000/svg"
                                        >
                                          <path
                                            fillRule="evenodd"
                                            d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                            clipRule="evenodd"
                                          ></path>
                                        </svg>
                                      </button>
                                    </div>
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/*Third  row*/}
                          <div className="flex mt-5">
                            <div className=" flex flex-1 items-center space-x-2">
                              <span>
                                <p className="leading-6 text-sm font-semibold">
                                  Shipping: MK {shippingPrice}
                                </p>
                                <p className="leading-3 text-xs text-semibold">
                                  Estimated Delivery Time: 48hrs
                                </p>
                              </span>
                            </div>
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-5 h-5 text-gray-500"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      );
                    });
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </div>

      {/*cart detail summary*/}
      <div className="px-3">
        <div className="mt-2 p-5 w-full md:w-96 md:-mt-0 bg-white mb-5 shadow-md">
          <div>
            <p className="font-bold text-gray-800">CART TOTALS</p>
            <div className="flex items-center justify-between pt-10">
              <p className="font-semibold text-gray-800">Subtotal</p>
              <p className="text-base leading-none text-gray-800">
                MK{" "}
                {cart !== null || basketSearch.searchResult !== null
                  ? cart !== null
                    ? cart?.totalPrice
                    : basketSearch.searchResult?.totalPrice
                  : 0}
              </p>
            </div>
            <hr className="mt-5" />
            <div className="flex items-center justify-between pt-5">
              <p className="font-semibold text-gray-800">Shipping</p>
              <p className="text-gray-800">
                MK{" "} {shippingPrice}
              </p>
            </div>
            <hr className="mt-5" />
            <div className="flex items-center justify-between pt-5">
              <p className="font-semibold text-gray-800">Tax</p>
              <p className="text-base leading-none text-gray-800">
                MK{" "}
                {cart !== null || basketSearch.searchResult !== null ? tax : 0}
              </p>
            </div>
          </div>
          <hr className="mt-5" />
          <div className="mb-5">
            <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
              <p className="font-bold text-gray-800">Total</p>
              <p className="font-bold text-right text-gray-800">
                MK{" "}
                {cart !== null || basketSearch.searchResult !== null
                  ? tax +
                    shippingPrice +
                    (cart !== null
                      ? cart?.totalPrice
                      : basketSearch.searchResult?.totalPrice)
                  : 0}
              </p>
            </div>

            {cart !== null || basketSearch.searchResult !== null ? (
              <Link href={`/user/order`}>
                <button onClick={handleSubmit} className=" rounded-sm text-base leading-none w-full py-4 px-6 bg-orange-500 border-orange-500 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-white">
                  Pay now
                </button>
              </Link>
            ) : (
              <></>
            )}
          </div>
          <div className="p-30">
            <span className="text-sm leading-1 font-normal  text-slate-500">
              Upon clicking 'Place Order', I confirm I have read and
              acknowledged all{" "}
              <a href="#" className="text-orange-500">
                terms and conditions
              </a>{" "}
              .
            </span>
          </div>

          <hr className="mt-2" />
        </div>

        <div>
          <div className="mt-2 p-5 w-full md:w-96 bg-white mb-5 shadow-md">
            <div className="">
              <span className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6 text-orange-500"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                    clipRule="evenodd"
                  />
                </svg>

                <span className="text-md leading-6 font-bold text-slate-500 pl-2">
                  Cloud Stores
                </span>
              </span>
              <span className="text-xs leading-6 font-normal  text-slate-500">
                Cloud Stores Malawi keeps your information and payment safe
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default OrderDetails;
