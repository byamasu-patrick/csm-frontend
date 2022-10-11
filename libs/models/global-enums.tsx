enum ShippingMethod {    
    FlatRate="Flat-Rate",
    RealTime="Real-Time",
    Local="Local",
    International="International",
    Sameday="Sameday",
    Overnight="Overnight",
    Expedited="Expedited"
}


export const ShippingMethodEnum = { ...ShippingMethod };
export type ShippingMethodEnum = keyof typeof ShippingMethodEnum;