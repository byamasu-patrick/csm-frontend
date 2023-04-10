import { useState } from "react";

type RadioOption = {
  id: string;
  name: string;
  imageUrl: string;
  imageSize: string;
};

const radioOptions: RadioOption[] = [
  {
    id: "1",
    name: "AirtelMoney",
    imageUrl: "../../airtel.jpg",
    imageSize: "w-32 h-24",
  },
  {
    id: "2",
    name: "TNM Mpamba",
    imageUrl: "../../tnm.jpg",
    imageSize: "w-32 h-24",
  },
  {
    id: "3",
    name: "Standard Bank",
    imageUrl: "../../sbl.jpg",
    imageSize: "w-32 h-24",
  },
];

export default function PaymentOptions() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (optionId: string) => {
    setSelectedOption(optionId);
  };

  return (
    <div className="flex justify-center items-center space-x-4">
      {radioOptions.map((option) => (
        <label
          key={option.id}
          className="inline-flex flex-col items-center cursor-pointer py-10"
        >
          <img
            src={option.imageUrl}
            alt={option.name}
            className={` ${option.imageSize} border-2 ${
              selectedOption === option.id
                ? "border-indigo-600"
                : "border-gray-300"
            }`}
          />
          <input
            type="radio"
            id={option.id}
            name="options"
            value={option.id}
            checked={selectedOption === option.id}
            onChange={() => handleOptionChange(option.id)}
            className="sr-only"
          />
          <span className="text-sm font-medium text-gray-900">
            {option.name}
          </span>
        </label>
      ))}
    </div>
  );
}
