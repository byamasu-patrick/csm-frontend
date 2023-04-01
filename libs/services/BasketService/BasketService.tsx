
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
// the api call to remove only one item in the basket
export const RemoveCartItem = async(username : string, productId: string) =>{
    var result = await axios.delete(`${basketClient}/Basket/DeleteBasketItem/${username}/${productId}`);
    return result.data;
}
// an api call to increase the quantity of an item in the basket
export const IncreaseItemQuantiy = async(username : string, productId: string, value: number) =>{
    var result = await axios.post(`${basketClient}/Basket/increaseItemQuantity/${username}/${productId}/${value}`);
    return result.data;
}
// an api to call to decrease the quantiy of an item in the basket
export const DecreaseItemQuantiy = async(username : string, productId: string, value: number) =>{
    var result = await axios.post(`${basketClient}/Basket/decreaseItemQuantity/${username}/${productId}/${value}`);
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

