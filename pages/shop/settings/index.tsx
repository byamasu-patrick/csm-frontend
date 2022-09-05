
import { ReactElement } from 'react';
import ShopLayout from '../../../components/layouts/shop-layout';
import type { NextPageWithLayout } from '../../_app';
import React, {useState} from 'react';
import Link from 'next/link';

const Settings: NextPageWithLayout = () => {
    
    const [show, setShow] = useState<boolean>(false);
    const [product, setProduct] = useState<boolean>(false);
    const [deliverables, setDeliverables] = useState<boolean>(false);
    const [profile, setProfile] = useState<boolean>(false);

    return (
        <>
            <div className="pb-10">
                <div className="pt-8 pb-16 relative z-10">
                    <div className="container px-6 mx-auto flex flex-col lg:flex-row items-start lg:items-center justify-between">
                        <div className="flex-col flex lg:flex-row items-start lg:items-center">
                            <div className="flex items-center">
                                <img className="border-2 shadow border-[rgb(11,115,164)] rounded-full mr-3" src="https://cdn.tuk.dev/assets/webapp/master_layouts/boxed_layout/boxed_layout2.jpg" alt="logo" />
                                <div>
                                    <h5 className="text-sm text-gray-800 leading-4 mb-1">Andres Berlin</h5>
                                    <p className="text-xs text-gray-800 leading-4">VP Operations</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Link href='/shop'>
                                <a className="focus:outline-none mr-3 bg-orange-500 transition duration-150 ease-in-out rounded hover:bg-orange-700 text-white px-5 py-2 text-sm border border-orange-500">Back</a>
                            </Link>
                            <button className="focus:outline-none transition duration-150 ease-in-out hover:bg-gray-200 border bg-white rounded text-orange-600 px-8 py-2 text-sm">Edit Profile</button>
                        </div>
                    </div>
                </div>
                <div className="container px-6 mx-auto">
                    <div className="rounded shadow relative bg-white z-10 -mt-8 mb-8 w-full h-96">{/* Place your content here */}</div>
                </div>
            </div>
        </>
    );
}

Settings.getLayout = function getLayout(page: ReactElement){
    return <ShopLayout> { page } </ShopLayout>
}


export default Settings;

