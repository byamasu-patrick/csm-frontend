import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../libs/store";
import {
  GetAllProducts,
  ProductSelector,
} from "../../../../libs/store/Catalog";
import Loader from "../../../widgets/loader";
import Pagination from "../../../widgets/paggination";
import ProductSort from "./ProductSort";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthSelector } from "../../../../libs/store/Auth";
import { UserType } from "../../../../libs/models/auth/AuthModels";
import { useRouter } from "next/router";
import {
  AddBasketToDB,
  BasketSelector,
  searchBasketsData,
  UpdateBasketDB,
} from "../../../../libs/store/Basket";
import ProductDetails from "./ProductDetails";
import ProductDialog from "./ProductDialog";
import { ProductModel } from "../../../../libs/models/shops/catalogs/ProductModels";
import Link from "next/link";
import { DiscountSelector } from "../../../../libs/store/Discount";

interface ProductProps {
  isHome: boolean;
}

const Products: React.FC<ProductProps> = (props) => {
  const [addCart, setAddCart] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductModel | null>(null);

  const dispatch = useAppDispatch();
  const { products, isGetting, productsOwner } =
    useAppSelector(ProductSelector);
  const { user, isAuthenticated } = useAppSelector(AuthSelector);
  const { discounts } = useAppSelector(DiscountSelector);
  const { isAdding, cart, basketSearch, isUpdating, successMessage } =
    useAppSelector(BasketSelector);
  const router = useRouter();

  let productLimit = 0;

  useEffect(() => {
    const fetchProducts = async () => {
      await dispatch(GetAllProducts(1));
    };
    fetchProducts().catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchShoppingCart = async () => {
        await dispatch(
          searchBasketsData(
            user?.profile?.firstName + " " + user?.profile?.lastName
          )
        );
      };
      fetchShoppingCart().catch((error) => console.log(error));
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchProducts = async () => {
      await dispatch(GetAllProducts(1));
    };
    fetchProducts().catch((error) => console.log(error));
  }, [productsOwner]);

  useEffect(() => {
    const updatingBasketToDb = async () => {
      if (!isUpdating && successMessage === "Successfully updated to basket") {
        await dispatch(
          AddBasketToDB({
            userName: cart.userName,
            items: cart.items,
          })
        );
      }
    };
    updatingBasketToDb().catch((error) => console.log(error));
  }, [cart.items]);

  const addToBasket = async (
    productPrice: number,
    productId: string,
    name: string
  ) => {
    if (user == null) {
      if (!isAuthenticated && user?.userType !== UserType.FreeUser) {
        router.push("/signin");
      }
    } else {
      if (cart.items.length === 0) {
        await dispatch(
          AddBasketToDB({
            userName: user?.profile?.firstName + " " + user?.profile?.lastName,
            items: [
              {
                quantity: 1,
                color: "blue",
                price: productPrice,
                productId: productId,
                productName: name,
              },
            ],
          })
        );
      } else {
        await dispatch(
          UpdateBasketDB({
            quantity: 1,
            color: "blue",
            price: productPrice,
            productId: productId,
            productName: name,
          })
        );
      }
      if (!isAdding) {
        setAddCart(0);
      }
    }
  };

  const handleOnProductClicked = (product: ProductModel) => {
    setProduct(product);
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="bg-white max-w-7xl mx-auto rounded-lg">
        {/*<div className="w-full sm:w-full md:w-4/12 lg:w-3/12 bg-white mr-6 h-[530px] mb-6">
                    <ProductSort isProductPage={false}/>
                </div>  

    */}
        {isGetting ? (
          <></>
        ) : (
          <div className="max-w-screen-2xl px-4 md:px-8 mx-auto pb-5">
            <div className="inline-flex justify-center items-center w-full">
              <hr className="my-8 w-64 h-1 bg-gray-200 rounded border-0 dark:bg-gray-700" />
              <div className="absolute left-1/2 px-4 bg-white -translate-x-1/2 ">
                <h2 className="text-gray-800 text-xl lg:text-2xl font-bold text-left">
                  New Arrivals
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-2  sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ">
              {products?.results.map((product, key) => {
                productLimit++;
                const productDiscount = discounts.filter(
                  (prodDiscont) => prodDiscont.productId === product.id
                )[0];

                // console.log("Discount: ", productDiscount)

                if (productLimit < 7) {
                  return (
                    <div>
                      <a
                        href="#"
                        className="group h-40 block bg-gray-100 rounded-t-lg overflow-hidden relative"
                      >
                        <img
                          src={product.imageFile}
                          onClick={() => handleOnProductClicked(product)}
                          loading="lazy"
                          alt=""
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition duration-200"
                        />

                        <span className="bg-orange-500 text-gray-100 text-sm font-semibold tracking-wider rounded-r-lg absolute left-0 top-3 px-3 py-1.5 hover:scale-105 transition-200">
                          Sale
                        </span>
                      </a>

                      <div className="">
                        <div className="bg-gray-100 gap-2 px-4 py-2">
                          <a
                            href="#"
                            className="text-xs leading-6 font-medium uppercase text-slate-500"
                          >
                            {product.name.substring(0, 15)}
                          </a>
                        </div>
                        <div className="flex justify-between items-center bg-gray-100 gap-2 px-4">
                          <div className="flex-auto text-lg font-medium text-slate-500">
                            {productDiscount !== undefined ? (
                              <span className="line-through ">
                                MK {product.price}
                              </span>
                            ) : (
                              ""
                            )}
                            {productDiscount !== undefined
                              ? `K ${product.price - productDiscount.amount}`
                              : `MK ${product.price} `}
                          </div>
                          <div className="flex flex-col items-end space-y-2">
                            <div className="text-xs leading-6 font-medium uppercase text-slate-500">
                              In stock
                            </div>
                          </div>
                        </div>
                        <div>
                          <hr className="" />
                        </div>
                        <div className="flex space-x-4 mb-6 text-sm font-medium bg-gray-100 rounded-b-lg gap-2 p-4">
                          <div className="flex-auto flex space-x-4">
                            <span className="h-10 px-6 font-semibold rounded-md bg-[#3d9dc9] text-white cursor-pointer hover:bg-orange-500">
                              <p className="p-2">Buy now</p>
                            </span>
                          </div>
                          <span
                            className={`${
                              addCart == key + 1 ? "" : ""
                            } flex-none flex items-center justify-center hover:bg-orange-500 hover:text-white w-9 h-9 rounded-md text-orange-500
                              border border-gray-400`}
                            aria-label="Like"
                            onClick={() => {
                              setAddCart(key + 1);
                              addToBasket(
                                product.price,
                                product.id,
                                product.name
                              ).catch((error) => console.log(error));
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6 cursor-pointer"
                            >
                              {addCart == key + 1 ? (
                                <CircularProgress
                                  key={key}
                                  size="1rem"
                                  style={{
                                    color: "white",
                                    marginBottom: -4,
                                    marginRight: 6,
                                  }}
                                />
                              ) : (
                                <></>
                              )}
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                              />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        )}
        {isOpen ? (
          <ProductDialog
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            data={product as ProductModel}
          />
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default Products;
