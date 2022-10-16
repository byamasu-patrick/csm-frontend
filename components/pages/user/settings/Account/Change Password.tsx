import Link from "next/link";
import { useState } from "react";

const ChangePassword = () => {

    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [confirmNewPassword, setConfirmNewPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');

    const handleSubmit = () => {

    }

    return (
        <>
             <div className="overflow-y-hidden flex justify-between">            
            {/* <div className="flex justify-start items-start 2xl:container 2xl:mx-auto lg:py-8 md:py-12 py-9 px-4 md:px-6 lg:px-20 xl:px-44 "> */}
                <div className="flex w-8/12 flex-col lg:flex-row justify-center items-center lg:space-x-10 2xl:space-x-36 space-y-12 lg:space-y-0">
                    <div className="flex w-full flex-col justify-center items-center">
                        
                        <div className="mt-8 flex flex-col justify-start items-start w-full space-y-8 ">
                            <input 
                                value={currentPassword}
                                onChange={(evt) => setCurrentPassword(evt.target.value)}
                                className="px-2 py-3 appearance-none block w-full border border-gray-600 shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm focus:ring-orange-500 focus:border-orange-500" 
                                type="text" 
                                placeholder="Car Name" 
                            />     
                            <input 
                                value={newPassword}                               
                                onChange={(evt) => setNewPassword(evt.target.value)}
                                className="px-2 py-3 appearance-none block w-full border border-gray-600 shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm focus:ring-orange-500 focus:border-orange-500" 
                                type="text" 
                                placeholder="Address (line 02)" 
                            />                       
                            <input 
                                value={confirmNewPassword}
                                onChange={(evt) => setConfirmNewPassword(evt.target.value)}
                                className="px-2 py-3 appearance-none block w-full border border-gray-600 shadow-sm placeholder-gray-400 focus:outline-none sm:text-sm focus:ring-orange-500 focus:border-orange-500" 
                                type="text" 
                                placeholder="Card Number" 
                            />                           
                        </div>
                        <button 
                            onClick={() => handleSubmit()}
                            className="focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 mt-8 text-base font-medium focus:ring-2 focus:ring-ocus:ring-orange-800 leading-4 hover:bg-orange py-4 w-full md:w-4/12 lg:w-full text-white bg-orange-600">Proceed to payment</button>
                        
                    </div>
                </div>
            {/* </div> */}
        </div>
        </>
    )
}

export default ChangePassword;