import Image from "next/image";
import React from "react";
import img1 from "../../public/scoter.png";
import img2 from "../../public/shipping.png";
import img3 from "../../public/low-price.png";
import img4 from "../../public/clock.png";

const Services = () => {
  return (
    <>
      <div className="w-full p-4 t:py-[3rem] t:px-[2rem] h-[100%] bg-[var(---whitetext)] my-[1rem] flex flex-wrap">
        <div className="flex flex-col t:flex-row items-center t:justify-center my-[3rem] t:my-0 space-y-4 t:space-y-0 w-1/2 t:w-1/4">
          <Image
            src={img1}
            width={1020}
            height={1020}
            alt="img"
            className="w-[40%] h-[35%] t:w-[17%] t:h-auto"
          />
          <div className="w-[50%] t:ml-2  text-center text-[16px] t:text-[1.5vw] t:w-[50%]  font-bold">
            Curb-side pickup
          </div>
        </div>
        <div className="flex flex-col t:flex-row items-center t:justify-center my-[3rem] t:my-0 space-y-4 t:space-y-0 w-1/2 t:w-1/4">
          <Image
            src={img2}
            width={1020}
            height={1020}
            alt="img"
            className="w-[40%] h-[35%] t:w-[15%] t:h-auto mx-4"
          />
          <div className="text-center text-[16px] t:text-[1.5vw] t:w-[50%] font-bold">
            Free shiping on orders over $50
          </div>
        </div>
        <div className="flex flex-col t:flex-row items-center t:justify-center my-[3rem] t:my-0 space-y-4 t:space-y-0 w-1/2 t:w-1/4">
          <Image
            src={img3}
            width={1020}
            height={1020}
            alt="img"
            className="w-[30%] h-[35%] t:w-[10%] t:h-auto"
          />
          <div className=" text-center text-[16px] t:text-[1.5vw] t:w-[50%]  t:ml-2 font-bold">
            Low prices guaranted
          </div>
        </div>
        <div className="flex flex-col t:flex-row items-center t:justify-center my-[3rem] t:my-0 space-y-4 t:space-y-0 w-1/2 t:w-1/4">
          <Image
            src={img4}
            width={1020}
            height={1020}
            alt="img"
            className="w-[30%] h-[35%] t:w-[12%] t:h-auto"
          />
          <div className=" text-center text-[16px] t:text-[1.5vw] t:w-[50%]  t:ml-2 font-bold">
            Avaliable to you 24/7
          </div>
        </div>
      </div>
    </>
  );
};

export default Services;
