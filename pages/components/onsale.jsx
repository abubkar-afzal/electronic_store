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

const OnSale = ({onDone}) => {
  const [items, setItems] = useState([]);
  const [flippedCards, setFlippedCards] = useState({});
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/onsalemain");
        const data = await res.json();
        setItems(data);
        onDone();
      } catch (error) {}
    };
    fetchProducts();
  }, []);

  return (
    <>
      
      <div className="w-full bg-[var(---whitetext)] my-[1rem]">
        <div className="text-center text-[30px] l:text-[40px] font-bold py-[2rem]">
          On Sale
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
              <SwiperSlide key={item.id || index}>
                <div 
                  onClick={() =>
                        setFlippedCards((prev) => ({
                          ...prev,
                          [item.id]: !prev[item.id], // flip only this card
                        }))
                      }
                  className="sm:w-[17rem] sm:mx-auto l:w-full sm:h-[25rem] l:h-[30rem] relative my-[2rem] l:mx-2 perspective-[1000px] cursor-pointer"
                >
                  <div
                    className={`transition-transform duration-[1s] w-full h-full relative`}
                    style={{
                      transformStyle: "preserve-3d",
                      transform: flippedCards[item.id] ? "rotateY(180deg)" : "rotateY(0deg)",
                    }}
                  >
                    {/* FRONT SIDE */}
                    <div className="absolute inset-0 backface-hidden  rounded-[1rem] shadow shadow-black p-2">
                      {item.onsale ? (
                        <div className="p-0.5 px-4 bg-[var(---salelabel)] inline text-[var(---whitetext)] rounded-[1rem] m-2 font-thin">
                          SALE
                        </div>
                      ) : (
                        <div className="p-0.5 px-4 bg-[var(---whitetext)] inline text-[var(---whitetext)] rounded-[1rem] m-2 font-thin">
                          SALE
                        </div>
                      )}

                      <Image
                        src={item.image}
                        alt={`Slide ${index}`}
                        width={1020}
                        height={1020}
                        className="transition-transform duration-500 my-2 hover:scale-102 rounded-[1rem] w-full h-auto"
                      />

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

                    {/* BACK SIDE */}
                    <div className="absolute inset-0 backface-hidden rotate-y-180 border shadow-black shadow-sm rounded-[1rem] flex flex-col justify-center items-center p-4 space-y-4">
                      <button className="text-[16px] l:text-[16px] font-semibold bg-[var(---btncolor)] text-[var(---whitetext)] p-2 l:p-4 l:px-[2rem] px-[1.5rem] rounded-[8px] my-[1rem] cursor-pointer hover:bg-transparent hover:text-[var(---btncolor)] hover:border-[var(---btncolor)] hover:border-[1px] duration-[1s]">
                        Add to Cart
                      </button>
                      <button className="text-[16px] l:text-[16px] font-semibold bg-[var(---blacktext)] text-[var(---whitetext)] p-2 l:p-4 l:px-[2rem] px-[1.5rem] rounded-[8px] mb-[1rem] cursor-pointer hover:bg-transparent hover:text-[var(---blacktext)] hover:border-[var(---blacktext)] hover:border-[1px] duration-[1s]">
                        Buy Now
                      </button>
                      <Link href={`/components/product/${item.id}`}>
                        <div className="underline text-blue-600 cursor-pointer hover:scale-110 duration-[1s]">
                          Details
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex justify-center">
          <Link href={`/components/category/sale`}>
            <button className="text-[16px] l:text-[20px] font-semibold bg-[var(---btncolor)] text-[var(---whitetext)] p-2 l:p-4 l:px-[4rem] px-[3rem] rounded-[1.5rem] my-[2rem] cursor-pointer hover:bg-transparent hover:text-[var(---btncolor)] hover:border-[var(---btncolor)] hover:border-[1px] duration-[1s]">
              View All
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default OnSale;
