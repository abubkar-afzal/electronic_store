import Image from "next/image";
import React, { useEffect, useState } from "react";
import loginimage from "../../../public/login.png";
import signupimage from "../../../public/signup.png";
import forgotimage from "../../../public/forgot.png";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import googleimg from "../../../public/google.png";
import Head from "next/head";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  const route = useRouter();

  const { data: session, status } = useSession();

  console.log(session, status);
  useEffect(() => {
    if (status === "loading") return;
    if (status === "authenticated") {
      if (session?.user?.customToken) {
        localStorage.setItem("custom_jwt", session.user.customToken);
        console.log("✅ JWT stored:", session.user.customToken);
      }
      route.push("/");
    }

    if (status === "unauthenticated") {
      localStorage.removeItem("custom_jwt");
      console.log("🧹 JWT cleared (unauthenticated)");
    }
  }, [status, session]);

  const [login, setlogin] = useState(true);
  const [forgot, setforgot] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const changeforgot = () => {
    setforgot(!forgot);
  };
  const changetosignup = () => {
    setlogin(!login);
  };
  

const handleLogin = async (e) => {
  e.preventDefault();
  const email = e.target.Email.value;
  const password = e.target.Password.value;

  const res = await signIn("credentials", {
    redirect: false,
    email,
    password,
  });

  if (res.ok) {
    // redirect or show success
          toast.success("Login Successfully.");

    route.push("/components/basic/account");
  } else {
          toast.error("Give right information ?");

    console.error("Login failed:", res);
  }
};

const handleSignup = async (e) => {
  e.preventDefault();
  const name = e.target.Name.value;
  const email = e.target.Email.value;
  const phone = e.target.Phone.value;
  const password = e.target.Password.value;

  try {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, password }),
    });

    const data = await res.json();

    if (res.ok) {
      toast.success("Signup successful! Please login.");
      setlogin(true); // Switch to login form
    } else {
      toast(data.message || "Signup failed");
    }
  } catch (error) {
    console.error("Signup Error:", error);
    toast("Something went wrong during signup");
  }
};

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const imageUrl = `${siteUrl}login.png`;
  if (!isClient) {
    return null;
  }
  return (
    <><Toaster/>
      <Head>
        <title>AR Codes - Login Page</title>
        <meta
          name="description"
          content="Shop the latest electronics and accessories at the best prices with AR Codes. Fast delivery and exclusive deals!"
        />
        <meta name="author" content="Hafiz Abubakar Afzal" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="online shopping, best prices, electronics, AR Codes, sale, deals, e-commerce, mobile, laptop, lcd, tablet, drone, camera, headphone, mobiles, laptops, lcds, tablets, drones, cameras, headphones"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}components/basic/login`} />
        <meta
          property="og:title"
          content="AR Codes - Affordable & Trendy Online Shopping"
        />
        <meta
          property="og:description"
          content="Shop the latest electronics and accessories at the best prices with AR Codes."
        />
        <meta property="og:image" content={`${siteUrl}logo.png`} />
        <link rel="canonical" href={`${siteUrl}components/basic/login`} />
        <link rel="icon" href={imageUrl} />
      </Head>
      <div className=" l:w-[99vw] l:overflow-hidden">
        <div
          className={` l:grid l:grid-cols-2 l:gap-4 l:px-[4rem] l:m-[2rem] l:py-[2rem] sm:h-[40rem] l:h-[70vh]   l:bg-[var(---loginpage)] sm:overflow-x-hidden relative`}
        >
          <>
            {/* forgot */}
            <div
              className={`${
                forgot
                  ? " translate-x-0 duration-[2s] "
                  : "translate-x-[120vw] duration-[2s]"
              } hidden l:block items-center justify-center w-full absolute l:col-start-2 sm:overflow-x-hidden ${
                forgot ? "opacity-100" : "opacity-0 hidethis"
              }`}
            >
              <Image
                src={forgotimage}
                width={1020}
                height={1020}
                className="l:w-[70vh]"
              />
            </div>
            {/* forgot */}
            <div
              className={`${
                forgot
                  ? "l:translate-x-[2vw] sm:translate-x-[5vw] duration-[2s] "
                  : "l:translate-x-[-120vw]  sm:translate-x-[-100vw] duration-[2s]"
              } l:m-4 l:h-[90%] l:p-0 sm:my-[2rem] sm:h-[36rem] sm:bg-[var(---loginpage)] rounded-[2rem] l:bg-[var(---whitetext)] absolute sm:overflow-x-hidden sm:w-[90%] l:w-[30%] ${
                forgot ? "opacity-100" : "opacity-0 hidethis"
              }`}
            >
              <div className=" items-center justify-center space-y-[1rem]  sm:p-[2rem] l:p-0 l:pt-[1rem] l:px-[6rem]">
                <div className="text-[1.5rem] font-sans font-bold text-center l:text-[35px]">
                  Forgot
                </div>
                <div className="w-full pb-[2rem] text-center text-[14px] font-sans font-bold border-b-[1px]">
                  Do your forgot your passwrod. Don't worry.
                </div>
              </div>
              <div className="flex flex-col items-center justify-center px-4 sm:bg-transparent l:bg-[var(---whitetext)] ">
                <form
                  action="post"
                  className="w-full l:text-[14px] sm:h-[16rem] sm:text-[12px] l:h-[35vh] "
                >
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

                  <div className="w-full flex flex-col items-end p-[2rem]"></div>
                  <div className="items-center justify-center flex flex-col ">
                    <button
                      type="submit"
                      className="bg-[var(---btncolor)] text-white l:w-[40%] sm:w-[50%] h-[3rem]  rounded-[2rem] hover:border-[var(---btncolor)] hover:bg-transparent hover:border-[1px] cursor-pointer hover:text-[var(---btncolor)] duration-[1s]"
                    >
                      Check
                    </button>
                    <div
                      onClick={changeforgot}
                      className="bg-[var(---btncolor)] text-white my-[1rem] text-center content-center l:w-[40%] sm:w-[50%] h-[3rem] rounded-[2rem] hover:border-[var(---btncolor)] hover:bg-transparent hover:border-[1px] cursor-pointer hover:text-[var(---btncolor)] duration-[1s] l:text-[14px]"
                    >
                      Login
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </>
          <>
            {/* login */}
            <div
              className={`${
                login
                  ? "translate-x-[5vw] duration-[2s]"
                  : "translate-x-[-120vw] duration-[2s]"
              } hidden l:block items-center justify-center w-full absolute sm:overflow-x-hidden ${
                forgot ? "opacity-0 hidethis" : "opacity-100"
              }`}
            >
              <Image
                src={loginimage}
                width={1020}
                height={1020}
                className="l:w-[70vh]"
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
                className="l:w-[70vh]"
              />
            </div>

            {/* login */}
            <div
              className={`${
                login
                  ? "l:translate-x-[60vw] sm:translate-x-[5vw] duration-[2s]"
                  : "l:translate-x-[120vw] sm:translate-x-[100vw] duration-[2s] hidethis"
              } l:m-4 l:h-[90%]  l:p-0 sm:my-[2rem] sm:h-[36rem] sm:bg-[var(---loginpage)] rounded-[2rem] l:bg-[var(---whitetext)] absolute sm:overflow-x-hidden scrollbar-hide sm:w-[90%] l:w-[30%] ${
                forgot ? "opacity-0 hidethis" : "opacity-100"
              }`}
            >
              <div className=" items-center justify-center space-t-[1rem] sm:p-[2rem] l:p-0 l:pt-[2rem] l:px-[6rem] sm:w-[100%]">
                <div className="sm:text-[30px] font-sans font-bold text-center l:text-[35px]">
                  Login
                </div>
                <div className="w-full pb-[2rem] text-center sm:text-[12px] l:text-[14px]  font-sans font-bold border-b-[1px]">
                  Welcome back. Please login to your account
                </div>
              </div>
              <div className="flex flex-col items-center justify-center p-4 sm:bg-transparent l:bg-[var(---whitetext)] ">
                <form
                onSubmit={handleLogin}
                  action="post"
                  className="w-full l:text-[14px] sm:h-[22rem] sm:text-[12px] l:h-[35vh] overflow-y-scroll"
                >
                  <div className="flex justify-center items-center space-x-2">
                    <div className=" text-center text-[18px] font-bold font-sans">
                      Login with:
                    </div>
                    <div
                      onClick={() => signIn("google")}
                      className="bg-[var(---pagecolor)] text-white my-[1rem] text-center content-center l:w-[20%] sm:w-[20%] h-[3rem] rounded-[2rem] hover:border-[var(---btncolor)] hover:bg-transparent hover:border-[1px] cursor-pointer hover:text-[var(---btncolor)] duration-[1s] l:text-[14px]"
                    >
                      <Image
                        src={googleimg}
                        width={1020}
                        height={1020}
                        alt="google signup"
                        className="w-[2rem] h-[2rem] mx-auto"
                      />
                    </div>
                  </div>
                  <div className=" text-center text-[18px]  font-sans">Or</div>
                  <div className=" text-center text-[16px] font-thin font-sans">
                    Login with email:
                  </div>
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
                      
                      className="border-b-[2px] w-full h-[2rem] appearance-none focus:outline-none border-[var(---inputborder)] hover:border-[var(---inputhoverborder)]"
                    />
                  </div>
                  <div className="w-full flex flex-col items-end p-[2rem]">
                    <div
                      onClick={changeforgot}
                      className="text-[var(---forgotpassword)] text-[14px] cursor-pointer hover:underline"
                    >
                      Forgot Password?
                    </div>
                  </div>
                  <div className="items-center justify-center flex flex-col ">
                    <button
                      type="submit"
                      className="bg-[var(---btncolor)] text-white sm:w-[50%] l:w-[40%] h-[3rem]  rounded-[2rem] hover:border-[var(---btncolor)] hover:bg-transparent hover:border-[1px] cursor-pointer hover:text-[var(---btncolor)] duration-[1s] mb-[1rem]"
                    >
                      Login
                    </button>
                    <div
                      onClick={changetosignup}
                      className="bg-[var(---btncolor)] text-white sm:w-[50%] l:w-[40%] h-[3rem] rounded-[2rem] hover:border-[var(---btncolor)] l:m-0 sm:mt-[1rem] sm:text-[12px] hover:bg-transparent hover:border-[1px] cursor-pointer hover:text-[var(---btncolor)] duration-[1s] l:text-[14px] mb-[1rem] text-center content-center"
                    >
                      Sign Up
                    </div>
                  </div>
                </form>
              </div>
            </div>

            {/* signup */}
            <div
              className={`${
                login
                  ? "l:translate-x-[-120vw] sm:translate-x-[-100vw] duration-[2s] "
                  : "l:translate-x-[1vw] sm:translate-x-[5vw] duration-[2s]"
              } l:m-4 l:h-[90%] l:p-0 sm:my-[2rem] sm:h-[36rem] sm:bg-[var(---loginpage)] rounded-[2rem] l:bg-[var(---whitetext)] absolute sm:overflow-x-hidden scrollbar-hide sm:w-[90%] l:w-[30%]`}
            >
              <div className=" items-center justify-center space-y-[1rem]  p-[2rem] l:px-[6rem]">
                <div className="text-[1.5rem] font-sans font-bold text-center l:text-[35px]">
                  Sign Up
                </div>
                <div className="w-full pb-[2rem] text-center text-[14px] font-sans font-bold border-b-[1px]">
                  Welcome to our store. Please sign up to continue.
                </div>
              </div>
              <div className="flex flex-col items-center justify-center px-4 sm:bg-transparent l:bg-[var(---whitetext)] ">
                <form
                 onSubmit={handleSignup}
                  action="post"
                  className="w-full l:text-[14px] sm:h-[22rem] sm:text-[12px] l:h-[33vh] overflow-y-scroll"
                >
                  <div className="flex justify-center items-center space-x-2">
                    <div className=" text-center text-[18px] font-bold font-sans">
                      Signup with:
                    </div>
                    <div
                      onClick={() => signIn("google")}
                      className="bg-[var(---pagecolor)] text-white my-[1rem] text-center content-center l:w-[20%] sm:w-[20%] h-[3rem] rounded-[2rem] hover:border-[var(---btncolor)] hover:bg-transparent hover:border-[1px] cursor-pointer hover:text-[var(---btncolor)] duration-[1s] l:text-[14px]"
                    >
                      <Image
                        src={googleimg}
                        width={1020}
                        height={1020}
                        alt="google signup"
                        className="w-[2rem] h-[2rem] mx-auto"
                      />
                    </div>
                  </div>
                  <div className=" text-center text-[18px]  font-sans">Or</div>
                  <div className=" text-center text-[16px] font-thin font-sans">
                    Create an account with form:
                  </div>
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
                  </div>
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
                      className="bg-[var(---btncolor)] text-white l:w-[40%] sm:w-[50%] h-[3rem]  rounded-[2rem] hover:border-[var(---btncolor)] hover:bg-transparent hover:border-[1px] cursor-pointer hover:text-[var(---btncolor)] duration-[1s]"
                    >
                      Sign Up
                    </button>
                    <div
                      onClick={changetosignup}
                      className="bg-[var(---btncolor)] text-white my-[1rem] text-center content-center l:w-[40%] sm:w-[50%] h-[3rem] rounded-[2rem] hover:border-[var(---btncolor)] hover:bg-transparent hover:border-[1px] cursor-pointer hover:text-[var(---btncolor)] duration-[1s] l:text-[14px]"
                    >
                      Login
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};
export default Login;
