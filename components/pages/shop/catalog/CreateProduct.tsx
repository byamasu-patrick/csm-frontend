import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../libs/store';
import { AuthSelector } from '../../../../libs/store/Auth';
import { AddProductToDB, ProductSelector } from '../../../../libs/store/Catalog';
import { convertSelectedImageToBase64 } from '../../../../libs/utils/common';

interface CreateProps{
    isCreate: boolean;
    setIsCreate: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateProduct: React.FC<CreateProps>  = (props) => {
    const [name, setName] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [summary, setSummary] = useState<string>('');
    const [description, setDescrition] = useState<string>('');
    const [imageFile, setImageFile] = useState<string>('');
    const [price, setPrice] = useState<number>(0.0);
    const [itemsInStock, setItemsInStock] = useState<number>(0);
    const [userId, setUserId] = useState<number>(0);

    const dispatch = useAppDispatch();
    const { product } = useAppSelector(ProductSelector);
    const { user } = useAppSelector(AuthSelector);

        

    const addNewProduct = () => {
       
            dispatch(AddProductToDB({
                "name": name,
                "category": category,
                "summary": summary,
                "imageFile": imageFile,
                "description": description,
                "price": price,
                "itemsInStock": itemsInStock,
                "userId": user?.email
            }));
            props.setIsCreate(!props.isCreate);
    };

    
    return (
        <div>
        <Transition.Root show={true} as={Fragment}>
                <Dialog
                    as="div"
                    onClose={() => true}
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className=" flex text-base text-left transform transition w-full md:inline-block md:max-w-2xl md:px-4 md:my-8 md:align-middle lg:max-w-2xl">
                                    <div
                                        className="
                                            modal-header
                                            flex flex-shrink-0
                                            items-center
                                            justify-between
                                            p-4
                                            border-b border-gray-200
                                            rounded-t-md
                                            bg-white
                                            "
                                    >
                                        <h5
                                            className="text-md font-medium leading-normal text-gray-800"
                                            id="formModalLabel"
                                        >
                                            Add New Product
                                        </h5>
                                        <button                                         
                                            onClick={() => props.setIsCreate(!props.isCreate)}
                                            type="button" 
                                            className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500">
                                            <span className="sr-only">Close menu</span>
                                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            </button>
                                        </div>                                   
                                            <div className="bg-white">
                                                <form onSubmit={(event) => {
                                                    event.preventDefault();
                                                    addNewProduct();
                                                }}>
                                                    <div className="bg-white">
                                                        <div className="p-5 flex justify-between">
                                                            <div className="space-y-1 md:w-6/12">
                                                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                                Produc Name
                                                                </label>
                                                                <div className="mt-1">
                                                                    <input
                                                                        id="name"
                                                                        name="name"
                                                                        type="text"
                                                                        autoComplete="name"
                                                                        required
                                                                        className={`appearance-none w-full block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm focus:ring-orange-500 focus:border-orange-500`}                                                                        
                                                                        onChange={(event: React.FormEvent<HTMLInputElement>) => {
                                                                            setName(event?.currentTarget?.value);
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div className="space-y-1 md:w-5/12">
                                                                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                                                Category
                                                                </label>
                                                                <div className="mt-1">
                                                                    <select
                                                                        id="category"
                                                                        name="category"
                                                                        required
                                                                        className={`appearance-none bg-white w-full block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none  sm:text-sm focus:ring-orange-500 focus:border-orange-500
                                                                        `}
                                                                        onChange={(event: React.FormEvent<HTMLInputElement>) => {
                                                                            setCategory(event?.currentTarget?.value);
                                                                            
                                                                        }}
                                                                    >
                                                                        
                                                                        <option value="Smart Phone" className='text-gray-900 py-4'>Smart Phone</option>
                                                                        <option value="White Appliances" className='text-gray-900 py-4'>White Appliances</option>
                                                                        <option value="Home Kitchen" className='text-gray-900 py-4'>Home Kitchen</option>
                                                                    
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="px-5 flex justify-between">
                                                            <div className="space-y-1 md:w-6/12">
                                                                <label htmlFor="summary" className="block text-sm font-medium text-gray-700">
                                                                Summary
                                                                </label>
                                                                <div className="mt-1">
                                                                    <textarea
                                                                        rows={4}
                                                                        id="summary"
                                                                        name="summary"
                                                                        type="text"
                                                                        autoComplete="summary"
                                                                        required
                                                                        className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm focus:ring-orange-500 focus:border-orange-500`}
                                                                        
                                                                        onChange={(event: React.FormEvent<HTMLInputElement>) => {
                                                                            setSummary(event?.currentTarget?.value);
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>    
                                                            <div className="space-y-1 w-5/12">
                                                                <div className="w-full">
                                                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                                                    Price
                                                                    </label>
                                                                    <div className="mt-1">
                                                                        <input
                                                                            id="price"
                                                                            name="price"
                                                                            type="number"
                                                                            autoComplete="price"
                                                                            required
                                                                            className={`appearance-none w-full block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm
                                                                             focus:ring-orange-500 focus:border-orange-500
                                                                            `}
                                                                            
                                                                        onChange={(event: React.FormEvent<HTMLInputElement>) => {
                                                                            setPrice(event?.currentTarget?.value);
                                                                        }}
                                                                        />
                                                                    </div>
                                                                </div>   
                                                                
                                                                <div className="w-full">
                                                                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                                                                    Items in Stock
                                                                    </label>
                                                                    <div className="mt-1">
                                                                        <input
                                                                            id="stock"
                                                                            name="stock"
                                                                            type="number"
                                                                            autoComplete="stock"
                                                                            required
                                                                            className={`appearance-none w-full block px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm
                                                                              focus:ring-orange-500 focus:border-orange-500
                                                                            `}
                                                                            
                                                                            onChange={(event: React.FormEvent<HTMLInputElement>) => {
                                                                                setItemsInStock(event.currentTarget.value);
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </div>      
                                                            </div>                                        
                                                        </div>
                                                        <div className="p-5">
                                                            <div className="space-y-1">
                                                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                                Description
                                                                </label>
                                                                <div className="mt-1">
                                                                    <textarea
                                                                        rows={3}
                                                                        id="description"
                                                                        name="description"
                                                                        type="text"
                                                                        autoComplete="description"
                                                                        required
                                                                        className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm
                                                                        focus:ring-orange-500 focus:border-orange-500
                                                                        `}
                                                                        
                                                                        onChange={(event: React.FormEvent<HTMLInputElement>) => {
                                                                            setDescrition(event?.currentTarget?.value);
                                                                        }}
                                                                    />
                                                                </div>
                                                            </div>   
                                                        </div>
                                                        <div className="px-5">
                                                            <div className="space-y-1">
                                                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                                                    Image Files
                                                                </label>
                                                                <div className="mt-1">
                                                                    <input
                                                                        id="image"
                                                                        name="image"
                                                                        type="file"
                                                                        autoComplete="imageFile"
                                                                        required
                                                                        className={`appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none  sm:text-sm focus:ring-orange-500 focus:border-orange-500`}
                                                                        onChange={(event: React.FormEvent<HTMLInputElement>) => {    
                                                                                                                 
                                                                            convertSelectedImageToBase64(event?.currentTarget?.files[0], (result: string) => {
                                                                                setImageFile(result);
                                                                                console.log(imageFile);
                                                                            });
                                                                            
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
                                                                Save Product
                                                            </button>
                                                        </div>

                                                    </div>
                                                </form>
                                            </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </div>
    )
}

export default CreateProduct
