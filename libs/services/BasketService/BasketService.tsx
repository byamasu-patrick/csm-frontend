
import axios from "axios"
import { BasketModel, OrderDetails } from "../../models/user/basket/BasketModels";
import { authClient } from "../AuthService/authClients";
// import { basketClient } from "./basketClient";
const basketClient = 'http://localhost:5002/api/v1';

export const AddToCart = async(addProductModel : BasketModel) =>{
    var result = await axios.post(`${basketClient}/Basket`, addProductModel);
    return result.data;
}

export const RemoveCart = async(keyword : string) =>{
    var result = await axios.delete(`${basketClient}/Basket/${keyword}`);
    return result.data;
}

export const GetBasketByUserName= async(keyword : string) =>{
    var searchResult = await axios.get(`${basketClient}/Basket/${keyword}`)
    return searchResult.data;
}

export const BasketCheckoutAndOrder = async(checkout : OrderDetails) =>{
    var result = await axios.post(`${basketClient}/Basket/Checkout`, checkout)
    return result.data;
}

