import React, { useState } from "react";
import ChangePassword from "./Account/Change Password";
import BillingAddress from "./Billing/BillingAddress";
import Settings from "./Setting";
const TabLayout = () => {
    const [activeStatus, setActiveStatus] = useState(1);
    return (
        <div>
            <div className="sm:hidden relative w-11/12 mx-auto bg-white">
                <div className="absolute inset-0 m-auto mr-4 z-0 w-6 h-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-selector" width={24} height={24} viewBox="0 0 24 24" strokeWidth="1.5" stroke="#A0AEC0" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" />
                        <polyline points="8 9 12 5 16 9" />
                        <polyline points="16 15 12 19 8 15" />
                    </svg>
                </div>
                <select aria-label="Selected tab" className="form-select block w-full p-3 border border-gray-300 rounded text-gray-600 appearance-none bg-transparent relative z-10">
                    <option className="text-sm text-gray-600">Profile </option>
                    <option className="text-sm text-gray-600">Payment Methods </option>
                    <option selected className="text-sm text-gray-600">
                        Active{" "}
                    </option>
                </select>
            </div>
            <div className="xl:w-full xl:mx-0 h-12 hidden sm:block bg-white my-5">
                <ul className="flex px-5">
                    <li onClick={() => setActiveStatus(1)} className={activeStatus == 1 ? "text-sm border-orange-500 pt-3 rounded-t text-orange-600 mr-12" : "text-sm text-gray-600 py-3 flex items-center mr-12 hover:text-orange-600 cursor-pointer"}>
                        <div className="flex items-center mb-3">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-home" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <polyline points="5 12 3 12 12 3 21 12 19 12" />
                                    <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                                    <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" />
                                </svg>
                            </span>
                            <span className="ml-1 font-normal">Profile</span>
                        </div>
                        {activeStatus == 1 && <div className="w-full h-1 bg-orange-600 rounded-t-md" />}
                    </li>
                    <li onClick={() => setActiveStatus(2)} className={activeStatus == 2 ? "text-sm border-orange-500 pt-3 rounded-t text-orange-600 mr-12" : "text-sm text-gray-600 py-3 flex items-center mr-12 hover:text-orange-600 cursor-pointer"}>
                        <div className="flex items-center mb-3">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <circle cx={12} cy={12} r={2} />
                                    <path d="M2 12l1.5 2a11 11 0 0 0 17 0l1.5 -2" />
                                    <path d="M2 12l1.5 -2a11 11 0 0 1 17 0l1.5 2" />
                                </svg>
                            </span>
                            <span className="ml-1 font-normal">Change Passwords</span>
                        </div>
                        {activeStatus == 2 && <div className="w-full h-1 bg-orange-600 rounded-t-md" />}
                    </li>
                    <li onClick={() => setActiveStatus(3)} className={activeStatus == 3 ? "text-sm border-orange-500 pt-3 rounded-t text-orange-600 mr-12" : "text-sm text-gray-600 py-3 flex items-center mr-12 hover:text-orange-600 cursor-pointer"}>
                        <div className="flex items-center mb-3">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <circle cx={12} cy={12} r={2} />
                                    <path d="M2 12l1.5 2a11 11 0 0 0 17 0l1.5 -2" />
                                    <path d="M2 12l1.5 -2a11 11 0 0 1 17 0l1.5 2" />
                                </svg>
                            </span>
                            <span className="ml-1 font-normal">Payment Methods Settings</span>
                        </div>
                        {activeStatus == 3 && <div className="w-full h-1 bg-orange-600 rounded-t-md" />}
                    </li>
                    <li onClick={() => setActiveStatus(4)} className={activeStatus == 4 ? "text-sm border-orange-500 pt-3 rounded-t text-orange-600 mr-12" : "text-sm text-gray-600 py-3 flex items-center mr-12 hover:text-orange-600 cursor-pointer"}>
                        <div className="flex items-center mb-3">
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-eye" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" />
                                    <circle cx={12} cy={12} r={2} />
                                    <path d="M2 12l1.5 2a11 11 0 0 0 17 0l1.5 -2" />
                                    <path d="M2 12l1.5 -2a11 11 0 0 1 17 0l1.5 2" />
                                </svg>
                            </span>
                            <span className="ml-1 font-normal">Billing Addresses</span>
                        </div>
                        {activeStatus == 4 && <div className="w-full h-1 bg-orange-600 rounded-t-md" />}
                    </li>
                </ul>
                
            </div>
            {
                activeStatus === 1 ? (<Settings />) : <></>
            
            }
            {
                activeStatus === 4 ? (<BillingAddress />) : <></>
            
            }
            {
                activeStatus === 2 ? (<ChangePassword />) : <></>
            }
        </div>
    );
};
export default TabLayout;
