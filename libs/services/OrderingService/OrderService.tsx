
import axios from "axios"
import { BasketModel, OrderDetails } from "../../models/user/basket/BasketModels";
const clientUrl = 'http://localhost:5005/api/v1';

export const GetAllOrders = async() =>{
    var searchResult = await axios.get(`${clientUrl}/Order/`)
    return searchResult.data;
}

export const GetOrdersByUsername = async(username : string) =>{
    var result = await axios.get(`${clientUrl}/Order/${username}`)
    return result.data;
}

