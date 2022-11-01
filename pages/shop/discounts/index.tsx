
import { ReactElement, useRef } from 'react';
import ShopLayout from '../../../components/layouts/shop-layout';
import type { NextPageWithLayout } from '../../_app';
import React, { Component, useEffect, useState } from "react";
import { HubConnectionBuilder } from '@microsoft/signalr';
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import { MessageInfo } from '../../../components/widgets/chats/ChatForm';
import ChatMessages from '../../../components/widgets/chats/ChatMessages';
import QuickChat from '../../../components/widgets/chats/QuickChat';
import { useAppDispatch, useAppSelector } from '../../../libs/store';
import { GetAllProductsByOwner, ProductSelector } from '../../../libs/store/Catalog';
import { AuthSelector } from '../../../libs/store/Auth';
import { ProductModel } from '../../../libs/models/shops/catalogs/ProductModels';
import CreateProduct from '../../../components/pages/shop/catalog/CreateProduct';
import ViewEditProduct from '../../../components/pages/shop/catalog/ViewEditProduct';
import { catalogColumns } from '../../../libs/models/shops/catalogs/CatalogModels';
import AddDiscount from '../../../components/pages/shop/discount/AddDiscount';

const Carts: NextPageWithLayout = () => {

    const [isCreate, setIsCreate] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [product, setProduct] = useState<ProductModel | null>(null);

    const title: string = "Catalog List of Products";
    const dispatch = useAppDispatch();
    const { productsOwner } = useAppSelector(ProductSelector);
    const { user } = useAppSelector(AuthSelector);

    useEffect(() => {
      if(user !== null && productsOwner.length <= 0){
        const getProducts = async () => {          
          await dispatch(GetAllProductsByOwner(user?.email));
        }
        getProducts().catch((error) => console.log(error));
      }
      
    }, []);

    const optionsMUITable : MUIDataTableOptions = {
      selectableRows: "none",
      filter: true,
      print: true,
      responsive: "standard",
      download: true,
      downloadOptions: {
        filename: "catalog.csv",
      },
      onRowClick: (rowData: string[], rowMeta) => {
          // console.log("Clicked row: ", data[rowMeta.dataIndex].name);
          setProduct(productsOwner.filter((product) => product.id == productsOwner[rowMeta.dataIndex].id)[0])
          setIsOpen(!isOpen);
      } 
    };
    

  
    // const [ chat, setChat ] = useState<Array<MessageInfo>>([]);
    // const latestChat = useRef(null);
    
    // latestChat.current = chat;

    // useEffect(() => {
    //     const connection = new HubConnectionBuilder()
    //         .withUrl('https://localhost:7121/hubs/chat')
    //         .withAutomaticReconnect()
    //         .build();

    //     connection.start()
    //         .then(result => {
    //             console.log('Connected!');

    //             connection.on('ReceiveMessage', message => {
    //                 const updatedChat = [...latestChat.current];
    //                 updatedChat.push(message);
                
    //                 setChat(updatedChat);
    //             });
    //         })
    //         .catch(e => console.log('Connection failed: ', e));
    // }, []);

    return (
        <>
          <div className="max-w-2xl mx-auto px-2 sm:px-6 lg:max-w-5xl lg:px-2">           
            <div className=" py-2  md:flex md:items-center md:justify-between">
              <div className="px-4 sm:px-6 md:px-0">
                <h1 className="text-3xl font-extrabold text-gray-900">Products</h1>
              </div>             
            </div>
            <div className=" py-2 items-end">
                <button
                  type="button"
                  onClick={() => setIsCreate(!isCreate)}
                  className="float-right inline-block px-6 py-2.5 bg-orange-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-100 ease-in-out capitalize"
                >
                    New Promotion
                </button>
            </div>
            
            <div className="align-middle inline-block min-w-full  mt-5">
                {
                  !isCreate && !isOpen ? <MUIDataTable
                        title={ title }
                        data={ productsOwner }
                        columns={ catalogColumns }
                        options={ optionsMUITable }     
                    /> : <></>
                }
            </div>
          </div>
          
          <div className="mt-4 flex-shrink-0 flex md:mt-0 md:ml-4">
            {
              isCreate ? <CreateProduct isCreate={isCreate} setIsCreate={setIsCreate}/> : (<></>)
            }      
          </div>  
            {
              isOpen ? <AddDiscount isOpen={isOpen} setIsOpen={setIsOpen} data={product as ProductModel}/> : (<></>)
            }
        </>
      );

}

Carts.getLayout = function getLayout(page: ReactElement){
    return <ShopLayout> { page } </ShopLayout>
}


export default Carts;

