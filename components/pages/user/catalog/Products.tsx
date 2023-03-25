import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../libs/store";
import {
  GetAllProducts, 
  SearchUserProducts,
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
import { FiEye } from "react-icons/fi";
import { FaCartArrowDown } from "react-icons/fa";
import { MdAddShoppingCart } from "react-icons/md";
import { AiOutlineHeart } from "react-icons/ai";
import { ProductionQuantityLimits, Shop } from "@mui/icons-material";

import GetShops from "../shops/GetShops";
import { GetShopsFromApi } from "../../../../libs/store/Auth";
import DisplayShops from "../shops/DisplayShops";
import Image from "next/image";
import MyModal from "../../../../pages/user/settings/MyModal";
import SectionDivider from "./SectionDivider";

interface ProductProps {
  isHome: boolean;
  // data: ProductModel;
}

const Products: React.FC<ProductProps> = (props) => {
  const [addCart, setAddCart] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [product, setProduct] = useState<ProductModel | null>(null);
  

  const dispatch = useAppDispatch();
  const { products, productUserSearch, isGetting, productsOwner } =
    useAppSelector(ProductSelector);
  const { user, isAuthenticated } = useAppSelector(AuthSelector);
  const { discounts } = useAppSelector(DiscountSelector);
  const { isAdding, cart, basketSearch, isUpdating, successMessage } =
    useAppSelector(BasketSelector);
   // const [displayedProducts, setDisplayedProdcts] = useState(products)
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
    setProduct(product);
  };
  const handleClose = () => setOpen(false);
  let productLimit = 0;

  const [loading, setLoading] = useState(false);
  const [hoverIndex, setHoverIndex] = useState(-1);
  const handleCardHover = (index: number) => {
    setHoverIndex(index);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      await dispatch(GetAllProducts(1));
    };
    fetchProducts().catch((error) => console.log(error));
  }, []);
  /* ignore for now
  useEffect(() => {
    const checkIfSearchIsEnabled = () => {
      if (productUserSearch.searchResult !== null) {
        if(productUserSearch.searchResult.results !== null) {
        var givenresults = productUserSearch.searchResult
        setDisplayedProdcts(givenresults)
        }
      }
    };
  }, [productUserSearch]);
  // end */

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
      <div className=" max-w-7xl mx-auto rounded-lg">
        {isGetting ? (
          <></>
        ) : (
          <div className="mx-4 max-w-screen-2xl lg:mx-auto pb-5">
            <SectionDivider title="New Arrivals" />

            <div className=" grid grid-cols-2  sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2 ">
              {products?.results.map((product, index) => {
                productLimit++;
                const productDiscount = discounts.filter(
                  (prodDiscont) => prodDiscont.productId === product.id
                )[0];

                // console.log("Discount: ", productDiscount)

                if (productLimit < 7) {
                  return (
                    <div
                      className={`relative overflow-hidden shadow-lg ${
                        hoverIndex === index
                          ? "bg-white transition-all duration-300 ease-in-out rounded-lg h-80"
                          : "bg-white h-72"
                      }`}
                      onMouseEnter={() => handleCardHover(index)}
                      onMouseLeave={() => handleCardHover(-1)}
                    >
                      <div className=" px-4 pt-2">
                        <div className="inline-block text-xs mb-2 leading-none text-a text-gray-600 hover:text-amber-500">
                          <Link href={"/"}>Mash Store</Link>
                        </div>
                        <div className="text-sm font-semibold leading-none text-[rgb(11,115,164)]">
                          <Link href={"/"}>
                            {product.name.substring(0, 15)}
                          </Link>
                        </div>
                      </div>
                      <div
                        className={`w-full h-40 p-5 ${
                          hoverIndex === index ? "bg-white-500 opacity-75" : ""
                        } transition duration-200 ease-linear`}
                      >
                        <img
                          className="w-full h-full object-fit:cover hover:scale-110 transition duration-200"
                          src={product.imageFile}
                          onClick={() => handleOnProductClicked(product)}
                          alt=""
                        />
                      </div>

                      <div className="px-4 py-2">
                        <div className="flex justify-between items-center">
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
                          <span
                            className={`${
                              addCart == index + 1 ? "" : ""
                            } flex-none bg-gray-100 text-gray-400 text-sm font-semibold uppercase rounded-full p-2 ${
                              hoverIndex === index
                                ? "bg-amber-500 cursor-pointer transition-all duration-300 ease-in-out text-white"
                                : ""
                            }`}
                            aria-label="Like"
                            onClick={async () => {
                              setLoading(true);
                              setAddCart(index + 1);
                              await addToBasket(
                                product.price,
                                product.id,
                                product.name
                              ).catch((error) => console.log(error));
                              setTimeout(() => setLoading(false), 3000);
                            }}
                          >
                            {loading && hoverIndex === index ? (
                              <CircularProgress
                                size={15}
                                style={{ borderRadius: "50%" }}
                              />
                            ) : (
                              <MdAddShoppingCart className="h-5 w-5" />
                            )}
                          </span>
                        </div>
                      </div>
                      <div
                        className={` border-gray-400 px-4 ${
                          hoverIndex === index ? "block" : "hidden"
                        }`}
                      >
                        <hr className="w-full border-1 bg-gray-300 rounded mx-auto" />

                        <div className="mx-auto max-w-sm">
                          <div className="flex py-4 justify-between">
                            <div onClick={handleOpen}>
                              <a className="flex items-center text-sm text-gray-500 leading-none transition-all duration-200 hover:text-amber-500 cursor-pointer">
                                <FiEye className="h-4 w-4 mr-2" />
                                View
                              </a>
                            </div>

                            <Link href={"/"}>
                              <a className="flex items-center text-sm text-gray-500 leading-none transition-all duration-200 hover:text-amber-500 mr-1">
                                <AiOutlineHeart className="h-4 w-4 mr-2" />
                                Wishlist
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>

                      <MyModal
                        open={open}
                        onClose={handleClose}
                        data={product as ProductModel}
                      />
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
