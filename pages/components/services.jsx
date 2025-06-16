import Image from "next/image";
import React from "react";
import img1 from "./assets/scoter.png"
import img2 from "./assets/shipping.png"
import img3 from "./assets/low-price.png"
import img4 from "./assets/clock.png"

const Services = ()=>{
return(
    <>
    <div className="w-full p-4 h-[100%] bg-[var(---whitetext)] my-6 flex flex-wrap">
        <div className="flex flex-col items-center my-[3rem] space-y-4 w-1/2">
            <Image src={img1} width={1020} height={1020} alt="img" className="w-[40%] h-[35%]"/>
            <div className="w-[50%] text-center text-[16px] font-bold">Curb-side pickup</div>
        </div>
        <div className="flex flex-col items-center my-[3rem] space-y-4 w-1/2">
            <Image src={img2} width={1020} height={1020} alt="img" className="w-[40%] h-[35%]"/>
            <div className="text-center text-[16px] font-bold">Free shiping on orders over $50</div>
        </div>
        <div className="flex flex-col items-center my-[3rem] space-y-4 w-1/2">
            <Image src={img3} width={1020} height={1020} alt="img" className="w-[30%] h-[35%]"/>
            <div className=" text-center text-[16px] font-bold">Low prices guaranted</div>
        </div>
        <div className="flex flex-col items-center my-[3rem] space-y-4 w-1/2">
            <Image src={img4} width={1020} height={1020}  alt="img" className="w-[30%] h-[35%]"/>
            <div className=" text-center text-[16px] font-bold">Avaliable to you 24/7</div>
        </div>
    </div>
    </>
)
}

export default Services;