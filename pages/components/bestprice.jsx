import React from "react";
import img1 from "./assets/img7.jpg"
import Image from "next/image";

const BestPrice =()=>{
    return(<>
    <div className="bg-[var(---whitetext)] my-[1rem]">
        <div className="relative">
            <Image src={img1} width={1020} height={100} alt="img1" className="w-full h-[30%] rounded-br-[10rem]"/>
            <div className="absolute top-10 right-3 bg-[var(---salelabel)] text-[var(---whitetext)] font-bold text-[20px] w-[5rem] text-center p-3 rounded-full rotate-24">Best Price</div>
        </div>
        <div className="ml-5 my-4">
            <div className="text-[20px] font-semibold mt-2">Save up to</div>
            <div className="text-[55px] font-bold">$150</div>
            <div className="text-[18px] font-semibold w-[55%]">on selected laptop & tablets brands</div>
            <div className="font-thin my-2">Term and conditions apply</div>
            <div><button className="p-2 px-[2rem] bg-[var(---btncolor)] text-[var(---whitetext)] rounded-[1.5rem] mb-[2rem] mt-[1rem] cursor-pointer">Shope</button></div>
        </div>
    </div>
    </>)
}
export default BestPrice;