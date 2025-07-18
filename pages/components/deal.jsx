import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { MoonLoader } from "react-spinners";

const Deal = () => {
  const [loading, setloading] = useState(true);
  const [mobileDeal, setMobileDeal] = useState({
    line1: "",
    line2: "",
    line3: "",
    image: "",
  });

  const [headphoneDeal, setHeadphoneDeal] = useState({
    line1: "",
    line2: "",
    line3: "",
    image: "",
  });

  useEffect(() => {
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    const res = await fetch("/api/deals");
    if (res.ok) {
      const data = await res.json();
      if (data.mobile) setMobileDeal(data.mobile);
      if (data.headphone) setHeadphoneDeal(data.headphone);
    }
    setloading(false);
  };
  if(loading){
     <div className=" inset-0 flex items-center justify-center col-span-5 bg-opacity-80 z-999">
      <div className=" p-6 rounded  text-xl font-bold flex items-center gap-2">
        <MoonLoader size={30} color="#7002ff" />
        Loading Deals...
      </div>
    </div>
  }
  return (
    <>
      <div className="t:grid t:grid-cols-2 t:gap-[1rem] t:h-full t:overflow-hidden t:justify-between t:w-full px-[1rem]">
        <div className="my-4 w-full h-[50%] t:h-full relative ">
          {mobileDeal.image && (
            <Image
              src={mobileDeal.image}
              alt="mobile deal"
              width={1020}
              height={1020}
              className="w-full h-[50%] t:h-full"
            />
          )}
          <div className="absolute top-6 left-6 t:top-[5vw] t:left-[5vw] text-[var(---whitetext)] w-[50%] t:w-[40%]">
            <div className="text-[14px] t:text-[2vw] font-thin">
              {mobileDeal.line1}
            </div>
            <div className="text-[35px] t:text-[5vw] font-semibold">
              {mobileDeal.line2}
            </div>
            <div className="text-[13px] t:text-[2vw] font-thin">
              {mobileDeal.line3}
            </div>
            <div>
              <Link href={`/components/category/mobiles`}>
                <button className="my-4 p-2 px-8 bg-[var(---whitetext)] text-[var(---blacktext)] rounded-[1.5rem] text-[14px] t:text-[2vw] t:px-[3rem] cursor-pointer hover:bg-transparent hover:text-[var(---whitetext)] hover:border-[var(---whitetext)] hover:border-[1px] duration-[1s] ">
                  Shope
                </button>
              </Link>
            </div>
          </div>
        </div>
        <div className="my-4 w-full h-[50%] t:h-full relative">
          {headphoneDeal.image && (
            <Image
              src={headphoneDeal.image}
              alt="headphone deal"
              width={1020}
              height={1020}
              className="w-full h-[50%] t:h-full"
            />
          )}
          <div className="absolute top-6 left-6 t:top-[3vw] t:left-[5vw] text-[var(---whitetext)] w-[50%] t:w-[40%]">
            <div className="text-[14px] t:text-[2vw] font-thin">
              {headphoneDeal.line1}
            </div>
            <div className="text-[35px] t:text-[5vw] font-semibold">
              {headphoneDeal.line2}
            </div>
            <div className="text-[13px] t:text-[2vw] font-thin">
              {headphoneDeal.line3}
            </div>
            <div>
              <Link href={`/components/category/headphones&speakers`}>
                <button className="my-4 p-2 px-8 bg-[var(---whitetext)] text-[var(---blacktext)] rounded-[1.5rem] text-[14px] t:text-[2vw] t:px-[3rem] cursor-pointer hover:bg-transparent hover:text-[var(---whitetext)] hover:border-[var(---whitetext)] hover:border-[1px] duration-[1s] ">
                  Shope
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Deal;
