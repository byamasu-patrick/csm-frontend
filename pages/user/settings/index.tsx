import type { NextPage } from "next";
import Head from "next/head";
import React, { ReactElement, useState } from "react";
import Image from "next/image";
import ClientLayout from "../../../components/layouts/clients-layout";
import OrderDetails from "../../../components/pages/user/ordering/OrderDetails";
import { NextPageWithLayout } from "../../_app";
import Settings from "../../../components/pages/user/settings/Setting";
import TabLayout from "../../../components/pages/user/settings/TabLayout";
import VerticalNavigation from "../../../components/pages/user/settings/VeriticalNavigation";
import AccountTitleLayout from "../../../components/pages/user/settings/AccountTitleLayout";
import ReturnAndRefundLayout from "../../../components/pages/user/settings/ReturnAndRefundLayout";

const Order: NextPageWithLayout = () => {
  const [selected, setSelected] = useState<string | null>("Overview");

  const handleClick = (content: string) => {
    setSelected(content);
  };
  return (
    <div className="bg-gray-100 max-w-7xl mx-auto mt-5 mb-10">
      <div className="flex">
        <div className="flex">
          <div className="flex flex-col h-full p-3 w-60 bg-gray-50 text-gray-800">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2>Dashboard</h2>
                <button className="p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className="w-5 h-5 fill-current text-gray-800"
                  >
                    <rect width="352" height="32" x="80" y="96"></rect>
                    <rect width="352" height="32" x="80" y="240"></rect>
                    <rect width="352" height="32" x="80" y="384"></rect>
                  </svg>
                </button>
              </div>

              <div className="flex-1">
                <ul className="pt-2 pb-4 space-y-1 text-sm">
                  <li
                    className={
                      "rounded-sm cursor-pointer hover:bg-orange-100 text-gray-900 " +
                      (selected === "Overview"
                        ? "bg-white text-gray-900 border-l-4 border-orange-500 shadow-sm"
                        : "")
                    }
                    onClick={() => setSelected("Overview")}
                  >
                    <span className="flex items-center p-2 space-x-3 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                        />
                      </svg>

                      <span
                        className={
                          selected === "Overview" ? "font-semibold" : ""
                        }
                      >
                        Overview
                      </span>
                    </span>
                  </li>
                  <li
                    className={
                      "rounded-sm cursor-pointer hover:bg-orange-100 text-gray-900 " +
                      (selected === "My Orders"
                        ? "bg-white text-gray-900 border-l-4 border-orange-500 shadow-sm"
                        : "")
                    }
                    onClick={() => setSelected("My Orders")}
                  >
                    <span className="flex items-center p-2 space-x-3 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-5 h-5 fill-current text-gray-600"
                      >
                        <path d="M203.247,386.414,208,381.185V355.4L130.125,191H93.875L16,355.4v27.042l4.234,4.595a124.347,124.347,0,0,0,91.224,39.982h.42A124.343,124.343,0,0,0,203.247,386.414ZM176,368.608a90.924,90.924,0,0,1-64.231,26.413h-.33A90.907,90.907,0,0,1,48,369.667V362.6l64-135.112L176,362.6Z"></path>
                        <path d="M418.125,191h-36.25L304,355.4v27.042l4.234,4.595a124.347,124.347,0,0,0,91.224,39.982h.42a124.343,124.343,0,0,0,91.369-40.607L496,381.185V355.4ZM464,368.608a90.924,90.924,0,0,1-64.231,26.413h-.33A90.907,90.907,0,0,1,336,369.667V362.6l64-135.112L464,362.6Z"></path>
                        <path d="M272,196.659A56.223,56.223,0,0,0,309.659,159H416V127H309.659a55.991,55.991,0,0,0-107.318,0H96v32H202.341A56.223,56.223,0,0,0,240,196.659V463H136v32H376V463H272ZM232,143a24,24,0,1,1,24,24A24,24,0,0,1,232,143Z"></path>
                      </svg>
                      <span
                        className={
                          selected === "My Orders" ? "font-semibold" : ""
                        }
                      >
                        My Orders
                      </span>
                    </span>
                  </li>
                  <li
                    className={
                      "rounded-sm cursor-pointer hover:bg-orange-100 text-gray-900 " +
                      (selected === "Wishlist"
                        ? "bg-white text-gray-900 border-l-4 border-orange-500 shadow-sm"
                        : "")
                    }
                    onClick={() => setSelected("Wishlist")}
                  >
                    <span className="flex items-center p-2 space-x-3 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-5 h-5 fill-current text-gray-600"
                      >
                        <path d="M453.122,79.012a128,128,0,0,0-181.087.068l-15.511,15.7L241.142,79.114l-.1-.1a128,128,0,0,0-181.02,0l-6.91,6.91a128,128,0,0,0,0,181.019L235.485,449.314l20.595,21.578.491-.492.533.533L276.4,450.574,460.032,266.94a128.147,128.147,0,0,0,0-181.019ZM437.4,244.313,256.571,425.146,75.738,244.313a96,96,0,0,1,0-135.764l6.911-6.91a96,96,0,0,1,135.713-.051l38.093,38.787,38.274-38.736a96,96,0,0,1,135.765,0l6.91,6.909A96.11,96.11,0,0,1,437.4,244.313Z"></path>
                      </svg>
                      <span
                        className={
                          selected === "Wishlist" ? "font-semibold" : ""
                        }
                      >
                        Wishlist
                      </span>
                    </span>
                  </li>
                  <li
                    className={
                      "rounded-sm cursor-pointer hover:bg-orange-100 text-gray-900 " +
                      (selected === "Return & Refund"
                        ? "bg-white text-gray-900 border-l-4 border-orange-500 shadow-sm"
                        : "")
                    }
                    onClick={() => setSelected("Return & Refund")}
                  >
                    <span className="flex items-center p-2 space-x-3 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-600"
                      >
                        <path d="M8.25 9.75h4.875a2.625 2.625 0 010 5.25H12M8.25 9.75L10.5 7.5M8.25 9.75L10.5 12m9-7.243V21.75l-3.75-1.5-3.75 1.5-3.75-1.5-3.75 1.5V4.757c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0c1.1.128 1.907 1.077 1.907 2.185z" />
                      </svg>

                      <span
                        className={
                          selected === "Return & Refund" ? "font-semibold" : ""
                        }
                      >
                        Return & Refund
                      </span>
                    </span>
                  </li>
                  <li
                    className={
                      "rounded-sm cursor-pointer hover:bg-orange-100 text-gray-900 " +
                      (selected === "Payment Methods"
                        ? "bg-white text-gray-900 border-l-4 border-orange-500 shadow-sm"
                        : "")
                    }
                    onClick={() => setSelected("Payment Methods")}
                  >
                    <span className="flex items-center p-2 space-x-3 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                        />
                      </svg>
                      <span
                        className={
                          selected === "Payment Methods" ? "font-semibold" : ""
                        }
                      >
                        Payment Methods
                      </span>
                    </span>
                  </li>
                  <li
                    className={
                      "rounded-sm cursor-pointer hover:bg-orange-100 text-gray-900 " +
                      (selected === "Addresses"
                        ? "bg-white text-gray-900 border-l-4 border-orange-500 shadow-sm"
                        : "")
                    }
                    onClick={() => setSelected("Addresses")}
                  >
                    <span className="flex items-center p-2 space-x-3 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-gray-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>

                      <span
                        className={
                          selected === "Addresses" ? "font-semibold" : ""
                        }
                      >
                        Addresses
                      </span>
                    </span>
                  </li>

                  <li
                    className={
                      "rounded-sm cursor-pointer hover:bg-orange-100 text-gray-900 " +
                      (selected === "Chat"
                        ? "bg-white text-gray-900 border-l-4 border-orange-500 shadow-sm"
                        : "")
                    }
                    onClick={() => setSelected("Chat")}
                  >
                    <span className="flex items-center p-2 space-x-3 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-5 h-5 fill-current text-gray-600"
                      >
                        <path d="M448.205,392.507c30.519-27.2,47.8-63.455,47.8-101.078,0-39.984-18.718-77.378-52.707-105.3C410.218,158.963,366.432,144,320,144s-90.218,14.963-123.293,42.131C162.718,214.051,144,251.445,144,291.429s18.718,77.378,52.707,105.3c33.075,27.168,76.861,42.13,123.293,42.13,6.187,0,12.412-.273,18.585-.816l10.546,9.141A199.849,199.849,0,0,0,480,496h16V461.943l-4.686-4.685A199.17,199.17,0,0,1,448.205,392.507ZM370.089,423l-21.161-18.341-7.056.865A180.275,180.275,0,0,1,320,406.857c-79.4,0-144-51.781-144-115.428S240.6,176,320,176s144,51.781,144,115.429c0,31.71-15.82,61.314-44.546,83.358l-9.215,7.071,4.252,12.035a231.287,231.287,0,0,0,37.882,67.817A167.839,167.839,0,0,1,370.089,423Z"></path>
                        <path d="M60.185,317.476a220.491,220.491,0,0,0,34.808-63.023l4.22-11.975-9.207-7.066C62.918,214.626,48,186.728,48,156.857,48,96.833,109.009,48,184,48c55.168,0,102.767,26.43,124.077,64.3,3.957-.192,7.931-.3,11.923-.3q12.027,0,23.834,1.167c-8.235-21.335-22.537-40.811-42.2-56.961C270.072,30.279,228.3,16,184,16S97.928,30.279,66.364,56.206C33.886,82.885,16,118.63,16,156.857c0,35.8,16.352,70.295,45.25,96.243a188.4,188.4,0,0,1-40.563,60.729L16,318.515V352H32a190.643,190.643,0,0,0,85.231-20.125,157.3,157.3,0,0,1-5.071-33.645A158.729,158.729,0,0,1,60.185,317.476Z"></path>
                      </svg>
                      <span
                        className={selected === "Chat" ? "font-semibold" : ""}
                      >
                        Chat
                      </span>
                    </span>
                  </li>

                  <li
                    className={
                      "rounded-sm cursor-pointer hover:bg-orange-100 text-gray-900 " +
                      (selected === "Settings"
                        ? "bg-white text-gray-900 border-l-4 border-orange-500 shadow-sm"
                        : "")
                    }
                    onClick={() => setSelected("Settings")}
                  >
                    <span className="flex items-center p-2 space-x-3 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-5 h-5 fill-current text-gray-600"
                      >
                        <path d="M245.151,168a88,88,0,1,0,88,88A88.1,88.1,0,0,0,245.151,168Zm0,144a56,56,0,1,1,56-56A56.063,56.063,0,0,1,245.151,312Z"></path>
                        <path d="M464.7,322.319l-31.77-26.153a193.081,193.081,0,0,0,0-80.332l31.77-26.153a19.941,19.941,0,0,0,4.606-25.439l-32.612-56.483a19.936,19.936,0,0,0-24.337-8.73l-38.561,14.447a192.038,192.038,0,0,0-69.54-40.192L297.49,32.713A19.936,19.936,0,0,0,277.762,16H212.54a19.937,19.937,0,0,0-19.728,16.712L186.05,73.284a192.03,192.03,0,0,0-69.54,40.192L77.945,99.027a19.937,19.937,0,0,0-24.334,8.731L21,164.245a19.94,19.94,0,0,0,4.61,25.438l31.767,26.151a193.081,193.081,0,0,0,0,80.332l-31.77,26.153A19.942,19.942,0,0,0,21,347.758l32.612,56.483a19.937,19.937,0,0,0,24.337,8.73l38.562-14.447a192.03,192.03,0,0,0,69.54,40.192l6.762,40.571A19.937,19.937,0,0,0,212.54,496h65.222a19.936,19.936,0,0,0,19.728-16.712l6.763-40.572a192.038,192.038,0,0,0,69.54-40.192l38.564,14.449a19.938,19.938,0,0,0,24.334-8.731L469.3,347.755A19.939,19.939,0,0,0,464.7,322.319Zm-50.636,57.12-48.109-18.024-7.285,7.334a159.955,159.955,0,0,1-72.625,41.973l-10,2.636L267.6,464h-44.89l-8.442-50.642-10-2.636a159.955,159.955,0,0,1-72.625-41.973l-7.285-7.334L76.241,379.439,53.8,340.562l39.629-32.624-2.7-9.973a160.9,160.9,0,0,1,0-83.93l2.7-9.972L53.8,171.439l22.446-38.878,48.109,18.024,7.285-7.334a159.955,159.955,0,0,1,72.625-41.973l10-2.636L222.706,48H267.6l8.442,50.642,10,2.636a159.955,159.955,0,0,1,72.625,41.973l7.285,7.334,48.109-18.024,22.447,38.877-39.629,32.625,2.7,9.972a160.9,160.9,0,0,1,0,83.93l-2.7,9.973,39.629,32.623Z"></path>
                      </svg>
                      <span
                        className={
                          selected === "Settings" ? "font-semibold" : ""
                        }
                      >
                        Settings
                      </span>
                    </span>
                  </li>
                  <li
                    className={
                      "rounded-sm cursor-pointer hover:bg-orange-100 text-gray-900 " +
                      (selected === "Sign Out"
                        ? "bg-white text-gray-900 border-l-4 border-orange-500 shadow-sm"
                        : "")
                    }
                    onClick={() => setSelected("Sign Out")}
                  >
                    <span className="flex items-center p-2 space-x-3 rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        className="w-5 h-5 fill-current text-gray-600"
                      >
                        <path d="M440,424V88H352V13.005L88,58.522V424H16v32h86.9L352,490.358V120h56V456h88V424ZM320,453.642,120,426.056V85.478L320,51Z"></path>
                        <rect width="32" height="64" x="256" y="232"></rect>
                      </svg>
                      <span
                        className={
                          selected === "Sign Out" ? "font-semibold" : ""
                        }
                      >
                        Sign Out
                      </span>
                    </span>
                  </li>
                </ul>
              </div>
              <hr />
            </div>
            <div className="flex items-center p-2 mt-8 space-x-4 justify-self-end">
              <img
                src="../../Lloyd Chunga.jpg"
                alt=""
                className="w-12 h-12 rounded-lg bg-gray-500"
              />
              <div>
                <h2 className="text-lg font-semibold">Lloyd Chunga</h2>
                <span className="flex items-center space-x-1">
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="text-xs hover:underline text-gray-600"
                  >
                    View profile
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-1">
          {selected === "Overview" && (
            <div>
              <AccountTitleLayout title={"Overview"} />
            </div>
          )}
          {selected === "My Orders" && <TabLayout />}
          {selected === "Wishlist" && (
            <div>
              <AccountTitleLayout title={"My Wishlist"} />
            </div>
          )}
          {selected === "Return & Refund" && <ReturnAndRefundLayout />}
          {selected === "Payment Methods" && (
            <div>
              <AccountTitleLayout title={"Payment Methods"} />
            </div>
          )}
          {selected === "Addresses" && (
            <div>
              <AccountTitleLayout title={"Shipping Addresses"} />
            </div>
          )}
          {selected === "Chat" && (
            <div>
              <AccountTitleLayout title={"chat"} />
            </div>
          )}
          {selected === "Settings" && (
            <div>
              <AccountTitleLayout title={"Settings"} />
            </div>
          )}
          {selected === "Sign Out" && <div>Sign Out</div>}
        </div>
      </div>
    </div>
  );
};

Order.getLayout = function getLayout(page: ReactElement) {
  return <ClientLayout> {page} </ClientLayout>;
};

export default Order;
