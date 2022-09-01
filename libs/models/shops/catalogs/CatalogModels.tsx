import { Avatar } from "@material-ui/core";
import { MUIDataTableOptions } from "mui-datatables";
import Link from "next/link";
import { ReactElement } from "react";



export interface CatalogColumn {
    name: string;
    label: string;
    options: CatalogOptions;
}

export interface CatalogOptions {
    filter: boolean;
    sort: boolean;
    customBodyRender: any;
}

export interface CatalogData {
    id: string;
    name: string;
    category: string;
    summary: string;
    imageFile: string;
    price: number;
};

export const optionsMUITable : MUIDataTableOptions = {
    selectableRows: "none",
    filter: true,
    print: true,
    responsive: "standard",
    download: true,
    downloadOptions: {
      filename: "catalog.csv",
    },
    onRowClick: (rowData: string[], rowMeta) => {
        console.log("Clicked row: ", data[rowMeta.dataIndex].name)
    } 
};

export const data: Array<CatalogData> = [
    
        {
          "id": "1",
          "name": "IPhone X",
          "category": "Smart Phone",
          "summary": "This phone is the company's.",
          "imageFile": "https://kwingy.com/wp-content/uploads/2022/06/apple-iphone-x-new-1-1.jpg",
          "price": 950
        },
        {
          "id": "2",
          "name": "Samsung 10",
          "category": "Smart Phone",
          "summary": "This phone is the company's.",
          "imageFile": "https://www.samsung.com/global/galaxy/galaxy-z-flip4/images/galaxy-z-flip4_highlights_kv.jpg",
          "price": 840
        },
        {
          "id": "3",
          "name": "Huawei Plus",
          "category": "White Appliances",
          "summary": "This phone is the company's.",
          "imageFile": "https://www.gizmochina.com/wp-content/uploads/2017/01/Huawei-nova-plus.jpg",
          "price": 650
        },
        {
          "id": "4",
          "name": "Xiaomi Mi 9",
          "category": "White Appliances",
          "summary": "This phone is the company's.",
          "imageFile": "https://media.router-switch.com/media/catalog/product/cache/b90fceee6a5fa7acd36a04c7b968181c/x/i/xiaomi-mi-11-5g_3.jpg",
          "price": 470
        },
        {
          "id": "5",
          "name": "HTC U11+ Plus",
          "category": "Smart Phone",
          "summary": "This phone is the company's.",
          "imageFile": "https://www.zdnet.com/a/img/resize/681faf2113dca46191de9cee5dc3d35b40bb8ada/2018/01/16/b14982a8-eea3-4614-ae5f-c77cc6e36ea8/htc-u11-plus-header.jpg?auto=webp&width=768",
          "price": 380
        },
        {
          "id": "6",
          "name": "LG G7 ThinQ",
          "category": "Home Kitchen",
          "summary": "This phone is the company's.",
          "imageFile": "https://fdn2.gsmarena.com/vv/pics/lg/lg-g7-thinq-00.jpg",
          "price": 240
        }        
];

export const catalogColumns: Array<CatalogColumn> = [
    {
        name: "id",
        label: "Id",
        options: {
            filter: false,
            sort: true,
            customBodyRender: null
        }
    },
    {
        name: "imageFile",
        label: "Image",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (imageFile: string): ReactElement => {
                return (
                  <Link href={imageFile}>
                    <Avatar variant="rounded" src={imageFile} />
                  </Link>
                );
            }
        }
    },
    {
        name: "name",
        label: "Product Name",
        options: {
            filter: true,
            sort: false,
            customBodyRender: null
        }
    },
    {
        name: "category",
        label: "Category",
        options: {
            filter: true,
            sort: true,
            customBodyRender: null
        }
    },
    {
        name: "summary",
        label: "Short Summary",
        options: {
            filter: true,
            sort: false,
            customBodyRender: null
        }
    },
    {
        name: "price",
        label: "Price in $",
        options: {
            filter: true,
            sort: true,
            customBodyRender: null
        }
    }
];