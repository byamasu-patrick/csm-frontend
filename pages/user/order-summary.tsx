import { useRouter } from "next/router";
import React, { ReactElement, useState, useEffect } from "react";
import ClientLayout from "../../components/layouts/clients-layout";
import { OrderDetails } from "../../libs/models/user/basket/BasketModels";
import { GetProductsById } from "../../libs/services/CatalogService/ProductService";
import { GetOrdersByUsername } from "../../libs/services/OrderingService/OrderService";
import { useAppDispatch, useAppSelector } from "../../libs/store";
import { AuthSelector } from "../../libs/store/Auth";
import {
  BasketSelector,
  GetOrderedProductsByUsername,
} from "../../libs/store/Basket";
import {
  BillingSelector,
  searchBillingAddressData,
} from "../../libs/store/Billing";
import { ProductSelector } from "../../libs/store/Catalog";
import { NextPageWithLayout } from "../_app";

const OrderSummary: NextPageWithLayout = () => {
  const { user } = useAppSelector(AuthSelector);
  const { products } = useAppSelector(ProductSelector);
  const { ordersByUser, isOrderedFecthing } = useAppSelector(BasketSelector);
  const { billingAddresses } = useAppSelector(BillingSelector);
  const [isOrdersFetched, setIsOrdersFetched] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  var orderedProducts: OrderDetails[] = [];

  useEffect(() => {
    if (user === null) {
      router.push("/signin");
    }
    const fetchData = async () => {
      await dispatch(
        GetOrderedProductsByUsername(
          user?.profile?.firstName + " " + user?.profile?.lastName
        )
      );

      // console.log("Ordered Product Info: ", ordersByUser);
    };
    fetchData().catch((error) => console.log("Error occured"));
    setIsOrdersFetched(true);

    const getAllBillingAddresses = async () => {
      await dispatch(searchBillingAddressData(user?.email));
    };
    getAllBillingAddresses().catch((error) =>
      console.log("Error during searching billing informations")
    );
  }, []);

  return (
    <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <div className="flex justify-start item-start space-y-2 flex-col ">
        <h1 className="text-3xl lg:text-4xl font-semibold leading-7 lg:leading-9  text-gray-800">
          Your Ordered Products
        </h1>
      </div>
      {isOrdersFetched ? (
        <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch  w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
          <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
            <div className="flex flex-col justify-start items-start px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
              {/* <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 text-gray-800">Order&apos;s Bag</p> */}
              {isOrdersFetched && ordersByUser.length > 0 ? (
                ordersByUser.map((order, index) => {
                  return order.products.map((productId) => {
                    let product = GetProductsById(productId).catch((error) =>
                      console.log(error)
                    );

                    console.log("Fetched order: ", product);
                    return products.results
                      .filter((product) => product.id == productId)
                      .map((productData, ind) => {
                        return (
                          <div
                            key={ind + index}
                            className="mt-4 md:mt-6 flex  flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full "
                          >
                            <div className="pb-4 md:pb-8 w-full md:w-40">
                              <img
                                className="w-full hidden md:block"
                                src={productData.imageFile}
                                alt="dress"
                              />
                            </div>
                            <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full  pb-8 space-y-4 md:space-y-0">
                              <div className="w-full flex flex-col justify-start items-start space-y-8">
                                <h3 className="text-xl xl:text-2xl font-semibold leading-6 text-gray-800">
                                  {productData.name}
                                </h3>
                                <div className="flex justify-start items-start flex-col space-y-2">
                                  <p className="text-sm leading-none text-gray-800">
                                    <span className="text-gray-300">
                                      Style:{" "}
                                    </span>{" "}
                                    Italic Minimal Design
                                  </p>
                                  <p className="text-sm leading-none text-gray-800">
                                    <span className="text-gray-300">
                                      Size:{" "}
                                    </span>{" "}
                                    Small
                                  </p>
                                  <p className="text-sm leading-none text-gray-800">
                                    <span className="text-gray-300">
                                      Color:{" "}
                                    </span>{" "}
                                    Light Blue
                                  </p>
                                </div>
                              </div>
                              <div className="flex justify-between space-x-8 items-start w-full">
                                <p className="text-base xl:text-lg leading-6">
                                  MK {productData.price}
                                  {/* <span className="text-red-300 line-through"> $45.00</span> */}
                                </p>
                                <p className="text-base xl:text-lg leading-6 text-gray-800">
                                  01
                                </p>
                                {/* <p className="text-base xl:text-lg font-semibold leading-6 text-gray-800">$36.00</p> */}
                              </div>
                            </div>
                          </div>
                        );
                      });
                  });
                })
              ) : (
                <></>
              )}
            </div>

            <div className="flex justify-center md:flex-row flex-col items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
              <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full space-y-6   ">
                <h3 className="text-xl font-semibold leading-5 text-gray-800">
                  Summary
                </h3>
                <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200 border-b pb-4">
                  <div className="flex justify-between  w-full">
                    <p className="text-base leading-4 text-gray-800">
                      Subtotal
                    </p>
                    <p className="text-base leading-4 text-gray-600">
                      K 175000.00
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base leading-4 text-gray-800">
                      Discount{" "}
                      <span className="bg-gray-200 p-1 text-xs font-medium leading-3  text-gray-800">
                        STUDENT
                      </span>
                    </p>
                    <p className="text-base leading-4 text-gray-600">
                      K -65750.00 (50%)
                    </p>
                  </div>
                  <div className="flex justify-between items-center w-full">
                    <p className="text-base leading-4 text-gray-800">
                      Shipping
                    </p>
                    <p className="text-base leading-4 text-gray-600">
                      K 5600.00
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full">
                  <p className="text-base font-semibold leading-4 text-gray-800">
                    Total
                  </p>
                  <p className="text-base font-semibold leading-4 text-gray-600">
                    K 88336.00
                  </p>
                </div>
              </div>
              <div className="flex flex-col justify-center px-4 py-6 md:p-6 xl:p-8 w-full space-y-6   ">
                <h3 className="text-xl font-semibold leading-5 text-gray-800">
                  Shipping
                </h3>
                <div className="flex justify-between items-start w-full">
                  <div className="flex justify-center items-center space-x-4">
                    <div className="w-8 h-8">
                      <img
                        className="w-full h-full"
                        alt="logo"
                        src="https://i.ibb.co/L8KSdNQ/image-3.png"
                      />
                    </div>
                    <div className="flex flex-col justify-start items-center">
                      <p className="text-lg leading-6 font-semibold text-gray-800">
                        DPD Delivery
                        <br />
                        <span className="font-normal">
                          Delivery with 24 Hours
                        </span>
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold leading-6 text-gray-800">
                    K 5600.00
                  </p>
                </div>
                <div className="w-full flex justify-center items-center">
                  <button className="hover:bg-orange focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 py-5 w-96 md:w-full hover:bg-orange-600 bg-orange-500 text-base font-medium leading-4 text-white">
                    View Carrier Details
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-6 md:p-6 xl:p-8 flex-col ">
            <h3 className="text-xl font-semibold leading-5 text-gray-800">
              Customer
            </h3>
            <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
              <div className="flex flex-col justify-start items-start flex-shrink-0">
                <div className="flex justify-center  w-full  md:justify-start items-center space-x-4 py-8 border-b border-gray-200">
                  <img
                    src="https://i.ibb.co/5TSg7f6/Rectangle-18.png"
                    alt="avatar"
                  />
                  <div className=" flex justify-start items-start flex-col space-y-2">
                    <p className="text-base font-semibold leading-4 text-left text-gray-800">
                      {user?.profile?.firstName + " " + user?.profile?.lastName}
                    </p>
                    <p className="text-sm leading-5 text-gray-600">
                      10 Previous Orders
                    </p>
                  </div>
                </div>

                <div className="flex justify-center  md:justify-start items-center space-x-4 py-4 border-b border-gray-200 w-full">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5Z"
                      stroke="#1F2937"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M3 7L12 13L21 7"
                      stroke="#1F2937"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className="cursor-pointer text-sm leading-5 text-gray-800">
                    {user?.email}
                  </p>
                </div>
              </div>
              <div className="w-full flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
                <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-12 md:space-y-0 md:flex-row  items-center md:items-start ">
                  <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                    <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">
                      Bsbn shbssbysbilling Address Details
                    </p>
                    <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">
                      180 North King Street, Northhampton MA 1060
                    </p>
                  </div>
                  <div className="w-full flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 ">
                    <div className="w-full flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-4 md:space-y-0 md:flex-row  items-center md:items-start ">
                      <div className="w-full bg-gray-100 px-4 py-4 rounded-md flex justify-center md:justify-start  items-center md:items-start">
                        <p className="w-full text-base font-semibold text-center md:text-left text-gray-800">
                          Credit Informations
                        </p>
                      </div>
                      {billingAddresses.length > 0 ? (
                        billingAddresses.map((billing, index) => {
                          return (
                            <div
                              key={billing.firstName + billing.id}
                              className="w-full shadow-sm bg-white px-4 py-4 rounded-md flex justify-center md:justify-start  items-center md:items-start flex-col "
                            >
                              <p className="w-full font-semibold text-center md:text-left text-sm leading-5 text-gray-600 text-md">
                                {billing.cardName}
                              </p>
                              <p className="flex justify-between w-full font-semibold text-center md:text-left text-sm leading-5 text-gray-600 ">
                                <span className="txt-lg">
                                  Card Number:{" "}
                                  {billing.cardNumber.substring(0, 4)}-
                                  {billing.cardNumber.substring(4, 8)}-
                                  {billing.cardNumber.substring(8, 12)}****
                                </span>
                              </p>
                              <p className="font-semibold w-full text-center md:text-left text-sm leading-5 text-gray-600">
                                Expires: {billing.expiration}
                              </p>
                            </div>
                          );
                        })
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </div>
                <div className="pt-6 flex w-full justify-center items-center md:justify-start md:items-start">
                  <button className="mt-6 md:mt-0 py-5 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600 border border-orange-600 font-medium w-96 2xl:w-full text-base leading-4 text-orange-600">
                    Edit Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

OrderSummary.getLayout = function getLayout(page: ReactElement) {
  return <ClientLayout> {page} </ClientLayout>;
};

export default OrderSummary;
