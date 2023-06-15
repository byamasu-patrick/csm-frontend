import React, { useState } from "react";
import { Listbox } from "@headlessui/react";
import AccountTitleLayout from "./AccountTitleLayout";

const fruits = ["All", "Awaiting", "In Progress", "Complete"];

function ReturnAndRefundLayout() {
  const [selectedFruit, setSelectedFruit] = useState("All");

  return (
    <div>
      <AccountTitleLayout title={"Refunds & Returns"} />
      <div>
        <div className="w-full mt-2">
          <div className="max-w-screen-2xl px-1 md:px-2 mx-auto">
            <div className="bg-white gap-2 p-2 md:p-5">
              <h2 className="text-lg leading-5 font-semibold">
                <div className="flex space-x-5 mb-5">
                  <p className="text-sm font-medium">
                    In Progress <span>(0)</span>
                  </p>
                  <p className="text-sm font-medium">
                    Awaiting returns <span>(0)</span>
                  </p>
                </div>

                <div className="flex space-x-5">
                  {" "}
                  <div className="flex-1">
                    <input
                      type="text"
                      id="text"
                      aria-describedby="helper-text-explanation"
                      className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 block w-full p-2.5 hover:border-orange-500"
                      placeholder="Order number"
                    ></input>{" "}
                  </div>
                  <div className="flex-1">
                    <input
                      type="text"
                      id="text"
                      aria-describedby="helper-text-explanation"
                      className="bg-gray-50 border text-gray-900 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 block w-full p-2.5 hover:border-orange-500"
                      placeholder="Order number"
                    ></input>{" "}
                  </div>
                  <div className="flex-1">
                    <Listbox
                      as="div"
                      value={selectedFruit}
                      onChange={setSelectedFruit}
                    >
                      {({ open }) => (
                        <>
                          <div className="relative">
                            <span className="inline-block w-full">
                              <Listbox.Button className="pl-3 py-2.5 w-full text-left focus:outline-none focus:shadow-outline-orange focus:border-orange-500 relative border shadow-sm border-gray-300 rounded text-gray-800 text-sm">
                                <span className="block truncate">
                                  {selectedFruit}
                                </span>
                              </Listbox.Button>
                            </span>
                            <Listbox.Options className="shadow-lg">
                              {fruits.map((fruit) => (
                                <Listbox.Option key={fruit} value={fruit}>
                                  {({ selected, active }) => (
                                    <div
                                      className={`${
                                        active
                                          ? "text-white bg-orange-500"
                                          : "text-gray-900"
                                      } cursor-default select-none relative py-2 pl-10 pr-4 text-sm`}
                                    >
                                      <span
                                        className={`${
                                          selected
                                            ? "font-medium"
                                            : "font-normal"
                                        }`}
                                      >
                                        {fruit}
                                      </span>
                                      {selected && (
                                        <span
                                          className={`${
                                            active
                                              ? "text-white"
                                              : "text-orange-500"
                                          } absolute inset-y-0 left-0 flex items-center pl-2`}
                                        >
                                          <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                            className="w-5 h-5"
                                          >
                                            <path
                                              fillRule="evenodd"
                                              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                              clipRule="evenodd"
                                            />
                                          </svg>
                                        </span>
                                      )}
                                    </div>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </div>
                        </>
                      )}
                    </Listbox>
                  </div>
                  <div className="">
                    <button
                      type="button"
                      className="text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                      Search
                    </button>
                  </div>
                </div>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReturnAndRefundLayout;
