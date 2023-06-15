/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { useState, ReactElement } from "react";
import ClientLayout from "../../../components/layouts/clients-layout";
import Loader from "../../../components/widgets/loader";
import { RemoveCart } from "../../../libs/services/BasketService/BasketService";
import { useAppDispatch, useAppSelector } from "../../../libs/store";
import { BasketSelector, RemoveBasketById } from "../../../libs/store/Basket";
import { ProductSelector } from "../../../libs/store/Catalog";
import { NextPageWithLayout } from "../../_app";

const ShoppingCart: NextPageWithLayout = () => {
  const [show, setShow] = useState<boolean>(false);
  const { cart, basketSearch } = useAppSelector(BasketSelector);
  const { products } = useAppSelector(ProductSelector);

  var tax = 2500;
  var shippment = 12000;

  const dispatch = useAppDispatch();

  const removeCart = (name: string) => {
    dispatch(RemoveBasketById(name));
  };

  return (
    <>
      <div className="flex flex-col md:items-stretch relative md:flex-row justify-between max-w-7xl mx-auto">
        <div className="flex-1 overflow-x-auto relative sm:rounded-lg mt-10 px-2">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:text-gray-600">
              <tr>
                <th scope="col" className="py-3 px-6">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="py-3 px-6">
                  Product
                </th>
                <th scope="col" className="py-3 px-6">
                  Price
                </th>
                <th scope="col" className="py-3 px-6">
                  Qty
                </th>
                <th scope="col" className="py-3 px-6">
                  Subtotal
                </th>
                <th scope="col" className="py-3 px-6">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cart.items.length >= 0 ? (
                cart.items.map((productItem, index) => {
                  return products?.results
                    .filter((product) => product.id === productItem.productId)
                    .map((product) => {
                      return (
                        // eslint-disable-next-line react/jsx-key
                        <tr className="bg-white border-b hover:bg-gray-50 ">
                          <td className="p-4 w-32">
                            <img src={product.imageFile} alt="Apple Watch" />
                          </td>
                          <td className="py-4 px-6 font-semibold text-gray-900 ">
                            {productItem.productName}
                          </td>
                          <td className="py-4 px-6 font-semibold text-gray-900">
                            MK {productItem.price}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-3">
                              <button
                                className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white rounded-full border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:text-gray-400  dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                type="button"
                              >
                                <span className="sr-only">Quantity button</span>
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
                                <span className="sr-only">Quantity button</span>
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
                          </td>
                          <td className="py-4 px-6 font-semibold text-gray-900">
                            MK {productItem.price}
                          </td>
                          <td className="py-4 px-6">
                            <a
                              href=""
                              className="font-medium text-red-600 dark:text-red-500 hover:underline"
                              onClick={() => removeCart(cart.userName)}
                            >
                              Remove
                            </a>
                          </td>
                        </tr>
                      );
                    });
                })
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>

        <div>
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
                  {cart !== null || basketSearch.searchResult !== null
                    ? tax
                    : 0}
                </p>
              </div>
            </div>
            <hr className="mt-5" />
            <div>
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
                    Proceed to Checkout
                  </button>
                </Link>
              ) : (
                <></>
              )}
            </div>
            <hr className="mt-5" />
          </div>
        </div>
      </div>
    </>
  );
};

ShoppingCart.getLayout = function getLayout(page: ReactElement) {
  return <ClientLayout> {page} </ClientLayout>;
};

export default ShoppingCart;
