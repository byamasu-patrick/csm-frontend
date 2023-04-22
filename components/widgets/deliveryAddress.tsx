import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { CourierModel, CourierResponse } from "../../libs/models/shipping/ShippingModels";
import { useAppDispatch, useAppSelector } from "../../libs/store";
import React, { useEffect, useState } from "react";
import { ShippingSelector, GetAllCouries } from "../../libs/store/shipping";
import { BasketSelector } from "../../libs/store/Basket";

const DeliveryAddress = () => {
const { couriers, prices, receivers, locations, isGetting} = useAppSelector(ShippingSelector);
const { cart } = useAppSelector(BasketSelector);
const dispatch = useAppDispatch()

const [selectedCourier, setSelectedCourier] = useState('');
const [selectedLocation, setSelectedLocation] = useState('');
const [selectedPrice, setSelectedPrice] = useState(0.0);

const handleCourierChange = (courierName: string) => {
  setSelectedCourier(courierName);
};

const handleLocationChange = (locationName: string) => {
  setSelectedLocation(locationName);
};
const handlePriceChange = (price: number) => {
  setSelectedPrice(price);
};

useEffect(() => {
  const fetchCouriers = async () => {
    await dispatch(GetAllCouries(1));
  };
  fetchCouriers().catch((error) => console.log(error));
  console.log(fetchCouriers);
}, []);
  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Personal Information
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p>

          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="relative sm:col-span-3">
              <label
                htmlFor="name"
                className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
              >
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="px-3 block w-full outline-none rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                placeholder="Lloyd"
              />
            </div>
            <div className="relative sm:col-span-3">
              <label
                htmlFor="name"
                className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
              >
                Surname
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="px-3 block w-full outline-none rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                placeholder="Chunga"
              />
            </div>

            <div className="sm:col-span-4">
              <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">+265</span>
                </div>
                <label
                  htmlFor="name"
                  className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                >
                  Phone number
                </label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="block w-full rounded-md border-0 py-3 pl-12 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 outline-none sm:text-sm sm:leading-6"
                  placeholder=""
                  aria-describedby="price-currency"
                />
              </div>
            </div>

            <div className="relative sm:col-span-2 sr-only">
              <label
                htmlFor="name"
                className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
              >
                Username
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="px-3 block w-full outline-none rounded-md border-0 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 sm:text-sm sm:leading-6"
                placeholder="Chunga"
              />
            </div>

            <div className="sm:col-span-full">
              <div className="relative mt-2 rounded-md shadow-sm">
                <label
                  htmlFor="name"
                  className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                >
                  Nation ID Number
                </label>
                <input
                  type="text"
                  name="price"
                  id="price"
                  className="block w-full rounded-md border-0 py-3 pl-12 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-500 outline-none sm:text-sm sm:leading-6"
                  placeholder=""
                  aria-describedby="price-currency"
                />
              </div>
            </div>

            <div className="sm:col-span-3 sm:col-start-1 rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-amber-500">
              <label
                htmlFor="Location"
                className="block text-xs font-medium text-gray-900"
              >
                Select Courier
              </label>
              <select
                id="courier"
                name="courier"
                value={selectedCourier}
                onChange={(e) =>
                  handleCourierChange(e.target.value)
                }
                autoComplete="courier-name"
                className="relative block w-full outline-none bg-transparent py-1.5 text-gray-900 r ring-gray-300 focus:z-10 sm:text-sm sm:leading-6"
              >
                  {couriers?.results.map((courier, index) => (
                    <option key={index} value={courier.name}>
                      {courier.name} 
                    </option>
                  ))}
            
              </select>
            </div>

            <div className="sm:col-span-3 rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-amber-500">
              <label
                htmlFor="Location"
                className="block text-xs font-medium text-gray-900"
              >
                Location
              </label>
              <select
                id="location"
                name="location"
                value={selectedLocation}
                onChange={(e) =>
                  handleLocationChange(e.target.value)
                }
                autoComplete="location-name"
                className="relative block w-full outline-none bg-transparent py-1.5 text-gray-900 r ring-gray-300 focus:z-10 sm:text-sm sm:leading-6"
              >
                  {/* Render options based on the selectedCourier */}
                {selectedCourier &&
                  couriers?.results
                    .find((courier) => courier.name === selectedCourier)
                    ?.locationAddresses?.map((location, index) => (
                      <option key={index} value={location.destination}>
                        {location.destination}
                      </option>
                      ))}
              </select>
            </div>

            <div className="sm:col-span-2 rounded-md px-3 pb-1.5 pt-2.5 shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-amber-500 ">
              <label
                htmlFor="Location"
                className="block text-xs font-medium text-gray-900"
              >
                delivery amount(k)
              </label>
              <input
                id="weightRange"
                name="weightRange"
                onChange={(e) =>
                  handlePriceChange(parseInt(e.target.value))
                }
                type="text"
                value={
                  selectedLocation &&
                  couriers.results
                    .find((courier) => courier.name === selectedCourier)
                    ?.locationAddresses.find((address) => address.destination === selectedLocation)
                    ?.prices.find((price) => cart.totalWeight >= price.fromKg && cart.totalWeight <= price.toKg)?.price
                }
                autoComplete="weightRange"
                readOnly
                className="relative block w-full outline-none bg-transparent py-2 text-gray-900 ring-gray-300 focus:z-10 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
export default DeliveryAddress;
