import React from "react";
import img1 from "./assets/img6.jpg"
import Image from "next/image";

const TodaySpecial =()=>{
    return(<>
    <div className="bg-[var(---whitetext)] l:grid l:h-[90vh] l:grid-cols-2 l:gap-[1rem]   l:overflow-hidden mb-[1rem]">
        <div className="relative l:col-start-2 l:row-start-1 l:w-[130%] l:ml-[-11rem]">
            <Image src={img1} width={1020} height={100} alt="img1" className="w-full h-[30%] l:h-[90vh] rounded-bl-[10rem] "/>
        </div>
        <div className="ml-5 mt-4 l:flex l:flex-col l:justify-center l:items-start l:content-center l:w-[80%] l:ml-[15%]">
            <div className="text-[20px] l:text-[22px] font-thin bg-[var(---salelabel)] inline text-[var(---whitetext)] px-2 mt-2">Today's Special</div>
            <div className="text-[20px] l:text-[30px] font-semibold my-2 w-[80%]">Best Arial View in Town</div>
            <div className="text-[55px] font-bold flex l:text-[6rem]"><div className="text-[var(---btncolor)] mr-2">30%</div>OFF</div>
            <div className="text-[20px] l:text-[30px] font-semibold w-[80%]">on professional camera drones</div>
            <div className="font-thin l:text-[20px] my-2 w-[80%]">Limited quantites.</div>
            <div className="font-thin l:text-[20px] my-2 w-[80%]">See product detail pages for availability</div>
            <div><button className="p-2 px-[2rem] bg-[var(---btncolor)] text-[var(---whitetext)] rounded-[1.5rem] l:text-[22px] l:px-[3rem] mb-[2rem] mt-[1rem] cursor-pointer hover:bg-transparent hover:text-[var(---btncolor)] hover:border-[var(---btncolor)] hover:border-[1px] duration-[1s]  ">Shope</button></div>
        </div>
    </div>
    </>)
}
export default TodaySpecial;