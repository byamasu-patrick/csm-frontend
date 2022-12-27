import Link from 'next/link'
import React from 'react'
import MyMenu from './accountDropdown'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import { motion } from 'framer-motion';
import { Dropdown } from 'flowbite-react';


type Props = {}

function Header({}: Props) {
  return (
    <header className='w-full bg-white'>
    <div className='max-w-7xl mx-auto p-2'>
    <nav className='flex justify-between'>
      <motion.div 
      initial = {{
        x: -500,
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        x: 0,
        opacity: 1,
        scale: 1
      }}
      transition={{
        duration: 1.5
      }}
      className='flex items-center space-x-2 text-sm'>
        <p className='hidden md:inline-flex'>Welcome to Cloud Stores Malawi</p>
      </motion.div>
      <motion.div 
      initial={{
        x: 500,
        opacity: 0,
        scale: 0.5
      }}
      animate = {{
        x: 0,
        opacity: 1,
        scale : 1
      }}
      transition = {{
        duration: 1.5,
      }}
      className='flex items-center space-x-4 text-sm'>
        <Link href='#' className='hidden md:inline-flex'>About Us</Link>
        <Link href='#' className='hidden md:inline-flex'>Order Tracking</Link>
        <Link href='#' className='hidden md:inline-flex'>Contact Us</Link>
        <Link href='#' className='hidden md:inline-flex'>FAQ's</Link>
      </motion.div>
    </nav>
    <hr className='mt-2'/>
    <section className='flex items-center space-x-20 p-2'>
      <motion.div 
       initial = {{
        x: -500,
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        x: 0,
        opacity: 1,
        scale: 1
      }}
      transition={{
        duration: 1.5
      }}
      >
      <img src="../../cloud-stores.png" width="100" height="100" />
      </motion.div>
      <div className='flex items-center space-x-2 px-2 md:px-5 py-2 border-2 border-orange-500 rounded-full flex-1' >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-gray-500">
          <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
        </svg>
        <input type="search" name="search" id="" placeholder='What are you looking for...' className='text-sm flex-1 outline-none' />
        <a href="">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
            </svg>
        </a>
      </div>
      <div className='flex items-center space-x-4'>
        <a href="" className='flex items-center space-x-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        <p className='text-sm'>Sign In</p>
        </a>

        <a href="/user/carts" className='flex items-center space-x-2'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        <p className='text-sm'>Cart</p>
        </a>
      </div>
    </section>
    <hr />
    <section className='flex items-center text-sm p-2'>
      <motion.div 
       initial = {{
        x: -500,
        opacity: 0,
        scale: 0.5,
      }}
      animate={{
        x: 0,
        opacity: 1,
        scale: 1
      }}
      transition={{
        duration: 1.5
      }}
      className='flex items-center space-x-5 flex-1'>
        <p>man</p>
        <p>woman</p>
        <p>kid</p>
        <p>sports</p>
        <p>electronics</p>
      </motion.div>
      <div className='hidden md:flex items-center space-x-2'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75v-4.5m0 4.5h4.5m-4.5 0l6-6m-3 18c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 014.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 00-.38 1.21 12.035 12.035 0 007.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 011.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 01-2.25 2.25h-2.25z" />
        </svg>
      <p>Need Help? +265 992 315 319</p>
      </div>
    </section>
    </div>
    </header>
   /* */
  )
}

export default Header