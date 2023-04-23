import Link from "next/link";
import React, { useState, ReactElement, useEffect } from "react";
import ClientLayout from "../../../components/layouts/clients-layout";
import Loader from "../../../components/widgets/loader";
import {
  RemoveCart,
  RemoveCartItem,
} from "../../../libs/services/BasketService/BasketService";
import { useAppDispatch, useAppSelector } from "../../../libs/store";
import {
  BasketSelector,
  RemoveBasketById,
  RemoveBasketItemById,
  IncreaseBasketItemById,
  decreaseBasketItemById,
} from "../../../libs/store/Basket";
import { ProductSelector } from "../../../libs/store/Catalog";
import { NextPageWithLayout } from "../../_app";
import { AuthSelector } from "../../../libs/store/Auth";
import { PlusIcon } from "@heroicons/react/20/solid";
import { CiShoppingBasket } from "react-icons/ci";

const ShoppingCart: NextPageWithLayout = () => {
  const [show, setShow] = useState<boolean>(false);
  const { cart, basketSearch } = useAppSelector(BasketSelector);
  const { products } = useAppSelector(ProductSelector);
  const [productId, setProductId] = useState("");
  const [username, setUsername] = useState("");
  const [deletedProductId, setDeletedProductId] = useState("");
  const [usernamed, setUsernamed] = useState(cart.userName);
  const [value, setValue] = useState(1);
  const [ increaseClicked, setIncreaseClicked] = useState(false)
  const [ decreaseClicked, setDecreaseClicked] = useState(false)
  var tax = 0;
  var shippment = 0;

  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(1);

  // a function to remove a product from the basket
  function handleRemoveCartItem(username: string, productId: string) {
    setProductId(productId);
    setUsername(username);
  }
  useEffect(() => {
    if (productId !== "") {
      const basket = { username, productId };
      dispatch(RemoveBasketItemById(basket));
    }
  }, [productId]);

  function handleIncreaseCartItem(usernameD: string, productIdD: string) {
    setDeletedProductId(productIdD);
    setUsernamed(usernameD);
    setIncreaseClicked(true)

  }
  useEffect(() => {
    if (deletedProductId !== "" && increaseClicked == true) {
      const basket = { usernamed, deletedProductId, value };
      dispatch(IncreaseBasketItemById(basket));
      console.log(cart)
      setIncreaseClicked(false)
    }
  }, [increaseClicked, deletedProductId]);

  function handleDecreaseCartItem(
    usernameD: string,
    productIdD: string
  ) {
    setDeletedProductId(productIdD);
    setUsernamed(usernameD);
    setDecreaseClicked(true)

  }
    useEffect(() => {
      if (deletedProductId !== "" && decreaseClicked === true)  {
        const basket = { usernamed, deletedProductId, value };
        dispatch(decreaseBasketItemById(basket));
        console.log(cart)
        setDecreaseClicked(false)
      }
    }, [decreaseClicked, deletedProductId]);
   

  return (
    <>
      {cart.items.length > 0 ? (
        <div className="flex flex-col lg:items-stretch relative lg:flex-row justify-between max-w-7xl mx-auto">
          <div className="flex-1 overflow-x-auto relative sm:rounded-lg mt-10 px-4 mb-3">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 shadow-sm">
              <thead className="text-sm text-gray-700 bg-white shadow dark:text-gray-600 border-b">
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
                    quantity
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
                                <span className="isolate inline-flex rounded-md shadow-sm">
                                  <button
                                    onClick={() =>
                                      handleDecreaseCartItem(
                                        cart.userName,
                                        productItem.productId
                                      )
                                    }
                                    type="button"
                                    className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                                  >
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
                                  <button
                                    type="button"
                                    className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                                  >
                                    <input
                                      type="number"
                                      min={1}
                                      value={productItem.quantity}
                                      className="w-8 text-gray-900 text-sm outline-none"

                                      required
                                    />

                                    {/* <p>{productItem.quantity}</p> */}
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleIncreaseCartItem(
                                        cart.userName,
                                        productItem.productId
                                      )
                                    }
                                    type="button"
                                    className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
                                  >
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
                                </span>
                              </div>
                            </td>
                            <td className="py-4 px-6 font-semibold text-gray-900">
                              MK {productItem.subTotal}
                            </td>
                            <td className="py-4 px-6">
                              <button
                                type="button"
                                className="font-medium text-red-600 dark:text-red-500 hover:underline"
                                onClick={({ preventDefault }) =>
                                  handleRemoveCartItem(
                                    cart.userName,
                                    productItem.productId
                                  )
                                }
                              >
                                Remove
                              </button>
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

          <div className="px-4">
            <div className="p-5 mt-5 w-full md:w-full lg:w-96 md:mt-10 bg-white mb-5 shadow-md">
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
                      ? 0
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
      ) : (
        <>
          <div className="text-center pt-48 pb-48">
            <CiShoppingBasket className=" mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-semibold text-gray-900">
              YOUR CART IS CURRENTLY EMPTY.
            </h3>

            <div className="mt-6">
              <Link href={"/"}>
                <button
                  type="button"
                  className="inline-flex items-center rounded-md bg-amber-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <CiShoppingBasket
                    className="-ml-0.5 mr-1.5 h-5 w-5"
                    aria-hidden="true"
                  />
                  Return to shop
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
};

ShoppingCart.getLayout = function getLayout(page: ReactElement) {
  return <ClientLayout> {page} </ClientLayout>;
};

export default ShoppingCart;
