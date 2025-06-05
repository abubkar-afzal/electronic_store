import Image from "next/image";
import React, { useEffect, useState } from "react";
import img1 from "./assets/img1.jpg"
import img2 from "./assets/img2.jpg"
import img3 from "./assets/img3.jpg"
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
    <div>
        <div className="sm:flex sm:flex-col sm:items-center my-4">
            <div className="bg-[var(---bestpricelabel)] inline text-[var(---whitetext)] px-2 my-2">Best Prices</div>
            <div className="sm:text-[35px] text-center font-black">Incredible Prices on All Your Favorite Items</div>
            <div className="sm:text-[16px] sm:font-thin my-2">Get more for less on selected brands</div>
            <div className=""><button className="p-3 px-6 my-4
            bg-[var(---btncolor)] text-[var(---whitetext)] rounded-[1.5rem]">Shope Now</button></div>
        </div>

    <div className="relative w-full max-w-lg h-64 overflow-hidden">
      {images.map((img, i) => (
        <Image
          key={i}
          src={img}
          alt={`Slide ${i}`}
          width={500}
          height={500}
          className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>


  </div>);
}




export default Intro;