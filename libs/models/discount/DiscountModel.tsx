export interface CreateDiscountModel{
    productName: string,
    productId: string,
    headline: string,
    description: string,
    amount: number
}
export interface DiscountModel{
    id: number,
    productName: string,
    productId: string,
    headline: string,
    description: string,
    amount: number,
    couponCode: string
}