// import { SearchBillingAddresseService } from "../../../../../libs/services/BillingService/BillingService";
import { useAppDispatch, useAppSelector } from "../../../../../libs/store";
import { AuthSelector } from "../../../../../libs/store/Auth";
import { BillingSelector, searchBillingAddressData } from "../../../../../libs/store/Billing";
import React, { useEffect } from 'react';

const CurrentBillingAddress = () => {
    const dispatch = useAppDispatch();
    const { billingAddresses } = useAppSelector(BillingSelector);

    const { user } = useAppSelector(AuthSelector);

    useEffect(() => {

        const getAllBillingAddresses = async () => {
            await dispatch(searchBillingAddressData(user?.email));
        }
        getAllBillingAddresses().catch(error => console.log("Error during searching billing informations"))

    }, []);
    
    return (
        <>            
        <div className="bg-gray-50 w-full xl:w-96 flex justify-between md:items-start px-4 md:p-6 xl:p-8 flex-col ">
            <h3 className="text-xl font-semibold leading-5 text-gray-800">Saved Billing Addresses</h3>
            <div className="flex  flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0 ">
                
                <div className="flex justify-between xl:h-full  items-stretch w-full flex-col mt-6 md:mt-0">
                    <div className="flex justify-center md:justify-start xl:flex-col flex-col md:space-x-6 lg:space-x-8 xl:space-x-0 space-y-4 xl:space-y-4 md:space-y-0 md:flex-row  items-center md:items-start ">
                        <div className="flex justify-center md:justify-start  items-center md:items-start flex-col space-y-4 xl:mt-8">
                            <p className="text-base font-semibold leading-4 text-center md:text-left text-gray-800">Billing Addresses</p>
                            <p className="w-48 lg:w-full xl:w-48 text-center md:text-left text-sm leading-5 text-gray-600">180 North King Street, Northhampton MA 1060</p>
                        </div>
                        <div className="w-full bg-gray-100 px-4 py-4 rounded-md flex justify-center md:justify-start  items-center md:items-start">
                        <p className="w-full text-base font-semibold text-center md:text-left text-gray-800">Credit Informations</p>
                        </div>
                        {
                            billingAddresses.length > 0 ? (
                                billingAddresses.map((billing) => {
                                    return (
                                        <div key={billing.firstName+billing.id} className="w-full bg-white px-4 py-4 rounded-md flex justify-center md:justify-start  items-center md:items-start flex-col space-y-2">
                                            <p className="w-full text-center md:text-left text-sm leading-5 text-gray-600">{billing.cardName}</p>
                                            <p className="w-full text-center md:text-left text-sm leading-5 text-gray-600">Card Number: {billing.cardNumber.substring(0, 4)}-{billing.cardNumber.substring(4, 8)}-{billing.cardNumber.substring(8, 12)}****</p>
                                            <p className="w-full text-center md:text-left text-sm leading-5 text-gray-600">Expires: {billing.expiration}</p>
                                            <p className="w-full text-center md:text-left text-sm leading-5 text-gray-600 flex justify-between">CVV: *** <button className="bg-gray-200 text-gray-700 hover:bg-orange-600 hover:text-white rounded-sm px-3 py-1 ">Edit</button></p>
                                        </div>
                                    )
                                })
                            ) : (<></>)
                        }
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default CurrentBillingAddress;