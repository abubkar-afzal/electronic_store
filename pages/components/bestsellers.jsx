import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RxCross2, RxMinus, RxPlus } from "react-icons/rx";
import { FaArrowCircleUp, FaEdit } from "react-icons/fa";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import toast, { Toaster } from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const BestSeller = () => {
  const [items, setItems] = useState([]);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/bestsellermain");
        const data = await res.json();
        setItems(data);
      } catch (error) {}
    };
    fetchProducts();
  }, []);

 
  return (
    <>
      
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
            {items.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-start my-2 shadow shadow-black p-2 mx-2 relative">
                 
                  <div className="w-full relative cursor-pointer">
                    {item.onsale ? (
                      <div className="p-0.5 px-4 bg-[var(---salelabel)] inline text-[var(---whitetext)] rounded-[1rem] m-2 font-thin ">
                        SALE
                      </div>
                    ) : (
                      <div className="p-0.5 px-4 bg-[var(---whitetext)] inline text-[var(---whitetext)] rounded-[1rem] m-2 font-thin ">
                        SALE
                      </div>
                    )}
                    <Image
                      src={item.image}
                      alt={`Slide ${index}`}
                      width={1020}
                      height={1020}
                      className="transition-transform duration-500 my-2 hover:scale-102 hover:duration-500 hover:ease-in-out rounded-[1rem] w-full h-auto"
                    />
                  </div>
                  <div className="ml-2 font-thin">{item.name}</div>
                  <div className="ml-2 font-thin">{item.specification}</div>
                  {item.onsale ? (
                    <div className="flex text-[18px] ml-2">
                      <div className="font-bold text-[var(---price)]">
                        <s>{item.price}</s>
                      </div>
                      <div className="ml-2 font-bold text-[var(---price)]">
                        {item.sale_price}
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
          <Link href={`/components/category/bestseller`}>
            <button className="text-[16px] l:text-[20px] font-semibold bg-[var(---btncolor)] text-[var(---whitetext)] p-2 l:p-4 l:px-[4rem] px-[3rem] rounded-[1.5rem] my-[2rem] cursor-pointer hover:bg-transparent hover:text-[var(---btncolor)] hover:border-[var(---btncolor)] hover:border-[1px] duration-[1s]">
              View All
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default BestSeller;
