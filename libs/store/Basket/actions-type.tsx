export enum BasketActionType {
    SEARCH_BASKET = 'basket/SEARCH_BASKET',
    BASKET_SEARCHING = 'basket/BASKET_SEARCHING',
    BASKET_SEARCHING_SUCCESS = 'basket/BASKET_SEARCHING_SUCCESS',
    BASKET_SEARCHING_FAILED = 'basket/BASKET_SEARCHING_FAILED',
    ADD_BASKET_TO_DB = 'basket/ADD_BASKET_TO_DB',
    ADD_BASKET_SUCCESS = 'basket/ADD_BASKET_SUCCESS',
    ADD_BASKET_FAILED = 'basket/ADD_BASKET_FAILED ',
    UPDATE_BASKET_DB = 'basket/UPDATE_BASKET_DB',
    UPDATE_BASKET_SUCCESS = 'basket/UPDATE_BASKET_SUCCESS',
    UPDATE_BASKET_FAILED = 'basket/UPDATE_BASKET_FAILED ',
    BASKET_CHECKOUT = 'basket/BASKET_CHECKOUT',
    BASKET_CHECKOUT_SUCCESS = 'basket/BASKET_CHECKOUT_SUCCESS',
    BASKET_CHECKOUT_FAILED = 'basket/BASKET_CHECKOUT_FAILED',
    REMOVE_BASKET_BY_USERNAME= 'basket/REMOVE_BASKET_BY_USERNAME',
    REMOVE_BASKET_BY_USERNAME_SUCCESS= 'basket/REMOVE_BASKET_BY_USERNAME_SUCCESS',
    REMOVE_BASKET_BY_USERNAME_FAILED= 'basket/REMOVE_BASKET_BY_USERNAME_FAILED',
    //action types for removing single item in a basket
    REMOVE_BASKETPRODUCT_BY_PRODUCTID= 'basket/REMOVE_BASKETPRODUCT_BY_PRODUCTID',
    REMOVE_BASKETPRODUCT_BY_PRODUCTID_SUCCESS= 'basket/REMOVE_BASKETPRODUCT_BY_PRODUCTID_SUCCESS',
    REMOVE_BASKETPRODUCT_BY_PRODUCTID_FAILED= 'basket/REMOVE_BASKETPRODUCT_BY_PRODUCTID_FAILED',
    //
    GET_ALL_ORDERS = 'basket/GET_ALL_ORDERS',
    GET_ALL_ORDERS_SUCCESS = 'basket/GET_ALL_ORDERS_SUCCESS',
    GET_ALL_ORDERS_FAILED = 'basket/GET_ALL_ORDERS_FAILED',
    GET_ALL_ORDERS_BY_USERNAME = 'basket/GET_ALL_ORDERS_BY_USERNAME',
    GET_ALL_ORDERS_BY_USERNAME_SUCCESS = 'basket/GET_ALL_ORDERS_BY_USERNAME_SUCCESS',
    GET_ALL_ORDERS_BY_USERNAME_FAILED = 'basket/GET_ALL_ORDERS_BY_USERNAME_FAILED'
}
