import { ResetTvOutlined } from "@mui/icons-material";
import axios from "axios"
import { CreateDiscountModel, DiscountModel } from "../../models/discount/DiscountModel";
import { AddProductModel, ProductModel } from "../../models/shops/catalogs/ProductModels";
import { authClient } from "../AuthService/authClients";
// import { catalogClient } from "./catalogClient";
const discountClient = 'http://localhost:5003/api/v1';
export const getDiscountByName = async (productName: string) =>{
    var result  = await axios.get(`${discountClient}/Discount/${productName}`);
    return result.data;
}
export const createDiscount = async(addProductModel : CreateDiscountModel) =>{
    var result = await axios.post(`${discountClient}/Discount`, addProductModel);
    return result.data;
}

export const getDiscountService = async () => {
    var result  = await axios.get(`${discountClient}/Discount/`);
    return result.data;
}