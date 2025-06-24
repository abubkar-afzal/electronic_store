import Image from "next/image";
import React, { useEffect, useState } from "react";
import img1 from "./assets/img1.jpg"
import img2 from "./assets/img2.jpg"
import img3 from "./assets/img3.jpg"
import Link from "next/link";
const images = [img1,img2,img3];

const Intro =()=>{
 const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="l:relative">
        <div className="sm:flex sm:flex-col l:absolute l:z-20 sm:items-center l:items-start l:left-40 l:top-[15vh] my-4">
            <div className="bg-[var(---bestpricelabel)] inline text-[var(---whitetext)] px-2 my-2 l:text-[22px]">Best Prices</div>
            <div className="sm:text-[35px] l:text-[50px] l:w-[30vw] l:text-left text-center font-black">Incredible Prices on All Your Favorite Items</div>
            <div className="sm:text-[16px] l:text-[20px] sm:font-thin my-2">Get more for less on selected brands</div>
            <div className="">
             <Link href={`/components/category/allproducts`}> <button className="p-3 px-6 my-4
            bg-[var(---btncolor)] cursor-pointer l:text-[20px] l:py-[1.2rem] l:px-[3rem] text-[var(---whitetext)] rounded-[1.5rem]">Shope Now</button></Link>
            
            </div>
        </div>

    <div className="relative w-full max-w-lg l:max-w-full h-64 l:h-[100vh]  overflow-hidden">
      {images.map((img, i) => (
        <Image
          key={i}
          src={img}
          alt={`Slide ${i}`}
          width={1200}
          height={1200}
          className={`absolute l:block w-full h-full object-cover l:object-fill transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>


  </div>);
}




export default Intro;