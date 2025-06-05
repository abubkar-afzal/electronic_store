"use client"; // Required for Next.js 13+ with App Router

import React, { useState } from "react";
import Image from "next/image";

import img1 from "./assets/img7.jpg";
import img2 from "./assets/img5.jpg";
import img3 from "./assets/img6.jpg";

const images = [
  {
    src: img1,
    sale: true,
    name: "FaPhone",
    specification: "12gb ram",
    price: "$70.00",
    saleprice: "$65.00",
  },
  {
    src: img2,
    sale: false,
    name: "FaPhone",
    specification: "12gb ram",
    price: "$70.00",
    saleprice: "$65.00",
  },
  {
    src: img3,
    sale: true,
    name: "FaPhone",
    specification: "12gb ram",
    price: "$70.00",
    saleprice: "$65.00",
  },
];

const OnSale = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <>
      <div className="w-full bg-[var(---whitetext)] my-[1rem]">
        <div className="text-center text-[30px] font-bold py-[2rem]">
          On Sale
        </div>

        <div className="relative w-full max-w-lg mx-auto">
          <div className="flex flex-col items-center w-[60%] mx-auto shadow shadow-black">
            <div className="relative w-full max-w-lg mx-auto overflow-hidden">
              <div
                className="flex whitespace-nowrap transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {images.map((item, index) => (
                  <div
                    key={index}
                    className="relative w-full flex-shrink-0 my-2 cursor-pointer"
                  >
                    
                        <div className="p-0.5 px-4 bg-[var(---salelabel)] inline text-[var(---whitetext)] rounded-[1rem] m-2 font-thin ">
                          SALE
                        </div>
                      
                   

                    <Image
                      src={item.src}
                      alt={`Slide ${index}`}
                      width={1020}
                      height={1020}
                      className="transition-transform duration-500 my-2"
                    />
                    <div>
                      <div className="ml-4 font-thin">{item.name}</div>
                      <div className="ml-4 font-thin">{item.specification}</div>
                      {item.sale ? (
                        <>
                          <div className="flex text-[18px]">
                            <div className="ml-5 font-bold text-[var(---price)]">
                              <s>{item.price}</s>
                            </div>

                            <div className="ml-2 font-bold text-[var(---price)]">
                              {item.saleprice}
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="ml-5 text-[18px] font-bold text-[var(---price)]">
                            {item.price}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[30px] font-black font-mono 
                             text-[var(---arrowbutton)] cursor-pointer "
          >
            &lt;
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-[30px] font-black font-mono 
                             text-[var(---arrowbutton)] cursor-pointer"
          >
            &gt;
          </button>
        </div>
        <div className="flex flex-col items-center"><button className="text-[16px] font-semibold bg-[var(---btncolor)] text-[var(---whitetext)] p-2 px-[3rem] rounded-[1.5rem] my-[2rem] cursor-pointer">View All</button></div>
      </div>
    </>
  );
};

export default OnSale;
