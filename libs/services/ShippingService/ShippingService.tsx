
import axios from "axios"
import { AddCourierModel, AddPriceModel, AddLocationModel, AddReceiverModel } from "../../models/shipping/ShippingModels";
import { authClient } from "../AuthService/authClients";
 //import { shippingClient } from "./ShippingClient";

const shippingClient = 'http://localhost:5175/api/v1';

// api calls for adding shipping details to the database
export const AddCourier = async(addCourierModel : AddCourierModel) =>{
    var result = await axios.post(`${shippingClient}/Courier`, addCourierModel);
    return result.data;
}

export const AddLocation = async(addLocationModel : AddLocationModel) =>{
    var result = await axios.post(`${shippingClient}/Location`, addLocationModel);
    return result.data;
}

export const AddPrice = async(addPriceModel : AddPriceModel) =>{
    var result = await axios.post(`${shippingClient}/Price`, addPriceModel);
    return result.data;
}
export const AddReceiver = async(addReceiverModel : AddReceiverModel) =>{
    var result = await axios.post(`${shippingClient}/Receiver`, addReceiverModel);
    return result.data;
}
// end

// api calls for getting shipping details from the db

export const GetCouriers = async(page : number) =>{
    var result = await axios.get(`${shippingClient}/Courier/${page}`);
    return result.data;
}

export const GetLocations = async(page : number) =>{
    var result = await axios.get(`${shippingClient}/Location/${page}`);
    return result.data;
}
export const GetPrices = async(page : number) =>{
    var result = await axios.get(`${shippingClient}/Price/${page}`);
    return result.data;
}
export const GetReceivers = async(page : number) =>{
    var result = await axios.get(`${shippingClient}/Courier/${page}`);
    return result.data;
}

//api calls for getting shipping details by id

export const GetCourierById = async(id : string) =>{
    var result = await axios.get(`${shippingClient}/Courier/${id}`);
    return result.data;
}
export const GetLocationById = async(id : string) =>{
    var result = await axios.get(`${shippingClient}/Location/${id}`);
    return result.data;
}
export const GetReceiverById = async(id : string) =>{
    var result = await axios.get(`${shippingClient}/Receiever/${id}`);
    return result.data;
}
export const GetPriceById = async(id : string) =>{
    var result = await axios.get(`${shippingClient}/Price/${id}`);
    return result.data;
}
// api calls for deleting shipping details from the database

export const RemoveCourierById = async(id : string) =>{
    var result = await axios.delete(`${shippingClient}/Courier/${id}`);
    return result.data;
}
export const RemoveLocationById = async(id : string) =>{
    var result = await axios.delete(`${shippingClient}/Location/${id}`);
    return result.data;
}
export const RemovePriceById = async(id : string) =>{
    var result = await axios.delete(`${shippingClient}/Price/${id}`);
    return result.data;
}
export const RemoveReceiverById = async(id : string) =>{
    var result = await axios.delete(`${shippingClient}/Receiver/${id}`);
    return result.data;
}
