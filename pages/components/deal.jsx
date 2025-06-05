import Image from "next/image";
import React from "react";
import img1 from "./assets/img8.jpg"
import img2 from "./assets/img9.jpg"

const Deal =()=>{
    return(
        <>
        <div className="">
            <div className="my-4 w-full h-[50%] relative">
                <Image src={img1} alt="image1" width={1020} height={1020} className="w-full h-[50%]"/>
                <div className="absolute top-6 left-6 text-[var(---whitetext)] w-[50%]">
                    <div className="text-[12px] font-thin">Holiday Deals</div>
                    <div className="text-[35px] font-semibold">Up to 30% off</div>
                    <div className="text-[13px] font-thin">Selected Smartphone Brands</div>
                    <div><button className="my-4 p-2 px-8 bg-[var(---whitetext)] text-[var(---blacktext)] rounded-[1.5rem] text-[14px] cursor-pointer">Shope</button></div>
                </div>
            </div>
            <div className="my-4 w-full h-[50%] relative">
                <Image src={img2} alt="image1" width={1020} height={1020} className="w-full h-[50%]"/>
                <div className="absolute top-6 left-6 text-[var(---whitetext)] w-[50%]">
                    <div className="text-[12px] font-thin">Just In</div>
                    <div className="text-[35px] font-semibold">Take Your Sound Anywhere</div>
                    <div className="text-[13px] font-thin">Top Headphone Brands</div>
                    <div><button className="my-4 p-2 px-8 bg-[var(---whitetext)] text-[var(---blacktext)] rounded-[1.5rem] text-[14px] cursor-pointer">Shope</button></div>
                </div>
            </div>
        </div>
        </>
    )
}
export default Deal;