// react
import React, { ReactElement } from "react";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { withRouter, useRouter } from 'next/router';
import Swal from "sweetalert2";
import { navList, userNavigation, other, user } from "../../libs/models/shops/ShopModels"
// tailwind
import { Menu, Popover, Transition } from "@headlessui/react";
import { ListBulletIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ShopBreadcrumb from "../../components/widgets/breadcrumbs/shop-breadcrumb";
import { NextPageWithLayout } from "../_app";
import { NextComponentType } from "next";
import ShopLayout from "../../components/layouts/shop-layout";
import Analytics from "../../components/pages/shop/Statistics/Analytics";
import Head from "next/head";

const Shop: NextPageWithLayout = () => {
    const router = useRouter();
    const pathname =  router.pathname;
   
    return (
      <>      
        <Head>
            <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
        </Head>
        <div className="w-full flex items-center py-6 justify-center">
            <div className="py-4 sm:py-6 md:py-8 bg-white shadow rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-6 xl:px-10 gap-y-8 gap-x-3 2xl:gap-x-20">
                    <div className="w-full">
                        <p tabIndex={0} className="focus:outline-none text-xs md:text-sm font-medium leading-none text-gray-500 uppercase">Sales</p>
                        <p tabIndex={0} className="focus:outline-none text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-3 text-gray-800 mt-3 md:mt-5">89.5%</p>
                        <div className="flex flex-col md:w-56">
                            <div className="w-full flex justify-end"> 
                                <div className="flex items-center">
                                    <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/stats-svg1.svg" alt="green up"/>
                                    
                                    <p tabIndex={0} className="focus:outline-none text-xs leading-none text-green-700">4.3%</p>
                                </div>
                            </div>
                            <div className="mt-2.5">
                                <div className="w-full h-1 bg-gray-200 rounded-full">
                                    <div className="w-1/2 h-1 bg-[rgb(11,115,164)] rounded-full"></div>
                                </div>
                            </div>
                        </div>
                        <p tabIndex={0} className="focus:outline-none mt-1.5 text-xs leading-3 text-gray-500">Yearly target</p>
                    </div>
                    <div className="w-full">
                        <p tabIndex={0} className="focus:outline-none text-xs md:text-sm font-medium leading-none text-gray-500 uppercase">revenue</p>
                        <p tabIndex={0} className="focus:outline-none text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-3 text-gray-800 mt-3 md:mt-5">$75,000</p>
                        <div className="flex flex-col">
                            <div className="h-4"></div>
                            <div className="md:w-56 mt-2.5">
                                <div className="w-full h-1 bg-gray-200 rounded-full">
                                    <div className="w-40 h-1 bg-lime-500 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                        <p tabIndex={0} className="focus:outline-none mt-1.5 text-xs leading-3 text-gray-500">Yearly target</p>
                    </div>
                    <div className="w-full">
                        <p tabIndex={0} className="focus:outline-none text-xs md:text-sm font-medium leading-none text-gray-500 uppercase">customers</p>
                        <p tabIndex={0} className="focus:outline-none text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-3 text-gray-800 mt-3 md:mt-5">3922</p>
                        <div className="flex flex-col md:w-56">
                            <div className="w-full flex justify-end">
                                <div className="flex items-center">
                                    <img src="https://tuk-cdn.s3.amazonaws.com/can-uploader/stats-svg1.svg" alt="green up"/>
                                   
                                    <p tabIndex={0} className="focus:outline-none text-xs leading-none text-green-700">9.1%</p>
                                </div>
                            </div>
                            <div className="mt-2.5">
                                <div className="w-full h-1 bg-gray-200 rounded-full">
                                    <div className="w-44 h-1 bg-yellow-500 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                        <p tabIndex={0} className="focus:outline-none mt-1.5 text-xs leading-3 text-gray-500">Yearly target</p>
                    </div>
                </div>
            </div>
        </div>
        <Analytics />
    
      </>
    )
};

Shop.getLayout = function getLayout(page: ReactElement){
  return <ShopLayout> { page } </ShopLayout>
}

export default Shop;