export enum ProductActionType {
    SEARCH_PRODUCTS = 'catalog/SEARCH_PRODUCTS',
    PRODUCT_SEARCHING = 'catalog/PRODUCT_SEARCHING',
    PRODUCT_SEARCHING_SUCCESS = 'catalog/PRODUCT_SEARCHING_SUCCESS',
    PRODUCT_SEARCHING_FAILED = 'catalog/PRODUCT_SEARCHING_FAILED',
    ADD_PRODUCT_TO_DB = 'catalog/ADD_PRODUCT_TO_DB',
    SET_ON_PRODUCT_POPUP = 'catalog/SET_ON_PRODUCT_POPUP',
    ADDING_PRODUCT = 'catalog/ADDING_PRODUCT',
    ADD_PRODUCT_SUCCESS = 'catalog/ADD_PRODUCT_SUCCESS',
    ADD_PRODUCT_FAILED = 'catalog/ADD_PRODUCT_FAILED ',
    EDITING_PRODUCT = 'catalog/EDITING_PRODUCT',
    EDIT_SUCCESS = 'catalog/EDIT_SUCCESS',
    EDIT_FAILED = 'catalog/EDIT_FAILED',
    UPDATE_PRODUCT = 'catalog/UPDATE_PRODUCT',
    GET_ALL_PRODUCTS = 'catalog/GET_ALL_PRODUCTS',
    GET_ALL_PRODUCTS_SUCCESS = 'catalog/GET_ALL_PRODUCTS_SUCCESS',
    GET_ALL_PRODUCTS_FAILED = 'catalog/GET_ALL_PRODUCTS_FAILED',
    GET_ALL_PRODUCTS_BY_OWNER = 'catalog/GET_ALL_PRODUCTS_BY_OWNER',
    GET_ALL_PRODUCTS_BY_OWNER_SUCCESS = 'catalog/GET_ALL_PRODUCTS_BY_OWNER_SUCCESS',
    GET_ALL_PRODUCTS_BY_OWNER_FAILED = 'catalog/GET_ALL_PRODUCTS_BY_OWNER_FAILED',
    GET_ALL_PRODUCTS_BY_CATEGORY = 'catalog/GET_ALL_PRODUCTS_BY_CATEGORY',
    GET_ALL_PRODUCTS_BY_CATEGORY_SUCCESS = 'catalog/GET_ALL_PRODUCTS_BY_CATEGORY_SUCCESS',
    GET_ALL_PRODUCTS_BY_CATEGORY_FAILED = 'catalog/GET_ALL_PRODUCTS_BY_CATEGORY_FAILED',
    REMOVE_PRODUCT_BY_ID = 'catalog/REMOVE_PRODUCT_BY_ID',
}
