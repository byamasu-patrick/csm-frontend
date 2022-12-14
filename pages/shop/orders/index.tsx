
import { ReactElement } from 'react';
import ShopLayout from '../../../components/layouts/shop-layout';
import type { NextPageWithLayout } from '../../_app';
import React, { Component, useEffect, useState } from "react";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import OrderDetails from '../../../components/pages/shop/Shippment/OrderDetails';
import { useAppDispatch, useAppSelector } from '../../../libs/store';
import { AuthSelector } from '../../../libs/store/Auth';
import { ProductSelector } from '../../../libs/store/Catalog';
import { GetOrderedProducts } from '../../../libs/store/Basket';

const Orders: NextPageWithLayout = () => {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(AuthSelector);
    const { productsOwner } = useAppSelector(ProductSelector);

    useEffect(() => {
      const fetchOrders = async () => {
        await dispatch(GetOrderedProducts(''));
      };
      fetchOrders().catch(error => console.log(error));
    }, []);

    const options: MUIDataTableOptions = {
        filterType: 'checkbox',
    };

    const title: string = "Ordered products";

    return (
        <>
          <div className="max-w-2xl mx-auto px-2 sm:px-6 lg:max-w-5xl lg:px-2">           
            <div className=" py-2  md:flex md:items-center md:justify-between">
              <div className="px-4 sm:px-6 md:px-0">
                <h1 className="text-3xl font-extrabold text-gray-900">Orders</h1>
              </div>             
            </div>
            <div className="align-middle inline-block min-w-full  mt-5">
               <OrderDetails />
            </div>
          </div>
        </>
      );
}

Orders.getLayout = function getLayout(page: ReactElement){
    return <ShopLayout> { page } </ShopLayout>
}


export default Orders;

