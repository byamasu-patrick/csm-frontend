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
    itemsInStock: number;
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
        console.log("Clicked row: ", data[rowMeta.dataIndex].name);
        
    } 
};

export const catalogColumns: Array<CatalogColumn> = [
    {
        name: "imageFile",
        label: "Image",
        options: {
            filter: false,
            sort: false,
            customBodyRender: (imageFile: string): ReactElement => {
                return (
                    <img variant="rounded" width="60" height="60" src={`${imageFile}`} />
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
            customBodyRender: (name) => {
                return name.substr(0, 15)
            }
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
            customBodyRender: (summaryData) => {
                return summaryData.substr(0, 25)
            }
        }
    },
    {
        name: "itemsInStock",
        label: "Items in Stock",
        options: {
            filter: true,
            sort: true,
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