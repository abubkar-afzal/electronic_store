import Image from "next/image";
import React from "react";
import img1 from "./assets/img1.jpg";
import img2 from "./assets/img2.jpg";
import img3 from "./assets/img3.jpg";
import img4 from "./assets/img4.jpg";
import img5 from "./assets/img5.jpg";
import img6 from "./assets/img6.jpg";
import img7 from "./assets/img7.jpg";
import img8 from "./assets/img8.jpg";
import img9 from "./assets/img9.jpg";
import Link from "next/link";

const ShopeCategory = () => {
  return (
    <>
      <div className="bg-[var(---whitetext)] py-[2rem] mb-[1rem]">
        <div className="text-[25px] l:text-[35px] font-semibold text-center my-[2rem]">
          Shope by Category
        </div>
        <div className="flex flex-col l:grid l:grid-cols-5 l:gap-[1rem] items-center">
          <Link href={`/components/category/computers`}>
            <div className="flex flex-col items-center my-[2rem] cursor-pointer">
              <div className="w-[15rem] h-[15rem] bg-[var(---pagecolor)] rounded-full overflow-hidden p-4">
                <Image
                  src={img1}
                  width={1020}
                  height={1020}
                  alt="img"
                  className="transition-transform duration-500 my-2 hover:scale-102 hover:duration-500 hover:ease-in-out rounded-[1rem] w-full h-auto"
                />
              </div>
              <div className="font-bold my-2">Computers</div>
            </div>
          </Link>
          <Link href={`/components/category/mobiles`}>
            <div className="flex flex-col items-center my-[2rem] cursor-pointer ">
              <div className="w-[15rem] h-[15rem] bg-[var(---pagecolor)] rounded-full overflow-hidden p-4">
                <Image
                  src={img2}
                  width={1020}
                  height={1020}
                  alt="img"
                  className="transition-transform duration-500 my-2 hover:scale-102 hover:duration-500 hover:ease-in-out rounded-[1rem] w-full h-auto"
                />
              </div>
              <div className="font-bold my-2">Mobiles</div>
            </div>
          </Link>{" "}
          <Link href={`/components/category/drones&cameras`}>
            <div className="flex flex-col items-center my-[2rem] cursor-pointer">
              <div className="w-[15rem] h-[15rem] bg-[var(---pagecolor)] rounded-full overflow-hidden p-4">
                <Image
                  src={img3}
                  width={1020}
                  height={1020}
                  alt="img"
                  className="transition-transform duration-500 my-2 hover:scale-102 hover:duration-500 hover:ease-in-out rounded-[1rem] w-full h-auto"
                />
              </div>
              <div className="font-bold my-2">Drones & Cameras</div>
            </div>
          </Link>{" "}
          <Link href={`/components/category/sale`}>
            <div className="flex flex-col items-center my-[2rem] cursor-pointer">
              <div className="w-[15rem] h-[15rem] bg-[var(---btncolor)] rounded-full overflow-hidden p-4">
                <Image
                  src={img4}
                  width={1020}
                  height={1020}
                  alt="img"
                  className="transition-transform duration-500 my-2 hover:scale-102 hover:duration-500 hover:ease-in-out rounded-[1rem] w-full h-auto"
                />
              </div>
              <div className="font-bold my-2">Sale</div>
            </div>
          </Link>{" "}
          <Link href={`/components/category/tablets`}>
            <div className="flex flex-col items-center my-[2rem] cursor-pointer">
              <div className="w-[15rem] h-[15rem] bg-[var(---pagecolor)] rounded-full overflow-hidden p-4">
                <Image
                  src={img5}
                  width={1020}
                  height={1020}
                  alt="img"
                  className="transition-transform duration-500 my-2 hover:scale-102 hover:duration-500 hover:ease-in-out rounded-[1rem] w-full h-auto"
                />
              </div>
              <div className="font-bold my-2">Tablets</div>
            </div>
          </Link>{" "}
          <Link href={`/components/category/bestseller`}>
            <div className="flex flex-col items-center my-[2rem] cursor-pointer">
              <div className="w-[15rem] h-[15rem] bg-[var(---blacktext)] rounded-full overflow-hidden p-4">
                <Image
                  src={img6}
                  width={1020}
                  height={1020}
                  alt="img"
                  className="transition-transform duration-500 my-2 hover:scale-102 hover:duration-500 hover:ease-in-out rounded-[1rem] w-full h-auto"
                />
              </div>
              <div className="font-bold my-2">Best Sellers</div>
            </div>
          </Link>{" "}
          <Link href={`/components/category/tv&homecinema`}>
            <div className="flex flex-col items-center my-[2rem] cursor-pointer">
              <div className="w-[15rem] h-[15rem] bg-[var(---pagecolor)] rounded-full overflow-hidden p-4">
                <Image
                  src={img7}
                  width={1020}
                  height={1020}
                  alt="img"
                  className="transition-transform duration-500 my-2 hover:scale-102 hover:duration-500 hover:ease-in-out rounded-[1rem] w-full h-auto"
                />
              </div>
              <div className="font-bold my-2">T.V & Home Cinema</div>
            </div>
          </Link>
          <Link href={`/components/category/wearabletech`}>
            <div className="flex flex-col items-center my-[2rem] cursor-pointer">
              <div className="w-[15rem] h-[15rem] bg-[var(---pagecolor)] rounded-full overflow-hidden p-4">
                <Image
                  src={img8}
                  width={1020}
                  height={1020}
                  alt="img"
                  className="transition-transform duration-500 my-2 hover:scale-102 hover:duration-500 hover:ease-in-out rounded-[1rem] w-full h-auto"
                />
              </div>
              <div className="font-bold my-2">Wearable Tech</div>
            </div>
          </Link>
          <Link href={`/components/category/headphones&speakers`}>
            <div className="flex flex-col items-center my-[2rem] cursor-pointer">
              <div className="w-[15rem] h-[15rem] bg-[var(---pagecolor)] rounded-full overflow-hidden p-4">
                <Image
                  src={img9}
                  width={1020}
                  height={1020}
                  alt="img"
                  className="transition-transform duration-500 my-2 hover:scale-102 hover:duration-500 hover:ease-in-out rounded-[1rem] w-full h-auto"
                />
              </div>
              <div className="font-bold my-2">Headphones & Speakers</div>
            </div>
          </Link>
          <Link href={`/components/category/allproducts`}>
            <div className="flex flex-col items-center my-[2rem] cursor-pointer">
              <div className="w-[15rem] h-[15rem] bg-[var(---pagecolor)] rounded-full overflow-hidden p-4">
                <Image
                  src={img1}
                  width={1020}
                  height={1020}
                  alt="img"
                  className="transition-transform duration-500 my-2 hover:scale-102 hover:duration-500 hover:ease-in-out rounded-[1rem] w-full h-auto"
                />
              </div>
              <div className="font-bold my-2">All Products</div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};
export default ShopeCategory;
