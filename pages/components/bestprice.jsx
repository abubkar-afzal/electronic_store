import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MoonLoader } from "react-spinners";

const BestPrice = ({ Bestprice }) => {
  const [data, setData] = useState(Bestprice);
  console.log(Bestprice);
  return (
    <>
      <div className="relative">
        {data.length > 0 ? data.map((data)=>
          <div className="bg-[var(---whitetext)] my-[1rem] l:grid l:grid-cols-2 l:gap-[1rem] l:h-[90vh]">
            <div className="relative t:w-[120%]">
              <Image
                src={data.image || data.img}
                width={1020}
                height={100}
                alt="img1"
                className="w-full h-[30%] l:h-[90vh] rounded-br-[10rem]"
              />
              <div className="absolute top-10 l:top-[30%] l:right-[-3rem] right-3 bg-[var(---salelabel)] text-[var(---whitetext)] font-bold text-[20px] l:text-[2rem] w-[5rem] l:w-[9rem] t:p-5 text-center p-3 rounded-full rotate-24">
                {data.label}
              </div>
            </div>
            <div className="ml-5 my-4  l:ml-[15vw] l:items-start l:content-center l:flex l:flex-col l:justify-center">
              <div className="text-[20px] l:text-[1.5rem] font-semibold mt-2">
                {data.save_text}
              </div>
              <div className="text-[55px] l:text-[6rem] font-bold">
                ${data.amount}
              </div>
              <div className="text-[18px] l:text-[2rem] font-semibold w-[55%]">
                {data.description}
              </div>
              <div className="font-thin my-2 l:text-[1.3rem]">{data.terms}</div>
              <Link href="/components/category/allproducts">
                <button className="p-2 px-[2rem] bg-[var(---btncolor)] text-[var(---whitetext)] rounded-[1.5rem] t:rounded-[3rem] mb-[2rem] l:text-[1.5rem] l:px-[3rem] hover:bg-transparent hover:text-[var(---btncolor)] hover:border-[var(---btncolor)] hover:border-[1px] duration-[1s] mt-[1rem] cursor-pointer">
                  {data.button_text}
                </button>
              </Link>
            </div>
          </div>
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
