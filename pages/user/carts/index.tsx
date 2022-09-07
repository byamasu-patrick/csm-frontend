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
    const [show, setShow] = useState(false);
    const { cart, basketSearch } = useAppSelector(BasketSelector);
    const { products } = useAppSelector(ProductSelector);

    var tax = 2500;
    var shippment = 12000;

    const dispatch = useAppDispatch();

    const removeCart = (name: string) => {
        dispatch(RemoveBasketById(name))
    }

    return (
        <>
            <div>
                <div className="flex items-center justify-center h-full w-full bg-opacity-90 top-0 overflow-y-auto overflow-x-hidden sticky-0 py-12" id="chec-div">
                    <div className="w-10/12 m-0 z-10 right-0 h-full overflow-x-hidden transform translate-x-0 transition ease-in-out duration-700" id="checkout">                        <div className=" flex md:flex-row flex-col justify-end" id="cart">
                            <div className="lg:w-1/2 w-full md:pl-10 pl-4 pr-10 md:pr-4 md:py-12 py-8 bg-white " id="scroll">                               
                                <p className="text-5xl font-black leading-10 text-gray-800 pt-3">Bag</p>
                                {
                                    cart !== null ? (                                        
                                            cart.items.map((productItem) => {
                                                return products.filter((product) => product.id === productItem.productId).map((product) => {
                                                    return (
                                                        <div className="md:flex items-center mt-14 py-8 border-t border-gray-200">
                                                        <div className="w-1/4">
                                                            <img src={product.imageFile} className="w-full h-full object-center object-cover" />
                                                        </div>
                                                        <div className="md:pl-3 md:w-3/4">
                                                            <p className="text-xs leading-3 text-gray-800 md:pt-0 pt-4">RF293</p>
                                                            <div className="flex items-center justify-between w-full pt-1">
                                                                <p className="text-base font-black leading-none text-gray-800">{productItem.productName}</p>
                                                                <select className="py-2 px-1 border border-gray-200 mr-6 focus:outline-none">
                                                                    <option>{ productItem.quantity }</option>
                                                                </select>
                                                            </div>
                                                            <p className="text-xs leading-3 text-gray-600 pt-2">Height: 10 inches</p>
                                                            <p className="text-xs leading-3 text-gray-600 py-4">Color: { productItem.color }</p>
                                                            {/* <p className="w-96 text-xs leading-3 text-gray-600">Composition: 100% calf leather</p> */}
                                                            <div className="flex items-center justify-between pt-5 pr-6">
                                                                <div className="flex itemms-center">
                                                                    <p className="text-xs leading-3 underline text-gray-800 cursor-pointer">Add to favorites</p>
                                                                    <p 
                                                                        className="text-xs leading-3 underline text-red-500 pl-5 cursor-pointer" 
                                                                        onClick={() => removeCart(cart.userName)}
                                                                    >Remove</p>
                                                                </div>
                                                                <p className="text-base font-black leading-none text-gray-800">MK {productItem.price}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    )
                                                })
                                            })
                                                                        
                                    ) : (<></>)
                                }
                            </div>
                            <div className="xl:w-1/2 md:w-1/3 w-full bg-gray-100 h-auto">
                                <div className="flex flex-col md:h-screen px-14 py-20 justify-between overflow-y-auto">
                                    <div>
                                        <p className="text-4xl font-black leading-9 text-gray-800">Summary</p>
                                        <div className="flex items-center justify-between pt-16">
                                            <p className="text-base leading-none text-gray-800">Subtotal</p>
                                            <p className="text-base leading-none text-gray-800">MK {(cart !== null) || (basketSearch.searchResult !== null) ? (cart !== null ? cart?.totalPrice : basketSearch.searchResult?.totalPrice) : 0 }</p>
                                        </div>
                                        <div className="flex items-center justify-between pt-5">
                                            <p className="text-base leading-none text-gray-800">Shipping</p>
                                            <p className="text-base leading-none text-gray-800">MK {(cart !== null) || (basketSearch.searchResult !== null) ? shippment : 0}</p>
                                        </div>
                                        <div className="flex items-center justify-between pt-5">
                                            <p className="text-base leading-none text-gray-800">Tax</p>
                                            <p className="text-base leading-none text-gray-800">MK {(cart !== null) || (basketSearch.searchResult !== null) ? tax : 0}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center pb-6 justify-between lg:pt-5 pt-20">
                                            <p className="text-2xl leading-normal text-gray-800">Total</p>
                                            <p className="text-2xl font-bold leading-normal text-right text-gray-800">MK { ((cart !== null) || (basketSearch.searchResult !== null)) ? (tax + shippment + (cart !== null ? cart?.totalPrice : basketSearch.searchResult?.totalPrice)) : 0}</p>
                                        </div>
                                        {
                                            (cart !== null) || (basketSearch.searchResult !== null) ? (
                                                <Link href={`/user/order`}>
                                                    <button  className="text-base leading-none w-full py-5 px-6 bg-orange-500 border-orange-500 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-white">
                                                        Checkout
                                                    </button>
                                                </Link>
                                            ) : (<></>)
                                        }
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* <div className="flex items-center justify-center h-full">
                        <Loader />
                    </div> */}
                </div>                
            </div>
        </>
    );
}

ShoppingCart.getLayout = function getLayout(page: ReactElement){
    return <ClientLayout> { page } </ClientLayout>
}
  

export default ShoppingCart;
