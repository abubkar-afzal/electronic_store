import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MoonLoader } from "react-spinners";

const TodaySpecial = ({ Todayspecial }) => {
  const [data, setData] = useState(Todayspecial||[]);

  return (
    <>
      <div className="relative">
        {data.length > 0 ? (
          data.map((data) => (
            <div className="bg-[var(---whitetext)] t:grid t:h-[70vh] l:h-[90vh] t:grid-cols-2 t:gap-[1rem] t:overflow-hidden mb-[1rem]">
              <div className="relative t:col-start-2 t:row-start-1 ">
                <Image
                  src={data.image || data.img}
                  width={1020}
                  height={100}
                  alt="img1"
                  className="w-full h-[30%] t:h-[70vh] l:h-[90vh] rounded-bl-[10rem]"
                />
              </div>
              <div className="ml-5 mt-4 t:flex t:flex-col t:justify-center t:items-start t:content-center t:w-[80%] t:ml-[15%]">
                <div className="text-[20px] t:text-[2vw] font-thin bg-[var(---salelabel)] inline text-[var(---whitetext)] px-2 mt-2">
                  {data.label}
                </div>
                <div className="text-[20px] t:text-[2.5vw] font-semibold my-2 w-[80%]">
                  {data.title}
                </div>
                <div className="text-[55px] font-bold flex t:text-[7vw]">
                  <div className="text-[var(---btncolor)] mr-2">
                    {data.percent}
                  </div>
                  {data.percent_label}
                </div>
                <div className="font-thin t:text-[1.8vw] my-2 w-[80%]">
                  {data.note1}
                </div>
                <div className="font-thin t:text-[1.8vw] my-2 w-[80%]">
                  {data.note2}
                </div>
                <Link href="/components/category/allproducts">
                  <button className="p-2 px-[2rem] bg-[var(---btncolor)] text-[var(---whitetext)] rounded-[8px] t:text-[22px] t:px-[6vw] mb-[2rem] mt-[1rem] cursor-pointer hover:bg-transparent hover:text-[var(---btncolor)] hover:border-[var(---btncolor)] hover:border-[1px] duration-[1s]">
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

export default TodaySpecial;
