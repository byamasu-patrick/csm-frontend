export interface CreateReviewDto{
    productId: string;
    customerId: string;
    reviewText: string;
    rating: number;
}

export interface ProductReviewModel{
    id: string;
    productId: string;
    customerId: string;
    reviewText: string;
    rating: number;
    createdAt: string;
}

export interface ProductReviewResponse{
    currentPage: number;
    results: ProductReviewModel[];
    totalPages: number;
}
