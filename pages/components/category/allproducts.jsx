import React, { useState } from "react";
import Image from "next/image";

import img1 from "../assets/img7.jpg";
import img2 from "../assets/img5.jpg";
import img3 from "../assets/img6.jpg";
import { RxCross2, RxMinus, RxPlus } from "react-icons/rx";
import { FaMinus } from "react-icons/fa";
import Link from "next/link";

const images = [
  {
    src: img1,
    sale: true,
    name: "FaPhone",
    specification: "12gb ram",
    price: "$70.00",
    saleprice: "$65.00",
  },
  {
    src: img2,
    sale: false,
    name: "FaPhone",
    specification: "12gb ram",
    price: "$70.00",
    saleprice: "$65.00",
  },
  {
    src: img3,
    sale: true,
    name: "FaPhone",
    specification: "12gb ram",
    price: "$70.00",
    saleprice: "$65.00",
  },
];

const AllProducts = () => {
  const [filter, setfilter] = useState(false);
  const [sortbyfilter, setsortbyfilter] = useState(true);
  const [pricefilter, setpricefilter] = useState(false);
  const [minPrice, setMinPrice] = useState(50);
  const [maxPrice, setMaxPrice] = useState(100);

  const [colorfilter, setcolorfilter] = useState(false);
  const showfilter = () => {
    setfilter(!filter);
  };
  const showsortbyfilter = () => {
    setsortbyfilter(!sortbyfilter);
  };
  const showpricefilter = () => {
    setpricefilter(!pricefilter);
  };
  const showcolorfilter = () => {
    setcolorfilter(!colorfilter);
  };
  let colorofitem = "rgb(810, 58, 4)";
  return (
    <>
      <div className="mx-[1rem]">
        <div className="flex space-x-2">
          <Link href={`/`}><div className="cursor-pointer hover:font-bold font-thin">Home</div></Link>
          <div className="">&gt;</div>
          <div className="font-thin">All Products</div>
        </div>
        <div className="text-[30px] font-bold my-[1rem] ">All Products</div>
        <div className="flex justify-between font-thin">
          <div>10 Products</div>
          <div className="underline cursor-pointer my-[1rem]" onClick={showfilter}>Filter & Sort</div>
        </div>
        <div className="grid grid-cols-2 gap-4 ">
          {images.map((item, index) => (
            <div
              key={index}
              className="relative w-full flex-shrink-0 cursor-pointer bg-[var(---whitetext)]"
            >
              {item.sale ? (
                <>
                  <div className="p-0.5 px-4 bg-[var(---salelabel)] inline text-[var(---whitetext)] rounded-[1rem] m-2 font-thin ">
                    SALE
                  </div>
                </>
              ) : (
                <>
                  <div className="p-0.5 px-4 bg-[var(---whitetext)] inline text-[var(---whitetext)] rounded-[1rem] m-2 font-thin ">
                    SALE
                  </div>
                </>
              )}

              <Image
                src={item.src}
                alt={`Slide ${index}`}
                width={1020}
                height={1020}
                className="transition-transform duration-500 my-2"
              />
              <div>
                <div className="ml-4 font-thin">{item.name}</div>
                <div className="ml-4 font-thin">{item.specification}</div>
                {item.sale ? (
                  <>
                    <div className="flex flex-col text-[18px] ">
                      <div className="ml-2 font-bold text-[var(---price)]">
                        <s>{item.price}</s>
                      </div>

                      <div className="ml-2 font-bold text-[var(---price)]">
                        {item.saleprice}
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="m-2 text-[18px] font-bold text-[var(---price)]">
                      {item.price}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className={`fixed w-full h-full bg-[var(---whitetext)] top-0 duration-[2s] px-[1rem] ${
          filter ? "right-0" : " right-[-120vw]"
        } overflow-y-scroll`}
      >
        <div className="flex justify-between p-4 border-y-[1px] items-center py-[1.5rem] my-[1rem] text-[20px] font-thin">
          <div>Filter & Sort (10 products)</div>
          <div className="text-[1.5rem]">
            <RxCross2 onClick={showfilter}/>
          </div>
        </div>
        <div
          className={`p-4 border-b-[1px] duration-700 overflow-y-hidden ${sortbyfilter ? "h-[19rem]" : "h-[3.5rem] "}`}
        >
          <div
            className={`justify-between items-center  text-[20px] font-thin flex ${sortbyfilter ? "block" : "hidden"}`}
          >
            <div>Sort by:</div>
            <RxMinus onClick={showsortbyfilter} />
          </div>
          <div
          className={`justify-between items-center text-[20px] font-thin ${
            sortbyfilter ? "hidden" : "flex"
          } border-b-[1px`}
        >
          <div>Sort by:</div>
          <RxPlus onClick={showsortbyfilter} />
        </div>

          <div className="flex flex-col">
            <div className="space-x-2 my-2">
              <input type="radio" name="sort" id="rec" defaultChecked />
              <label htmlFor="rec">Recommended</label>
            </div>
            <div className="space-x-2 my-2">
              <input type="radio" name="sort" id="newest" />
              <label htmlFor="newest">Newest</label>
            </div>
            <div className="space-x-2 my-2">
              <input type="radio" name="sort" id="plth" />
              <label htmlFor="plth">Price (low to high)</label>
            </div>
            <div className="space-x-2 my-2">
              <input type="radio" name="sort" id="phtl" />
              <label htmlFor="phtl">Price (high to low)</label>
            </div>
            <div className="space-x-2 my-2">
              <input type="radio" name="sort" id="Natoz" />
              <label htmlFor="Natoz">Name A-Z</label>
            </div>
            <div className="space-x-2 my-2">
              <input type="radio" name="sort" id="Nztoa" />
              <label htmlFor="Nztoa">Name Z-A</label>
            </div>
          </div>
        </div>
        
         <div
          className={`p-4 border-b-[1px] duration-700 overflow-y-hidden ${pricefilter ? "h-[9rem]" : "h-[3.5rem] "}`}
        >
          <div
            className={`justify-between items-center  text-[20px] font-thin flex ${pricefilter ? "block" : "hidden"}`}
          >
            <div>Price (${minPrice}-${maxPrice})</div>
            <RxMinus onClick={showpricefilter} />
          </div>
          <div
          className={`justify-between items-center text-[20px] font-thin ${
            pricefilter ? "hidden" : "flex"
          } border-b-[1px`}
        >
          <div>Price (${minPrice}-${maxPrice})</div>
          <RxPlus onClick={showpricefilter} />
        </div>
          <div className="flex w-[80vw] my-[1rem]">
            <input
              type="range"
              min={minPrice}
              value={maxPrice}
              max={100}
              onChange={(e) => {
                setMaxPrice(e.target.value);
              }}
              className="w-[80vw]"
            />
          </div>
          <div className="flex justify-between w-[80vw]">
            <div>${minPrice}</div>
            <div>${maxPrice}</div>
          </div>
        </div>
        

         <div
          className={`p-4 border-b-[1px] duration-700 overflow-y-hidden ${colorfilter ? "h-[7rem]" : "h-[3.5rem] "}`}
        >
          <div
            className={`justify-between items-center  text-[20px] font-thin flex ${colorfilter ? "block" : "hidden"}`}
          >
            <div>Color</div>
            <RxMinus onClick={showcolorfilter} />
          </div>
          <div
          className={`justify-between items-center text-[20px] font-thin ${
            colorfilter ? "hidden" : "flex"
          } border-b-[1px`}
        >
          <div>Color</div>
          <RxPlus onClick={showcolorfilter} />
        </div>
          <div className="my-[1rem]">
            <div className="w-[2rem] h-[2rem] rounded-full" style={{backgroundColor:colorofitem}}>
              
            </div>
          </div>
       </div>
      
      </div>
    </>
  );
};
export default AllProducts;
