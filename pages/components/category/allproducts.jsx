import React, { useState } from "react";
import Image from "next/image";

import img1 from "../assets/img7.jpg";
import img2 from "../assets/img5.jpg";
import img3 from "../assets/img6.jpg";
import { RxCross2 } from "react-icons/rx";

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
  const [filter, setfilter] = useState(true);
  const [sortbyfilter, setsortbyfilter] = useState(true);
  const [pricefilter, setpricefilter] = useState(true);
  const [colorfilter, setcolorfilter] = useState(true);
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
  return (
    <>
      <div className="mx-[1rem]">
        <div className="flex space-x-2">
          <div className="cursor-pointer hover:font-bold font-thin">Home</div>
          <div className="">&gt;</div>
          <div className="font-thin">All Products</div>
        </div>
        <div className="text-[30px] font-bold my-[2rem] ">All Products</div>
        <div className="flex justify-between font-thin">
          <div>10 Products</div>
          <div className="underline cursor-pointer">Filter & Sort</div>
        </div>
        <div className="grid grid-cols-2 gap-4 my-[1rem]">
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
      {filter ? (
        <>
          <div className="w-full h-full bg-[var(---whitetext)] fixed top-0">
            <div>
              <div>Filter & Sort (10 products)</div>
              <div>
                <RxCross2 />
              </div>
            </div>
            <div>
              <div>
                <div>Sort by</div>
                <div>-</div>
              </div>
              {showsortbyfilter ? (
                <>
                  <div>
                    <input type="radio" name="sort" id="rec" />
                    <label htmlFor="rec">Recommended</label>
                    <input type="radio" name="sort" id="newest" />
                    <label htmlFor="newest">Newest</label>
                    <input type="radio" name="sort" id="plth" />
                    <label htmlFor="plth">Price (low to high)</label>
                    <input type="radio" name="sort" id="phtl" />
                    <label htmlFor="phtl">Price (high to low)</label>
                    <input type="radio" name="sort" id="Natoz" />
                    <label htmlFor="Natoz">Name A-Z</label>
                    <input type="radio" name="sort" id="Nztoa" />
                    <label htmlFor="Nztoa">Name Z-A</label>
                  </div>
                </>
              ) : null}
            </div>
            <div>
              <div>
                <div>Price ($70-$80)</div>
                <div>-</div>
              </div>
              {showpricefilter ? (
                <>
                <input type="range" name="price" id="price" min={70} max={90} step={1}/>
                </>
              ) : null}
            </div>
             <div>
              <div>
                <div>Color</div>
                <div>-</div>
              </div>
              {showcolorfilter ? (
                <>
                <div className="">
                <input type="color" disabled className="rounded-[2rem] "/></div>
                </>
              ) : null}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
export default AllProducts;
