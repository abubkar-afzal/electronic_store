import Image from "next/image";
import React from "react";
import img from "../assets/img5.jpg";
import { RiErrorWarningLine } from "react-icons/ri";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Newsletter from "../newsletter";

const Contact = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center p-4 bg-[var(---whitetext)]">
        <div className="w-[80vw] pb-[2rem] text-center text-[2rem] font-sans font-bold border-b-[1px]">
          Get in Touch
        </div>
        <div className="l:grid l:grid-cols-2 l:gap-[2rem] l:px-[2rem]">
          <div>
            <div className="my-[2rem]  py-[1rem]">
              <div className="text-center my-[1rem] mt-[2rem] text-[20px] font-bold l:text-[25px]">
                We're here to help!
              </div>
              <div className="text-center mb-[2rem] l:text-[18px]">
                Fill out the form with any query on your mind and we'll get back
                to you as soon as possible.
              </div>
            </div>

            <form action="post" className="w-full l:grid l:grid-cols-4 l:gap-[1rem] l:text-[18px]">
              <div className="px-[1rem] my-[1rem] l:col-start-1 l:col-end-3">
                <div htmlFor="FirstName" className="font-thin">
                  First Name*
                </div>
                <input
                  type="text"
                  id="FirstName"
                  name="FirstName"
                  required
                  className="border-b-[2px] w-full h-[3rem] appearance-none focus:outline-none border-[var(---inputborder)] hover:border-[var(---inputhoverborder)]"
                />
                <div className="flex items-center text-[var(---error)] mt-[0.5rem] text-[14px]">
                  <RiErrorWarningLine className="m-2" />
                  <div>Enter a first name.</div>
                </div>
              </div>
              <div className="px-[1rem] my-[1rem] l:col-start-3 l:col-end-5">
                <div htmlFor="LastName" className="font-thin">
                  Last Name*
                </div>
                <input
                  type="text"
                  id="LastName"
                  name="LastName"
                  required
                  className="border-b-[2px] w-full h-[3rem] appearance-none focus:outline-none border-[var(---inputborder)] hover:border-[var(---inputhoverborder)]"
                />
                <div className="flex items-center text-[var(---error)] mt-[0.5rem] text-[14px]">
                  <RiErrorWarningLine className="m-2" />
                  <div>Enter a last name.</div>
                </div>
              </div>
              <div className="px-[1rem] my-[1rem] l:col-start-1 l:col-end-3">
                <div htmlFor="Email" className="font-thin">
                  Email*
                </div>
                <input
                  type="email"
                  id="Email"
                  name="Email"
                  required
                  className="border-b-[2px] w-full h-[3rem] appearance-none focus:outline-none border-[var(---inputborder)] hover:border-[var(---inputhoverborder)]"
                />
                <div className="flex items-center text-[var(---error)] mt-[0.5rem] text-[14px]">
                  <RiErrorWarningLine className="m-2" />
                  <div>Enter a email.</div>
                </div>
              </div>
              <div className="px-[1rem] my-[1rem] l:col-start-3 l:col-end-5">
                <div htmlFor="Subject" className="font-thin">
                  Subject*
                </div>
                <input
                  type="text"
                  id="Subject"
                  name="Subject"
                  required
                  className="border-b-[2px] w-full h-[3rem] appearance-none focus:outline-none border-[var(---inputborder)] hover:border-[var(---inputhoverborder)]"
                />
                <div className="flex items-center text-[var(---error)] mt-[0.5rem] text-[14px]">
                  <RiErrorWarningLine className="m-2" />
                  <div>Enter your Subject.</div>
                </div>
              </div>
              <div className="px-[1rem] my-[1rem] l:col-start-1 l:col-end-5">
                <div htmlFor="Resume" className="font-thin">
                  Leave us a message...
                </div>
                <textarea
                  type="text"
                  id="Resume"
                  name="Resume"
                  required
                  className="border-b-[2px] w-full h-[6rem] appearance-none focus:outline-none border-[var(---inputborder)] hover:border-[var(---inputhoverborder)]"
                />
                <div className="flex items-center text-[var(---error)] mt-[0.5rem] text-[14px]">
                  <RiErrorWarningLine className="m-2" />
                  <div>Give your resume link.</div>
                </div>
              </div>
              <div className="px-[1rem] my-[1rem] l:col-start-1 l:col-end-3 l:content-center">
                <button
                  id="submit"
                  className="w-full rounded-[2rem] bg-[var(---btncolor)] p-2 text-[var(---whitetext)] font-thin hover:bg-[var(---whitetext)] hover:border-[var(---btncolor)] hover:text-[var(---btncolor)] hover:border-[1px] cursor-pointer duration-[1s]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div>
            <div className="flex flex-col items-center px-[4rem] py-[2rem] l:my-[2rem]">
              <div className="text-[18px] font-bold my-[1rem] l:text-[22px]">
                Store Location
              </div>
              <div className="font-thin text-center my-1 cursor-pointer l:text-[18px]">
                500 Japan Bara Market, Shah Allam Market, Lahore, Punjab,
                Pakisatn 54000
              </div>
              <div className="font-thin text-center my-1 cursor-pointer l:text-[18px]">
                arcodes504@gmail.com
              </div>
              <div className="font-thin text-center my-1 cursor-pointer l:text-[18px]">
                +923270972423
              </div>
            </div>
            <div className="flex flex-col items-center px-[4rem] py-[2rem]">
              <div className="text-[18px] font-bold my-[1rem] l:text-[22px]">
                Opening Hours
              </div>
              <div className="text-[13px] font-thin text-center my-1 cursor-pointer l:text-[16px]">
                Mon - Fri: 8:00 AM - 8:00 PM
              </div>
              <div className="text-[13px] font-thin text-center my-1 cursor-pointer l:text-[16px]">
                Saturday: 9:00 AM - 7:00 PM
              </div>
              <div className="text-[13px] font-thin text-center my-1 cursor-pointer l:text-[16px]">
                Sunday: Closed
              </div>
            </div>
          </div>
        </div>
      </div>
      <Newsletter />
    </>
  );
};
export default Contact;
