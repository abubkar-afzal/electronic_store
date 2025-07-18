import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";

const FaFacebookF = dynamic(() =>
  import("react-icons/fa").then((mod) => mod.FaFacebookF),
  { ssr: false }
);
const FaInstagram = dynamic(() =>
  import("react-icons/fa").then((mod) => mod.FaInstagram),
  { ssr: false }
);
const FaYoutube = dynamic(() =>
  import("react-icons/fa").then((mod) => mod.FaYoutube),
  { ssr: false }
);
const IoIosSearch = dynamic(() =>
  import("react-icons/io").then((mod) => mod.IoIosSearch),
  { ssr: false }
);
const motion = dynamic(() =>
  import("framer-motion").then((mod) => mod.motion),
  { ssr: false }
);
const AnimatePresence = dynamic(() =>
  import("framer-motion").then((mod) => mod.AnimatePresence),
  { ssr: false }
);


const Help_Center = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedValue, setSelectedValue] = useState("generaloption");
  const [faqs, setFaqs] = useState([]);
  const [gen, setGen] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchFaqs();
  }, [selectedValue]);

  const fetchFaqs = async () => {
    const res = await fetch(`/api/helpcenter?category=${selectedValue}`);
    if (res.ok) {
      const data = await res.json();
      if (selectedValue === "generaloption") setGen(data.faqs || []);
      else setFaqs(data.faqs || []);
    }
  };

  const getCurrentList = () => (selectedValue === "generaloption" ? gen : faqs);

  const dropdownOptions = [
    { value: "generaloption", label: "General" },
    { value: "settingupfaqsoption", label: "Setting up FAQs" },
  ];
  const selectedLabel =
    dropdownOptions.find((opt) => opt.value === selectedValue)?.label ||
    "Choose a category";

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const imageUrl = `${siteUrl}main.jpeg`;
  return (
    <>
      <Head>
        <title>AR Codes - Help Center Page</title>
        <meta
          name="description"
          content="Contact Us we will help you as we can."
        />
        <meta name="author" content="Hafiz Abubakar Afzal" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="online shopping, best prices, electronics, AR Codes, sale, deals, e-commerce, mobile, laptop, lcd, tablet, drone, camera, headphone, mobiles, laptops, lcds, tablets, drones, cameras, headphones"
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${siteUrl}component/basic/helpcenter`}
        />
        <meta property="og:title" content="AR Codes - Help Center Page" />
        <meta
          property="og:description"
          content="Contact Us we will help you as we can."
        />
  <meta property="og:image" content={`${siteUrl}logo.png`} />
        <link rel="canonical" href={`${siteUrl}component/basic/helpcenter`} />
        <link rel="icon" href={imageUrl} />
      </Head>
      <div className="flex flex-col items-center justify-center p-4 bg-[var(---whitetext)]">
        <div className="text-[2rem] font-sans font-bold text-center l:text-[45px]">
          AR Codes Help Center
        </div>
        <div>
          <div className="text-center my-[2rem] text-[20px] font-bold l:text-[25px]">
            Frequently Asked Questions
          </div>
          <div>
            <form className="flex items-center justify-center focus:outline-none border-[var(---inputborder)] hover:border-[var(---inputhoverborder)] border-b-[2px] px-2 l:text-[20px]">
              <input
                type="text"
                placeholder="Search for help..."
                className=" w-full max-w-md h-[3rem] appearance-none focus:outline-none  px-2"
              />
              <button type="submit" className="ml-2 ">
                <IoIosSearch size={24} />
              </button>
            </form>
          </div>
        </div>
        <div className="l:w-[70vw] w-full px-3 my-[1rem]">
          <div className="w-full px-3 my-[1rem] flex items-center justify-between">
            <div className="w-full relative">
              <div
                className="cursor-pointer outline outline-black text-[var(---btncolor)] px-2 my-3 h-[3rem] w-full flex items-center justify-between bg-white"
                onClick={() => setShowDropdown((v) => !v)}
                tabIndex={0}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
              >
                <span>{selectedLabel}</span>
                <span className="ml-2">{showDropdown ? "▲" : "▼"}</span>
              </div>
              <AnimatePresence>
                {showDropdown && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 right-0 bg-white border border-gray-300 z-10 rounded shadow"
                  >
                    {dropdownOptions.map((opt) => (
                      <li
                        key={opt.value}
                        className={`px-4 py-2 hover:bg-[var(---btncolor)] hover:text-white cursor-pointer ${
                          selectedValue === opt.value ? "bg-gray-100" : ""
                        }`}
                        onClick={() => {
                          setSelectedValue(opt.value);
                          setShowDropdown(false);
                        }}
                      >
                        {opt.label}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="w-full p-4">
            {getCurrentList().map((item, index) => (
              <div key={item.id || index} className="border-b py-2 relative">
                <button
                  onClick={() =>
                    setOpenIndex(index === openIndex ? null : index)
                  }
                  className="w-full text-left font-medium cursor-pointer flex justify-between"
                >
                  {item.q}
                  <span>{openIndex === index ? "∧" : "∨"}</span>
                </button>

                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="mt-2 text-sm text-gray-600">{item.a}</p>
                      <div className="flex text-[16px] space-x-2 my-[2rem]">
                        <Link href={`https://www.facebook.com/ar.codes504`}>
                          <FaFacebookF className="cursor-pointer" />
                        </Link>
                        <Link href={`https://www.instagram.com/ar_codes504/`}>
                          <FaInstagram className="cursor-pointer" />
                        </Link>
                        <Link href={`https://www.tiktok.com/@ar_codes`}>
                          <FaTiktok className="cursor-pointer" />
                        </Link>
                        <Link href={`https://www.threads.com/@ar_codes504`}>
                          <FaYoutube className="cursor-pointer" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Help_Center;
