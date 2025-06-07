import React, { useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";

const Navbar = () => {
  const [mobilemenu, setmonbilemenu] = useState(false);
  const showmenu = () => {
    setmonbilemenu(!mobilemenu);
  };
  let count = 1;
  return (
    <>
      <div className="sm:h-[10vh] w-full bg-[var(---navbar)]">
        <div className="flex sm:h-[10vh] justify-between px-2 sm:text-[22px] place-items-center">
          <div className="font-black cursor-pointer">AR Codes</div>
          <div className="flex items-center space-x-2 text-[1.6rem]">
            <div className="cursor-pointer">
              <IoIosSearch />
            </div>
            <div className="cursor-pointer">
              <AiOutlineShoppingCart />
            </div>
            <div className="sm:text-[10px] bg-black text-white font-thin sm:w-[15px] sm:absolute right-7 top-4 text-center rounded-[20px]">
              {count}
            </div>
            <div className="cursor-pointer" onClick={showmenu}>
              <RxHamburgerMenu />
            </div>
          </div>
        </div>
      </div>
      {mobilemenu ? (
        <div className="fixed top-0 w-full h-full bg-[var(---mobilemenu)] sm:text-[18px] p-3 overflow-y-scroll z-10">
          <div
            className="text-[30px] place-self-end my-1 cursor-pointer"
            onClick={showmenu}
          >
            <RxCross2 />
          </div>
          <div className="flex items-center space-x-2 my-2 cursor-pointer">
            <div>Login</div>
            <div className="text-[22px]">
              <FaUserCircle />
            </div>
          </div>
          <div className="flex justify-between text-[14px] my-4">
            <div className="underline cursor-pointer">About</div>
            <div className="underline cursor-pointer">Contact</div>
            <div className="underline cursor-pointer">Help Center</div>
          </div>
          <div className="flex text-[15px] my-4 mb-[2rem] cursor-pointer">
            Call Us <p className=" mx-1 underline ">+923270972423</p>
          </div>
          <Link
            href={`/components/category/allproducts`} 
          >
            <div
              onClick={() => {
                setmonbilemenu(false);
              }}
              className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer "
            >
              All Items
            </div>
          </Link>
          <Link
            href={`/components/category/computers`} 
          >
            <div
              onClick={() => {
                setmonbilemenu(false);
              }}
              className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
            >
              Computers
            </div>
          </Link>
          <Link
            href={`/components/category/tablets`} 
          >
            <div
              onClick={() => {
                setmonbilemenu(false);
              }}
              className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
            >
              Tablets
            </div>
          </Link>
          <Link
            href={`/components/category/drones&cameras`} 
          >
            <div
              onClick={() => {
                setmonbilemenu(false);
              }}
              className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
            >
              Drones & Cameras
            </div>
          </Link>
          <Link
            href={`/components/category/headphones&speakers`} 
          >
            <div
              onClick={() => {
                setmonbilemenu(false);
              }}
              className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
            >
              Head Phones & Speakers
            </div>
          </Link>
          <Link
            href={`/components/category/mobiles`} 
          >
            <div
              onClick={() => {
                setmonbilemenu(false);
              }}
              className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
            >
              Mobiles
            </div>
          </Link>
          <Link
            href={`/components/category/tv&homecinema`} 
          >
            <div
              onClick={() => {
                setmonbilemenu(false);
              }}
              className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
            >
              T.V & Home Cinema
            </div>
          </Link>
          <Link
            href={`/components/category/wearabletech`} 
          >
            <div
              onClick={() => {
                setmonbilemenu(false);
              }}
              className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
            >
              Wearable Tech
            </div>
          </Link>
          <Link
            href={`/components/category/sale`} 
          >
            <div
              onClick={() => {
                setmonbilemenu(false);
              }}
              className="text-center my-2 text-[16px] py-2 cursor-pointer"
            >
              Sale
            </div>
          </Link>
        </div>
      ) : null}
    </>
  );
};
export default Navbar;
