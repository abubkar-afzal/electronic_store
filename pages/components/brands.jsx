import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
const MoonLoader = dynamic(() => import("react-spinners").then(mod => mod.MoonLoader), { ssr: false });

const Brands = ({ Brand }) => {
  const [brands, setBrands] = useState(Brand||[]);

  return (
    <>
      <div className="bg-[var(---whitetext)] relative">
        <div className="text-[25px] l:text-[35px] font-semibold text-center py-[2rem]">
          Brands
        </div>
        <div className="flex flex-col l:flex-row l:flex-wrap l:justify-center items-center py-[2rem]">
          {brands.length > 0 ? (
            brands.map((brand, index) => (
              <div
                key={brand.id || index}
                className="relative shadow w-[15rem] h-[7rem] text-center content-center text-[30px] font-black text-[var(---brandscolor)] flex items-center justify-center m-2"
              >
                {brand.image && (
                  <Image
                    src={brand.image}
                    alt="Brand"
                    width={120}
                    height={60}
                    className="object-contain mx-auto"
                  />
                )}
              </div>
            ))
          ) : (
            <div className=" inset-0 flex items-center justify-center col-span-5 bg-opacity-80 z-999">
              <div className=" p-6 rounded  text-xl font-bold flex items-center gap-2">
                <MoonLoader size={30} color="#7002ff" />
                Loading...
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Brands;
