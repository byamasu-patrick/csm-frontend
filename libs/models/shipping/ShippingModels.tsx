export interface AddCourierModel {
    name: string 
    contact1: string 
    contact2: string 
    headOfficeLocation: string 
    locationAddress: AddLocationModel[]
}

export interface AddLocationModel {
    source: string
    destination: string
    courierId: string
    prices: AddPriceModel[] 
}
export interface CourierResponse {
    currentPage: number;
    results: CourierModel[];
    totalPages: number;
}
export interface ReceiverResponse {
    currentPage: number;
    results: ReceiverModel[];
    totalPages: number;
}
export interface PriceResponse {
    currentPage: number;
    results: PriceModel[];
    totalPages: number;
}
export interface LocationResponse {
    currentPage: number;
    results: LocationAddressModel[];
    totalPages: number;
}
export interface AddPriceModel {
    fromKg: number,
    toKg: number,
    price: number,
    locationId: string
}

export interface AddReceiverModel {
    userName: string 
    name: string
    contact: string
    nationalId: string
    killograms: string
    courier: string 
    location: string
    price: string 

}
export interface CourierModel {
    id: string
    name: string 
    contact1: string
    contact2: string
    headOfficeLocation: string 
    locationAddresses: LocationAddressModel []
}
export interface LocationAddressModel {
   id: string
   source: string 
   destination: string
   courierId: string
   prices: PriceModel[]
}
export interface PriceModel {
    id: string
    fromKg: number, 
    toKg: number, 
    price: number, 
    locationId: string
}
export interface ReceiverModel {
    id: string
    userName: string
    name: string
    contact: string
    nationalId: string
    killograms: string
    courier: string
    location: string
    price: string 

}