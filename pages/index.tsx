import type { NextPage } from 'next'
import React, { useEffect } from "react";
import Head from 'next/head'
import Image from 'next/image'
import Products from '../components/pages/user/catalog/Products'
import Order from '../components/pages/user/ordering/OrderDetails'
import Footer from '../components/widgets/footer'
import Navigation from '../components/widgets/navigation'
import Testimonials from '../components/widgets/testimonials/testimonials'
import { useAppDispatch } from '../libs/store';
import { useRouter } from 'next/router';


const Home: NextPage = () => {

  return (
    <div className="md:bg-gray-50"> 
      <Navigation /> 
      <Products />    
      <Testimonials />
      <Footer />
    </div>
  )
}

export default Home
