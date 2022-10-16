import { Dialog, Transition } from '@headlessui/react';
import { ErrorMessage, Field, Form,  Formik } from 'formik';
import React, { Fragment } from 'react';
import { CatalogData } from '../../../../libs/models/shops/catalogs/CatalogModels';
import { ProductModel } from '../../../../libs/models/shops/catalogs/ProductModels';
import ProductDetails from './ProductDetails';

interface ProductProps{
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    data: ProductModel;
    //(isCreate: boolean) => React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductDialog: React.FC<ProductProps>  = (props) => {

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
                            <Dialog.Panel className="flex text-base text-left transform transition w-full md:inline-block md:max-w-full md:max-w-11/12 md:px-4 md:my-8 md:align-middle lg:max-w-9/12">
                                <div
                                    className="
                                        modal-header
                                        flex flex-shrink-0
                                        items-center
                                        justify-between
                                        p-4
                                        rounded-t-md
                                        bg-white
                                        "
                                    >
                                    <h5
                                        className="text-md font-medium leading-normal text-gray-800"
                                        id="formModalLabel"
                                    >                                        
                                    </h5>
                                    <button                                         
                                        onClick={() => props.setIsOpen(!props.isOpen)}
                                        type="button" 
                                        className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500">
                                        <span className="sr-only">Close menu</span>
                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                        </button>
                                    </div>
                                <ProductDetails 
                                    isOpen={props.isOpen}
                                    setIsOpen={props.setIsOpen}
                                    data={props.data}
                                />
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    </div>
  )
}

export default ProductDialog;
