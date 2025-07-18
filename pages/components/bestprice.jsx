import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
const MoonLoader = dynamic(() => import("react-spinners").then(mod => mod.MoonLoader), { ssr: false });

const BestPrice = ({ Bestprice }) => {
  const [data, setData] = useState(Bestprice||[]);
  return (
    <>
      <div className="relative">
        {data.length > 0 ? (
          data.map((data) => (
            <div className="bg-[var(---whitetext)] my-[1rem] t:grid t:grid-cols-2 t:gap-[1rem] t:h-[60vh] l:h-[90vh]">
              <div className="relative t:w-[98%]">
                <Image
                  src={data.image || data.img}
                  width={1020}
                  height={100}
                  alt="img1"
                  className="w-full h-[30%] t:h-[60vh] l:h-[90vh] rounded-br-[10rem]"
                />
                <div className="absolute top-10 t:top-[30%] t:right-[-3vw] right-3 bg-[var(---salelabel)] text-[var(---whitetext)] font-bold sm:text-[5vw] t:text-[2vw] sm:w-[22vw] t:w-[11vw] l:w-[9vw] t:p-5 text-center p-3 rounded-full rotate-24">
                  {data.label}
                </div>
              </div>
              <div className="ml-5 my-4  t:ml-[15vw] t:items-start t:content-center t:flex t:flex-col t:justify-center">
                <div className="text-[20px] t:text-[2vw] font-semibold mt-2">
                  {data.save_text}
                </div>
                <div className="text-[55px] t:text-[6vw] font-bold">
                  ${data.amount}
                </div>
                <div className="text-[18px] t:text-[2vw] font-semibold w-[55%]">
                  {data.description}
                </div>
                <div className="font-thin my-2 t:text-[1.3vw]">
                  {data.terms}
                </div>
                <Link href="/components/category/allproducts">
                  <button className="p-2 px-[2rem] bg-[var(---btncolor)] text-[var(---whitetext)] rounded-[8px] mb-[2rem] t:text-[1.5vw] t:px-[3rem] hover:bg-transparent hover:text-[var(---btncolor)] hover:border-[var(---btncolor)] hover:border-[1px] duration-[1s] mt-[1rem] cursor-pointer">
                    {data.button_text}
                  </button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className=" inset-0 flex items-center justify-center col-span-5 bg-opacity-80 z-999">
            <div className=" p-6 rounded  text-xl font-bold flex items-center gap-2">
              <MoonLoader size={30} color="#7002ff" />
              Loading...
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BestPrice;
