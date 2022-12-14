
import axios from "axios"
import { BasketModel, OrderDetails } from "../../models/user/basket/BasketModels";
import { authClient } from "../AuthService/authClients";
// import { orderingClient } from "./orderingClient";
const orderingClient = 'http://localhost:5005/api/v1';

export const GetAllOrders = async() =>{
    var searchResult = await axios.get(`${orderingClient}/Order/`)
    return searchResult.data;
}

export const GetOrdersByUsername = async(username : string) =>{
    console.log(`Link --------------- ${orderingClient}/Order/${username}`);
    var result = await axios.get(`${orderingClient}/Order/${username}`)
    return result.data;
}

