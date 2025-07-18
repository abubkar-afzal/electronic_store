import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const MoonLoader = dynamic(() => import("react-spinners").then(mod => mod.MoonLoader), { ssr: false });

import Intro from "./components/intro";
const Deal = dynamic(() => import("./components/deal"), {
  ssr: false,
  loading: () => (
    <div className=" inset-0 flex items-center justify-center col-span-5 bg-opacity-80 z-999">
      <div className=" p-6 rounded  text-xl font-bold flex items-center gap-2">
        <MoonLoader size={30} color="#7002ff" />
        Loading Deals...
      </div>
    </div>
  ),
});
const Services = dynamic(() => import("./components/services"), {
  ssr: false,
  loading: () => (
    <div className=" inset-0 flex items-center justify-center col-span-5 bg-opacity-80 z-999">
      <div className=" p-6 rounded  text-xl font-bold flex items-center gap-2">
        <MoonLoader size={30} color="#7002ff" />
        Loading Services...
      </div>
    </div>
  ),
});
const BestSeller = dynamic(() => import("./components/bestsellers"), {
  ssr: false,
  loading: () => (
    <div className=" inset-0 flex items-center justify-center col-span-5 bg-opacity-80 z-999">
      <div className=" p-6 rounded  text-xl font-bold flex items-center gap-2">
        <MoonLoader size={30} color="#7002ff" />
        Loading Best Seller Products...
      </div>
    </div>
  ),
});
const BestPrice = dynamic(() => import("./components/bestprice"), {
  ssr: false,
  loading: () => (
    <div className=" inset-0 flex items-center justify-center col-span-5 bg-opacity-80 z-999">
      <div className=" p-6 rounded  text-xl font-bold flex items-center gap-2">
        <MoonLoader size={30} color="#7002ff" />
        Loading Best Price Offer...
      </div>
    </div>
  ),
});
const ShopeCategory = dynamic(() => import("./components/shopcategory"), {
  ssr: false,
  loading: () => (
    <div className=" inset-0 flex items-center justify-center col-span-5 bg-opacity-80 z-999">
      <div className=" p-6 rounded  text-xl font-bold flex items-center gap-2">
        <MoonLoader size={30} color="#7002ff" />
        Loading Shope Categories...
      </div>
    </div>
  ),
});
const OnSale = dynamic(() => import("./components/onsale"), {
  ssr: false,
  loading: () => (
    <div className=" inset-0 flex items-center justify-center col-span-5 bg-opacity-80 z-999">
      <div className=" p-6 rounded  text-xl font-bold flex items-center gap-2">
        <MoonLoader size={30} color="#7002ff" />
        Loading On Sale Offer...
      </div>
    </div>
  ),
});
const TodaySpecial = dynamic(() => import("./components/todayspecial"), {
  ssr: false,
  loading: () => (
    <div className=" inset-0 flex items-center justify-center col-span-5 bg-opacity-80 z-999">
      <div className=" p-6 rounded  text-xl font-bold flex items-center gap-2">
        <MoonLoader size={30} color="#7002ff" />
        Loading Today Special Offer...
      </div>
    </div>
  ),
});
const Brands = dynamic(() => import("./components/brands"), {
  ssr: false,
  loading: () => (
    <div className=" inset-0 flex items-center justify-center col-span-5 bg-opacity-80 z-999">
      <div className=" p-6 rounded  text-xl font-bold flex items-center gap-2">
        <MoonLoader size={30} color="#7002ff" />
        Loading Brands...
      </div>
    </div>
  ),
});
const Newsletter = dynamic(() => import("./components/newsletter"), {
  ssr: false,
  loading: () => (
    <div className=" inset-0 flex items-center justify-center col-span-5 bg-opacity-80 z-999">
      <div className=" p-6 rounded  text-xl font-bold flex items-center gap-2">
        <MoonLoader size={30} color="#7002ff" />
        Loading News Letter...
      </div>
    </div>
  ),
});

import Head from "next/head";


import pool from "./api/db";

const FaArrowCircleUp = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaArrowCircleUp),
  { ssr: false }
);


export default function Home({
  addToCart,
  IntroImages,
  Bestseller,
  Onsale,
  Bestprice,
  Todayspecial,
  Brand,
}) {
  useEffect(() => {
    localStorage.removeItem("admin_name");
  }, []);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const imageUrl = `${siteUrl}main.jpeg`;
  return (
    <>
      <Head>
        <title>AR Codes - Affordable & Trendy Online Shopping</title>
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
        <meta property="og:url" content={siteUrl} />
        <meta
          property="og:title"
          content="AR Codes - Affordable & Trendy Online Shopping"
        />
        <meta
          property="og:description"
          content="Shop the latest electronics and accessories at the best prices with AR Codes."
        />
        <meta property="og:image" content={`${siteUrl}logo.png`} />
        <link rel="canonical" href={siteUrl} />
        <link rel="icon" href={imageUrl} />
      </Head>

      <button
        onClick={scrollToTop}
        className={`${
          showScrollTop ? "opacity-100" : "opacity-0 hidethis"
        } fixed bottom-8 right-8 z-[9999] bg-[var(---btncolor)] text-white p-3 rounded-full shadow-lg hover:bg-transparent cursor-pointer hover:border hover:border-[var(---btncolor)] hover:text-[var(---btncolor)] transition-all duration-[1s] text-[20px]`}
        title="Scroll to top"
        aria-label="Scroll to top"
      >
        <FaArrowCircleUp />
      </button>
      <Intro IntroImages={IntroImages} />
      <Deal />
      <div className="mx-[1rem]">
        <Services />
        <BestSeller addToCart={addToCart} Bestseller={Bestseller} />
        <BestPrice Bestprice={Bestprice} />
        <ShopeCategory />
        <OnSale addToCart={addToCart} Onsale={Onsale} />
        <TodaySpecial Todayspecial={Todayspecial} />
        <Brands Brand={Brand} />
        <Newsletter />
      </div>
    </>
  );
}
export async function getServerSideProps(context) {
  const [intro] = await pool.query("SELECT * FROM intro ORDER BY id ASC");
  let IntroImages = await intro.map((r) => r.image);
  const [Bestseller] = await pool.query(
    "SELECT * FROM product WHERE LOWER(display_place) = ?",
    ["bestseller"]
  );
  const [Onsale] = await pool.query(
    "SELECT * FROM product WHERE LOWER(display_place) = ?",
    ["onsale"]
  );
  const [Bestprice] = await pool.query(
    "SELECT * FROM best_price ORDER BY id DESC LIMIT 1"
  );
  const [Todayspecial] = await pool.query(
    "SELECT * FROM today_special ORDER BY id DESC LIMIT 1"
  );
  const [Brand] = await pool.query("SELECT * FROM brands ORDER BY id DESC");
  return {
    props: {
      IntroImages: JSON.parse(JSON.stringify(IntroImages)),
      Bestseller: JSON.parse(JSON.stringify(Bestseller)),
      Onsale: JSON.parse(JSON.stringify(Onsale)),
      Bestprice: JSON.parse(JSON.stringify(Bestprice)),
      Todayspecial: JSON.parse(JSON.stringify(Todayspecial)),
      Brand: JSON.parse(JSON.stringify(Brand)),
    },
  };
}
