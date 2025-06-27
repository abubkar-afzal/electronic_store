import Image from "next/image";
import React from "react";
import img from "../assets/img5.jpg";
import { RiErrorWarningLine } from "react-icons/ri";

const About = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center p-4 bg-[var(---whitetext)]">
        <div className="text-[2rem] font-sans font-bold l:text-[40px]">About AR Codes</div>
        <div className="my-[2rem] border-y-[1px] py-[1rem] l:grid l:grid-cols-2 l:gap-[2rem]">
          <Image
            src={img}
            width={1020}
            height={1020}
            className="w-full h-[15rem] "
          />
          <div className="text-center my-[2rem] l:text-[18px]">
            I'm technically a full-stack developer with a passion for creating
            innovative web applications. My expertise lies in both front-end and
            back-end development, allowing me to build robust and user-friendly
            solutions. I thrive on challenges and enjoy staying up-to-date with
            the latest technologies to deliver high-quality code and exceptional
            user experiences.
          </div>
        </div>
        <div>
          <div className="text-[2rem] text-center font-bold mb-[1rem] l:text-[40px]">
            Careers
          </div>
          <div className="px-[1rem] text-center mb-[2rem] font-thin l:text-[20px]">
            Check out our job postings & apportunites waiting for you.
          </div>
          <div>
            <form action="post" className="l:grid l:grid-cols-4 l:gap-[1rem] l:w-[70vw] l:text-[18px]">
              <div className="px-[1rem] my-[1rem] l:col-start-1 l:col-end-3">
                <div htmlFor="FirstName" className="font-thin">First Name*</div>
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
                <div htmlFor="LastName" className="font-thin">Last Name*</div>
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
                <div htmlFor="Email" className="font-thin">Email*</div>
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
                <div htmlFor="Phone" className="font-thin">Phone*</div>
                <input
                  type="tel"
                  id="Phone"
                  name="Phone"
                  required
                  className="border-b-[2px] w-full h-[3rem] appearance-none focus:outline-none border-[var(---inputborder)] hover:border-[var(---inputhoverborder)]"
                />
                <div className="flex items-center text-[var(---error)] mt-[0.5rem] text-[14px]">
                  <RiErrorWarningLine className="m-2" />
                  <div>Enter phone number.</div>
                </div>
              </div>

              <div className="px-[1rem] my-[1rem] l:col-start-1 l:col-end-3">
                <div htmlFor="Position" className="font-thin">Position You Apply For</div>
                <select
                  id="Position"
                  name="Position"
                  required
                  className="border-b-[2px] w-full h-[3rem] focus:outline-none border-[var(---inputborder)] hover:border-[var(---inputhoverborder)] "
                >
                  <option value=""></option>
                  <option value="frontend" className="cursor-pointer hover:bg-[var(---btncolor)] hover:text-[var(---whitetext)] selection:bg-[var(---btncolor)] selection:text-[var(---whitetext)]">Frontend Developer</option>
                  <option value="backend">Backend Developer</option>
                  <option value="fullstack">Full Stack Developer</option>
                  <option value="designer">UI/UX Designer</option>
                  <option value="manager">Project Manager</option>
                </select>
                <div className="flex items-center text-[var(---error)] mt-[0.5rem] text-[14px]">
                  <RiErrorWarningLine className="m-2" />
                  <div>Select position.</div>
                </div>
              </div>

              <div className="px-[1rem] my-[1rem] l:col-start-3 l:col-end-5">
                <div htmlFor="Available Date" className="font-thin"> Available Start Date*</div>
                <input
                  type="date"
                  id="AvailableDate"
                  name="AvailableDate"
                  required
                  className="border-b-[2px] w-full h-[3rem] appearance-none focus:outline-none border-[var(---inputborder)] hover:border-[var(---inputhoverborder)]"
                />
                <div className="flex items-center text-[var(---error)] mt-[0.5rem] text-[14px]">
                  <RiErrorWarningLine className="m-2" />
                  <div>Enter avaliable date.</div>
                </div>
              </div>
              <div className="px-[1rem] my-[1rem] l:col-start-1 l:col-end-4">
                <div htmlFor="Resume" className="font-thin">Link to Resume*</div>
                <input
                  type="text"
                  id="Resume"
                  name="Resume"
                  required
                  className="border-b-[2px] w-full h-[3rem] appearance-none focus:outline-none border-[var(---inputborder)] hover:border-[var(---inputhoverborder)]"
                />
                <div className="flex items-center text-[var(---error)] mt-[0.5rem] text-[14px]">
                  <RiErrorWarningLine className="m-2" />
                  <div>Give your resume link.</div>
                </div>
              </div>
              <div className="px-[1rem] my-[1rem] l:col-start-4 l:col-end-5 l:content-center">
                <button id="submit" className="cursor-pointer w-full rounded-[2rem] bg-[var(---btncolor)] p-2 text-[var(---whitetext)] font-thin hover:bg-[var(---whitetext)] hover:border-[var(---btncolor)] hover:text-[var(---btncolor)] hover:border-[1px] duration-[1s]">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default About;
