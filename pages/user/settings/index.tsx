import type { NextPage } from 'next';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import Image from 'next/image';
import ClientLayout from '../../../components/layouts/clients-layout';
import OrderDetails from '../../../components/pages/user/ordering/OrderDetails';
import { NextPageWithLayout } from '../../_app';
import Settings from '../../../components/pages/user/settings/Setting';
import TabLayout from '../../../components/pages/user/settings/TabLayout'; 
import VerticalNavigation from '../../../components/pages/user/settings/VeriticalNavigation';

const Order: NextPageWithLayout = () => {
  return (   
      <div className="flex bg-white py-5 px-4 overflow-hidden sm:px-6 lg:px-8 lg:py-6">
           {/* <div className=''></div> */}
           <div className='lg:w-3/12 sm:w-12/12 my-5 '>
           <VerticalNavigation />
           </div>
           {/* <NavigationSettings /> */}
           <div className='lg:w-9/12 sm:w-12//12'> 
          <TabLayout />
           </div>
      </div>
  )
}

Order.getLayout = function getLayout(page: ReactElement){
  return <ClientLayout> { page } </ClientLayout>
}

export default Order;
