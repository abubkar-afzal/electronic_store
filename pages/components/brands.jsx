import React from "react";

const Brands = ()=>{
    return(<>
    <div className="bg-[var(---whitetext)]">
        <div className="text-[25px] l:text-[35px] font-semibold text-center py-[2rem]">Brands</div>
        <div className="flex flex-col l:flex-row l:flex-wrap l:justify-center items-center py-[2rem]">
            <div className=" shadow  w-[15rem] h-[7rem] text-center content-center text-[30px] font-black text-[var(---brandscolor)]">ZODIAC</div>
            <div className=" shadow  w-[15rem] h-[7rem] text-center content-center text-[30px] font-black text-[var(---brandscolor)]">Zoro</div><div className=" shadow  w-[15rem] h-[7rem] text-center content-center text-[30px] font-black text-[var(---brandscolor)]">PIK</div><div className=" shadow  w-[15rem] h-[7rem] text-center content-center text-[30px] font-black text-[var(---brandscolor)]">GXL</div><div className=" shadow  w-[15rem] h-[7rem] text-center content-center text-[30px] font-black text-[var(---brandscolor)]">HORIZON</div>
        </div>
    </div>
    </>)
}
export default Brands;