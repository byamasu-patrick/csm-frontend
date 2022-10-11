import axios from "axios"
import { AddProductModel, ProductModel } from "../../models/shops/catalogs/ProductModels";
import { authClient } from "../AuthService/authClients";
// import { catalogClient } from "./catalogClient";
const catalogClient = 'http://localhost:5000/api/v1';
export const getProducts = async (page: number) =>{
    var result  = await axios.get(`${catalogClient}/Catalog/${page}`);
    return result.data;
}

export const getProductsByShopOwner = async (ownerId: string) =>{
    var result  = await axios.get(`${catalogClient}/Catalog/GetProductByOwner/${ownerId}`);
    return result.data;
}

export const getProductsByCategory = async (category: string, page: number) =>{
    var result  = await axios.get(`${catalogClient}/Catalog/GetProductByCategory/${category}/${page}`);
    return result.data;
}

export const AddProduct = async(addProductModel : AddProductModel) =>{

    console.log(addProductModel);

    var result = await axios.post(`${catalogClient}/Catalog`, addProductModel);
    return result.data;
}

export const RemoveProductById = async(id : string) =>{
    var result = await axios.delete(`${catalogClient}/Catalog/${id}`);
    return result.data;
}

export const GetProductsByName= async(keyword : string) =>{
    var searchResult = await axios.get(`${catalogClient}/Catalog/GetProductByName/${keyword}`)
    return searchResult;
}

export const GetProductsById= async(keyword : string) =>{
    var searchResult = await axios.get(`${catalogClient}/Catalog/${keyword}`)
    return searchResult.data;
}

export const UpdateProduct = async(updateProductmodel : ProductModel) => {
    var result = await axios.put(`${catalogClient}/Catalog`, updateProductmodel);
    return result.data;
}