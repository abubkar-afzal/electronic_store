import Image from "next/image";
import React, { useState } from "react";
import adminimage from "../../public/admin.png";
import { useRouter } from "next/router";
import Head from "next/head";

const Admin = () => {
  const route = useRouter();
  const [admin, setadmin] = useState(true);
  const handleAdminLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const password = form.Password.value;

    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Login failed");
        return;
      }

      localStorage.setItem("admin_name", data.admin.name);
      route.push("/admin/components/");
    } catch (error) {
      alert("Login failed - network or server issue");
    }
  };

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const imageUrl = `${siteUrl}login.png`;
  return (
    <>
      <Head>
        <title>AR Codes - Admin Page</title>
        <meta
          name="description"
          content="Shop the latest electronics and accessories at the best prices with AR Codes. Fast delivery and exclusive deals!"
        />
        <meta name="author" content="Hafiz Abubakar Afzal" />
        <meta name="robots" content="noindex, nofollow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="online shopping, best prices, electronics, AR Codes, sale, deals, e-commerce, mobile, laptop, lcd, tablet, drone, camera, headphone, mobiles, laptops, lcds, tablets, drones, cameras, headphones"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:title" content="AR Codes - Admin Page" />
        <meta
          property="og:description"
          content="Shop the latest electronics and accessories at the best prices with AR Codes."
        />
        <meta property="og:image" content={imageUrl} />
        <link rel="canonical" href={siteUrl} />
        <link rel="icon" href={imageUrl} />
      </Head>
      <div className=" l:w-[99vw] l:overflow-hidden">
        <div
          className={` l:grid l:grid-cols-2 l:gap-4 l:px-[4rem] l:m-[2rem] l:py-[2rem] sm:h-[40rem] l:h-[70vh]  l:bg-[var(---loginpage)] sm:overflow-x-hidden relative`}
        >
          <>
            <div
              className={`${
                admin
                  ? "translate-x-[5vw] duration-[2s]"
                  : "translate-x-[-120vw] duration-[2s]"
              } hidden l:block items-center justify-center w-full absolute sm:overflow-x-hidden `}
            >
              <Image
                src={adminimage}
                width={1020}
                height={1020}
                className="l:w-[70vh]"
              />
            </div>

            <div
              className={`${
                admin
                  ? "l:translate-x-[60vw] sm:translate-x-[5vw] duration-[2s]"
                  : "l:translate-x-[120vw] sm:translate-x-[100vw] duration-[2s] hidethis"
              } l:m-4 l:h-[90%]  l:p-0 sm:my-[2rem] sm:h-[36rem] sm:bg-[var(---loginpage)] rounded-[2rem] l:bg-[var(---whitetext)] absolute sm:overflow-x-hidden sm:w-[90%] l:w-[30%] `}
            >
              <div className=" items-center justify-center space-t-[1rem] sm:p-[2rem] l:p-0 l:pt-[2rem] l:px-[6rem] sm:w-[100%]">
                <div className="sm:text-[30px] font-sans font-bold text-center l:text-[35px]">
                  Admin
                </div>
                <div className="w-full py-[2rem] text-center sm:text-[12px] l:text-[14px]  font-sans font-bold border-b-[1px]">
                  Welcome back.
                </div>
              </div>
              <div className="flex flex-col items-center justify-center p-4 sm:bg-transparent l:bg-[var(---whitetext)] sm:pt-[5rem] l:pt-[1rem]">
                <form
                  onSubmit={handleAdminLogin}
                  action="post"
                  className="w-full l:text-[14px]  sm:text-[12px] "
                >
                  <div className="px-[1rem] my-[1rem]">
                    <div htmlFor="name" className="font-thin">
                      Name*
                    </div>
                    <input
                      type="name"
                      id="name"
                      name="name"
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

                  <div className="items-center justify-center flex flex-col ">
                    <button
                      type="submit"
                      className="bg-[var(---btncolor)] text-white sm:w-[50%] l:w-[40%] h-[3rem]  rounded-[2rem] hover:border-[var(---btncolor)] hover:bg-transparent hover:border-[1px] cursor-pointer hover:text-[var(---btncolor)] duration-[1s] mt-[3rem]"
                    >
                      Admin
                    </button>
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
export default Admin;
