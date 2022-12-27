import type { NextPage } from "next";
import Head from "next/head";
import React, { ReactElement } from "react";
import Image from "next/image";
import ClientLayout from "../../components/layouts/clients-layout";
import OrderDetails from "../../components/pages/user/ordering/OrderDetails";
import { NextPageWithLayout } from "../_app";

const Order: NextPageWithLayout = () => {
  return (
    <div className="bg-gray-100 py-5 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-6">
      <div className="relative max-w-xl mx-auto">
        <svg
          className="absolute left-full transform translate-x-1/2"
          width={404}
          height={404}
          fill="none"
          viewBox="0 0 404 404"
          aria-hidden="true"
        >
          <rect
            width={404}
            height={404}
            fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
          />
        </svg>
        <svg
          className="absolute right-full bottom-0 transform -translate-x-1/2"
          width={404}
          height={404}
          fill="none"
          viewBox="0 0 404 404"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="85737c0e-0916-41d7-917f-596dc7edfa27"
              x={0}
              y={0}
              width={20}
              height={20}
              patternUnits="userSpaceOnUse"
            >
              <rect
                x={0}
                y={0}
                width={4}
                height={4}
                className="text-gray-200"
                fill="currentColor"
              />
            </pattern>
          </defs>
          <rect
            width={404}
            height={404}
            fill="url(#85737c0e-0916-41d7-917f-596dc7edfa27)"
          />
        </svg>
      </div>
      <OrderDetails />
    </div>
  );
};

Order.getLayout = function getLayout(page: ReactElement) {
  return <ClientLayout> {page} </ClientLayout>;
};

export default Order;
