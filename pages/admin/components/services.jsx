import Image from "next/image";
import React from "react";
import img1 from "../../../public/scoter.png"
import img2 from "../../../public/shipping.png"
import img3 from "../../../public/low-price.png"
import img4 from "../../../public/clock.png"

const Services = ()=>{
return(
    <>
    <div className="w-full p-4 l:py-[3rem] l:px-[2rem] h-[100%] bg-[var(---whitetext)] my-[1rem] flex flex-wrap">
        <div className="flex flex-col l:flex-row items-center l:justify-center my-[3rem] l:my-0 space-y-4 l:space-y-0 w-1/2 l:w-1/4">
            <Image src={img1} width={1020} height={1020} alt="img" className="w-[40%] h-[35%] l:w-[17%] l:h-auto"/>
            <div className="w-[50%] l:ml-2  text-center text-[16px] l:text-[22px] l:w-[50%]  font-bold">Curb-side pickup</div>
        </div>
        <div className="flex flex-col l:flex-row items-center l:justify-center my-[3rem] l:my-0 space-y-4 l:space-y-0 w-1/2 l:w-1/4">
            <Image src={img2} width={1020} height={1020} alt="img" className="w-[40%] h-[35%] l:w-[15%] l:h-auto"/>
            <div className="text-center text-[16px] l:text-[22px] l:w-[50%] font-bold">Free shiping on orders over $50</div>
        </div>
        <div className="flex flex-col l:flex-row items-center l:justify-center my-[3rem] l:my-0 space-y-4 l:space-y-0 w-1/2 l:w-1/4">
            <Image src={img3} width={1020} height={1020} alt="img" className="w-[30%] h-[35%] l:w-[10%] l:h-auto"/>
            <div className=" text-center text-[16px] l:text-[22px] l:w-[50%]  l:ml-2 font-bold">Low prices guaranted</div>
        </div>
        <div className="flex flex-col l:flex-row items-center l:justify-center my-[3rem] l:my-0 space-y-4 l:space-y-0 w-1/2 l:w-1/4">
            <Image src={img4} width={1020} height={1020}  alt="img" className="w-[30%] h-[35%] l:w-[12%] l:h-auto"/>
            <div className=" text-center text-[16px] l:text-[22px] l:w-[50%]  l:ml-2 font-bold">Avaliable to you 24/7</div>
        </div>
    </div>
    </>
)
}

export default Services;