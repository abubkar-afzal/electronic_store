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

const Footer = () => {
  return (
    <>
      <div className="bg-[var(---whitetext)]">
        <div className="flex flex-col items-center px-[4rem] py-[2rem]">
          <div className="text-[18px] font-bold my-[1rem]">Store Location</div>
          <div className="font-thin text-center my-1 cursor-pointer">
            500 Japan Bara Market, Shah Allam Market, Lahore, Punjab, Pakisatn
            54000
          </div>
          <div className="font-thin text-center my-1 cursor-pointer">
            arcodes504@gmail.com
          </div>
          <div className="font-thin text-center my-1 cursor-pointer">
            +923270972423
          </div>
          <div className="flex text-[20px] space-x-4 mt-[2rem]">
            <FaFacebookF className="cursor-pointer" />
            <FaInstagram className="cursor-pointer" />
            <FaTwitter className="cursor-pointer" />
            <FaYoutube className="cursor-pointer" />
          </div>
        </div>
        <div className="flex flex-col items-center px-[4rem] py-[2rem]">
          <div className="text-[18px] font-bold my-[1rem]">
            Customer Support
          </div>
          <div className="font-thin text-center my-1 cursor-pointer">
            Contact Us
          </div>
          <div className="font-thin text-center my-1 cursor-pointer">
            Help Center
          </div>
          <div className="font-thin text-center my-1 cursor-pointer">
            About Us
          </div>
          <div className="font-thin text-center my-1 cursor-pointer ">
            Careers
          </div>
        </div>
        <div className="flex flex-col items-center px-[4rem] pt-[2rem]">
          <div className="text-[18px] font-bold my-[1rem]">Policy</div>
          <div className="font-thin text-center my-1 cursor-pointer">
            Shipping & Returns
          </div>
          <div className="font-thin text-center my-1 cursor-pointer">
            Terms & Conditions
          </div>
          <div className="font-thin text-center my-1 cursor-pointer">
            Payment Methods
          </div>
          <div className="font-thin text-center my-1 cursor-pointer ">FAQ</div>
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
              className="w-1/8 m-4"
            />
            <Image
              src={master}
              width={1020}
              height={1020}
              alt="visa"
              className="w-1/8 m-4"
            />
            <Image
              src={american}
              width={1020}
              height={1020}
              alt="visa"
              className="w-1/8 m-4"
            />
            <Image
              src={unionpay}
              width={1020}
              height={1020}
              alt="visa"
              className="w-1/8 m-4"
            />
            <Image
              src={UCB}
              width={1020}
              height={1020}
              alt="visa"
              className="w-1/8 m-4"
            />
            <Image
              src={discover}
              width={1020}
              height={1020}
              alt="visa"
              className="w-1/8 m-4"
            />
            <Image
              src={paypal}
              width={1020}
              height={1020}
              alt="visa"
              className="w-1/8 m-4"
            />

          </div>
          <div className="w-full px-5 py-2 pr-[5rem] text-[12px] font-thin bg-[var(---pagecolor)] mt-[1rem] ">@2025 by AR Codes. Powered and secured by Hafiz Abubakar Afzal</div>
        </div>
      </div>
    </>
  );
};
export default Footer;
