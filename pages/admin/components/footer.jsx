import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import visa from "./assets/visa.png";
import master from "./assets/master.png";
import american from "./assets/american.png";
import unionpay from "./assets/unionpay.png";
import UCB from "./assets/UCB.png";
import discover from "./assets/discover.png";
import paypal from "./assets/paypal.png";
import Image from "next/image";
import Link from "next/link";

const AdminFooter = () => {
  return (
    <>
      <div className="bg-[var(---whitetext)]">
        <div className="l:grid l:grid-cols-4 l:gap-[1rem] ">
          <div className="flex flex-col items-center px-[4rem] py-[2rem]">
            <div className="text-[18px] font-bold my-[1rem]">
              Store Location
            </div>
            <div className="font-thin text-center my-1 cursor-pointer l:w-[50%] l:text-left">
              500 Japan Bara Market, Shah Allam Market, Lahore, Punjab, Pakisatn
              54000
            </div>
            <div className="font-thin text-center my-1 cursor-pointer l:w-[50%] l:text-left">
              arcodes504@gmail.com
            </div>
            <div className="font-thin text-center my-1 cursor-pointer l:w-[50%] l:text-left">
              +923270972423
            </div>
            <div className="flex text-[20px] space-x-4 mt-[2rem]">
              <FaFacebookF className="cursor-pointer" />
              <FaInstagram className="cursor-pointer" />
              <FaTwitter className="cursor-pointer" />
              <FaYoutube className="cursor-pointer" />
            </div>
          </div>
          <div className="l:flex sm:hidden  flex-col items-center px-[4rem] py-[2rem]">
            <div className="text-[18px] font-bold my-[1rem] l:w-[50%] l:text-left">
              Shope
            </div>
            <Link href={`/components/category/allproducts`} className="font-thin text-center my-1 cursor-pointer l:w-[50%] l:text-left hover:text-[var(---btncolor)]"><div>
              All Products
            </div></Link>
            <Link href={`/components/category/computers`} className="font-thin text-center my-1 cursor-pointer l:w-[50%] l:text-left hover:text-[var(---btncolor)]"><div>
              Computers
            </div></Link>
            <Link href={`/components/category/tablets`} className="font-thin text-center my-1 cursor-pointer l:w-[50%] l:text-left hover:text-[var(---btncolor)]"><div>
              Tablets
            </div></Link>
            <Link href={`/components/category/drones&cameras`} className="font-thin text-center my-1 cursor-pointer l:w-[50%] l:text-left hover:text-[var(---btncolor)]"><div>
              Drones & Cameras
            </div></Link>
            <Link href={`/components/category/headphones&speakers`} className="font-thin text-center my-1 cursor-pointer l:w-[50%] l:text-left hover:text-[var(---btncolor)]"><div>
              Headphones & Speakers
            </div></Link>
            <Link href={`/components/category/mobiles`} className="font-thin text-center my-1 cursor-pointer l:w-[50%] l:text-left hover:text-[var(---btncolor)]"><div>
              Mobiles
            </div></Link>
            <Link href={`/components/category/tv&homecinema`} className="font-thin text-center my-1 cursor-pointer l:w-[50%] l:text-left hover:text-[var(---btncolor)]"><div>
              T.V & Home Cinema
            </div></Link>
            <Link href={`/components/category/wearabletech`} className="font-thin text-center my-1 cursor-pointer l:w-[50%] l:text-left hover:text-[var(---btncolor)]"><div>
              Wearable Tech
            </div></Link>
            <Link href={`/components/category/sale`} className="font-thin text-center my-1 cursor-pointer l:w-[50%] l:text-left hover:text-[var(---btncolor)]"><div>
              Sale
            </div></Link>
            <Link href={`/components/category/bestseller`} className="font-thin text-center my-1 cursor-pointer l:w-[50%] l:text-left hover:text-[var(---btncolor)]"><div>
              Best Seller
            </div></Link>
          </div>
          <div className="flex flex-col items-center px-[4rem] py-[2rem]">
            <div className="text-[18px] font-bold my-[1rem] l:w-[80%] l:text-left">
              Customer Support
            </div>
            <div className="font-thin text-center my-1 cursor-pointer l:w-[50%] l:text-left">
              Contact Us
            </div>
            <div className="font-thin text-center my-1 cursor-pointer l:w-[50%] l:text-left">
              Help Center
            </div>
            <div className="font-thin text-center my-1 cursor-pointer l:w-[50%] l:text-left">
              About Us
            </div>
            <div className="font-thin text-center my-1 cursor-pointer l:w-[50%] l:text-left ">
              Careers
            </div>
          </div>
          <div className="flex flex-col items-center px-[4rem] pt-[2rem]">
            <div className="text-[18px] font-bold my-[1rem] l:w-[50%] l:text-left">
              Policy
            </div>
            <div className="font-thin text-center my-1 cursor-pointer l:w-[50%] l:text-left">
              Shipping & Returns
            </div>
            <div className="font-thin text-center my-1 cursor-pointer l:w-[50%] l:text-left">
              Terms & Conditions
            </div>
            <div className="font-thin text-center my-1 cursor-pointer l:w-[50%] l:text-left">
              Payment Methods
            </div>
            <div className="font-thin text-center my-1 cursor-pointer l:w-[50%] l:text-left ">
              FAQ
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center py-[2rem]">
          <div className="font-thin text-[14px] text-center my-1 cursor-pointer border-t-1 border-[var(---pagecolor)] pt-[4rem] ">
            We accept the following paying methods
          </div>
          <div className="flex flex-wrap px-2 items-center pt-[1rem] justify-center">
            <Image
              src={visa}
              width={1020}
              height={1020}
              alt="visa"
              className="w-1/8 l:w-1/36 m-4 l:mx-[3rem]"
            />
            <Image
              src={master}
              width={1020}
              height={1020}
              alt="visa"
              className="w-1/8 l:w-1/36 m-4 l:mx-[3rem]"
            />
            <Image
              src={american}
              width={1020}
              height={1020}
              alt="visa"
              className="w-1/8 l:w-1/36 m-4 l:mx-[3rem]"
            />
            <Image
              src={unionpay}
              width={1020}
              height={1020}
              alt="visa"
              className="w-1/8 l:w-1/36 m-4 l:mx-[3rem]"
            />
            <Image
              src={UCB}
              width={1020}
              height={1020}
              alt="visa"
              className="w-1/8 l:w-1/36 m-4 l:mx-[3rem]"
            />
            <Image
              src={discover}
              width={1020}
              height={1020}
              alt="visa"
              className="w-1/8 l:w-1/36 m-4 l:mx-[3rem]"
            />
            <Image
              src={paypal}
              width={1020}
              height={1020}
              alt="visa"
              className="w-1/8 l:w-1/36 m-4 l:mx-[3rem]"
            />
          </div>
          <div className="w-full px-5 py-2 pr-[5rem] text-[12px] font-thin bg-[var(---pagecolor)] mt-[1rem] l:text-[16px] l:text-center">
            @2025 by AR Codes. Powered and secured by Hafiz Abubakar Afzal
          </div>
        </div>
      </div>
    </>
  );
};
export default AdminFooter;
