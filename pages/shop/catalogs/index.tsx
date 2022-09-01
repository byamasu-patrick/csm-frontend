
import { ReactElement } from 'react';
import ShopLayout from '../../../components/layouts/shop-layout';
import type { NextPageWithLayout } from '../../_app';
import React, { Component, useEffect, useState } from "react";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import { catalogColumns, optionsMUITable, data  } from "../../../libs/models/shops/catalogs/CatalogModels";
import { createTheme, Theme, ThemeProvider } from '@mui/material/styles';
import { Fade } from '@mui/material';


const Catalog: NextPageWithLayout = () => {

    const title: string = "Catalog List of Products";

    return (
        <>
          <div className="max-w-2xl mx-auto px-2 sm:px-6 lg:max-w-5xl lg:px-2">           
            <div className=" py-2  md:flex md:items-center md:justify-between">
              <div className="px-4 sm:px-6 md:px-0">
                <h1 className="text-3xl font-extrabold text-gray-900">Products</h1>
              </div>             
            </div>
            <div className="align-middle inline-block min-w-full  mt-5">
                {/* <ThemeProvider theme={getMuiTheme()}> */}
                    <MUIDataTable
                        title={ title }
                        data={ data }
                        columns={ catalogColumns }
                        options={ optionsMUITable }        
                        // onRowClicked={
                        //     (rowData: string[], rowMeta: { dataIndex: number, rowIndex: number }) => {
                        //         console.log(catalogColumns[rowMeta.dataIndex])
                        //     }
                        // }
                    />
                {/* </ThemeProvider> */}
            </div>
          </div>
        </>
      );
}

Catalog.getLayout = function getLayout(page: ReactElement){
    return <ShopLayout> { page } </ShopLayout>
}


export default Catalog;



