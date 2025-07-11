import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";

const Deal = () => {
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
 
  // Fetch deals from API on mount
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
  };


  
  return (
    <>
      <div className="l:grid l:grid-cols-2 l:gap-[1rem] l:h-[40rem] l:overflow-hidden l:justify-between l:w-full px-[1rem]">
        {/* Mobile Deal */}
        <div className="my-4 w-full h-[50%] l:h-full relative ">
          
          {mobileDeal.image && (
            <Image
              src={mobileDeal.image}
              alt="mobile deal"
              width={1020}
              height={1020}
              className="w-full h-[50%] l:h-full"
            />
          )}
          <div className="absolute top-6 left-6 l:top-[15vh] l:left-[5vw] text-[var(---whitetext)] w-[50%] l:w-[40%]">
            <div className="text-[14px] l:text-[1.5rem] font-thin">
              {mobileDeal.line1}
            </div>
            <div className="text-[35px] l:text-[4rem] font-semibold">
              {mobileDeal.line2}
            </div>
            <div className="text-[13px] l:text-[1.4rem] font-thin">
              {mobileDeal.line3}
            </div>
            <div>
              <Link href={`/components/category/mobiles`}>
                <button className="my-4 p-2 px-8 bg-[var(---whitetext)] text-[var(---blacktext)] rounded-[1.5rem] text-[14px] l:text-[18px] l:px-[3rem] cursor-pointer hover:bg-transparent hover:text-[var(---whitetext)] hover:border-[var(---whitetext)] hover:border-[1px] duration-[1s] ">
                  Shope
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* Headphone Deal */}
        <div className="my-4 w-full h-[50%] l:h-full relative">
          
          {headphoneDeal.image && (
            <Image
              src={headphoneDeal.image}
              alt="headphone deal"
              width={1020}
              height={1020}
              className="w-full h-[50%] l:h-full"
            />
          )}
          <div className="absolute top-6 left-6 l:top-[10rem] l:left-[5vw] text-[var(---whitetext)] w-[50%] l:w-[40%]">
            <div className="text-[14px] l:text-[1.5rem] font-thin">
              {headphoneDeal.line1}
            </div>
            <div className="text-[35px] l:text-[4rem] font-semibold">
              {headphoneDeal.line2}
            </div>
            <div className="text-[13px] l:text-[1.4rem] font-thin">
              {headphoneDeal.line3}
            </div>
            <div>
              <Link href={`/components/category/headphones&speakers`}>
                <button className="my-4 p-2 px-8 bg-[var(---whitetext)] text-[var(---blacktext)] rounded-[1.5rem] text-[14px] l:text-[18px] l:px-[3rem] cursor-pointer hover:bg-transparent hover:text-[var(---whitetext)] hover:border-[var(---whitetext)] hover:border-[1px] duration-[1s] ">
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
