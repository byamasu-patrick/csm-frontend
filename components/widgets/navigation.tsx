import Link from "next/link";
import React, { useState, useEffect } from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { useAppDispatch, useAppSelector } from "../../libs/store";
import { AuthSelector, logOut } from "../../libs/store/Auth";
import { Disclosure, Menu, Popover, Transition } from "@headlessui/react";
import { clientNavigation } from "../../libs/models/shops/ShopModels";
import { BasketSelector, searchBasketsData } from "../../libs/store/Basket";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import { BsCartDash, BsHeart } from "react-icons/bs";
import { HiOutlineUser } from "react-icons/hi";
import { BiHeart } from "react-icons/bi";
import { AiOutlineHeart } from "react-icons/ai";

const Navigation = () => {
  const users = {
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  };
  const navigation = [
    { name: "Dashboard", href: "#", current: true },
    { name: "Team", href: "#", current: false },
    { name: "Projects", href: "#", current: false },
    { name: "Calendar", href: "#", current: false },
  ];
  const userNavigation = [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#" },
  ];

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }

  const [searchInput, setSearchInput] = useState(true);
  const [mdOptionsToggle, setMdOptionsToggle] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  const { isAuthenticated, error, isLoading, tokenModel, user } =
    useAppSelector(AuthSelector);
  const { cart, basketSearch } = useAppSelector(BasketSelector);
  const dispatch: any = useAppDispatch();
  const router = useRouter();

  const logout = () => {
    dispatch(logOut());
    router.push("/signin");
  };
  // useEffect(() => {

  return (
    <Disclosure as="header" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-screen-2xl px-2 sm:px-4 lg:divide-y lg:divide-gray-200 lg:px-8">
            <div className="relative flex h-20 justify-between">
              <div className="relative z-10 flex px-2 lg:px-0">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-14 lg:h-20 w-auto"
                    src="../../cloud-stores.png"
                    alt="Your Company"
                  />
                </div>
              </div>
              <div className="relative z-0 flex flex-1 items-center justify-center px-2 sm:absolute sm:inset-0">
                <div className="w-full sm:max-w-lg">
                  <label htmlFor="search" className="sr-only">
                    Search
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <MagnifyingGlassIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      id="search"
                      name="search"
                      className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-amber-500 focus:text-gray-900 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-amber-500 sm:text-sm"
                      placeholder="Search"
                      type="search"
                    />
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex items-center lg:hidden">
                {/* Mobile menu button */}
                <div className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500">
                  <Link href={"/user/carts"}>
                    <button
                      type="button"
                      className="relative inline-flex items-center p-1 text-sm font-medium text-center lg:relative lg:inline-flex lg:items-center "
                    >
                      <BsCartDash className="text-gray-400 h-6 lg:h-6 w-6 lg:w-6 hover:text-gray-600" />
                      {(cart?.items.length >= 1 && cart !== null) ||
                      (basketSearch.searchResult?.items.length >= 1 &&
                        cart !== null) ? (
                        <div className="absolute inline-flex  -top-1 -right-1 justify-center items-center w-5 h-5 text-xs font-semibold text-white bg-amber-500 rounded-full border-2 border-white ">
                          {cart.items.length === 0
                            ? basketSearch.searchResult.items.length
                            : cart.items.length}
                        </div>
                      ) : (
                        <></>
                      )}

                      <span className="sr-only">Notifications</span>
                    </button>
                  </Link>
                </div>

                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500">
                  <span className="sr-only">Open menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="hidden lg:relative lg:z-10 lg:ml-4 lg:flex lg:items-center space-x-5">
                {/* Profile dropdown */}
                {isAuthenticated ? (
                  <Menu as="div" className="relative ml-4 flex-shrink-0 ">
                    <div>
                      <Menu.Button className="flex bg-white focus:outline-none hover:scale-110 transition-all duration-200 ease-linear">
                        <span className="sr-only">Open user menu</span>
                        <div className="flex items-center space-x-2">
                          <div>
                            <HiOutlineUser className="text-gray-400 h-6 w-6 " />
                          </div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-gray-400">
                              <span>Welcome</span>
                            </div>
                            <div className="text-sm font-semibold text-gray-800">
                              {user?.profile?.firstName}
                            </div>
                          </div>
                        </div>
                      </Menu.Button>
                    </div>
                    <Transition
                      show={true}
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <a
                          href=""
                          className="block py-2 px-4 text-sm text-gray-700"
                        >
                          Welcome back,{" "}
                          {user?.profile?.firstName +
                            " " +
                            user?.profile?.lastName}
                        </a>
                        <div className="flex items-center space-x-2 py-2 px-4 justify-items-center">
                          <button
                            type="button"
                            className="inline-flex w-1/2 justify-center items-center rounded-md border border-transparent bg-amber-500 px-2 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-600  focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                            onClick={() => logout()}
                          >
                            Sign Out
                          </button>
                        </div>
                        <a
                          href=""
                          className="block py-2 px-4 text-sm text-gray-700"
                        >
                          <div className="w-full border-t border-gray-300" />
                        </a>

                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block py-2 px-4 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                ) : (
                  <Menu as="div" className="relative ml-4 flex-shrink-0">
                    <div>
                      <Menu.Button className="flex  bg-white focus:outline-none hover:scale-110 transition-all duration-200 ease-linear">
                        <span className="sr-only">Open user menu</span>
                        <div className="flex items-center space-x-2">
                          <div>
                            <HiOutlineUser className="text-gray-400 h-6 w-6 " />
                          </div>
                          <div className="text-left">
                            <div className="text-xs font-semibold text-gray-400">
                              <span> Sign In</span>
                            </div>
                            <div className="text-sm font-semibold text-gray-800">
                              Account
                            </div>
                          </div>
                        </div>
                      </Menu.Button>
                    </div>
                    <Transition
                      show={true}
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <a
                          href=""
                          className="block py-2 px-4 text-sm text-gray-700"
                        >
                          Welcome to Cloud Stores!
                        </a>
                        <div className="flex items-center space-x-2 py-2 px-4 justify-items-center">
                          <Link href={"/signup"}>
                            <button
                              type="button"
                              className="inline-flex w-1/2 justify-center items-center rounded-md border border-transparent bg-amber-500 px-2 py-2 text-sm font-medium text-white shadow-sm hover:bg-amber-600  focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                            >
                              Register
                            </button>
                          </Link>
                          <Link href={"/signin"}>
                            <button
                              type="button"
                              className="inline-flex items-center w-1/2 border-gray-300 justify-center rounded-md border border-transparent px-2 py-2 text-sm font-medium text-gray-700 hover:text-white shadow-sm hover:bg-amber-500 hover:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                            >
                              Sign In
                            </button>
                          </Link>
                        </div>
                        <a
                          href=""
                          className="block py-2 px-4 text-sm text-gray-700"
                        >
                          <div className="w-full border-t border-gray-300" />
                        </a>

                        {clientNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <a
                                href={item.href}
                                className={classNames(
                                  active ? "bg-gray-100" : "",
                                  "block py-2 px-4 text-sm text-gray-700"
                                )}
                              >
                                {item.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}

                {/* WishList */}
                <button
                  type="button"
                  className="flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                >
                  <span className="sr-only">View WishList</span>

                  <AiOutlineHeart className=" h-6 w-6" aria-hidden="true" />
                </button>

                <Link href={"/user/carts"}>
                  <div className="flex gap-x-2 items-center gap-1.5 p-2 hover:rounded-sm cursor-pointer hover:scale-110 transition-all duration-200 ease-linear">
                    {" "}
                    <button
                      type="button"
                      className="relative inline-flex items-center p-1 text-sm font-medium text-center lg:relative lg:inline-flex lg:items-center "
                    >
                      <BsCartDash className="text-gray-400 h-6 lg:h-6 w-6 lg:w-6 hover:text-gray-600" />
                      {(cart?.items.length >= 1 && cart !== null) ||
                      (basketSearch.searchResult?.items.length >= 1 &&
                        cart !== null) ? (
                        <div className="absolute inline-flex  -top-1 -right-1 justify-center items-center w-5 h-5 text-xs font-semibold text-white bg-amber-500 rounded-full border-2 border-white ">
                          {cart.items.length === 0
                            ? basketSearch.searchResult.items.length
                            : cart.items.length}
                        </div>
                      ) : (
                        <></>
                      )}

                      <span className="sr-only">Notifications</span>
                    </button>
                    <div className="hidden md:block">
                      <div className=" text-xs font-medium text-gray-400">
                        Total
                      </div>
                      <div className="text-sm font-semibold text-gray-800">
                        MK0.00
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <nav
              className="hidden lg:flex lg:space-x-4 lg:py-2"
              aria-label="Global"
            >
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                    "rounded-md py-2 px-3 inline-flex items-center text-sm font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>

          <Disclosure.Panel as="nav" className="lg:hidden" aria-label="Global">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-900 hover:bg-gray-50 hover:text-gray-900",
                    "block rounded-md py-2 px-3 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
            {isAuthenticated ? (
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={users.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-xs font-semibold text-gray-400">
                      <span>Hi,</span>
                    </div>
                    <div className="text-sm font-semibold text-gray-800">
                      {user?.profile?.firstName}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">View notifications</span>
                    <button
                      type="button"
                      className="relative inline-flex items-center p-1 text-sm font-medium text-center lg:relative lg:inline-flex lg:items-center "
                    >
                      <BsCartDash className="text-gray-400 h-6 lg:h-6 w-6 lg:w-6 hover:text-gray-600" />
                      {(cart?.items.length >= 1 && cart !== null) ||
                      (basketSearch.searchResult?.items.length >= 1 &&
                        cart !== null) ? (
                        <div className="absolute inline-flex  -top-1 -right-1 justify-center items-center w-5 h-5 text-xs font-semibold text-white bg-amber-500 rounded-full border-2 border-white ">
                          {cart.items.length === 0
                            ? basketSearch.searchResult.items.length
                            : cart.items.length}
                        </div>
                      ) : (
                        <></>
                      )}

                      <span className="sr-only">Notifications</span>
                    </button>
                  </button>
                </div>

                <div className="mt-3 space-y-1 px-2">
                  {userNavigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="border-t border-gray-200 pt-4 pb-3">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={users.imageUrl}
                      alt=""
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-xs font-semibold text-gray-400">
                      <span>Hi,</span>
                    </div>
                    <div className="text-sm font-semibold text-gray-800">
                      {user?.profile?.firstName}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">View notifications</span>
                    <button
                      type="button"
                      className="relative inline-flex items-center p-1 text-sm font-medium text-center lg:relative lg:inline-flex lg:items-center "
                    >
                      <BsCartDash className="text-gray-400 h-6 lg:h-6 w-6 lg:w-6 hover:text-gray-600" />
                      {(cart?.items.length >= 1 && cart !== null) ||
                      (basketSearch.searchResult?.items.length >= 1 &&
                        cart !== null) ? (
                        <div className="absolute inline-flex  -top-1 -right-1 justify-center items-center w-5 h-5 text-xs font-semibold text-white bg-amber-500 rounded-full border-2 border-white ">
                          {cart.items.length === 0
                            ? basketSearch.searchResult.items.length
                            : cart.items.length}
                        </div>
                      ) : (
                        <></>
                      )}

                      <span className="sr-only">Notifications</span>
                    </button>
                  </button>
                </div>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
};

export default Navigation;
