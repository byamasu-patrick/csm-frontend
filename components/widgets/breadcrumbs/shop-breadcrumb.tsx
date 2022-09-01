import React from 'react';
import Link from 'next/link';
import { ChevronRightIcon, HomeIcon, ChevronLeftIcon } from '@heroicons/react/24/solid';
import { breadcrumbPages, UserNavigation } from '../../../libs/models/shops/ShopModels';
import { useRouter } from 'next/router';

const ShopBreadcrumb: React.FC = () => {
    const router = useRouter();
    const pathname =  router.pathname;

    return (
        <>
            <nav className="sm:hidden" aria-label="Back">
                <Link href={"/"+ pathname.split("/")[1]}>
                    <a
                        className="
                            flex
                            items-center
                            text-sm
                            font-medium
                            text-gray-500
                            hover:text-gray-700
                        "
                    >
                        <ChevronLeftIcon
                            className="flex-shrink-0 -ml-1 mr-1 h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                        Back
                    </a>
                </Link>
            </nav>
            <nav className="hidden sm:flex" aria-label="Breadcrumb">
                <ol role="list" className="flex items-center space-x-1">
                    <li key="home">
                        <div className="flex items-center">   
                            <Link href="/shop">
                                <a
                                    className="
                                        ml-1
                                        text-sm
                                        font-medium
                                        text-gray-500
                                        hover:text-gray-700
                                        capitalize
                                    "
                                >Home</a>
                            </Link>
                        </div>
                    </li>
                    {
                        breadcrumbPages.filter((breadcrumb) => {
                            if(pathname.split("/").length >= 3){
                                if(breadcrumb.name.toLowerCase() === pathname.split("/")[2].toLowerCase()){
                                    return breadcrumb;
                                }
                            }
                        }).map((value) => {
                            return (
                                <li key={value.name }>
                                    <div className="flex items-center">                        
                                    <svg
                                        v-show="breadcrumbIndx > 0"
                                        className="flex-shrink-0 h-5 w-5 text-gray-300"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        aria-hidden="true"
                                    >
                                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                                    </svg>
                                        <Link href={value.href}>
                                            <a
                                                className="
                                                    ml-1
                                                    text-sm
                                                    font-medium
                                                    text-gray-500
                                                    hover:text-gray-700
                                                    capitalize
                                                "
                                            >{value.name}</a>
                                        </Link>
                                    </div>
                                </li>
                            )
                        })
                    
                    }
                </ol>
            </nav>
        </>
    );
};

export default ShopBreadcrumb;