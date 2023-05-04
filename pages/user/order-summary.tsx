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
  const [isOrdersFetched, setIsOrdersFetched] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  var orderedProducts: OrderDetails[] = [];

  var orderedProducts: OrderDetails[] = [];
  const ordersByUserCopy = [...ordersByUser];
  const recentOrder = ordersByUserCopy
  .sort((a, b) => new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime())[0];
  const formattedDate = new Date(recentOrder?.createdDate).toLocaleString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });

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

      console.log("Ordered Product Info: ", ordersByUser);
    []};
    fetchData().catch((error) => console.log("Error occured"));
    setIsOrdersFetched(true);
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
                  <dd className="mt-3 space-y-3 text-gray-500" style={{ whiteSpace: 'nowrap' }}>
                    <button type="button" className="font-bold text-gray-800 pr-10">
                      {recentOrder?.id.slice(0,22)}
                    </button>
                  </dd>
                </div>

                  <div>
                    <dt className="font-medium text-gray-600">Date:</dt>
                    <dd className="mt-3 space-y-3 text-gray-500">
                      <button type="button" className="font-bold text-gray-900">
                          {formattedDate}
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
                        {recentOrder?.emailAddress}
                      </button>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-600">Total:</dt>
                    <dd className="mt-3 space-y-3 text-gray-500">
                      <button type="button" className="font-bold text-gray-900">
                        MWK {recentOrder?.totalPrice + recentOrder?.shippingPrice}
                      </button>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium text-gray-600">
                      Payment Method:
                    </dt>
                    <dd className="mt-3 space-y-3 text-gray-500">
                      <button type="button" className="font-bold text-gray-900">
                        {recentOrder?.paymentMethod}
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
                      <th scope="col" className="px-6 py-3 bg-gray-50 ">
                        price
                      </th>
                      <th scope="col" className="px-6 py-3 bg-gray-50 ">
                        quantity
                      </th>
                      <th scope="col" className="px-6 py-3">
                        subTotal
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                  {recentOrder?.products.map((product) => (
                    <tr key={product?.productId} className="border border-gray-200">
                      <th
                        scope="row"
                        className="px-6 py-4 font-light text-gray-800 whitespace-nowrap bg-gray-50"
                      >
                        {product?.productName}
                        <span className="font-medium"></span>
                      </th>

                      <td className="px-6 py-4"> K{product?.price}</td>
                      
                      <td className="px-6 py-4"> {product?.quantity}</td>
                      
                      <td className="px-6 py-4"> K{product?.subTotal}</td>
                    </tr>                    
                       ))}
                  </tbody>
                </table>
                <span className="font-bold text-gray-900 pl-5">
                      Total Price: 
                </span> K{recentOrder?.totalPrice}
                
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
                      {recentOrder?.firstName} {recentOrder?.lastName}
                    </dd>
                    <dd className="mt-3 space-y-3 font-light text-gray-800">
                      {recentOrder?.physicalAddress}
                    </dd>
                    <dd className="mt-3 space-y-3 font-light text-gray-800">
                      {recentOrder?.phoneNumber}
                    </dd>
                    <dd className="mt-3 space-y-3 font-light text-gray-800">
                      {recentOrder?.courierName}
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
