// react
import React, { useEffect } from "react";
import { Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  navList,
  userNavigation,
  other,
} from "../../libs/models/shops/ShopModels";
// tailwind
import { Menu, Popover, Transition } from "@headlessui/react";
import { ListBulletIcon, XMarkIcon } from "@heroicons/react/24/outline";
import ShopBreadcrumb from "../../components/widgets/breadcrumbs/shop-breadcrumb";
import { NextPageWithLayout } from "../../pages/_app";
import { AuthSelector } from "../../libs/store/Auth/selectors";
import { logOut } from "../../libs/store/Auth/actions";
import { useAppDispatch, useAppSelector } from "../../libs/store";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Footer from "../widgets/footer";

interface ShopProps {
  children?: React.ReactNode;
}

const ShopLayout: NextPageWithLayout<ShopProps> = ({ children }: ShopProps) => {
  const router = useRouter();
  const pathname = router.pathname;
  const { user } = useAppSelector(AuthSelector);

  const dispatch = useAppDispatch();

  useEffect(() => {}, []);

  const navigation = () => {
    for (let nav of navList)
      if (
        nav.href.split("/")[1] + nav.href.split("/")[2] ==
        pathname.split("/")[1] + pathname.split("/")[2]
      )
        nav.current = true;
      else nav.current = false;
    return navList;
  };

  const logout = () => {
    dispatch(logOut());
    router.push("/signin");
  };

  return (
    <>
      {true ? (
        <div className="min-h-full mb-6 " style={{ height: "auto" }}>
          {/* When the mobile menu is open, add `overflow-hidden` to the `body` element to prevent double scrollbars */}
          <Popover as="header">
            {({ open }) => (
              <>
                <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 pt-1 border-b-1 pb-3 shadow-sm">
                  <div className="sticky top-0 z-50 relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
                    <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                      <div className="flex-shrink-0 flex items-center">
                        <Link href="/">
                          <a>
                            <img
                              className="block "
                              src="../../cloud-stores.png"
                              width={60}
                              height={60}
                              alt="Umozi Source"
                            />
                          </a>
                        </Link>
                      </div>
                    </div>
                    <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-3">
                      <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                        <div className="w-full  py-3"></div>
                      </div>
                    </div>
                    <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                      {/* Mobile menu button */}
                      <Popover.Button className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-orange-500">
                        <span className="sr-only">Open menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <ListBulletIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Popover.Button>
                    </div>
                    <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-7">
                      <Link href="#">
                        <a className="text-sm font-medium text-gray-900 hover:underline pl-5">
                          Help Center
                        </a>
                      </Link>
                      <Link href="#">
                        <a className="text-sm font-medium text-gray-900 hover:underline pl-5">
                          Partner Program
                        </a>
                      </Link>
                      {/* Profile dropdown */}
                      <Menu as="div" className="flex-shrink-0 relative ml-5">
                        <div>
                          <Menu.Button
                            className="
                                rounded-full
                                flex
                                focus:outline-none
                                focus:ring-2
                                focus:ring-offset-2
                                focus:ring-orange-500
                              "
                          >
                            <span className="sr-only">Open user menu</span>
                            <span className="lowercase m-2">
                              {" "}
                              {user?.email}{" "}
                            </span>
                            <span
                              className="
                                    inline-flex
                                    items-center
                                    px-3
                                    rounded-full
                                    text-sm
                                    font-medium
                                    bg-orange-600
                                    text-white
                                    uppercase
                                  "
                            >
                              {user?.profile?.firstName +
                                " " +
                                user?.profile?.lastName}
                            </span>
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
                          <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                            {userNavigation.map((item: any) => (
                              <Menu.Item key={item.name}>
                                {({ active }) => (
                                  <Link href={item.href}>
                                    <a className="block py-2 px-4 text-sm text-gray-700">
                                      {item.name}
                                    </a>
                                  </Link>
                                )}
                              </Menu.Item>
                            ))}
                            <Menu.Item key="signout">
                              <a
                                className="bg-gray-100 block py-2 px-4 text-sm text-gray-700"
                                onClick={() => logout()}
                              >
                                Sign out
                              </a>
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>

                <Popover.Panel
                  as="nav"
                  className="lg:hidden"
                  aria-label="Global"
                >
                  <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
                    {navigation().map((item: any) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          aria-current={item.current ? "page" : undefined}
                          className="bg-gray-100 text-gray-900 block rounded-md py-2 px-3 text-base font-medium"
                        >
                          {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <div className="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
                      <div className="flex-shrink-0">
                        <span
                          className="
                                inline-flex
                                items-center
                                px-3
                                p-2
                                rounded-full
                                text-sm
                                font-medium
                                bg-orange-600
                                text-white
                                uppercase
                              "
                        >
                          {user?.profile?.firstName +
                            " " +
                            user?.profile?.lastName}
                        </span>
                      </div>
                      <div className="ml-3">
                        <div className="text-base font-medium text-gray-800">
                          {user?.profile?.firstName +
                            " " +
                            user?.profile?.lastName}
                        </div>
                        <div className="text-sm font-medium text-gray-500">
                          {user?.email}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
                      {userNavigation.map((item: any) => (
                        <Link key={item.name} href={item.href}>
                          <a className="block rounded-md py-2 px-3 text-base font-medium text-gray-500 hover:bg-gray-50 hover:text-gray-900">
                            {item.name}
                          </a>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 max-w-3xl mx-auto px-4 sm:px-6"></div>
                </Popover.Panel>
              </>
            )}
          </Popover>

          <div className="py-10">
            <div className="max-w-3xl w-10/12 mx-auto sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="w-auto py-4 px-6 hidden lg:block lg:col-span-3 xl:col-span-3 bg-gray-50 rounded-lg shadow">
                <nav
                  aria-label="Sidebar"
                  className="sticky top-4 divide-y divide-gray-300"
                >
                  <div className="pb-8 space-y-1">
                    {navigation().map((item: any) => (
                      <Link key={item.name} href={item.href}>
                        <a
                          className={
                            item.current
                              ? "bg-gray-200 text-gray-900 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                              : "text-gray-600 hover:text-gray-600 hover:bg-gray-200 group flex items-center px-3 py-2 text-sm font-medium rounded-md"
                          }
                          aria-current={item.current ? "page" : undefined}
                        >
                          <item.icon
                            className={
                              item.current
                                ? "text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                                : "text-gray-400 group-hover:text-gray-500 flex-shrink-0 -ml-1 mr-3 h-6 w-6"
                            }
                            aria-hidden="true"
                          />
                          <span className="truncate">{item.name}</span>
                        </a>
                      </Link>
                    ))}
                  </div>
                  <div className="pt-1">
                    <div
                      className="mt-3 space-y-2"
                      aria-labelledby="other-headline"
                    >
                      {other.map((other: any) => (
                        <a
                          key={other.name}
                          href={other.href}
                          className="group flex items-center px-3 py-2 text-sm font-medium text-gray-600 rounded-md hover:text-gray-900 hover:bg-gray-50"
                        >
                          <span className="truncate">{other.name}</span>
                        </a>
                      ))}
                    </div>
                  </div>
                </nav>
              </div>
              <main className="lg:col-span-9 sm:col-span-10 ">
                <ShopBreadcrumb />
                {children}
              </main>
            </div>

            <div className="">
              <Footer />
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="grid place-items-center h-screen">
            <Box sx={{ display: "flex" }} className="">
              <CircularProgress />
            </Box>
          </div>
        </>
      )}
    </>
  );
};

export default ShopLayout;
