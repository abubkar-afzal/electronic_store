import React from "react";
import img1 from "./assets/img6.jpg"
import Image from "next/image";

const HelpCenter=()=>{
    return(<>
        <div className="l:grid l:grid-cols-2 l:h-[50vh] ">
            <div className="w-full h-[50%]  bg-[var(---blacktext)] text-[var(---whitetext)] flex flex-col items-center l:justify-center">
                
                <div className="text-[25px] l:text-[30px] l:w-[50%] l:text-left px-4 text-center font-bold my-2 mt-4">Need Help? Check Out Our Help Center</div>
                <div className="px-4 text-center l:text-[16px] l:w-[50%] l:text-left font-thin my-2">If you need to buy any thing new or need any help or you have any type of conplain then contact us. We will provide our help to solve you problem.</div>
                <div className="w-full l:w-[65%] l:justify-start px-[4rem]"><button className="p-2 l:text-[18px] l:w-[50%]  py-3 bg-[var(---whitetext)] w-full text-[var(---btncolor)] rounded-[1.5rem] my-4 mb-[2rem] hover:bg-[var(---btncolor)] hover:text-[var(---whitetext)] duration-[1s] cursor-pointer ">Go to Help Center</button></div>
            </div>
            <div>
                <Image src={img1} width={1020} height={1020} alt="img" className="w-full h-[50%]"/>
            </div>
        </div>
    </>)
}
export default HelpCenter;