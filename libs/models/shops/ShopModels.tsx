import {
    HomeIcon,
    CogIcon,
    UserGroupIcon,
    ShoppingCartIcon,
    CheckIcon,
    CurrencyDollarIcon,
    TruckIcon
  } from "@heroicons/react/24/outline";
  
import { ListBulletIcon, XMarkIcon } from "@heroicons/react/24/outline";

export interface UserNavigation {
    name: string;
    href: string;
}

export interface User {
    username: string;
    email: string;
    id: string;
}
  
export interface NavigationObject extends UserNavigation{
    icon: any;
    current: boolean;
}

export const navList: Array<NavigationObject> = [
    { 
        name: "Home", 
        href: "/shop", 
        icon: HomeIcon, 
        current: false 
    },
    {
      name: "Catalogs",
      href: "/shop/catalogs",
      icon: ListBulletIcon,
      current: false,
    }, 
    {
        name: "Orders",
        href: "/shop/orders",
        icon: CheckIcon,
        current: false,
    }, 
    {
        name: "Carts",
        href: "/shop/carts",
        icon: ShoppingCartIcon,
        current: false,
    }, 
    {
        name: "Shippments",
        href: "/shop/shippments",
        icon: TruckIcon,
        current: false,
    },
    {
        name: "Payments",
        href: "/shop/payments",
        icon: CurrencyDollarIcon,
        current: false,
    },
    {
      name: "Settings",
      href: "/shop/settings",
      icon: CogIcon,
      current: false,
    }
];

export const breadcrumbPages: Array<UserNavigation> = [
    {
      href: "/shop",
      name: "home"
    },
    {
      href: "/shop/catalogs",
      name: "catalogs"
    },
    {
        href: "/shop/orders",
        name: "orders"
    },
    {
        href: "/shop/carts",
        name: "carts"
    },
    {
        href: "/shop/shippments",
        name: "shippments"
    },
    {
        name: "Payments",
        href: "/shop/payments"
    },
    {
      name: "Settings",
      href: "/shop/settings"
    }
  ];

export const userNavigation: Array<UserNavigation> = [
    { name: "Your Profile", href: "/shop/settings/edit" },
    { name: "Settings", href: "/shop/settings" },
];

export const clientNavigation: Array<UserNavigation> = [
    { name: "Your Profile", href: "/user/settings/edit" },
    { name: "Ordered Products", href: "/user/order-summary" },
    { name: "Settings", href: "/user/settings" },
];
  
  
  
export const user:  User = {
    username: "User",
    email: "user@email.com",
    id: "1",
};

export const other: Array<UserNavigation> = [
    { name: "Help", href: "#" },
    { name: "About", href: "#" },
];
