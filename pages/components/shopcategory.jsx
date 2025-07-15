import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import img1 from "../../public/allproducts.png";
import img2 from "../../public/computer.png";
import img3 from "../../public/tablet.png";
import img4 from "../../public/drone.png";
import img5 from "../../public/speakers.png";
import img6 from "../../public/mobile.png";
import img7 from "../../public/tv.png";
import img8 from "../../public/wearable.png";
import img9 from "../../public/sale.png";
import img10 from "../../public/bestseller.jpeg";

const ShopeCategory = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      label: "All Products",
      img: img1,
      link: "/components/category/allproducts",
      bg: "bg-[var(---pagecolor)]",
    },
    {
      id: 2,
      label: "Computers",
      img: img2,
      link: "/components/category/computers",
      bg: "bg-[var(---pagecolor)]",
    },
    {
      id: 3,
      label: "Tablets",
      img: img3,
      link: "/components/category/tablets",
      bg: "bg-[var(---pagecolor)]",
    },
    {
      id: 4,
      label: "Drones & Cameras",
      img: img4,
      link: "/components/category/drones&cameras",
      bg: "bg-[var(---pagecolor)]",
    },
    {
      id: 5,
      label: "Head Phones & Speakers",
      img: img5,
      link: "/components/category/headphones&speakers",
      bg: "bg-[var(---pagecolor)]",
    },
    {
      id: 6,
      label: "Mobiles",
      img: img6,
      link: "/components/category/mobiles",
      bg: "bg-[var(---pagecolor)]",
    },
    {
      id: 7,
      label: "T.V & Home Cinema",
      img: img7,
      link: "/components/category/tv&homecinema",
      bg: "bg-[var(---pagecolor)]",
    },
    {
      id: 8,
      label: "Wearable Tech",
      img: img8,
      link: "/components/category/wearabletech",
      bg: "bg-[var(---pagecolor)]",
    },
    {
      id: 9,
      label: "Sale",
      img: img9,
      link: "/components/category/Sale",
      bg: "bg-[var(---btncolor)]",
    },
    {
      id: 10,
      label: "Best Seller",
      img: img10,
      link: "/components/category/bestseller",
      bg: "bg-[var(---whitetext)]",
    },
  ]);

  return (
    <>
      <div className="bg-[var(---whitetext)] py-[2rem] mb-[1rem] relative">
        <div className="text-[25px] l:text-[35px] font-semibold text-center my-[2rem]">
          Shope by Category
        </div>
        <div className="flex flex-col l:grid l:grid-cols-5 t:grid t:grid-cols-3 t:gap-[1rem] items-center">
          {categories.map((item, index) => (
            <div key={item.id || index} className="relative">
              <Link href={item.link}>
                <div className="flex flex-col items-center my-[2rem] cursor-pointer">
                  <div
                    className={`l:w-[10rem] l:h-[10rem] ll:w-[15rem] ll:h-[15rem] ${item.bg} rounded-full overflow-hidden p-4`}
                  >
                    <Image
                      src={item.img}
                      width={1020}
                      height={1020}
                      alt="img"
                      className="transition-transform duration-500 my-2 hover:scale-102 hover:duration-500 hover:ease-in-out rounded-[1rem] w-full h-auto"
                    />
                  </div>
                  <div className="font-bold my-2">{item.label}</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShopeCategory;
