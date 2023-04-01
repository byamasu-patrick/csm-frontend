import Link from "next/link";
import React, { useState, ReactElement, useEffect } from "react";
import ClientLayout from "../../../components/layouts/clients-layout";
import Loader from "../../../components/widgets/loader";
import { RemoveCart, RemoveCartItem } from "../../../libs/services/BasketService/BasketService";
import { useAppDispatch, useAppSelector } from "../../../libs/store";
import { BasketSelector, RemoveBasketById, RemoveBasketItemById, IncreaseBasketItemById, decreaseBasketItemById} from "../../../libs/store/Basket";
import { ProductSelector } from "../../../libs/store/Catalog";
import { NextPageWithLayout } from "../../_app";
import { AuthSelector } from "../../../libs/store/Auth";

const ShoppingCart: NextPageWithLayout = () => {
  const [show, setShow] = useState<boolean>(false);
  const { cart, basketSearch } = useAppSelector(BasketSelector);
  const { products } = useAppSelector(ProductSelector);
  const [ productId, setProductId] = useState("");
  const [username, setUsername] = useState("")
  const [deletedProductId, setDeletedProductId] = useState("");
  const [usernamed, setUsernamed] = useState(cart.userName)
  const [ value, setValue] = useState(0)
  var tax = 2500;
  var shippment = 12000;

  const dispatch = useAppDispatch();

// a function to remove a product from the basket
 function handleRemoveCartItem (username: string, productId: string)  {
   setProductId(productId)
   setUsername(username)
  
  };
  useEffect(() => {
    if (productId !== "") {
      const basket = {username, productId}
      dispatch(RemoveBasketItemById(basket))
    }
  }, [productId]);

//    a function to increament a quantity of an item from the basket
   function handleIncreaseCartItem (usernameD: string, productIdD: string, value: number)  {
    setValue(value)
    setDeletedProductId(productIdD)
    setUsernamed(usernameD)
    if (deletedProductId !== "") {
      const basket = {usernamed, deletedProductId, value}
      dispatch(IncreaseBasketItemById(basket))
    }
 
 }; 

 // a function to decreament  a quantity of an item from the basket
 function handleDecreaseCartItem (usernameD: string, productIdD: string, value: number)  {
    setValue(value)
  setDeletedProductId(productIdD)
  setUsernamed(usernameD)
  if (deletedProductId !== "") {
    const basket = {usernamed, deletedProductId, value}
    dispatch(decreaseBasketItemById(basket))
  }
}; 

  return (
    <>
      <div className="flex justify-between max-w-7xl bg-gray-100 mx-auto mt-5">
        <div className="flex-1 overflow-x-auto relative sm:rounded-lg p-10">
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
                  dec/inc quantity
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
                          <td className="py-4 px-6 font-semibold text-gray-900">
                             {productItem.quantity}
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-3">
                    
                              <button
                              onClick={(event) => { handleDecreaseCartItem(cart.userName, productItem.productId, value)}}
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
                                  min={1}
                                  id={productItem.productId}
                                  className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg  block px-2.5 py-1"
                                  placeholder= "1"
                                  onChange={(event) => setValue(event.target.valueAsNumber)}
                                  onFocus={(event) => setDeletedProductId(productItem.productId)}
                                  required
                                />
                              </div>
                              <button
                              onClick={(event) => { handleIncreaseCartItem(cart.userName, productItem.productId, value)}}
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
                            MK {productItem.price * productItem.quantity}
                          </td>
                          <td className="py-4 px-6">
                            <button type="button"
                              className="font-medium text-red-600 dark:text-red-500 hover:underline"
                              onClick={({preventDefault}) => handleRemoveCartItem(cart.userName, productItem.productId)}
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

        <div>
          <div className="p-5 mr-5 bg-white mt-10 mb-5 shadow-md w-96">
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
