import { createReducer } from '@reduxjs/toolkit';   
import { CourierModel, CourierResponse, LocationAddressModel, LocationResponse, PriceModel, PriceResponse, ReceiverModel, ReceiverResponse } from '../../models/shipping/ShippingModels';
import { GetAllCourierById, GetAllCouries, GetAllLocationById, GetAllLocations, GetAllPriceById, GetAllPrices, GetAllReceiverById, GetAllReceivers, getAllCouriersFailed, getAllCouriersSuccess, getAllLocationsFailed, getAllLocationsSuccess, getAllPricesFailed, getAllPricesSuccess, getAllReceiversFailed, getAllReceiversSuccess, getCourierByIdFailed, getCourierByIdSuccess, getLocationByIdFailed, getLocationByIdSuccess, getPriceByIdFailed, getPriceByIdSuccess, getReceiverByIdFailed, getReceiverByIdSuccess, gettingAllCouriers,gettingAllLocations, gettingAllPrices, gettingAllReceivers, gettingCourierById, gettingLocationById, gettingPriceById, gettingReceiverById} from './actions';

export type ShippingState = {
   courier : CourierModel | null,
   receiver : ReceiverModel | null,
   location : LocationAddressModel | null,
   price: PriceModel | null,
   error : string  | null,
   isGetting : boolean,
   isGettingById : boolean,
   successMessage : string,
   warningMessage : string,
   couriers : CourierResponse,
   receivers : ReceiverResponse,
   prices : PriceResponse,
   locations : LocationResponse,
};

const initialState: ShippingState = {
   courier : null,
   receiver : null,
   price : null,
   location : null,
   error : "",
   isGetting : false,
   isGettingById : false,
   successMessage : "",
   warningMessage : "",
   couriers : {
      currentPage: 0,
      results: [],
      totalPages: 0
   }, 
   receivers: {
      currentPage: 0,
      results: [],
      totalPages: 0
   },  
   prices: {
    currentPage: 0,
    results: [],
    totalPages: 0
 },  
 locations: {
    currentPage: 0,
    results: [],
    totalPages: 0
 },  
};

export const ShippingReducer = createReducer(initialState, (builder) => {   

   builder.addCase(gettingAllCouriers , (state , {payload}) =>{
      return {...state, isGetting : payload}
   });

   builder.addCase(getAllCouriersSuccess , (state , {payload}) =>{
      return {
         ...state,  
         isGetting: false,
         couriers: {...payload}       
      }
   });

   builder.addCase(getAllCouriersFailed , (state , {payload}) =>{

      console.log("State: ", state);
      console.log("Payload: ", payload);

      return {
         ...state, 
         isGetting : false, 
         error: payload
      }
   });    
   builder.addCase(gettingAllLocations , (state , {payload}) =>{
    return {...state, isGetting : payload}
 });

 builder.addCase(getAllLocationsSuccess , (state , {payload}) =>{
    return {
       ...state,  
       isGetting: false,
       locations: {...payload}       
    }
 });

 builder.addCase(getAllLocationsFailed , (state , {payload}) =>{

    console.log("State: ", state);
    console.log("Payload: ", payload);

    return {
       ...state, 
       isGetting : false, 
       error: payload
    }
 }); 
 
 builder.addCase(gettingAllReceivers , (state , {payload}) =>{
  return {...state, isGetting : payload}
});

builder.addCase(getAllReceiversSuccess , (state , {payload}) =>{
  return {
     ...state,  
     isGetting: false,
     receivers: {...payload}       
  }
});

builder.addCase(getAllReceiversFailed , (state , {payload}) =>{

  console.log("State: ", state);
  console.log("Payload: ", payload);

  return {
     ...state, 
     isGetting : false, 
     error: payload
  }
}); 

 builder.addCase(gettingAllPrices , (state , {payload}) =>{
  return {...state, isGetting : payload}
});

builder.addCase(getAllPricesSuccess , (state , {payload}) =>{
  return {
     ...state,  
     isGetting: false,
     prices: {...payload}       
  }
});

builder.addCase(getAllPricesFailed , (state , {payload}) =>{

  console.log("State: ", state);
  console.log("Payload: ", payload);

  return {
     ...state, 
     isGetting : false, 
     error: payload
  }
}); 

   builder.addCase(gettingCourierById , (state , {payload}) =>{
      return {...state, isGettingById : payload}
   });

   builder.addCase(getCourierByIdSuccess , (state , {payload}) =>{
      return {
         ...state,  
         isGettingById: false,
         courier: payload         
      }
   });

   builder.addCase(getCourierByIdFailed , (state , {payload}) =>{
      return {...state, isGettingById : false, error: payload}
   }); 
   builder.addCase(gettingLocationById , (state , {payload}) =>{
    return {...state, isGettingById : payload}
 });

 builder.addCase(getLocationByIdSuccess , (state , {payload}) =>{
    return {
       ...state,  
       isGettingById: false,
       location: payload         
    }
 });

 builder.addCase(getLocationByIdFailed , (state , {payload}) =>{
    return {...state, isGettingById : false, error: payload}
 }); 
 builder.addCase(gettingPriceById , (state , {payload}) =>{
    return {...state, isGettingById : payload}
 });

 builder.addCase(getPriceByIdSuccess , (state , {payload}) =>{
    return {
       ...state,  
       isGettingById: false,
       price: payload         
    }
 });

 builder.addCase(getPriceByIdFailed , (state , {payload}) =>{
    return {...state, isGettingById : false, error: payload}
 }); 
 builder.addCase(gettingReceiverById , (state , {payload}) =>{
    return {...state, isGettingById : payload}
 });

 builder.addCase(getReceiverByIdSuccess , (state , {payload}) =>{
    return {
       ...state,  
       isGettingById: false,
       receiver: payload         
    }
 });

 builder.addCase(getReceiverByIdFailed , (state , {payload}) =>{
    return {...state, isGettingById : false, error: payload}
 }); 
   
});
