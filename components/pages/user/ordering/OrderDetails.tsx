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

const OrderDetails = () => {
  const [isDistrict, setIsDistrict] = useState<boolean>(false);
  const [isRegion, setIsRegion] = useState<boolean>(false);
  const [isCountry, setIsCountry] = useState<boolean>(false);
  const [zipCode, setZipCode] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [addressLine, setAddressLine] = useState<string>("");
  const [district, setDistrict] = useState<string>("City");
  const [region, setRegion] = useState<string>("Region");
  const [country, setCountry] = useState<string>("Contry");
  const [cardName, setCardName] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expireDate, setExpireDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [checked, setChecked] = useState<string>("");
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
    };
    getAllBillingAddresses().catch((error) =>
      console.log("Error during searching billing informations")
    );
  }, []);

  useEffect(() => {
    if (billingAddresses.length > 0 && billingData === null) {
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
    billingData = billingAddresses.filter(
      (billing) => billing.cardNumber === checkedString
    )[0];
    setZipCode(billingData.zipCode);
    setEmail(billingData.emailAddress);
    setAddressLine(billingData.addressLine);
    setDistrict(billingData.state);
    setCountry(billingData.country);
    setCardName(billingData.cardName);
    setCardNumber(billingData.cardNumber);
    setExpireDate(billingData.expiration);
    setCvv(billingData.cvv);
  };

  const handleDistrict: Function = (dist: string) => {
    setDistrict(dist);
    setIsDistrict(false);
  };
  const handleRegion: Function = (regionVal: string) => {
    setRegion(regionVal);
    setIsRegion(false);
  };
  const handleCoutry: Function = (ctry: string) => {
    setCountry(ctry);
    setIsCountry(false);
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
    if (cardName && cardNumber && cvv && zipCode) {
      var productIds =
        cart !== null
          ? getProductId(cart.items)
          : getProductId(basketSearch?.searchResult?.items);

      var shopInfo: OrderDetails = {
        userName:
          cart !== null
            ? String(cart?.userName)
            : String(basketSearch.searchResult?.userName),
        products: productIds,
        firstName: String(user?.profile?.firstName),
        lastName: String(user?.profile?.lastName),
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
        zipCode: zipCode,
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
      <div className="flex-1 overflow-x-auto relative sm:rounded-lg mt-10 px-2">
        <div className="w-full">
          <div className="max-w-screen-2xl px-1 md:px-2 mx-auto">
            <div className="bg-white gap-4 p-4 md:p-8">
              <h2 className="text-lg leading-6 font-bold">Shipping Address</h2>

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
                      If you're unhappy with your purchase for any reason, email
                      us within 90 days and we'll refund you in full, no
                      questions asked.If you're unhappy with your purchase for
                      any reason, email us within 90 days and we'll refund you
                      in full, no questions asked.If you're unhappy with your
                      purchase for any reason, email us within 90 days and we'll
                      refund you in full, no questions asked.If you're unhappy
                      with your purchase for any reason, email us within 90 days
                      and we'll refund you in full, no questions asked.``
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
                      <div>
                        <div className="sm:hidden relative w-11/12 mx-auto bg-white">
                          <div className="absolute inset-0 m-auto mr-4 z-0 w-6 h-6">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-selector"
                              width={24}
                              height={24}
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="#A0AEC0"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path stroke="none" d="M0 0h24v24H0z" />
                              <polyline points="8 9 12 5 16 9" />
                              <polyline points="16 15 12 19 8 15" />
                            </svg>
                          </div>
                          <select
                            aria-label="Selected tab"
                            className="form-select block w-full p-3 border border-gray-300 rounded text-gray-600 appearance-none bg-transparent relative z-10"
                          >
                            <option className="text-sm text-gray-600">
                              Airtel Money{" "}
                            </option>
                            <option className="text-sm text-gray-600">
                              TNM Mpamba{" "}
                            </option>
                          </select>
                        </div>
                        <div className="xl:w-full xl:mx-0 h-12 hidden  sm:block bg-white my-5">
                          <ul className="flex px-5 bg-gray-50 items-center align-middle">
                            <li
                              onClick={() => setActiveStatus(1)}
                              className={
                                activeStatus == 1
                                  ? "text-sm border-orange-500 pt-3 rounded-t text-orange-600 mr-12"
                                  : "text-sm text-gray-600 py-3 flex items-center mr-12 hover:text-orange-600 cursor-pointer"
                              }
                            >
                              <div className="flex items-center mb-3">
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                                    />
                                  </svg>
                                </span>
                                <span className="ml-1 font-normal">
                                  Airtel Money
                                </span>
                              </div>
                              {activeStatus == 1 && (
                                <div className="w-full h-1 bg-orange-600 rounded-t-md" />
                              )}
                            </li>

                            <li
                              onClick={() => setActiveStatus(4)}
                              className={
                                activeStatus == 4
                                  ? "text-sm border-orange-500 pt-3 rounded-t text-orange-600 mr-12"
                                  : "text-sm text-gray-600 py-3 flex items-center mr-12 hover:text-orange-600 cursor-pointer"
                              }
                            >
                              <div className="flex items-center mb-3">
                                <span>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="w-6 h-6"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                                    />
                                  </svg>
                                </span>
                                <span className="ml-1 font-normal">
                                  TNM Mpamba
                                </span>
                              </div>
                              {activeStatus == 4 && (
                                <div className="w-full h-1 bg-orange-600 rounded-t-md" />
                              )}
                            </li>
                          </ul>
                        </div>
                        {activeStatus === 1 ? (
                          <div className="md:px-32">
                            <label
                              htmlFor="website-admin"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Phone Number
                            </label>
                            <div className="flex">
                              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                                +265
                              </span>
                              <input
                                type="int"
                                id=""
                                className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-[rgb(11,115,164)] focus:border-[rgb(11,115,164)] block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 "
                                placeholder="for example 997372121"
                              />
                            </div>
                            <div>
                              <button
                                type="submit"
                                className="inline-flex mt-2 items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-[rgb(11,115,164)] rounded-sm focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-orange-500"
                              >
                                Save & Confirm
                              </button>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                        {activeStatus === 4 ? (
                          <div className="md:px-32">
                            <label
                              htmlFor="website-admin"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Phone Number
                            </label>
                            <div className="flex">
                              <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l-md">
                                +265
                              </span>
                              <input
                                type="int"
                                id=""
                                className="rounded-none rounded-r-lg bg-gray-50 border text-gray-900 focus:ring-[rgb(11,115,164)] focus:border-[rgb(11,115,164)] block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5 "
                                placeholder="for example 887372121"
                              />
                            </div>
                            <div>
                              <button
                                type="submit"
                                className="inline-flex mt-2 items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-[rgb(11,115,164)] rounded-sm focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-orange-500"
                              >
                                Save & Confirm
                              </button>
                            </div>
                          </div>
                        ) : (
                          <></>
                        )}
                        {activeStatus === 2 ? <div></div> : <></>}
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
                                Bule Official Store
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
                                  Shipping: MK 1,000
                                </p>
                                <p className="leading-3 text-xs text-semibold">
                                  Estimated Delivery Time: 4hrs
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
        <div className="mt-2 p-5 w-full md:w-96 md:mt-10 bg-white mb-5 shadow-md">
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
                MK{" "}
                {cart !== null || basketSearch.searchResult !== null
                  ? shippment
                  : 0}
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
                    shippment +
                    (cart !== null
                      ? cart?.totalPrice
                      : basketSearch.searchResult?.totalPrice)
                  : 0}
              </p>
            </div>

            {cart !== null || basketSearch.searchResult !== null ? (
              <Link href={`/user/order`}>
                <button className=" rounded-sm text-base leading-none w-full py-4 px-6 bg-orange-500 border-orange-500 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-white">
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
