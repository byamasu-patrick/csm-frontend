import { useRouter } from "next/router";
import React, { useState } from "react";
import { UserType } from "../../../../libs/models/auth/AuthModels";
import { ProductModel } from "../../../../libs/models/shops/catalogs/ProductModels";
import { useAppDispatch, useAppSelector } from "../../../../libs/store";
import { AuthSelector } from "../../../../libs/store/Auth";
import {
  AddBasketToDB,
  BasketSelector,
  UpdateBasketDB,
} from "../../../../libs/store/Basket";
import { ProductSelector } from "../../../../libs/store/Catalog";
import CreateProductReviewForm from "../review/CreateProductReviewFrom";
import DisplayReview from "../review/DisplayReview";

interface ProductProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: ProductModel;
  //(isCreate: boolean) => React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductDetails: React.FC<ProductProps> = (props) => {
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
        props.setIsOpen(!props.isOpen);
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
        props.setIsOpen(!props.isOpen);
      }
      if (!isAdding) {
        setAddCart(0);
      }
    }
  };

  return (
    <div>
      <div className="w-full flex sm:flex-col md:flex-col lg:flex-row xl:flex-row justify-center items-center bg-white ">
        <div className="w-full lg:ml-6 mb-6">
          <div className="relative">
            <div className="slider">
              <div className="slide-ana flex flex-shrink-0">
                <div
                  className={
                    "flex flex-shrink-0 transform " +
                    (slide ? "translate-x-0" : "-translate-x-full")
                  }
                >
                  <img
                    className=" lg:block hidden w-full h-full object-center object-cover"
                    src={props.data.imageFile}
                    alt={props.data.name}
                  />
                  <img
                    className=" hidden md:block lg:hidden w-full h-full object-center object-cover"
                    src={props.data.imageFile}
                    alt={props.data.name}
                  />
                  <img
                    className=" block md:hidden w-full h-full object-center object-cover"
                    src={props.data.imageFile}
                    alt={props.data.name}
                  />
                </div>
                <div
                  className={
                    "flex flex-shrink-0 transform " +
                    (slide ? "translate-x-full" : "translate-x-0")
                  }
                >
                  <img
                    className=" lg:block hidden w-full h-full object-center object-cover"
                    src={props.data.imageFile}
                    alt={props.data.name}
                  />
                  <img
                    className=" hidden md:block lg:hidden w-full h-full object-center object-cover"
                    src={props.data.imageFile}
                    alt={props.data.name}
                  />
                  <img
                    className=" block md:hidden w-full h-full object-center object-cover"
                    src={props.data.imageFile}
                    alt={props.data.name}
                  />
                </div>
              </div>
            </div>
            <div className=" transition duration-150 absolute bottom-0 w-full h-full flex justify-between items-center px-4">
              <button
                onClick={slideToggle}
                aria-label="previous"
                className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 rounded-full flex justify-center items-center"
              >
                <svg
                  className=""
                  width="52"
                  height="52"
                  viewBox="0 0 52 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="26" cy="26" r="26" fill="white" />
                  <path
                    d="M28.4987 19.333L21.832 25.9997L28.4987 32.6663"
                    stroke="#4B5563"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
              <button
                onClick={slideToggle}
                aria-label="Next"
                className=" focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 rounded-full flex justify-center items-center"
              >
                <svg
                  className=""
                  width="52"
                  height="52"
                  viewBox="0 0 52 52"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="26" cy="26" r="26" fill="white" />
                  <path
                    d="M23.5013 19.333L30.168 25.9997L23.5013 32.6663"
                    stroke="#4B5563"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          {/* <div className="flex flex-col w-full space-y-4 mt-10">
                            
                        <button 
                            onClick={() => addToBasket(props.data.price, props.data.id, props.data.name)}
                            className="
                                border border-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600 md:w-96 w-full hover:bg-orange-600 text-base font-medium leading-4 bg-orange-500 py-4 text-white">Add to Bag</button>
                        <button className="border border-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600 md:w-96 w-full hover:bg-gray-50 text-base font-medium leading-4 text-orange-500 py-4 bg-white">Add to Wishlist</button>
                    </div> */}
        </div>
        <div className="lg:mt-0 flex justify-start items-start w-full flex-col mx-6 sm:px-3">
          <h2 className=" lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800 font-semibold">
            {props.data.name} | {props.data.category}
          </h2>
          <div className=" flex justify-start items-center mt-4">
            <p className="font-normal text-lg leading-6 text-gray-600 mr-4">
              MK {props.data.price}.00
            </p>
            <div className="cursor-pointer flex space-x-2 mr-3">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    d="M16.0972 19.25C15.9506 19.2506 15.806 19.216 15.6755 19.1492L11.0005 16.7017L6.32551 19.1492C6.17371 19.229 6.00255 19.2647 5.8315 19.252C5.66045 19.2394 5.49637 19.1791 5.35791 19.0779C5.21945 18.9767 5.11216 18.8386 5.04824 18.6795C4.98433 18.5203 4.96635 18.3464 4.99635 18.1775L5.91301 13.0167L2.13635 9.35003C2.01852 9.23244 1.93493 9.08499 1.89456 8.9235C1.85418 8.762 1.85855 8.59256 1.90718 8.43336C1.96031 8.27044 2.05804 8.12568 2.18929 8.0155C2.32053 7.90532 2.48003 7.83414 2.64968 7.81003L7.87468 7.04919L10.1755 2.34669C10.2506 2.19171 10.3678 2.061 10.5137 1.96955C10.6596 1.8781 10.8283 1.82959 11.0005 1.82959C11.1727 1.82959 11.3414 1.8781 11.4873 1.96955C11.6333 2.061 11.7505 2.19171 11.8255 2.34669L14.1538 7.04003L19.3788 7.80086C19.5485 7.82497 19.708 7.89616 19.8392 8.00634C19.9705 8.11652 20.0682 8.26128 20.1213 8.42419C20.17 8.58339 20.1743 8.75283 20.134 8.91433C20.0936 9.07582 20.01 9.22327 19.8922 9.34086L16.1155 13.0075L17.0322 18.1684C17.0649 18.3402 17.0478 18.5178 16.9828 18.6803C16.9178 18.8427 16.8077 18.9832 16.6655 19.085C16.4995 19.2014 16.2997 19.2594 16.0972 19.25Z"
                    fill="#FC6A03"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="22" height="22" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    d="M16.0972 19.25C15.9506 19.2506 15.806 19.216 15.6755 19.1492L11.0005 16.7017L6.32551 19.1492C6.17371 19.229 6.00255 19.2647 5.8315 19.252C5.66045 19.2394 5.49637 19.1791 5.35791 19.0779C5.21945 18.9767 5.11216 18.8386 5.04824 18.6795C4.98433 18.5203 4.96635 18.3464 4.99635 18.1775L5.91301 13.0167L2.13635 9.35003C2.01852 9.23244 1.93493 9.08499 1.89456 8.9235C1.85418 8.762 1.85855 8.59256 1.90718 8.43336C1.96031 8.27044 2.05804 8.12568 2.18929 8.0155C2.32053 7.90532 2.48003 7.83414 2.64968 7.81003L7.87468 7.04919L10.1755 2.34669C10.2506 2.19171 10.3678 2.061 10.5137 1.96955C10.6596 1.8781 10.8283 1.82959 11.0005 1.82959C11.1727 1.82959 11.3414 1.8781 11.4873 1.96955C11.6333 2.061 11.7505 2.19171 11.8255 2.34669L14.1538 7.04003L19.3788 7.80086C19.5485 7.82497 19.708 7.89616 19.8392 8.00634C19.9705 8.11652 20.0682 8.26128 20.1213 8.42419C20.17 8.58339 20.1743 8.75283 20.134 8.91433C20.0936 9.07582 20.01 9.22327 19.8922 9.34086L16.1155 13.0075L17.0322 18.1684C17.0649 18.3402 17.0478 18.5178 16.9828 18.6803C16.9178 18.8427 16.8077 18.9832 16.6655 19.085C16.4995 19.2014 16.2997 19.2594 16.0972 19.25Z"
                    fill="#FC6A03"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="22" height="22" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    d="M16.0972 19.25C15.9506 19.2506 15.806 19.216 15.6755 19.1492L11.0005 16.7017L6.32551 19.1492C6.17371 19.229 6.00255 19.2647 5.8315 19.252C5.66045 19.2394 5.49637 19.1791 5.35791 19.0779C5.21945 18.9767 5.11216 18.8386 5.04824 18.6795C4.98433 18.5203 4.96635 18.3464 4.99635 18.1775L5.91301 13.0167L2.13635 9.35003C2.01852 9.23244 1.93493 9.08499 1.89456 8.9235C1.85418 8.762 1.85855 8.59256 1.90718 8.43336C1.96031 8.27044 2.05804 8.12568 2.18929 8.0155C2.32053 7.90532 2.48003 7.83414 2.64968 7.81003L7.87468 7.04919L10.1755 2.34669C10.2506 2.19171 10.3678 2.061 10.5137 1.96955C10.6596 1.8781 10.8283 1.82959 11.0005 1.82959C11.1727 1.82959 11.3414 1.8781 11.4873 1.96955C11.6333 2.061 11.7505 2.19171 11.8255 2.34669L14.1538 7.04003L19.3788 7.80086C19.5485 7.82497 19.708 7.89616 19.8392 8.00634C19.9705 8.11652 20.0682 8.26128 20.1213 8.42419C20.17 8.58339 20.1743 8.75283 20.134 8.91433C20.0936 9.07582 20.01 9.22327 19.8922 9.34086L16.1155 13.0075L17.0322 18.1684C17.0649 18.3402 17.0478 18.5178 16.9828 18.6803C16.9178 18.8427 16.8077 18.9832 16.6655 19.085C16.4995 19.2014 16.2997 19.2594 16.0972 19.25Z"
                    fill="#FC6A03"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="22" height="22" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path
                    d="M16.0972 19.25C15.9506 19.2506 15.806 19.216 15.6755 19.1492L11.0005 16.7017L6.32551 19.1492C6.17371 19.229 6.00255 19.2647 5.8315 19.252C5.66045 19.2394 5.49637 19.1791 5.35791 19.0779C5.21945 18.9767 5.11216 18.8386 5.04824 18.6795C4.98433 18.5203 4.96635 18.3464 4.99635 18.1775L5.91301 13.0167L2.13635 9.35003C2.01852 9.23244 1.93493 9.08499 1.89456 8.9235C1.85418 8.762 1.85855 8.59256 1.90718 8.43336C1.96031 8.27044 2.05804 8.12568 2.18929 8.0155C2.32053 7.90532 2.48003 7.83414 2.64968 7.81003L7.87468 7.04919L10.1755 2.34669C10.2506 2.19171 10.3678 2.061 10.5137 1.96955C10.6596 1.8781 10.8283 1.82959 11.0005 1.82959C11.1727 1.82959 11.3414 1.8781 11.4873 1.96955C11.6333 2.061 11.7505 2.19171 11.8255 2.34669L14.1538 7.04003L19.3788 7.80086C19.5485 7.82497 19.708 7.89616 19.8392 8.00634C19.9705 8.11652 20.0682 8.26128 20.1213 8.42419C20.17 8.58339 20.1743 8.75283 20.134 8.91433C20.0936 9.07582 20.01 9.22327 19.8922 9.34086L16.1155 13.0075L17.0322 18.1684C17.0649 18.3402 17.0478 18.5178 16.9828 18.6803C16.9178 18.8427 16.8077 18.9832 16.6655 19.085C16.4995 19.2014 16.2997 19.2594 16.0972 19.25Z"
                    fill="#FC6A03"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect width="22" height="22" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <svg
                width="23"
                height="22"
                viewBox="0 0 23 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0)">
                  <path
                    d="M2.76556 8.70194L2.76068 8.70696L2.75719 8.71056L2.75246 8.70902L1.90718 8.43336L2.75837 8.69339M2.76556 8.70194L2.75837 8.69339M2.76556 8.70194L2.77032 8.69704L2.76556 8.70194ZM2.76556 8.70194L2.75837 8.69339M15.1929 13.1714L16.1062 18.313L16.0985 18.313L11.4351 15.8716L11.0005 15.6441L10.5659 15.8716L5.92615 18.3006L6.83558 13.1806L6.92255 12.6909L6.56571 12.3444L2.84177 8.72894L8.0097 7.97641L8.49902 7.90516L8.71634 7.461L11.0006 2.79232L13.3145 7.45644L13.5328 7.89647L14.0188 7.96725L19.1868 8.71977L15.4628 12.3352L15.106 12.6817L15.1929 13.1714Z"
                    stroke="#FC6A03"
                    strokeWidth="1.874"
                  />
                </g>
                <defs>
                  <clipPath id="clip0">
                    <rect
                      width="22"
                      height="22"
                      fill="white"
                      transform="translate(0.363281)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <p className=" font-normal text-sm leading-3 hover:text-gray-700 duration-100 cursor-pointer text-gray-500 underline">
              18 reviews
            </p>
          </div>
          <div className="  mt-10">
            <p
              id="text"
              className=" font-semibold text-base leading-4 text-gray-800"
            >
              Product Summary
            </p>
            <div className=" flex space-x-2 mt-4">
              <p className=" mt-4 font-normal text-sm leading-3 text-gray-500 hover:text-gray-600 duration-100 cursor-pointer">
                {props.data.summary}
              </p>
            </div>
          </div>
          <div className=" mt-10 w-full">
            <div className=" flex justify-between">
              <p className="font-semibold text-base leading-4 text-gray-800">
                Description
              </p>
              {/* <p className="cursor-pointer hover:text-gray-800 font-medium text-base leading-4 text-gray-500">
                                
                            </p> */}
            </div>
          </div>
          <p className=" mt-4 font-normal text-sm leading-3 text-gray-500 hover:text-gray-600 duration-100 cursor-pointer">
            {props.data.description}
          </p>
          <div className="flex flex-col w-full space-y-4 mt-10">
            <button
              onClick={() =>
                addToBasket(props.data.price, props.data.id, props.data.name)
              }
              className="
                                border border-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600 md:w-96 w-full hover:bg-orange-600 text-base font-medium leading-4 bg-orange-500 py-4 text-white"
            >
              Add to Bag
            </button>
            <button className="border border-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-600 md:w-96 w-full hover:bg-gray-50 text-base font-medium leading-4 text-orange-500 py-4 bg-white">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
      {/* <div className="w-full flex justify-start items-start">
                <p className="text-3xl lg:text-4xl font-semibold leading-7 text-gray-800 bg-white w-full ">Reviews</p>
            </div> */}
      <div className="w-full flex sm:flex-col md:flex-col lg:flex-row xl:flex-row justify-center items-center bg-white ">
        <div className="w-full lg:ml-6 mb-6">
          <DisplayReview productId={props.data.id} />
        </div>
        <div className="lg:mt-0 flex justify-start items-start w-full flex-col mx-6 sm:px-3 mb-6">
          <CreateProductReviewForm productId={props.data.id} />
        </div>
      </div>
      <style>
        {` 
                .slider {
                    width: 100%;
                    position: relative;
                    overflow: hidden;
                }

                .slide-ana {
                    height: 539px;
                }   

                .slide-ana > div {
                    width: 100%;
                    height: 100%;
                    position: absolute;
                    transition: all 1s;
                }
            `}
      </style>
    </div>
  );
};

export default ProductDetails;
