import React from "react";
import img1 from "./assets/img6.jpg"
import Image from "next/image";

const TodaySpecial =()=>{
    return(<>
    <div className="bg-[var(---whitetext)]">
        <div className="relative">
            <Image src={img1} width={1020} height={100} alt="img1" className="w-full h-[30%] rounded-bl-[10rem]"/>
        </div>
        <div className="ml-5 mt-4">
            <div className="text-[20px] font-thin bg-[var(---salelabel)] inline text-[var(---whitetext)] px-2 mt-2">Today's Special</div>
            <div className="text-[20px] font-semibold my-2 w-[80%]">Best Arial View in Town</div>
            <div className="text-[55px] font-bold flex"><div className="text-[var(---btncolor)] mr-2">30%</div>OFF</div>
            <div className="text-[20px] font-semibold w-[80%]">on professional camera drones</div>
            <div className="font-thin my-2 w-[80%]">Limited quantites.</div>
            <div className="font-thin my-2 w-[80%]">See product detail pages for availability</div>
            <div><button className="p-2 px-[2rem] bg-[var(---btncolor)] text-[var(---whitetext)] rounded-[1.5rem] mb-[2rem] mt-[1rem] cursor-pointer">Shope</button></div>
        </div>
    </div>
    </>)
}
export default TodaySpecial;