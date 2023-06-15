import React, { FC } from "react";
import { motion } from "framer-motion";
import { HiOutlineUser } from "react-icons/hi";
import { BiHeart } from "react-icons/bi";
import { BsCartDash } from "react-icons/bs";
import { FiSearch } from "react-icons/fi";
interface Props {
  count: number;
  total: string;
}

const IconButton: FC<Props> = ({ count, total }) => {
  return (
    <div className="flex items-center md:space-x-5">
      <motion.div
        className="flex gap-x-2 items-center hover:bg-gray-100 gap-1.5 p-2 hover:rounded-sm cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          type="button"
          className="relative inline-flex items-center p-1 text-sm font-medium text-center lg:relative lg:inline-flex lg:items-center"
        >
          <HiOutlineUser className="text-gray-900 h-6 lg:h-7 w-6 lg:w-7" />
        </button>
        <div className="hidden md:block">
          <div className="text-xs font-medium text-gray-400">Sign In</div>
          <div className="text-sm font-semibold text-gray-800">Account</div>
        </div>
      </motion.div>

      <motion.div
        className="hidden md:flex gap-x-2 items-center hover:bg-gray-100 gap-1.5 p-2 hover:rounded-sm cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          type="button"
          className="relative inline-flex items-center p-1 text-sm font-medium text-center lg:relative lg:inline-flex lg:items-center"
        >
          <BiHeart className="text-gray-900 h-6 lg:h-7 w-6 lg:w-7" />
          <div className="absolute inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-orange-500 border-2  border-white rounded-full -top-1 -right-1">
            {count}
          </div>
          <span className="sr-only">Notifications</span>
        </button>
      </motion.div>

      <motion.div
        className="flex gap-x-2 items-center hover:bg-gray-100 gap-1.5 p-2 hover:rounded-sm cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          type="button"
          className="relative inline-flex items-center p-1 text-sm font-medium text-center lg:relative lg:inline-flex lg:items-center"
        >
          <BsCartDash className="text-gray-900 h-6 lg:h-7 w-6 lg:w-7" />
        </button>
        <div className="hidden md:block">
          <div className="text-xs font-medium text-gray-400">My Cart</div>
          <div className="text-sm font-semibold text-gray-800">{total}</div>
        </div>
      </motion.div>
      <motion.div
        className="flex gap-x-2 items-center hover:bg-gray-100 gap-1.5 p-2 hover:rounded-sm cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <button
          type="button"
          className="relative inline-flex items-center p-1 text-sm font-medium text-center lg:relative lg:inline-flex lg:items-center"
        >
          <FiSearch className="text-gray-900 h-6 lg:h-7 w-6 lg:w-7" />
        </button>
        <div className="hidden md:block">
          <div className="text-xs font-medium text-gray-400">Search</div>
          <div className="text-sm font-semibold text-gray-800">Product</div>
        </div>
      </motion.div>
    </div>
  );
};

export default IconButton;
