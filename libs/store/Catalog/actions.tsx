import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AddProductModel, ProductModel } from "../../models/shops/catalogs/ProductModels";
import { AddProduct, GetProductsByName, RemoveProductById, UpdateProduct, getProducts, getProductsByShopOwner } from "../../services/CatalogService/ProductService";
import { ProductActionType } from "./actions-type";

// search product
export const productSearching = createAction<boolean>(ProductActionType.PRODUCT_SEARCHING);
export const productSearchingSuccess = createAction<ProductModel>(ProductActionType.PRODUCT_SEARCHING_SUCCESS);
export const productSearchingFailed = createAction<string>(ProductActionType.PRODUCT_SEARCHING_FAILED);
export const setOnProductPopUp = createAction<boolean>(ProductActionType.SET_ON_PRODUCT_POPUP);
// add product
export const addingProduct  = createAction<boolean>(ProductActionType.ADDING_PRODUCT);
export const addProductSuccess = createAction<string>(ProductActionType.ADD_PRODUCT_SUCCESS)
export const adddProductFailed = createAction<string>(ProductActionType.ADD_PRODUCT_FAILED);
// edit product
export const editSuccess = createAction<string>(ProductActionType.EDIT_SUCCESS);
export const editFailed = createAction<string>(ProductActionType.EDIT_FAILED);
export const editingProduct = createAction<boolean>(ProductActionType.EDITING_PRODUCT);
// get all product
export const gettingAllProducts  = createAction<boolean>(ProductActionType.GET_ALL_PRODUCTS);
export const getAllProductsSuccess = createAction<ProductModel[]>(ProductActionType.GET_ALL_PRODUCTS_SUCCESS)
export const getAllProductsFailed = createAction<string>(ProductActionType.GET_ALL_PRODUCTS_FAILED);
// get all product by shop owner
export const gettingAllProductsByShopOwner  = createAction<boolean>(ProductActionType.GET_ALL_PRODUCTS_BY_OWNER);
export const getAllProductsByShopOwnerSuccess = createAction<ProductModel[]>(ProductActionType.GET_ALL_PRODUCTS_BY_OWNER_SUCCESS)
export const getAllProductsByShopOwnerFailed = createAction<string>(ProductActionType.GET_ALL_PRODUCTS_BY_OWNER_FAILED);


export const searchProducts = createAsyncThunk( ProductActionType.PRODUCT_SEARCHING, 
   async( keyword : string, thunkAPI )=>{

    thunkAPI.dispatch(productSearching(true));

    try{
       
       const response = await GetProductsByName(keyword);
       thunkAPI.dispatch(productSearchingSuccess(response.data));
       thunkAPI.dispatch(productSearching(false));

    }catch(error){

       var errorMessage = (error as string);
       thunkAPI.dispatch(productSearchingFailed(errorMessage))
    }
});

export const AddProductToDB = createAsyncThunk(ProductActionType.ADDING_PRODUCT,
    async(addProductModel : AddProductModel , thunkAPI) =>{
      try{

         thunkAPI.dispatch(addingProduct(true));
         let result = await AddProduct(addProductModel);
         thunkAPI.dispatch(addProductSuccess("You have successfully Added Product!"));

         return result;

       }catch(e){
           var erroMessage = (e as string);
           thunkAPI.dispatch(adddProductFailed(erroMessage));
      }
});

export const RemoveProducById = createAsyncThunk(ProductActionType.REMOVE_PRODUCT_BY_ID , async(id : string) =>{
   var result = await RemoveProductById(id);
   return {
       productId : id, 
       response : result
   }
});

export const UpdateProductEntity = createAsyncThunk(ProductActionType.UPDATE_PRODUCT, 
   async(updateProductModel : ProductModel , thunkAPI) =>{
       try{

           thunkAPI.dispatch(editingProduct(true));
           await UpdateProduct(updateProductModel);
           thunkAPI.dispatch(editSuccess("You have succesfully Updated the Product!"))

       }catch(error){
        var errorMessage = (error as string);
        thunkAPI.dispatch(editFailed(errorMessage));
   }
});

export const GetAllProducts = createAsyncThunk(ProductActionType.GET_ALL_PRODUCTS, 
   async(id: string, thunkAPI) =>{
       try{

            thunkAPI.dispatch(gettingAllProducts(true));
            let result = await getProducts();
            thunkAPI.dispatch(getAllProductsSuccess(result));
            console.log(result);

       }catch(error){
            var errorMessage = (error as string);
            // thunkAPI.dispatch(getAllProductsFailed(errorMessage));
        }
});

export const GetAllProductsByOwner = createAsyncThunk(ProductActionType.GET_ALL_PRODUCTS_BY_OWNER, 
   async(ownerId: string, thunkAPI) =>{
       try{

           thunkAPI.dispatch(gettingAllProductsByShopOwner(true));
           let result = await getProductsByShopOwner(ownerId);           
           thunkAPI.dispatch(getAllProductsByShopOwnerSuccess(result));

       }catch(error){
         var errorMessage = (error as string);
         thunkAPI.dispatch(getAllProductsByShopOwnerFailed(errorMessage));
   }
});