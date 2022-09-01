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
// import { useLocation } from 'react-'


interface ShopProps {
  children?: React.ReactNode;
}

const Shop: NextPageWithLayout<ShopProps> = ({children}: ShopProps) => {
    const router = useRouter();
    const pathname =  router.pathname;
   
    const navigation = () => {
        for (let nav of navList)
            if ( nav.href.split("/")[1] + nav.href.split("/")[2] == pathname.split("/")[1] + pathname.split("/")[2])
                nav.current = true;
            return navList;
    }

    return (
      <>
      </>
    )
};

Shop.getLayout = function getLayout(page: ReactElement){
  return <ShopLayout> { page } </ShopLayout>
}

export default Shop;