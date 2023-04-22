import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AddCourierModel, AddPriceModel, AddLocationModel, AddReceiverModel, CourierModel, PriceModel, LocationAddressModel, ReceiverModel, CourierResponse, ReceiverResponse, PriceResponse, LocationResponse } from "../../models/shipping/ShippingModels";
import {AddCourier, AddLocation, AddPrice, AddReceiver, GetCourierById, GetLocationById, GetPriceById, GetReceiverById, GetCouriers, GetLocations, GetPrices, GetReceivers, RemoveCourierById, RemoveLocationById, RemovePriceById, RemoveReceiverById} from "../../services/ShippingService/ShippingService";
import { ShippingActionType } from "./actions-type";
// adding shipping details to db
           // courier
export const addingCouier  = createAction<boolean>(ShippingActionType.ADD_COURIER_TO_DB);
export const addCourierSuccess = createAction<AddCourierModel>(ShippingActionType.ADD_COURIER_SUCCESS);
export const addCourierFailed = createAction<string>(ShippingActionType.ADD_COURIER_FAILED);
         // receiver
export const addingReceiver  = createAction<boolean>(ShippingActionType.ADD_RECEIVER_TO_DB);
export const addReceiverSuccess = createAction<AddReceiverModel>(ShippingActionType.ADD_RECEIVER_SUCCESS)
export const addReceiverFailed = createAction<string>(ShippingActionType.ADD_RECEIVER_FAILED);
         // location
export const addingLocation  = createAction<boolean>(ShippingActionType.ADD_LOCATION_TO_DB);
export const addLocationSuccess = createAction<AddLocationModel>(ShippingActionType.ADD_LOCATION_SUCCESS)
export const addLocationFailed = createAction<string>(ShippingActionType.ADD_LOCATION_FAILED);
        // Price
export const addingPrice  = createAction<boolean>(ShippingActionType.ADD_PRICE_TO_DB);
export const addPriceSuccess = createAction<AddPriceModel>(ShippingActionType.ADD_PRICE_SUCCESS);
export const addPriceFailed = createAction<string>(ShippingActionType.ADD_PRICE_FAILED);      
//getting shipping details from db
        // couriers
export const gettingAllCouriers  = createAction<boolean>(ShippingActionType.GET_ALL_COURIERS);
export const getAllCouriersSuccess = createAction<CourierResponse>(ShippingActionType.GET_ALL_COURIERS_SUCCESS)
export const getAllCouriersFailed = createAction<string>(ShippingActionType.GET_ALL_COURIERS_FAILED); 
        // receivers
export const gettingAllReceivers  = createAction<boolean>(ShippingActionType.GET_ALL_RECEIVERS);
export const getAllReceiversSuccess = createAction<ReceiverResponse>(ShippingActionType.GET_ALL_RECEIVERS_SUCCESS)
export const getAllReceiversFailed = createAction<string>(ShippingActionType.GET_ALL_RECEIVERS_FAILED); 
        // prices
export const gettingAllPrices  = createAction<boolean>(ShippingActionType.GET_ALL_PRICES);
export const getAllPricesSuccess = createAction<PriceResponse>(ShippingActionType.GET_ALL_PRICES_SUCCESS)
export const getAllPricesFailed = createAction<string>(ShippingActionType.GET_ALL_PRICES_FAILED); 
        // locations
export const gettingAllLocations  = createAction<boolean>(ShippingActionType.GET_ALL_LOCATIONS);
export const getAllLocationsSuccess = createAction<LocationResponse>(ShippingActionType.GET_ALL_LOCATIONS_SUCCESS)
export const getAllLocationsFailed = createAction<string>(ShippingActionType.GET_ALL_LOCATIONS_FAILED); 
// getting shipping detail by id
        //courier
export const gettingCourierById  = createAction<boolean>(ShippingActionType.GET_COURIER_BY_ID);
export const getCourierByIdSuccess = createAction<CourierModel>(ShippingActionType.GET_COURIER_BY_ID_SUCCESS)
export const getCourierByIdFailed = createAction<string>(ShippingActionType.GET_COURIER_BY_ID_FAILED); 
       // receiver
export const gettingReceiverById  = createAction<boolean>(ShippingActionType.GET_RECEIVER_BY_ID);
export const getReceiverByIdSuccess = createAction<ReceiverModel>(ShippingActionType.GET_RECEIVER_BY_ID_SUCCESS)
export const getReceiverByIdFailed = createAction<string>(ShippingActionType.GET_RECEIVER_BY_ID_FAILED); 
      // location
export const gettingLocationById  = createAction<boolean>(ShippingActionType.GET_LOCATION_BY_ID);
export const getLocationByIdSuccess = createAction<LocationAddressModel>(ShippingActionType.GET_LOCATION_BY_ID_SUCCESS)
export const getLocationByIdFailed = createAction<string>(ShippingActionType.GET_LOCATION_BY_ID_FAILED); 
     // price
export const gettingPriceById  = createAction<boolean>(ShippingActionType.GET_PRICE_BY_ID);
export const getPriceByIdSuccess = createAction<PriceModel>(ShippingActionType.GET_PRICE_BY_ID_SUCCESS)
export const getPriceByIdFailed = createAction<string>(ShippingActionType.GET_PRICE_BY_ID_FAILED); 

// action for getting all shipping details
            //courier
export const GetAllCouries = createAsyncThunk(ShippingActionType.GET_ALL_COURIERS, 
    async(page: number, thunkAPI) =>{
        try{
    
                thunkAPI.dispatch(gettingAllCouriers(true));
                let result = await GetCouriers(page);
                thunkAPI.dispatch(getAllCouriersSuccess(result));
                console.log(result);
    
        }catch(error){
                var errorMessage = (error as string);
                thunkAPI.dispatch(getAllCouriersFailed(errorMessage));
            }
    });
            //locations
export const GetAllLocations = createAsyncThunk(ShippingActionType.GET_ALL_LOCATIONS, 
    async(page: number, thunkAPI) =>{
        try{
    
                thunkAPI.dispatch(gettingAllLocations(true));
                let result = await GetLocations(page);
                thunkAPI.dispatch(getAllLocationsSuccess(result));
                // console.log(result);
    
        }catch(error){
                var errorMessage = (error as string);
                thunkAPI.dispatch(getAllLocationsFailed(errorMessage));
            }
    });
            //receivers
export const GetAllReceivers = createAsyncThunk(ShippingActionType.GET_ALL_RECEIVERS, 
    async(page: number, thunkAPI) =>{
        try{
    
                thunkAPI.dispatch(gettingAllReceivers(true));
                let result = await GetReceivers(page);
                thunkAPI.dispatch(getAllReceiversSuccess(result));
                // console.log(result);
    
        }catch(error){
                var errorMessage = (error as string);
                thunkAPI.dispatch(getAllReceiversFailed(errorMessage));
            }
    });
            //prices
export const GetAllPrices = createAsyncThunk(ShippingActionType.GET_ALL_PRICES, 
    async(page: number, thunkAPI) =>{
        try{
    
                thunkAPI.dispatch(gettingAllPrices(true));
                let result = await GetReceivers(page);
                thunkAPI.dispatch(getAllPricesSuccess(result));
                // console.log(result);
    
        }catch(error){
                var errorMessage = (error as string);
                thunkAPI.dispatch(getAllPricesFailed(errorMessage));
            }
    });
// getting shipping details by id
               // courier
export const GetAllCourierById = createAsyncThunk(ShippingActionType.GET_COURIER_BY_ID, 
    async(id: string, thunkAPI) =>{
        try{
    
                thunkAPI.dispatch(gettingCourierById(true));
                let result = await GetCourierById(id);
                thunkAPI.dispatch(getCourierByIdSuccess(result));
                // console.log(result);
    
        }catch(error){
                var errorMessage = (error as string);
                thunkAPI.dispatch(getCourierByIdFailed(errorMessage));
            }
    });
               // receiver
export const GetAllReceiverById = createAsyncThunk(ShippingActionType.GET_RECEIVER_BY_ID, 
async(id: string, thunkAPI) =>{
    try{

            thunkAPI.dispatch(gettingReceiverById(true));
            let result = await GetReceiverById(id);
            thunkAPI.dispatch(getReceiverByIdSuccess(result));
            // console.log(result);

    }catch(error){
            var errorMessage = (error as string);
            thunkAPI.dispatch(getReceiverByIdFailed(errorMessage));
        }
});
               // price
export const GetAllPriceById = createAsyncThunk(ShippingActionType.GET_PRICE_BY_ID, 
async(id: string, thunkAPI) =>{
    try{

            thunkAPI.dispatch(gettingPriceById(true));
            let result = await GetPriceById(id);
            thunkAPI.dispatch(getPriceByIdSuccess(result));
            // console.log(result);

    }catch(error){
            var errorMessage = (error as string);
            thunkAPI.dispatch(getPriceByIdFailed(errorMessage));
        }
});
               // location
export const GetAllLocationById = createAsyncThunk(ShippingActionType.GET_LOCATION_BY_ID, 
async(id: string, thunkAPI) =>{
    try{

            thunkAPI.dispatch(gettingCourierById(true));
            let result = await GetLocationById(id);
            thunkAPI.dispatch(getLocationByIdSuccess(result));
            // console.log(result);

    }catch(error){
            var errorMessage = (error as string);
            thunkAPI.dispatch(getLocationByIdFailed(errorMessage));
        }
});