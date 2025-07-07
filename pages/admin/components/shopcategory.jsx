import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import img1 from "./assets/img1.jpg";
import img2 from "./assets/img2.jpg";
import img3 from "./assets/img3.jpg";
import img4 from "./assets/img4.jpg";
import img5 from "./assets/img5.jpg";
import img6 from "./assets/img6.jpg";
import img7 from "./assets/img7.jpg";
import img8 from "./assets/img8.jpg";
import img9 from "./assets/img9.jpg";
import img10 from "./assets/img1.jpg";
// Remove static images and initialCategories, use API instead

const ShopeCategory = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      label: "All Products",
      img: img1,
      link: "/admin/components/category/allproducts",
      bg: "bg-[var(---pagecolor)]"
    },{id: 2,
      label: "Computers",
      img: img2,
      link: "/admin/components/category/computers",
      bg: "bg-[var(---pagecolor)]"},{id: 3,
      label: "Tablets",
      img: img3,
      link: "/admin/components/category/tablets",
      bg: "bg-[var(---pagecolor)]"},{id: 4,
      label: "Drones & Cameras",
      img: img4,
      link: "/admin/components/category/drones&cameras",
      bg: "bg-[var(---pagecolor)]"},{id: 5,
      label: "Head Phones & Speakers",
      img: img5,
      link: "/admin/components/category/headphones&speakers",
      bg: "bg-[var(---pagecolor)]"},{id: 6,
      label: "Mobiles",
      img: img6,
      link: "/admin/components/category/mobiles",
      bg: "bg-[var(---pagecolor)]"},{id: 7,
      label: "T.V & Home Cinema",
      img: img7,
      link: "/admin/components/category/tv&homecinema",
      bg: "bg-[var(---pagecolor)]"},{id: 8,
      label: "Wearable Tech",
      img: img8,
      link: "/admin/components/category/wearabletech",
      bg: "bg-[var(---pagecolor)]"},{id: 9,
      label: "Sale",
      img: img9,
      link: "/admin/components/category/Sale",
      bg: "bg-[var(---pagecolor)]"},{id: 10,
      label: "Best Seller",
      img: img10,
      link: "/admin/components/category/bestseller",
      bg: "bg-[var(---pagecolor)]"}
  ]);


  return (
    <>
      <div className="bg-[var(---whitetext)] py-[2rem] mb-[1rem] relative">
        
        <div className="text-[25px] l:text-[35px] font-semibold text-center my-[2rem]">
          Shope by Category
        </div>
        <div className="flex flex-col l:grid l:grid-cols-5 l:gap-[1rem] items-center">
          {categories.map((item, index) => (
            <div key={item.id || index} className="relative">
              
             
              <Link href={item.link}>
                <div className="flex flex-col items-center my-[2rem] cursor-pointer">
                  <div
                    className={`w-[15rem] h-[15rem] ${item.bg} rounded-full overflow-hidden p-4`}
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
