export enum ShippingActionType {
    // adding to shipping details action types
            // courier
    ADD_COURIER_TO_DB = 'shipping/ADD_COURIER_TO_DB',
    ADD_COURIER_SUCCESS = 'shipping/ADD_COURIER_SUCCESS',
    ADD_COURIER_FAILED = 'shipping/ADD_COURIER_FAILED ',
          // location
    ADD_LOCATION_TO_DB = 'shipping/ADD_LOCATION_TO_DB',
    ADD_LOCATION_SUCCESS = 'shipping/ADD_LOCATION_SUCCESS',
    ADD_LOCATION_FAILED = 'shipping/ADD_LOCATION_FAILED ',
          // receiver
    ADD_RECEIVER_TO_DB = 'shipping/ADD_RECEIVER_TO_DB',
    ADD_RECEIVER_SUCCESS = 'shipping/ADD_RECEIVER_SUCCESS',
    ADD_RECEIVER_FAILED = 'shipping/ADD_RECEIVER_FAILED ',
         // price
    ADD_PRICE_TO_DB = 'shipping/ADD_PRICE_TO_DB',
    ADD_PRICE_SUCCESS = 'shipping/ADD_PRICE_SUCCESS',
    ADD_PRICE_FAILED = 'shipping/ADD_PRICE_FAILED ',
    // getting shipping details action types
             // getting all couriers
    GET_ALL_COURIERS = 'shipping/GET_ALL_COURIERS',
    GET_ALL_COURIERS_SUCCESS = 'shipping/GET_COURIERS_SUCCESS',
    GET_ALL_COURIERS_FAILED = 'shipping/GET_ALL_COURIERS_FAILED ',
             // getting all locations
    GET_ALL_LOCATIONS = 'shipping/GET_ALL_LOCATIONS',
    GET_ALL_LOCATIONS_SUCCESS = 'shipping/GET_LOCATIONS_SUCCESS',
    GET_ALL_LOCATIONS_FAILED = 'shipping/GET_ALL_LOCATIONS_FAILED ',
             // getting all receivers
    GET_ALL_RECEIVERS = 'shipping/GET_ALL_RECEIVERS',
    GET_ALL_RECEIVERS_SUCCESS = 'shipping/GET_RECEIVERS_SUCCESS',
    GET_ALL_RECEIVERS_FAILED = 'shipping/GET_ALL_RECEIVERS_FAILED ',
            // getting all prices 
    GET_ALL_PRICES = 'shipping/GET_ALL_PRICES',
    GET_ALL_PRICES_SUCCESS = 'shipping/GET_PRICES_SUCCESS',
    GET_ALL_PRICES_FAILED = 'shipping/GET_ALL_PRICES_FAILED ',
    // getting shipping details by id
            // courier
    GET_COURIER_BY_ID = 'shipping/GET_COURIER_BY_ID',
    GET_COURIER_BY_ID_SUCCESS = 'shipping/GET_COURIER_BY_ID_SUCCESS',
    GET_COURIER_BY_ID_FAILED = 'shipping/GET_COURIER_BY_ID_FAILED ',
          // location
    GET_LOCATION_BY_ID = 'shipping/GET_LOCATION_BY_ID',
    GET_LOCATION_BY_ID_SUCCESS = 'shipping/GET_LOCATION_BY_ID_SUCCESS',
    GET_LOCATION_BY_ID_FAILED = 'shipping/GET_LOCATION_BY_ID_FAILED ',
          // price
    GET_PRICE_BY_ID = 'shipping/GET_PRICE_BY_ID',
    GET_PRICE_BY_ID_SUCCESS = 'shipping/GET_PRICE_BY_ID_SUCCESS',
    GET_PRICE_BY_ID_FAILED = 'shipping/GET_PRICE_BY_ID_FAILED ',
          // receiver
    GET_RECEIVER_BY_ID = 'shipping/GET_RECEIVER_BY_ID',
    GET_RECEIVER_BY_ID_SUCCESS = 'shipping/GET_RECEIVER_BY_ID_SUCCESS',
    GET_RECEIVER_BY_ID_FAILED = 'shipping/GET_RECEIVER_BY_ID_FAILED ',
    // deleting shipping details by id
          // courier
    REMOVE_COURIER_BY_ID = 'shipping/REMOVE_COURIER_BY_ID',
    REMOVE_COURIER_BY_ID_SUCCESS = 'shipping/REMOVE_COURIER_BY_ID_SUCCESS',
    REMOVE_COURIER_BY_ID_FAILED = 'shipping/REMOVE_COURIER_BY_ID_FAILED ',
         // location
    REMOVE_LOCATION_BY_ID = 'shipping/REMOVE_LOCATION_BY_ID',
    REMOVE_LOCATION_BY_ID_SUCCESS = 'shipping/REMOVE_LOCATION_BY_ID_SUCCESS',
    REMOVE_LOCATION_BY_ID_FAILED = 'shipping/REMOVE_LOCATION_BY_ID_FAILED ',
         // receiver
    REMOVE_RECEIVER_BY_ID = 'shipping/REMOVE_COURIER_BY_ID',
    REMOVE_RECEIVER_BY_ID_SUCCESS = 'shipping/REMOVE_COURIER_BY_ID_SUCCESS',
    REMOVE_RECEIVER_BY_ID_FAILED = 'shipping/REMOVE_COURIER_BY_ID_FAILED ',
        // price
    REMOVE_PRICE_BY_ID = 'shipping/REMOVE_PRICE_BY_ID',
    REMOVE_PRICE_BY_ID_SUCCESS = 'shipping/REMOVE_PRICE_BY_ID_SUCCESS',
    REMOVE_PRICE_BY_ID_FAILED = 'shipping/REMOVE_PRICE_BY_ID_FAILED ',
}
