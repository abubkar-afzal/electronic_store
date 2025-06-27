import Image from "next/image";
import React, { useState } from "react";
import loginimage from "../assets/login.png";
import signupimage from "../assets/signup.png";

const Login = () => {
  const [login, setlogin] = useState(true);
  const changetosignup = () => {
    setlogin(!login);
  };
  return (
    <><div className=" l:w-[99vw] l:overflow-hidden">
    
      <div
        className={` l:grid l:grid-cols-2 l:gap-4 l:px-[4rem] l:m-[2rem] l:py-[2rem] sm:h-[40rem] l:h-[38rem]  l:bg-[var(---loginpage)] sm:overflow-x-hidden relative`}
      >
        {/* login */}
        <div
          className={`${
            login
              ? "translate-x-[5vw] duration-[2s]"
              : "translate-x-[-120vw] duration-[2s]"
          } hidden l:block items-center justify-center w-full absolute sm:overflow-x-hidden`}
        >
          <Image
            src={loginimage}
            width={1020}
            height={1020}
            className="l:w-[35rem]"
          />
        </div>

        {/* signup */}
        <div
          className={`${
            login
              ? " translate-x-[120vw] duration-[2s] "
              : "translate-x-0 duration-[2s]"
          } hidden l:block items-center justify-center w-full absolute l:col-start-2 sm:overflow-x-hidden`}
        >
          <Image
            src={signupimage}
            width={1020}
            height={1020}
            className="l:w-[35rem]"
          />
        </div>

        {/* login */}
        <div
          className={`${
            login
              ? "l:translate-x-[60vw] sm:translate-x-[5vw] duration-[2s]"
              : "l:translate-x-[120vw] sm:translate-x-[100vw] duration-[2s] hidethis"
          } l:m-4 l:h-[35rem] sm:p-[2rem] l:p-0 sm:my-[2rem] sm:h-[36rem] sm:bg-[var(---loginpage)] rounded-[2rem] l:bg-[var(---whitetext)] absolute sm:overflow-x-hidden sm:w-[90%] l:w-auto`}
        >
          <div className=" items-center justify-center space-y-[1rem]  p-[2rem] l:px-[6rem] sm:w-[100%]">
            <div className="sm:text-[30px] font-sans font-bold text-center l:text-[35px]">
              Login
            </div>
            <div className="w-full pb-[2rem] text-center sm:text-[12px] l:text-[14px]  font-sans font-bold border-b-[1px]">
              Please login to your account
            </div>
          </div>
          <div className="flex flex-col items-center justify-center p-4 sm:bg-transparent l:bg-[var(---whitetext)] ">
            <form action="post" className="w-full l:text-[14px] sm:text-[12px] l:h-[18rem]">
              <div className="px-[1rem] my-[1rem]">
                <div htmlFor="Email" className="font-thin">
                  Email*
                </div>
                <input
                  type="email"
                  id="Email"
                  name="Email"
                  required
                  className="border-b-[2px] w-full h-[2rem] appearance-none focus:outline-none border-[var(---inputborder)] hover:border-[var(---inputhoverborder)]"
                />
              </div>
              <div className="px-[1rem]">
                <div htmlFor="Password" className="font-thin">
                  Password*
                </div>
                <input
                  type="password"
                  id="Password"
                  name="Password"
                  required
                  className="border-b-[2px] w-full h-[2rem] appearance-none focus:outline-none border-[var(---inputborder)] hover:border-[var(---inputhoverborder)]"
                />
              </div>
              <div className="w-full flex flex-col items-end p-[2rem]">
                <div className="text-[var(---forgotpassword)] text-[14px] cursor-pointer hover:underline">
                  Forgot Password?
                </div>
              </div>
              <div className="items-center justify-center flex flex-col ">
                <button
                  type="submit"
                  className="bg-[var(---btncolor)] text-white sm:w-[50%] l:w-[30%] h-[3rem]  rounded-[2rem] hover:border-[var(---btncolor)] hover:bg-transparent hover:border-[1px] cursor-pointer hover:text-[var(---btncolor)] duration-[1s] "
                >
                  Login
                </button>
                 </div>
            </form>
                <button
                  onClick={changetosignup}
                  className="bg-[var(---btncolor)] text-white sm:w-[50%] l:w-[30%] h-[3rem] rounded-[2rem] hover:border-[var(---btncolor)] l:m-0 sm:m-[1rem] sm:text-[12px] hover:bg-transparent hover:border-[1px] cursor-pointer hover:text-[var(---btncolor)] duration-[1s] l:text-[14px]"
                >
                  Sign Up
                </button>
             
          </div>
        </div>


          {/* signup */}
        <div
          className={`${
            login ?
              "l:translate-x-[-120vw] sm:translate-x-[-100vw] duration-[2s] "
              : "l:translate-x-[5vw] sm:translate-x-[5vw] duration-[2s]"
          } l:m-4 l:h-[35rem] sm:p-[2rem] l:p-0 sm:my-[2rem] sm:h-[36rem] sm:bg-[var(---loginpage)] rounded-[2rem] l:bg-[var(---whitetext)] absolute sm:overflow-x-hidden sm:w-[90%] l:w-auto`}
        >
          <div className=" items-center justify-center space-y-[1rem]  p-[2rem] l:px-[6rem]">
            <div className="text-[1.5rem] font-sans font-bold text-center l:text-[35px]">
              Sign Up
            </div>
            <div className="w-full pb-[2rem] text-center text-[14px] font-sans font-bold border-b-[1px]">
              Please login to your account
            </div>
          </div>
          <div className="flex flex-col items-center justify-center px-4 sm:bg-transparent l:bg-[var(---whitetext)] ">
            <form action="post" className="w-full l:text-[14px] sm:h-[22rem] sm:text-[12px] l:h-[22rem] overflow-y-scroll">
              <div className="px-[1rem] my-[1rem]">
                <div htmlFor="Name" className="font-thin">
                  Name*
                </div>
                <input
                  type="text"
                  id="Name"
                  name="Name"
                  required
                  className="border-b-[2px] w-full h-[2rem] appearance-none focus:outline-none border-[var(---inputborder)] hover:border-[var(---inputhoverborder)]"
                />
              </div><div className="px-[1rem] my-[1rem]">
                <div htmlFor="Email" className="font-thin">
                  Email*
                </div>
                <input
                  type="email"
                  id="Email"
                  name="Email"
                  required
                  className="border-b-[2px] w-full h-[2rem] appearance-none focus:outline-none border-[var(---inputborder)] hover:border-[var(---inputhoverborder)]"
                />
              </div>
              <div className="px-[1rem] my-[1rem]">
                <div htmlFor="Phone" className="font-thin">
                  Phone*
                </div>
                <input
                  type="phone"
                  id="Phone"
                  name="Phone"
                  required
                  className="border-b-[2px] w-full h-[2rem] appearance-none focus:outline-none border-[var(---inputborder)] hover:border-[var(---inputhoverborder)]"
                />
              </div>
              <div className="px-[1rem]">
                <div htmlFor="Password" className="font-thin">
                  Password*
                </div>
                <input
                  type="password"
                  id="Password"
                  name="Password"
                  required
                  className="border-b-[2px] w-full h-[2rem] appearance-none focus:outline-none border-[var(---inputborder)] hover:border-[var(---inputhoverborder)]"
                />
              </div>
              <div className="w-full flex flex-col items-end p-[2rem]"></div>
              <div className="items-center justify-center flex flex-col ">
                <button
                  type="submit"
                  className="bg-[var(---btncolor)] text-white l:w-[30%] sm:w-[50%] h-[3rem]  rounded-[2rem] hover:border-[var(---btncolor)] hover:bg-transparent hover:border-[1px] cursor-pointer hover:text-[var(---btncolor)] duration-[1s]"
                >
                  Sign Up
                </button>
                <div
                  onClick={changetosignup}
                  className="bg-[var(---btncolor)] text-white my-[1rem] text-center content-center l:w-[30%] sm:w-[50%] h-[3rem] rounded-[2rem] hover:border-[var(---btncolor)] hover:bg-transparent hover:border-[1px] cursor-pointer hover:text-[var(---btncolor)] duration-[1s] l:text-[14px]"
                >
                  Login
                </div>
              </div>

            </form>

                
          </div>
        </div>
      </div>
      </div>
    </>
  );
};
export default Login;
