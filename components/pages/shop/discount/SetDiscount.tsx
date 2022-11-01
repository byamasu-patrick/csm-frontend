import { ErrorMessage, Field, Form, Formik } from "formik"
import React, {useState} from 'react';
import EditForm from "../catalog/Forms/EditForm";
import { ProductProps } from "./AddDiscount";
import SetEditDiscount from "./SetEditDsicount";

const SetDiscount: React.FC<ProductProps> = (props) => {
    const [isView, setIsView] = useState<boolean>(true);

    return (
        <>
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
                
                <h2 className=" lg:text-2xl text-xl lg:leading-6 leading-5 text-gray-800 font-semibold">
                Set Discount to this Product
                </h2>
            {/* <h5
                className="text-md font-medium leading-normal text-gray-800"
                id="formModalLabel"
            >
                Set Discount to this Product
            </h5> */}
            <div className="">
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
            </div>
            {
                isView ? <SetEditDiscount data={props.data}/> : <></>
            }
        </>
    )
};

export default SetDiscount;