import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../libs/store";
import { AuthSelector } from "../../../../libs/store/Auth";
import { GetAllProductReviews, ProductReviewSelector } from "../../../../libs/store/Review";
import ReviewContent from "./ReviewContent";

interface ProductReviewProps{
    productId: string;
}

const DisplayReview: React.FC<ProductReviewProps> = (props) => {   

    return (
        <>
        <div className="mx-auto my-32 px-4 py-4 max-w-full ">
        <div className="mb-1 tracking-wide px-4 py-4" >
            <h2 className="text-gray-800 font-semibold mb-6 text-3xl">67 Users reviews</h2>
            <div className="border-b -mx-8 px-8 pb-3">
                <div className="flex items-center mt-1">
                    <div className=" w-1/5 text-lg text-gray-900 tracking-tighter">
                    <span>5 Stars</span>
                    </div>
                    <div className="w-3/5">
                    <div className="bg-gray-300 w-full rounded-lg h-2">
                        <div className=" w-7/12 bg-orange-600 rounded-lg h-2"></div>
                    </div>
                    </div>
                    <div className="w-1/5 text-gray-700 pl-3">
                    <span className="text-sm">51%</span>
                    </div>
                </div>
                <div className="flex items-center mt-1">
                    <div className="w-1/5 text-lg text-gray-900 tracking-tighter">
                    <span>4 Stars</span>
                    </div>
                    <div className="w-3/5">
                    <div className="bg-gray-300 w-full rounded-lg h-2">
                        <div className="w-1/5 bg-orange-600 rounded-lg h-2"></div>
                    </div>
                    </div>
                    <div className="w-1/5 text-gray-700 pl-3">
                    <span className="text-sm">17%</span>
                    </div>
                </div>
                <div className="flex items-center mt-1">
                    <div className="w-1/5 text-lg text-gray-900 tracking-tighter">
                    <span>3 Stars</span>
                    </div>
                    <div className="w-3/5">
                    <div className="bg-gray-300 w-full rounded-lg h-2">
                        <div className=" w-3/12 bg-orange-600 rounded-lg h-2"></div>
                    </div>
                    </div>
                    <div className="w-1/5 text-gray-700 pl-3">
                    <span className="text-sm">19%</span>
                    </div>
                </div>
                <div className="flex items-center mt-1">
                    <div className=" w-1/5 text-lg text-gray-900 tracking-tighter">
                    <span>2 Stars</span>
                    </div>
                    <div className="w-3/5">
                    <div className="bg-gray-300 w-full rounded-lg h-2">
                        <div className=" w-1/5 bg-orange-600 rounded-lg h-2"></div>
                    </div>
                    </div>
                    <div className="w-1/5 text-gray-700 pl-3">
                    <span className="text-sm">8%</span>
                    </div>
                </div>
                <div className="flex items-center mt-1">
                    <div className="w-1/5 text-lg text-gray-900 tracking-tighter">
                    <span>1 Stars</span>
                    </div>
                    <div className="w-3/5">
                    <div className="bg-gray-300 w-full rounded-lg h-2">
                        <div className=" w-2/12 bg-orange-600 rounded-lg h-2"></div>
                    </div>
                    </div>
                    <div className="w-1/5 text-gray-700 pl-3">
                    <span className="text-sm">5%</span>
                    </div>
                </div>
            </div>
        </div>
        <div className="w-full px-4">
            <ReviewContent productId={props.productId} />
        </div>
        </div>
        </>
    )
}

export default DisplayReview;