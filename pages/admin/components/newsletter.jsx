import React from "react";
import { RiErrorWarningLine } from "react-icons/ri";
const Newsletter = ()=>{
    return(<>
    <div className="w-full bg-[var(---btncolor)] text-[var(---whitetext)] flex flex-col items-center py-[1rem] l:my-[1rem]">
        <div className="text-[25px] font-bold">Newsletter</div>
        <div className="px-[2rem] text-center">Sign up to receive updates on new arrivals and special offers</div>
        <div className="mt-[3rem] l:mt-[1rem] w-full px-4 l:items-center l:flex l:justify-center l:flex-col">
            <div className="font-thin l:w-[60%] l:pl-[1rem]">Email *</div>
            <div className="l:flex l:items-center l:w-[60%]"><input type="email" className="outline w-full l:w-[70%] text-[20px] p-2 rounded-[2rem] my-[1rem]"/>
        
        <div className="w-full px-[1rem] l:w-[30%]"><button className="bg-[var(---blacktext)] w-full py-3 font-thin rounded-[2rem] cursor-pointer hover:bg-[var(---hoverbtncolor)] hover:text-[var(---blacktext)]">Subscribe</button></div></div></div>
        <div className="flex space-x-2 mt-[1.5rem] mb-[1rem] px-4 items-center l:w-[60%]">
            <input type="checkbox" className="appearance-none w-[1rem] h-[1rem] outline rounded-sm checked:appearance-auto cursor-pointer"/>
            <div className="w-[70%] l:w-full text-[18px] font-thin">Yes, subscribe me to your newsletter. *</div>
        </div>
        <div className="flex items-center space-x-2 text-[14px] font-semibold w-full px-4 text-[var(---warningred)] mb-[2rem] l:w-[60%]"><RiErrorWarningLine /><div>Check the box to continue.</div>
        </div>
    </div>
    </>)
}

export default Newsletter;