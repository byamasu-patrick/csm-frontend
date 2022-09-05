import axios from "axios"
import { AddProductModel, ProductModel } from "../../models/shops/catalogs/ProductModels";
const clientUrl = 'http://localhost:8000';
export const getProducts = async () =>{
    var result  = await axios.get(`${clientUrl}/Catalog`);
    return result.data;
}

export const getProductsByShopOwner = async (ownerId: number) =>{
    var result  = await axios.get(`${clientUrl}/Catalog/GetProductsByShopOwner/${ownerId}`);
    return result.data;
}

export const AddProduct = async(addProductModel : AddProductModel) =>{

    console.log(addProductModel);

    var result = await axios.post(`${clientUrl}/Catalog`, addProductModel);
    return result.data;
}

export const RemoveProductById = async(id : string) =>{
    var result = await axios.delete(`${clientUrl}/Catalog/${id}`);
    return result.data;
}

export const GetProductsByName= async(keyword : string) =>{
    var searchResult = await axios.get(`${clientUrl}/Catalog/GetProductByName/${keyword}`)
    return searchResult;
}

export const UpdateProduct = async(updateProductmodel : ProductModel) => {
    var result = await axios.put(`${clientUrl}/Catalog`, updateProductmodel);
    return result.data;
}