import Image from "next/image";
import React from "react";
import img1 from "./assets/img1.jpg"
import img2 from "./assets/img2.jpg"
import img3 from "./assets/img3.jpg"
import img4 from "./assets/img4.jpg"
import img5 from "./assets/img5.jpg"
import img6 from "./assets/img6.jpg"
import img7 from "./assets/img7.jpg"
import img8 from "./assets/img8.jpg"
import img9 from "./assets/img9.jpg"

const ShopeCategory =()=>{
    return(<>
    <div className="bg-[var(---whitetext)] py-[2rem] mb-[2rem]">
        <div className="text-[25px] font-semibold text-center my-[2rem]">Shope by Category</div>
        <div className="flex flex-col items-center">
            <div className="flex flex-col items-center my-[2rem] cursor-pointer">
                <div className="w-[15rem] h-[15rem] bg-[var(---pagecolor)] rounded-full overflow-hidden p-4">
                    
                    <Image src={img1} width={1020} height={1020} alt="img" className=""/>
                    
                    </div>
                <div className="font-bold my-2">Computers</div>
            </div>
             <div className="flex flex-col items-center my-[2rem] cursor-pointer ">
                <div className="w-[15rem] h-[15rem] bg-[var(---pagecolor)] rounded-full overflow-hidden p-4">
                    
                    <Image src={img2} width={1020} height={1020} alt="img" className=""/>
                    
                    </div>
                <div className="font-bold my-2">Mobiles</div>
            </div>
             <div className="flex flex-col items-center my-[2rem] cursor-pointer">
                <div className="w-[15rem] h-[15rem] bg-[var(---pagecolor)] rounded-full overflow-hidden p-4">
                    
                    <Image src={img3} width={1020} height={1020} alt="img" className=""/>
                    
                    </div>
                <div className="font-bold my-2">Drones & Cameras</div>
            </div>
             <div className="flex flex-col items-center my-[2rem] cursor-pointer">
                <div className="w-[15rem] h-[15rem] bg-[var(---btncolor)] rounded-full overflow-hidden p-4">
                    
                    <Image src={img4} width={1020} height={1020} alt="img" className=""/>
                    
                    </div>
                <div className="font-bold my-2">Sale</div>
            </div>
             <div className="flex flex-col items-center my-[2rem] cursor-pointer">
                <div className="w-[15rem] h-[15rem] bg-[var(---pagecolor)] rounded-full overflow-hidden p-4">
                    
                    <Image src={img5} width={1020} height={1020} alt="img" className=""/>
                    
                    </div>
                <div className="font-bold my-2">Tablets</div>
            </div>
             <div className="flex flex-col items-center my-[2rem] cursor-pointer">
                <div className="w-[15rem] h-[15rem] bg-[var(---blacktext)] rounded-full overflow-hidden p-4">
                    
                    <Image src={img6} width={1020} height={1020} alt="img" className=""/>
                    
                    </div>
                <div className="font-bold my-2">Best Sellers</div>
            </div>
            <div className="flex flex-col items-center my-[2rem] cursor-pointer">
                <div className="w-[15rem] h-[15rem] bg-[var(---pagecolor)] rounded-full overflow-hidden p-4">
                    
                    <Image src={img7} width={1020} height={1020} alt="img" className=""/>
                    
                    </div>
                <div className="font-bold my-2">T.V & Home Cinema</div>
            </div>
            <div className="flex flex-col items-center my-[2rem] cursor-pointer">
                <div className="w-[15rem] h-[15rem] bg-[var(---pagecolor)] rounded-full overflow-hidden p-4">
                    
                    <Image src={img8} width={1020} height={1020} alt="img" className=""/>
                    
                    </div>
                <div className="font-bold my-2">Wearable Tech</div>
            </div>
            <div className="flex flex-col items-center my-[2rem] cursor-pointer">
                <div className="w-[15rem] h-[15rem] bg-[var(---pagecolor)] rounded-full overflow-hidden p-4">
                    
                    <Image src={img9} width={1020} height={1020} alt="img" className=""/>
                    
                    </div>
                <div className="font-bold my-2">Speakers</div>
            </div>
            <div className="flex flex-col items-center my-[2rem] cursor-pointer">
                <div className="w-[15rem] h-[15rem] bg-[var(---pagecolor)] rounded-full overflow-hidden p-4">
                    
                    <Image src={img1} width={1020} height={1020} alt="img" className=""/>
                    
                    </div>
                <div className="font-bold my-2">Headphones</div>
            </div>
        </div>
    </div>
    </>)
}
export default ShopeCategory;