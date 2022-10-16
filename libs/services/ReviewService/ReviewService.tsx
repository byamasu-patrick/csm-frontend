import axios from "axios";
import { CreateReviewDto } from "../../models/reviews/ReviewModels";

const catalogClient = 'http://localhost:5000/api/v1';

export const AddProductReview = async (addReview : CreateReviewDto) =>{

    var result = await axios.post(`${catalogClient}/ProductReview`, addReview);
    return result.data;
}
export const GetProductReviews = async (productId : string, page: number) => {
    // ProductReview/GetReviewByproductId/{productId}/{page}
    var result = await axios.get(`${catalogClient}/ProductReview/GetReviewByproductId/${productId}/${page}`);

    // console.log("result: ", result);

    return result.data;
}
