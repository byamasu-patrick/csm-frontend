import { useRouter } from "next/router";
import React, { useState, useRef, MouseEvent } from "react";
import Products from "../../../components/pages/user/catalog/Products";
import { UserType } from "../../../libs/models/auth/AuthModels";
import { ProductModel } from "../../../libs/models/shops/catalogs/ProductModels";
import { useAppDispatch, useAppSelector } from "../../../libs/store";
import { AuthSelector } from "../../../libs/store/Auth";
import {
  BasketSelector,
  AddBasketToDB,
  UpdateBasketDB,
} from "../../../libs/store/Basket";
import { ProductSelector } from "../../../libs/store/Catalog";

interface ProductProps {
  data: ProductModel;
}

const ProductPage: React.FC<ProductProps> = (props) => {
  const [slide, setSlide] = useState<boolean>(true);
  const [addCart, setAddCart] = useState<number>(0);
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { productsByCategory, isGetting, productsOwner } =
    useAppSelector(ProductSelector);
  const { user, isAuthenticated } = useAppSelector(AuthSelector);
  const { isAdding, cart, basketSearch, isUpdating, successMessage } =
    useAppSelector(BasketSelector);

  const slideToggle = () => setSlide(!slide);

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

  const [mainImage, setMainImage] = useState(props.data.imageFile);

  const imageRef = useRef<HTMLImageElement>(null);
  const thumbnails = [
    {
      src: "https://images.unsplash.com/flagged/photo-1571366992791-2ad2078656cb?auto=format&q=75&fit=crop&w=250",
      alt: "Photo by Himanshu Dewangan",
    },
    {
      src: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?auto=format&fit=crop&w=250&q=60",
      alt: "Photo by Charles Deluvio",
    },
    {
      src: "https://images.unsplash.com/photo-1538098500529-c5e3a7c5b5b5?auto=format&fit=crop&w=250&q=60",
      alt: "Photo by Tim Mossholder",
    },
  ];
  if (!props.data) {
    return <div>No product data found!</div>;
  }

  return (
    <div className="bg-white py-6 sm:py-4 lg:py-4">
      <div className="max-w-screen-lg px-4 md:px-8 mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg overflow-hidden relative h-96">
              <img
                src={mainImage}
                ref={imageRef}
                loading="lazy"
                alt=""
                className="w-full h-full object-cover object-center"
              />

              <span className="bg-red-500 text-white text-sm tracking-wider uppercase rounded-br-lg absolute left-0 top-0 px-3 py-1.5">
                sale
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 h-32">
              <div className="bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/flagged/photo-1571366992791-2ad2078656cb?auto=format&q=75&fit=crop&w=250"
                  loading="lazy"
                  alt=""
                  className="w-full h-full object-cover object-center"
                  onMouseEnter={() =>
                    setMainImage(
                      "https://images.unsplash.com/flagged/photo-1571366992791-2ad2078656cb?auto=format&q=75&fit=crop&w=250"
                    )
                  }
                />
              </div>

              <div className="bg-gray-100 rounded-lg overflow-hidden hover:outline-dashed">
                <img
                  src="https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&q=75&fit=crop&w=250"
                  loading="lazy"
                  alt="Photo by Himanshu Dewangan"
                  className="w-full h-full object-cover object-center"
                  onMouseEnter={() =>
                    setMainImage(
                      "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&q=75&fit=crop&w=250"
                    )
                  }
                />
              </div>

              <div className="bg-gray-100 rounded-lg overflow-hidden hover:outline-dashed">
                <img
                  src={props.data.imageFile}
                  loading="lazy"
                  alt="Photo by Himanshu Dewangan"
                  className="w-full h-full object-cover object-center"
                  onMouseEnter={() => setMainImage(props.data.imageFile)}
                />
              </div>
            </div>
          </div>

          <div>
            <div className="mb-2 md:mb-3">
              <span className="inline-block text-gray-500 mb-0.5">
                Fancy Brand
              </span>
              <h2 className="text-gray-800 text-2xl lg:text-3xl font-bold">
                {props.data.name}
              </h2>
            </div>

            <div className="flex items-center mb-4">
              <div className="flex gap-0.5 -ml-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-yellow-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>

              <span className="text-gray-500 text-sm ml-2">4.2</span>

              <a
                href="#"
                className="text-indigo-500 hover:text-indigo-600 active:text-indigo-700 text-sm font-semibold transition duration-100 ml-4"
              >
                view all 47 reviews
              </a>
            </div>
            <div className="mt-2">
              <hr className="border-1 border-gray-200 w-20 py-2" />
              <p className="text-gray-500">
                ARSENAL FC Shirts Men Embroidered Polos Tops поло Camisas Summer
                Cotton Short Men Clothing Plus Size XXL XXXL 4XL 5XL 6XL
              </p>
            </div>
            <div className="mb-2 mt-4 flex space-x-2">
              <span className="inline-block text-gray-500 text-sm md:text-base font-semibold mb-3">
                Availability :
              </span>
              <span className="inline-block text-green-700 text-sm md:text-base font-semibold mb-3">
                IN STOCK
              </span>
            </div>

            <div className="mb-4 mt-2 flex space-x-5">
              <span className="inline-block text-gray-500 text-sm md:text-base font-semibold mb-3">
                Color
              </span>

              <div className="flex flex-wrap gap-2">
                <span className="w-8 h-8 bg-gray-800 border ring-2 ring-offset-1 ring-gray-800 rounded-full transition duration-100"></span>
                <button
                  type="button"
                  className="w-8 h-8 bg-gray-500 border ring-2 ring-offset-1 ring-transparent hover:ring-gray-200 rounded-full transition duration-100"
                ></button>
                <button
                  type="button"
                  className="w-8 h-8 bg-gray-200 border ring-2 ring-offset-1 ring-transparent hover:ring-gray-200 rounded-full transition duration-100"
                ></button>
                <button
                  type="button"
                  className="w-8 h-8 bg-white border ring-2 ring-offset-1 ring-transparent hover:ring-gray-200 rounded-full transition duration-100"
                ></button>
              </div>
            </div>

            <div className="mb-4 ">
              <span className="inline-block text-gray-500 text-sm md:text-base font-semibold mb-3">
                Size :
              </span>

              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  className="w-12 h-8 flex justify-center items-center bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-800 text-sm font-semibold text-center border rounded-md transition duration-100"
                >
                  XS
                </button>
                <button
                  type="button"
                  className="w-12 h-8 flex justify-center items-center bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-800 text-sm font-semibold text-center border rounded-md transition duration-100"
                >
                  S
                </button>
                <span className="w-12 h-8 flex justify-center items-center bg-amber-500 text-white text-sm font-semibold text-center border border-amber-500 rounded-md cursor-default">
                  M
                </span>
                <button
                  type="button"
                  className="w-12 h-8 flex justify-center items-center bg-white hover:bg-gray-100 active:bg-gray-200 text-gray-800 text-sm font-semibold text-center border rounded-md transition duration-100"
                >
                  L
                </button>
                <span className="w-12 h-8 flex justify-center items-center bg-white text-gray-400 text-sm font-semibold text-center border border-transparent rounded-md cursor-not-allowed">
                  XL
                </span>
              </div>
            </div>

            <div className="mb-2">
              <div className="flex items-end gap-2">
                <span className="text-gray-800 text-xl md:text-2xl font-bold">
                  MWK {props.data.price}
                </span>
                <span className="text-red-500 line-through mb-0.5">$30.00</span>
              </div>

              <span className="text-gray-500 text-sm">
                incl. VAT plus shipping
              </span>
            </div>

            <div className="flex items-center text-gray-500 gap-2 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                />
              </svg>

              <span className="text-sm">2-4 day shipping</span>
            </div>

            <div className="flex gap-2.5">
              <div className="flex items-center space-x-3 ">
                <button
                  className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white rounded-full border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-2 focus:ring-amber-500"
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
                  className="inline-flex items-center p-1 text-sm font-medium text-gray-500 bg-white rounded-full border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-amber-200"
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
              <a
                href="#"
                className="inline-block flex-1 sm:flex-none bg-amber-600 hover:bg-amber-700 active:bg-amber-800 focus-visible:ring ring-amber-300 text-white text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-8 py-3"
              >
                Buy Now
              </a>

              <a
                href="#"
                className="inline-block bg-gray-200 hover:bg-gray-300 focus-visible:ring ring-indigo-300 text-gray-500 active:text-gray-700 text-sm md:text-base font-semibold text-center rounded-lg outline-none transition duration-100 px-4 py-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
