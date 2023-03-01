import { PlusIcon } from "@heroicons/react/20/solid";

import React from "react";
import { Interface } from "readline";

interface TitleProps {
  title: string;
}

const SectionDivider: React.FC<TitleProps> = ({ title }) => {
  return (
    <div>
      <div className="relative mb-5 mt-5">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center">
          <button
            type="button"
            className="inline-flex items-center rounded-full border border-gray-300 bg-white px-4 py-1.5 text-sm font-medium leading-5 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
          >
            <PlusIcon
              className="-ml-1.5 mr-1 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            <span>{title}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SectionDivider;
