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
import {
  CheckCircleIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { FaOpencart } from "react-icons/fa";
import ProductList from "../../components/widgets/productList";

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
          catName: categoryName?.toString(),
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
      <div className="max-w-7xl mx-auto rounded-lg py-5">
        <div className="flex">
          <ProductSort isProductPage={true} />

          {isGetting ? (
            <></>
          ) : (
            <div className="mx-auto px-4 py-16 sm:px-2 sm:py-2 lg:max-w-7xl">
              <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
                {productsByCategory?.results.map((product, key) => {
                  return (
                    <div
                      key={""}
                      className="group relative border-b border-r border-t border-gray-200 p-4 sm:p-6"
                    >
                      <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                        <img
                          src={product.imageFile}
                          onClick={() => handleOnProductClicked(product)}
                          alt=""
                          className="h-48 w-full object-cover object-center"
                        />
                      </div>
                      <div className="pb-4 pt-10">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex flex-col">
                            <a
                              href="#"
                              className="text-lg font-bold text-gray-800 transition duration-100 hover:text-gray-500 lg:text-md"
                            >
                              {product.name.substring(0, 15)}
                            </a>
                            <span className="text-gray-500 text-sm pt-2">
                              {product.summary.substring(0, 100)}
                            </span>
                          </div>

                          <div className="flex flex-col items-end">
                            <span className="font-bold text-gray-600 lg:text-md">
                              $ {product.price}
                            </span>
                            <span className="text-sm left-2 text-green-700 pt-2">
                              In Stock
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          className=" mt-5 w-full items-center justify-center gap-x-2 rounded-md bg-gray-100 px-3.5 py-2.5 text-sm font-semibold text-gray-600 shadow-sm hover:text-white hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 flex "
                        >
                          <span className="text-center flex items-center space-x-2">
                            <span
                              className={`${
                                addCart == key + 1 ? "" : ""
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
                              Add to Cart
                            </span>
                            <FaOpencart
                              className="-mr-0.5 h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <ProductList />
              {productsByCategory.results.length > 0 ? <Pagination /> : <></>}
            </div>

            // <div className="w-full  sm:w-full md:w-8/12 lg:w-9/12 bg-gray-50 ">
            //   <div className="mx-auto container pb-8">
            //     <div className="flex flex-wrap items-center lg:justify-between justify-center">
            //       {productsByCategory?.results.map((product, key) => {
            //         return (
            //           <div
            //             key={key}
            //             className="mx-2 w-64 lg:mb-4 mb-8 hover:bg-gray-100 hover:cursor-pointer hover:shadow"
            //           >
            //             <div>
            //               <img
            //                 src={product.imageFile}
            //                 onClick={() => handleOnProductClicked(product)}
            //                 className="w-full h-44"
            //               />
            //             </div>
            //             <div className="bg-white">
            //               <div className="flex items-center justify-between px-4 pt-4">
            //                 <div>
            //                   <svg
            //                     xmlns="http://www.w3.org/2000/svg"
            //                     className="icon icon-tabler icon-tabler-bookmark"
            //                     width={20}
            //                     height={20}
            //                     viewBox="0 0 24 24"
            //                     strokeWidth="1.5"
            //                     stroke="#2c3e50"
            //                     fill="none"
            //                     strokeLinecap="round"
            //                     strokeLinejoin="round"
            //                   >
            //                     <path
            //                       stroke="none"
            //                       d="M0 0h24v24H0z"
            //                       fill="none"
            //                     />
            //                     <path d="M9 4h6a2 2 0 0 1 2 2v14l-5-3l-5 3v-14a2 2 0 0 1 2 -2" />
            //                   </svg>
            //                 </div>
            //                 <div
            // className={`${
            //   addCart == key + 1 ? "bg-[#3d9dc9]" : "main-bg"
            // } py-1.5 px-6 rounded`}
            // onClick={() => {
            //   setAddCart(key + 1);
            //   addToBasket(
            //     product.price,
            //     product.id,
            //     product.name
            //   ).catch((error) => console.log(error));
            // }}
            //                 >
            //                   <p className="text-xs text-white">
            //                     {addCart == key + 1 ? (
            //                       <CircularProgress
            //                         key={key}
            //                         size="1rem"
            //                         style={{
            //                           color: "white",
            //                           marginBottom: -4,
            //                           marginRight: 6,
            //                         }}
            //                       />
            //                     ) : (
            //                       <></>
            //                     )}
            //                     Add To Cart
            //                   </p>
            //                 </div>
            //               </div>
            //               <div className="p-4">
            //                 <div className="flex items-center">
            //                   <h2 className="text-lg font-semibold">
            //                     {product.name.substring(0, 15)}
            //                   </h2>
            //                   <p className="text-xs text-gray-600 pl-5">
            //                     4 days ago
            //                   </p>
            //                 </div>
            //                 <p className="text-xs text-gray-600 mt-2">
            //                   {product.summary.substring(0, 100)}
            //                 </p>
            //                 <div className="flex mt-4">
            //                   <div>
            //                     <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">
            //                       12 months warranty
            //                     </p>
            //                   </div>
            //                   <div className="pl-2">
            //                     <p className="text-xs text-gray-600 px-2 bg-gray-200 py-1">
            //                       Complete box
            //                     </p>
            //                   </div>
            //                 </div>
            //                 <div className="flex items-center justify-between py-4">
            //                   <h2 className="text-gray-800 text-xs font-semibold">
            //                     Malawi
            //                   </h2>
            //                   <h3 className="text-gray-800 text-xl font-semibold">
            //                     MK {product.price}
            //                   </h3>
            //                 </div>
            //               </div>
            //             </div>
            //           </div>
            //         );
            //       })}
            //     </div>
            //   </div>
            //   {productsByCategory.results.length > 0 ? <Pagination /> : <></>}
            // </div>
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
      </div>
    </>
  );
};

Product.getLayout = function getLayout(page: ReactElement) {
  return <ClientLayout> {page} </ClientLayout>;
};

export default Product;

{
  /* <div key={""}>
<div className="relative">
  <div className="relative h-72 w-full overflow-hidden rounded-lg">
    <img
      src={
        "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg"
      }
      alt=""
      className="h-full w-full object-cover object-center"
    />
  </div>
  <div className="relative mt-4">
    <h3 className="text-sm font-medium text-gray-900">
      {product.name}
    </h3>
    <p className="mt-1 text-sm text-gray-500">green</p>
  </div>
  <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
    <div
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
    />
    <p className="relative text-lg font-semibold text-white">
      7800
    </p>
  </div>
</div>
<div className="mt-6">
  <a
    href={"/"}
    className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
  >
    Add to bag<span className="sr-only"> "bag"</span>
  </a>
</div>
</div> */
}
