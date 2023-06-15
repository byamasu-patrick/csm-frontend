import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { ProductModel } from "../../../libs/models/shops/catalogs/ProductModels";
import ProductPage from "./ProductPage";

interface Props {
  open: boolean;
  onClose: () => void;
  data: ProductModel;
}

const MyModal: React.FC<Props> = ({ open, onClose, data }) => {
  return (
    <Transition appear show={true} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="transform max-w-4xl overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <ProductPage data={data} />
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default MyModal;
