import React from "react";
import img1 from "../../public/helpcenter.jpeg";
import Image from "next/image";
import Link from "next/link";

const HelpCenter = () => {
  return (
    <>
      <div className="l:grid l:grid-cols-2  ">
        <div className="w-full  bg-[var(---blacktext)] text-[var(---whitetext)] flex flex-col items-center h-full l:justify-center l:text-center">
          <div className="text-[25px] l:text-[3vw] l:w-[40vw] l:text-justify px-4 text-center font-bold  mt-4">
            Need Help? Check Out Our Help Center
          </div>
          <div className="px-4 text-center l:text-[1.5vw] l:w-[40vw] l:text-justify font-thin my-2">
            If you need to buy any thing new or need any help or you have any
            type of conplain then contact us. We will provide our help to solve
            you problem.
          </div>
          <div className="w-full  px-[4rem]">
            
            <Link href={`/components/basic/helpcenter`}>
              <button className="p-2 l:text-[18px] l:w-[20vw]  py-3 bg-[var(---whitetext)] w-full text-[var(---btncolor)] rounded-[8px] my-4 mb-[2rem] hover:bg-[var(---btncolor)] hover:text-[var(---whitetext)] duration-[1s] cursor-pointer ">
                Go to Help Center
              </button>
            </Link>
          </div>
        </div>
        <div>
          <Image
            src={img1}
            width={1020}
            height={1020}
            alt="img"
            className="w-full h-full"
          />
        </div>
      </div>
    </>
  );
};
export default HelpCenter;
