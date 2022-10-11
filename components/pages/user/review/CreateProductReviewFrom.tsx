import { Dialog, Transition } from '@headlessui/react';
import React, { useState, useEffect, Fragment } from 'react'
import Swal from 'sweetalert2';
import { useAppDispatch, useAppSelector } from '../../../../libs/store';
import { AuthSelector } from '../../../../libs/store/Auth';
import { AddProductReviewToDB, ProductReviewSelector } from '../../../../libs/store/Review';

interface ProductReviewProps{
    productId: string;
}

const CreateProductReviewForm: React.FC<ProductReviewProps> = (props) => {

    const [reviewText, setReviewText] = useState<string>('');
    const [rating, setRating] = useState<number>(0);

    
    const dispatch = useAppDispatch();
    const { user } = useAppSelector(AuthSelector);        
    const { successMessage } = useAppSelector(ProductReviewSelector);

    useEffect(() => {
        if(successMessage !== ''){
            setReviewText('');
            setRating(0);            
        }
    }, [successMessage]);


    const addNewProductReview = async () => {
        await dispatch(AddProductReviewToDB({
            reviewText: reviewText,
            rating: rating,
            productId: props.productId,
            customerId: user?.email
        }));
        
        Swal.fire({
            icon: 'success',
            title: 'Product review',
            text: successMessage,
            confirmButtonText: 'OK',
            confirmButtonColor: 'rgb(249 115 22)',
        });
    }

    return (
        <div>
             <div className="bg-white">
                <form onSubmit={(event) => {
                    event.preventDefault();
                    addNewProductReview();
                }}>
                    <div className="bg-white">
                        <div className="p-5">                           
                            <div className="space-y-1 md:w-5/12">
                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                Rating
                                </label>
                                <div className="mt-1">
                                    <select
                                        id="category"
                                        name="category"
                                        required
                                        className={`appearance-none bg-white w-full block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  sm:text-sm focus:ring-orange-500 focus:border-orange-500
                                        `}
                                        onChange={(event: any) => {
                                            setRating(Number(event?.currentTarget?.value));                                                                       
                                        }}
                                    >
                                        <option value={1} className='text-gray-900 py-4'>{1}</option>
                                        <option value={2} className='text-gray-900 py-4'>{2}</option>
                                        <option value={3} className='text-gray-900 py-4'>{3}</option>
                                        <option value={4} className='text-gray-900 py-4'>{4}</option>
                                        <option value={5} className='text-gray-900 py-4'>{5}</option>
                                    
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="p-5">
                            <div className="space-y-1">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Review Text
                                </label>
                                <div className="mt-1">
                                    <textarea
                                        rows={3}
                                        id="description"
                                        name="description"
                                        autoComplete="description"
                                        placeholder='Write your review here...'
                                        value={reviewText}
                                        required
                                        className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm
                                            focus:ring-orange-500 focus:border-orange-500
                                        `}                                        
                                        onChange={(event: any) => {
                                            setReviewText(event?.currentTarget?.value);
                                        }}
                                    />
                                </div>
                            </div>   
                        </div>
                        <div className="flex justify-end px-4 py-3 bg-gray-50 sm:px-6">

                            <button
                                type="submit"
                                className="capitalize ml-3 inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                            >
                                Save Review
                            </button>
                        </div>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateProductReviewForm;