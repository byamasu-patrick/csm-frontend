import { Dialog, Transition } from '@headlessui/react';
import { ErrorMessage, Field, Form,  Formik } from 'formik';
import React, { Fragment, useState } from 'react';
import { ProductModel } from '../../../../libs/models/shops/catalogs/ProductModels';
import SetDiscount from './SetDiscount';
// import EditProduct from './EditProduct';


export interface ProductProps{
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    data: ProductModel;
    //(isCreate: boolean) => React.Dispatch<React.SetStateAction<boolean>>;
}
const AddDiscount: React.FC<ProductProps>  = (props) => {

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
                            <Dialog.Panel className=" flex text-base text-left transform transition w-9/12 md:inline-block md:max-w-full md:max-w-11/12 md:px-4 md:my-8 md:align-middle lg:max-w-9/12">
                               
                               <SetDiscount isOpen={props.isOpen} setIsOpen={props.setIsOpen} data={props.data}/>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    </div>
  )
};

export default AddDiscount;
