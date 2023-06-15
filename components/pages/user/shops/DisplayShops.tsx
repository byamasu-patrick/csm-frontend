import { Tabs } from "flowbite-react";
import { useState } from "react";
import { useAppDispatch } from "../../../../libs/store";
import GetShops from "./GetShops";

const DisplayShops = () => {
  const [activeStatus, setActiveStatus] = useState<number>(1);

  return (
    <div className="bg-white max-w-7xl mx-auto mt-5 rounded-lg mb-10">
      <div className="mx-auto max-w-2xl py-16 px-4 sm:py-2 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="inline-flex justify-center items-center w-full">
          <hr className="my-8 w-80 h-1 bg-gray-200 rounded border-0 dark:bg-gray-700" />
          <div className="absolute left-1/2 px-4 bg-white -translate-x-1/2 ">
            <h2 className="text-gray-800 text-xl lg:text-2xl font-bold text-left mb-8 md:mb-2">
              Browse by Shops
            </h2>
          </div>
        </div>
        <Tabs.Group aria-label="Full width tabs" style="fullWidth">
          <Tabs.Item title="Recommended Shops">{<GetShops />}</Tabs.Item>
          <Tabs.Item title="Top Rated Shops">Dashboard content</Tabs.Item>
          <Tabs.Item title="Near You">Settings content</Tabs.Item>
        </Tabs.Group>
      </div>
    </div>
  );
};

export default DisplayShops;
