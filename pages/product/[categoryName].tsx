import { CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import React, { ReactElement, useEffect, useState } from "react";
import ClientLayout from "../../components/layouts/clients-layout";
import ProductDetails from "../../components/pages/user/catalog/ProductDetails";
import ProductDialog from "../../components/pages/user/catalog/ProductDialog";
import ProductSort from "../../components/pages/user/catalog/ProductSort";
import Pagination from "../../components/widgets/paggination";
import { UserType } from "../../libs/models/auth/AuthModels";
import { ProductModel } from "../../libs/models/shops/catalogs/ProductModels";
import { useAppDispatch, useAppSelector } from "../../libs/store";
import { AuthSelector } from "../../libs/store/Auth";
import {
  AddBasketToDB,
  BasketSelector,
  UpdateBasketDB,
} from "../../libs/store/Basket";
import {
  GetAllProductsByCategory,
  ProductSelector,
} from "../../libs/store/Catalog";
import { NextPageWithLayout } from "../_app";

const Product: NextPageWithLayout = () => {
  const router = useRouter();
  const { categoryName } = router.query;
  const [addCart, setAddCart] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductModel | null>(null);

  const dispatch = useAppDispatch();
  const { productsByCategory, isGetting, productsOwner } =
    useAppSelector(ProductSelector);
  const { user, isAuthenticated } = useAppSelector(AuthSelector);
  const { isAdding, cart, basketSearch, isUpdating, successMessage } =
    useAppSelector(BasketSelector);

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

  useEffect(() => {
    const updatingBasketToDb = async () => {
      await dispatch(
        GetAllProductsByCategory({
          catName: categoryName as string,
          page: 1,
        })
      );
    };
    updatingBasketToDb().catch((error) => console.log(error));
  }, []);

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
      <div className="w-full md:flex md:flex-cols bg-gray-50 py-8 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-12">
        <div className="w-full sm:w-full md:w-4/12 lg:w-3/12 bg-white mr-6 h-[530px] mb-6">
          <ProductSort isProductPage={true} />
        </div>
        {isGetting ? (
          <></>
        ) : (
          <div className="w-full  sm:w-full md:w-8/12 lg:w-9/12 bg-gray-50 ">
            <div className="mx-auto container pb-8">
              <div className="flex flex-wrap items-center lg:justify-between justify-center">
                {productsByCategory?.results.map((product, key) => {
                  return (
                    <div
                      key={key}
                      className="mx-2 w-64 lg:mb-4 mb-8 hover:bg-gray-100 hover:cursor-pointer hover:shadow"
                    >
                      <div>
                        <img
                          src={product.imageFile}
                          onClick={() => handleOnProductClicked(product)}
                          className="w-full h-44"
                        />
                      </div>
                      <div className="bg-white">
                        <div className="flex items-center justify-between px-4 pt-4">
                          <div>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-bookmark"
                              width={20}
                              height={20}
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="#2c3e50"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2" />
                            </svg>
                          </div>
                          <div
                            className={`${
                              addCart == key + 1 ? "bg-[#3d9dc9]" : "main-bg"
                            } py-1.5 px-6 rounded`}
                            onClick={() => {
                              setAddCart(key + 1);
                              addToBasket(
                                product.price,
                                product.id,
                                product.name
                              ).catch((error) => console.log(error));
                            }}
                          >
                            <p className="text-xs text-white">
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
                              Add To Cart
                            </p>
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex items-center">
                            <h2 className="text-lg font-semibold">
                              {product.name.substring(0, 15)}
                            </h2>
                            <p className="text-xs text-gray-600 pl-5">
                              4 days ago
                            </p>
                          </div>
                          <p className="text-xs text-gray-600 mt-2">
                            {product.summary.substring(0, 100)}
                          </p>
                          <div className="flex mt-4">
                            <div>
                              <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">
                                12 months warranty
                              </p>
                            </div>
                            <div className="pl-2">
                              <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">
                                Complete box
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center justify-between py-4">
                            <h2 className="text-gray-800 text-xs font-semibold">
                              Malawi
                            </h2>
                            <h3 className="text-gray-800 text-xl font-semibold">
                              MK {product.price}
                            </h3>
                          </div>
                          <div className="flex justify-center xl:justify-end w-full">
                            <div className="flex items-center">
                              <svg
                                className="w-4 mr-1 text-yellow-400 icon icon-tabler icon-tabler-star"
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path
                                  stroke="none"
                                  fill="none"
                                  d="M0 0h24v24H0z"
                                />
                                <path
                                  fill="currentColor"
                                  d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z"
                                />
                              </svg>
                              <svg
                                className="w-4 mr-1 text-yellow-400 icon icon-tabler icon-tabler-star"
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path
                                  stroke="none"
                                  fill="none"
                                  d="M0 0h24v24H0z"
                                />
                                <path
                                  fill="currentColor"
                                  d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z"
                                />
                              </svg>
                              <svg
                                className="w-4 mr-1 text-yellow-400 icon icon-tabler icon-tabler-star"
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path
                                  stroke="none"
                                  fill="none"
                                  d="M0 0h24v24H0z"
                                />
                                <path
                                  fill="currentColor"
                                  d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z"
                                />
                              </svg>
                              <svg
                                className="w-4 mr-1 text-yellow-400 icon icon-tabler icon-tabler-star"
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path
                                  stroke="none"
                                  fill="none"
                                  d="M0 0h24v24H0z"
                                />
                                <path
                                  fill="currentColor"
                                  d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z"
                                />
                              </svg>
                              <svg
                                className="w-4 text-gray-200 icon icon-tabler icon-tabler-star"
                                xmlns="http://www.w3.org/2000/svg"
                                width={20}
                                height={20}
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path
                                  stroke="none"
                                  fill="none"
                                  d="M0 0h24v24H0z"
                                />
                                <path
                                  fill="currentColor"
                                  d="M12 17.75l-6.172 3.245 1.179-6.873-4.993-4.867 6.9-1.002L12 2l3.086 6.253 6.9 1.002-4.993 4.867 1.179 6.873z"
                                />
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {productsByCategory.results.length > 0 ? <Pagination /> : <></>}
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

Product.getLayout = function getLayout(page: ReactElement) {
  return <ClientLayout> {page} </ClientLayout>;
};

export default Product;
