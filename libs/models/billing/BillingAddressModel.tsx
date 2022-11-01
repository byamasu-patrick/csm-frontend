
export interface AddBillingAddressModel {
    userId: string,
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
    default: boolean
}


export interface BillingAddressModel {
    id: string;
    userId: string,
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
    default: boolean,
    createdAt: string;
}
