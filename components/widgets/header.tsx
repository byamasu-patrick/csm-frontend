import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import MyMenu from "./accountDropdown";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { motion } from "framer-motion";
import { Dropdown } from "flowbite-react";
import { FaBars, FaTimes, FaCartPlus, FaRegHeart } from "react-icons/fa";
import { BsCartDash, BsHeart, BsCart2 } from "react-icons/bs";
import { CiUser, CiShoppingCart } from "react-icons/ci";
import { FiHeart, FiUser, FiShoppingCart, FiSearch } from "react-icons/fi";
import { BiCartAlt, BiHeart } from "react-icons/bi";
import { HiOutlineUser } from "react-icons/hi";
import SearchField from "./SearchField";

type Props = {};

function Header({}: Props) {
  let Links = [
    {
      name: "About Us",
      link: "/",
    },
    {
      name: "Order Tracking",
      link: "/",
    },
    {
      name: "Contact Us",
      link: "/",
    },
    {
      name: "FAQ's",
      link: "/",
    },
  ];

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const categories = [
    { id: 1, name: "Clothing" },
    { id: 2, name: "Electronics" },
    { id: 3, name: "Home & Kitchen" },
    { id: 4, name: "Sports & Outdoors" },
    { id: 5, name: "Books" },
  ];

  return (
    <header className="w-full bg-white">
      <nav className="flex justify-center bg-gray-50 p-5 md:justify-between">
        <motion.div
          initial={{
            x: -500,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.5,
          }}
          className="flex items-center space-x-2 text-sm"
        >
          <p className="hidden md:inline-flex text-sm font-medium">
            Welcome to Cloud Stores Malawi
          </p>
        </motion.div>
        <motion.div
          initial={{
            x: 500,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.5,
          }}
        >
          <span className="flex items-center space-x-5 text-sm font-medium">
            {Links.map((link, index) => (
              <motion.a
                whileHover={{
                  scale: 1.1,
                  color: "#FFC107",
                }}
                key={link.name}
                href={link.link}
              >
                {link.name}
              </motion.a>
            ))}
          </span>
        </motion.div>
      </nav>
      <div className="max-w-screen-2xl justify-between items-center px-4 md:px-8 mx-auto mt-2">
        <div className="flex justify-between items-center -mt-1">
          <div>
            <button
              className="block md:hidden  fixed top-0 left-0 m-4"
              onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            >
              <FaBars className="text-gray-700 h-6 w-6" />
            </button>
            {isDrawerOpen && (
              <div className="fixed  p-4 md:hidden top-0 left-0 h-screen z-10 transition-transform  bg-gray-200 w-80 ">
                <h2 className="text-lg font-medium">Categories</h2>
                <ul>
                  {categories.map((category) => (
                    <li key={category.id} className="p-2">
                      <a href="#" className="text-gray-700">
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>
                <button
                  className="absolute top-0 right-0 m-4"
                  onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                >
                  <FaTimes className="text-gray-700 h-6 w-6" />
                </button>
              </div>
            )}
          </div>
          <div>
            <Link
              href="/"
              className="inline-flex items-center text-black-800 text-2xl md:text-3xl font-bold gap-2.5"
              aria-label="logo"
            >
              <Image
                src="/cloud-stores.png"
                className=""
                width={94}
                height={95}
                alt="Logo"
              />
            </Link>
          </div>

          <div className="flex-1">
            <div className="m-10">
              <SearchField />
            </div>
          </div>

          <div className="flex items-center md:space-x-5">
            <div className="flex gap-x-2 items-center gap-1.5 p-2 hover:rounded-sm cursor-pointer hover:scale-110 transition-all duration-200 ease-linear">
              {" "}
              <button
                type="button"
                className="relative inline-flex items-center p-1 text-sm font-medium text-center lg:relative lg:inline-flex lg:items-center "
              >
                <HiOutlineUser className="text-gray-900 h-6 lg:h-7 w-6 lg:w-7" />
              </button>
              <div className="hidden md:block">
                <div className="text-xs font-medium text-gray-400">Sign In</div>

                <div className="text-sm font-semibold text-gray-800">
                  Account
                </div>
              </div>
            </div>

            <div className="hidden md:flex gap-x-2 items-center gap-1.5 p-2 hover:rounded-sm cursor-pointer hover:scale-110 transition-all duration-200 ease-linear">
              {" "}
              <button
                type="button"
                className="relative inline-flex items-center p-1 text-sm font-medium text-center lg:relative lg:inline-flex lg:items-center "
              >
                <BiHeart className="text-gray-900 h-6 lg:h-7 w-6 lg:w-7" />
                <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-orange-500 border-2  border-white rounded-full -top-1 -right-1">
                  0
                </div>
                <span className="sr-only">Notifications</span>
              </button>
            </div>

            <div className="flex gap-x-2 items-center gap-1.5 p-2 hover:rounded-sm cursor-pointer hover:scale-110 transition-all duration-200 ease-linear">
              {" "}
              <button
                type="button"
                className="relative inline-flex items-center p-1 text-sm font-medium text-center lg:relative lg:inline-flex lg:items-center "
              >
                <BsCartDash className="text-gray-900 h-6 lg:h-7 w-6 lg:w-7" />
                <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-orange-500 border-2  border-white rounded-full -top-1 -right-1">
                  0
                </div>
                <span className="sr-only">Notifications</span>
              </button>
              <div className="hidden md:block">
                <div className=" text-xs font-medium text-gray-400">Total</div>
                <div className="text-sm font-semibold text-gray-800">
                  MK0.00
                </div>
              </div>
            </div>

            <button
              type="button"
              className="w-12 sm:w-20 md:w-24 h-12 sm:h-20 md:h-24 flex lg:hidden flex-col justify-center items-center active:bg-gray-200 transition duration-100 gap-1.5"
            >
              <FiSearch className="text-gray-900 h-6 lg:h-7 w-6 lg:w-7" />
            </button>
          </div>
        </div>
      </div>
    </header>
    /* */
  );
}

export default Header;
