import Link from "next/link";
import React, { useState, useEffect } from "react";

const Slide1 = () => (
  <div className="h-full w-full bg-white flex items-center justify-center">
    <h1 className="text-3xl font-bold">Slide 1</h1>
  </div>
);

const Slide2 = () => (
  <div className="h-full w-full bg-white flex items-center justify-center">
    <section className="mx-auto w-fit p-12">
      <div className="w-72 h-fit group">
        <h1 className="text-3xl font-bold">Slide 2</h1>
      </div>
    </section>
  </div>
);

const Slide3 = () => (
  <div className="h-full w-full bg-white flex items-center justify-center">
    <h1 className="text-3xl font-bold">Slide 3</h1>
  </div>
);

const Carousel = () => {
  const [index, setIndex] = useState(0);
  const slides = [Slide1, Slide2, Slide3];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex(index === slides.length - 1 ? 0 : index + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, [index, slides.length]);

  const CurrentSlide = slides[index];

  return (
    <div className="relative h-56 md:h-80 lg:h-80">
      <CurrentSlide />
      <div className="absolute bottom-0 flex justify-center w-full">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full m-2 ${
              index === i ? "bg-orange-500" : "bg-gray-100"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
