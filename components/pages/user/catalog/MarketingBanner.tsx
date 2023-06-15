import {
  LifebuoyIcon,
  NewspaperIcon,
  PhoneIcon,
} from "@heroicons/react/20/solid";
import { FaBars, FaShippingFast } from "react-icons/fa";
import { RiSecurePaymentFill } from "react-icons/ri";
import {
  MdOutlineContactSupport,
  MdSupportAgent,
  MdContactSupport,
} from "react-icons/md";

const cards = [
  {
    name: "Customer Support",
    description: "24/7 maximum available support",
    icon: MdOutlineContactSupport,
  },
  {
    name: "Safe Payment",
    description: "Pay with the trusted local payment methods",
    icon: RiSecurePaymentFill,
  },
  {
    name: "Local wide Shipping",
    description: "What you want delivered to where you want",
    icon: FaShippingFast,
  },
];

export default function Example() {
  return (
    <div className="mx-auto mt-6 grid max-w-2xl grid-cols-1 gap-2 sm:mt-4 lg:mx-0 lg:max-w-none md:grid-cols-3 md:max-w-none lg:gap-4">
      {cards.map((card) => (
        <div
          key={card.name}
          className="flex gap-x-4  bg-white p-6 ring-1 ring-inset ring-white/10"
        >
          <card.icon
            className="h-7 w-5 flex-none text-amber-500"
            aria-hidden="true"
          />
          <div className="text-base">
            <h3 className="font-semibold text-gray-700">{card.name}</h3>
            <p className="mt-1 text-gray-500">{card.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
