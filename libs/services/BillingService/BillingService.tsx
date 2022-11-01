
import axios from "axios"
import { AddBillingAddressModel } from "../../models/billing/BillingAddressModel";
// import { basketClient } from "./basketClient";
const billingClient = 'http://localhost:5012/api/v1';

export const AddBillingAddressService = async(addBillingModel : AddBillingAddressModel) =>{
    var result = await axios.post(`${billingClient}/Billing`, addBillingModel);
    return result.data;
}

export const DeleteBillingAddressService = async(keyword : string) =>{
    var result = await axios.delete(`${billingClient}/Billing/${keyword}`);
    return result.data;
}

export const SearchBillingAddresseService = async(keyword : string) =>{
    var searchResult = await axios.get(`${billingClient}/Billing/GetBillingByUserId/${keyword}`)
    return searchResult.data;
}

// /api/v1/Billing/GetBillingByUserId/{userId}