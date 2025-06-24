import Image from "next/image";
import React from "react";
import img1 from "./assets/img8.jpg"
import img2 from "./assets/img9.jpg"

const Deal =()=>{
    return(
        <>
        <div className="l:grid l:grid-cols-2 l:gap-[1rem] l:h-[40rem] l:overflow-hidden l:justify-between l:w-full l:px-[1rem]">
            <div className="my-4 w-full h-[50%] l:h-full relative ">
                <Image src={img1} alt="image1" width={1020} height={1020} className="w-full h-[50%] l:h-full "/>
                <div className="absolute top-6 left-6 l:top-[15vh] l:left-[5vw] text-[var(---whitetext)] w-[50%] l:w-[40%]">
                    <div className="text-[12px] l:text-[1.5rem] font-thin">Holiday Deals</div>
                    <div className="text-[35px] l:text-[4rem] font-semibold">Up to 30% off</div>
                    <div className="text-[13px] l:text-[1.4rem] font-thin">Selected Smartphone Brands</div>
                    <div><button className="my-4 p-2 px-8 bg-[var(---whitetext)] text-[var(---blacktext)] rounded-[1.5rem] text-[14px] l:text-[18px] l:px-[3rem] cursor-pointer hover:bg-transparent hover:text-[var(---whitetext)] hover:border-[var(---whitetext)] hover:border-[1px] duration-[1s] ">Shope</button></div>
                </div>
            </div>
            <div className="my-4 w-full h-[50%] l:h-full relative">
                <Image src={img2} alt="image1" width={1020} height={1020} className="w-full h-[50%] l:h-full"/>
                <div className="absolute top-6 left-6 l:top-[10vh] l:left-[5vw] text-[var(---whitetext)] w-[50%] l:w-[40%]">
                    <div className="text-[12px] l:text-[1.5rem] font-thin">Just In</div>
                    <div className="text-[35px] l:text-[4rem] font-semibold">Take Your Sound Anywhere</div>
                    <div className="text-[13px] l:text-[1.4rem] font-thin">Top Headphone Brands</div>
                    <div><button className="my-4 p-2 px-8 bg-[var(---whitetext)] text-[var(---blacktext)] rounded-[1.5rem] text-[14px] l:text-[18px] l:px-[3rem] cursor-pointer hover:bg-transparent hover:text-[var(---whitetext)] hover:border-[var(---whitetext)] hover:border-[1px] duration-[1s] ">Shope</button></div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Deal;