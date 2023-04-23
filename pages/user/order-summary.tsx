import { useRouter } from "next/router";
import React, { ReactElement, useState, useEffect } from "react";
import ClientLayout from "../../components/layouts/clients-layout";
import { OrderDetails } from "../../libs/models/user/basket/BasketModels";
import { GetProductsById } from "../../libs/services/CatalogService/ProductService";
import { GetOrdersByUsername } from "../../libs/services/OrderingService/OrderService";
import { useAppDispatch, useAppSelector } from "../../libs/store";
import { AuthSelector } from "../../libs/store/Auth";
import {
  BasketSelector,
  GetOrderedProductsByUsername,
} from "../../libs/store/Basket";
import {
  BillingSelector,
  searchBillingAddressData,
} from "../../libs/store/Billing";
import { ProductSelector } from "../../libs/store/Catalog";
import { NextPageWithLayout } from "../_app";

const OrderSummary: NextPageWithLayout = () => {
  const { user } = useAppSelector(AuthSelector);
  const { products } = useAppSelector(ProductSelector);
  const { ordersByUser, isOrderedFecthing } = useAppSelector(BasketSelector);
  const { billingAddresses } = useAppSelector(BillingSelector);
  const [isOrdersFetched, setIsOrdersFetched] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  var orderedProducts: OrderDetails[] = [];

  useEffect(() => {
    if (user === null) {
      router.push("/signin");
    }
    const fetchData = async () => {
      await dispatch(
        GetOrderedProductsByUsername(
          user?.profile?.firstName + " " + user?.profile?.lastName
        )
      );

      // console.log("Ordered Product Info: ", ordersByUser);
    };
    fetchData().catch((error) => console.log("Error occured"));
    setIsOrdersFetched(true);

    const getAllBillingAddresses = async () => {
      await dispatch(searchBillingAddressData(user?.email));
    };
    getAllBillingAddresses().catch((error) =>
      console.log("Error during searching billing informations")
    );
  }, []);

  return (
    <div className=" mx-auto max-w-7xl mb-5">
      <section
        aria-labelledby="products-heading"
        className="pt-5 border-dotted"
      >
        <div className="space-y-8 ">
          <div
            className="border-dashed border-green-500 bg-white shadow-sm  sm:border"
            style={{ borderWidth: "2px" }}
          >
            <div className="px-4 py-6 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
              <div className="sm:flex lg:col-span-12">
                <dt className="font-bold text-green-600 text-center w-full">
                  Thank you. Your order has been received.
                </dt>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* order summary stat */}
      <section aria-labelledby="products-heading" className="pt-5">
        <h2 id="products-heading" className="sr-only">
          Order Details
        </h2>

        <div className="space-y-8">
          <div key={""} className="bg-white shadow-md  ">
            <div className="px-4 py-6 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
              <div className="mt-6 lg:col-span-4 lg:mt-0">
                <dl className="grid grid-cols-2 gap-x-6 text-sm">
                  <div>
                    <dt className="font-medium text-gray-600">Order ID:</dt>
                    <dd className="mt-3 space-y-3 text-gray-500">
                      <button type="button" className="font-bold text-gray-900">
                        5674728
                      </button>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-600">Date:</dt>
                    <dd className="mt-3 space-y-3 text-gray-500">
                      <button type="button" className="font-bold text-gray-900">
                        April 22, 2023
                      </button>
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-6 lg:col-span-8 lg:mt-0">
                <dl className="grid grid-cols-2 lg:grid-cols-3 gap-x-6 text-sm">
                  <div>
                    <dt className="font-medium text-gray-600">Email:</dt>
                    <dd className="mt-3 space-y-3 text-gray-500">
                      <button type="button" className="font-bold text-gray-900">
                        lloykings@gmail.com
                      </button>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-600">Total:</dt>
                    <dd className="mt-3 space-y-3 text-gray-500">
                      <button type="button" className="font-bold text-gray-900">
                        MWK 20000
                      </button>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-600">
                      Payment Method:
                    </dt>
                    <dd className="mt-3 space-y-3 text-gray-500">
                      <button type="button" className="font-bold text-gray-900">
                        Airtel Money
                      </button>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* order summary table */}
      <section aria-labelledby="products-heading" className="pt-5">
        <h2 id="products-heading" className="sr-only">
          Order Details
        </h2>

        <div className="space-y-8">
          <div key={""} className="bg-white shadow-md  ">
            <div className="">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <h2
                  id="products-heading"
                  className="px-4 py-6 font-bold text-gray-900"
                >
                  Order Details
                </h2>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border">
                  <thead className="font-bold text-gray-900 ">
                    <tr>
                      <th scope="col" className="px-6 py-3 bg-gray-50 ">
                        Product
                      </th>

                      <th scope="col" className="px-6 py-3">
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border border-gray-200">
                      <th
                        scope="row"
                        className="px-6 py-4 font-light text-gray-800 whitespace-nowrap bg-gray-50"
                      >
                        Apple MacBook Pro 17{" "}
                        <span className="font-medium">* {2}</span>
                      </th>

                      <td className="px-6 py-4">MWK20000</td>
                    </tr>
                    <tr className="border-b border-l border-gray-200 dark">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                      >
                        Subtotal
                      </th>

                      <td className="px-6 py-4">MWK 40000</td>
                    </tr>
                    <tr className="border-b border-gray-200 dark">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50"
                      >
                        Shipping:
                      </th>

                      <td className="px-6 py-4">MWK 2000</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50"
                      >
                        Payment method:
                      </th>

                      <td className="px-6 py-4">Airtel Money</td>
                    </tr>
                    <tr>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap bg-gray-50 "
                      >
                        Total:
                      </th>

                      <td className="px-6 py-4">MWK42000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Billing address section */}
      <section aria-labelledby="products-heading" className="pt-5">
        <h2 id="products-heading" className="sr-only">
          Order Details
        </h2>

        <div className="space-y-8">
          <div key={""} className="bg-white shadow-md  ">
            <div className="px-4 py-6 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
              <div className="mt-6 lg:col-span-6 lg:mt-0">
                <dl className="grid grid-cols-2 gap-x-6 text-sm">
                  <div>
                    <dt className="font-bold text-gray-900">
                      Shipping Address Address
                    </dt>
                    <dd className="mt-3 space-y-3 font-light text-gray-800">
                      Austin Thope
                    </dd>
                    <dd className="mt-3 space-y-3 font-light text-gray-800">
                      Liwonde
                    </dd>
                    <dd className="mt-3 space-y-3 font-light text-gray-800">
                      +265 999 999 999
                    </dd>
                    <dd className="mt-3 space-y-3 font-light text-gray-800">
                      Speed Courier
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

OrderSummary.getLayout = function getLayout(page: ReactElement) {
  return <ClientLayout> {page} </ClientLayout>;
};

export default OrderSummary;
