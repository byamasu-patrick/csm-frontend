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
    totalWeight: number;
};

export interface BasketItem{
    productId: string;
    productName: string;
    quantity: number;
    price: number;
    subTotal: number
    weight: number;
    color: string;
}
export interface BasketSearchModel {
    searchResult : BasketInfoModel,
    isSearching : boolean,
    error : string | null 
}

export interface OrderDetails{
    id: string,
    userName: string,
    totalPrice: number,
    shippingPrice: number,
    totalWeight: number,
    products: BasketItem[],
    firstName: string,
    lastName: string,
    emailAddress: string,
    phoneNumber: string,
    nationalId: string,
    courierName: string,
    physicalAddress: string,
    paymentMethod: string,
    orderStatus: string,
    createdDate: string,
    lastModifiedDate: string
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