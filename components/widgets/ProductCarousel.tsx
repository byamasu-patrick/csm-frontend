import React, { useState } from "react";

const ProductCarousell: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const products = [
    {
      name: "Product 1",
      image: "../../chelsea.jpg",
    },
    {
      name: "Product 2",
      image: "https://via.placeholder.com/100x100",
    },
    {
      name: "Product 3",
      image: "https://via.placeholder.com/100x100",
    },
    {
      name: "Product 4",
      image: "https://via.placeholder.com/100x100",
    },
    {
      name: "Product 5",
      image: "https://via.placeholder.com/100x100",
    },
    {
      name: "Product 6",
      image: "https://via.placeholder.com/100x100",
    },
  ];

  const handlePrevClick = () => {
    if (activeIndex === 0) {
      setActiveIndex(products.length - 4);
    } else {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (activeIndex === products.length - 4) {
      setActiveIndex(0);
    } else {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handleDotClick = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="relative">
      <button
        className="absolute left-0 top-50% transform -translate-y-1/2 focus:outline-none"
        onClick={handlePrevClick}
      >
        &lt;
      </button>
      <button
        className="absolute right-0 top-50% transform -translate-y-1/2 focus:outline-none"
        onClick={handleNextClick}
      >
        &gt;
      </button>
      <div className="flex overflow-x-scroll">
        {products.map((product, index) => {
          if (index >= activeIndex && index < activeIndex + 4) {
            return (
              <div key={product.name} className="w-1/4 p-4">
                <img src={product.image} alt={product.name} />
                <p className="text-center font-bold mt-2">{product.name}</p>
              </div>
            );
          }
          return null;
        })}
      </div>
      <div className="absolute right-0 bottom-0 m-4 flex">
        {products.map((_, index) => {
          return (
            <button
              key={index}
              className={`w-3 h-3 rounded-full mr-1 ${
                index === activeIndex ? "bg-indigo-500" : "bg-gray-300"
              }`}
              onClick={() => handleDotClick(index)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ProductCarousell;
