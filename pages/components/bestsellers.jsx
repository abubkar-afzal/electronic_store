import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

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
  {
    src: img3,
    sale: true,
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
  {
    src: img3,
    sale: true,
    name: "FaPhone",
    specification: "12gb ram",
    price: "$70.00",
    saleprice: "$65.00",
  },
];

const BestSeller = () => {
  return (
    <div className="w-full bg-[var(---whitetext)] my-[1rem]">
      <div className="text-center text-[30px] l:text-[40px] font-bold py-[2rem]">
        Best Sellers
      </div>

      <div className="relative max-w-6xl l:max-w-full mx-auto">
        <Swiper
          spaceBetween={10}
          breakpoints={{
            640: { slidesPerView: 1 },
            1024: { slidesPerView: 4 },
          }}
        >
          {images.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="flex flex-col items-start my-2 shadow shadow-black p-2 mx-2">
                <div className="w-full relative cursor-pointer">
                  {item.sale ? (
                      <>
                        <div className="p-0.5 px-4 bg-[var(---salelabel)] inline text-[var(---whitetext)] rounded-[1rem] m-2 font-thin ">
                          SALE
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="p-0.5 px-4 bg-[var(---whitetext)] inline text-[var(---whitetext)] rounded-[1rem] m-2 font-thin ">
                          SALE
                        </div>
                      </>
                    )}

                  <Image
                    src={item.src}
                    alt={`Slide ${index}`}
                    width={1020}
                    height={1020}
                    className="transition-transform duration-500 my-2"
                  />
                </div>

                <div className="ml-2 font-thin">{item.name}</div>
                <div className="ml-2 font-thin">{item.specification}</div>

                {item.sale ? (
                  <div className="flex text-[18px] ml-2">
                    <div className="font-bold text-[var(---price)]">
                      <s>{item.price}</s>
                    </div>
                    <div className="ml-2 font-bold text-[var(---price)]">
                      {item.saleprice}
                    </div>
                  </div>
                ) : (
                  <div className="text-[18px] ml-2 font-bold text-[var(---price)]">
                    {item.price}
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="flex justify-center">
        <button className="text-[16px] l:text-[20px] font-semibold bg-[var(---btncolor)] text-[var(---whitetext)] p-2 l:p-4 l:px-[4rem] px-[3rem] rounded-[1.5rem] my-[2rem] cursor-pointer hover:bg-transparent hover:text-[var(---btncolor)] hover:border-[var(---btncolor)] hover:border-[1px] duration-[1s]">
          View All
        </button>
      </div>
    </div>
  );
};

export default BestSeller;