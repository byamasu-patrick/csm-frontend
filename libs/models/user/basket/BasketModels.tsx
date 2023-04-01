import { interactive } from "@material-tailwind/react/types/components/popover";
import { StreamInvocationMessage } from "@microsoft/signalr";

export interface BasketModel {
    userName: string;
    items: Array<BasketItem>;
};

export interface BasketInfoModel {
    userName: string;
    items: BasketItem[];
    totalPrice: number;
};

export interface BasketItem{
    quantity: number;
    color: string;
    price: number;
    productId: string;
    productName: string;
}

export interface BasketSearchModel {
    searchResult : BasketInfoModel,
    isSearching : boolean,
    error : string | null 
}

export interface OrderDetails{
    userName: string,
    totalPrice: number,
    products: Array<string>,
    firstName: string,
    lastName: string,
    emailAddress: string,
    addressLine: string,
    country: string,
    state: string,
    zipCode: string,
    cardName: string,
    cardNumber: string,
    expiration: string,
    cvv: string,
    paymentMethod: number
}
// model for deleting a particular item in the basket
export interface DeleteBasketItemModel {
    username : string;
    productId : string;
}
// model for increasing the quantity of an item in the basket
export interface increaseQuantityModel {
    usernamed : string;
    deletedProductId : string;
    value: number;
}
// model for decreasing the quantity of an item in the basket 
export interface decreaseQuantityModel {
    usernamed : string;
    deletedProductId : string;
    value: number;
}
export interface CheckoutResult{
    type: string,
    title: string,
    status: number,
    detail: string,
    instance: string,
    additionalProp1: string,
    additionalProp2: string,
    additionalProp3: string
}