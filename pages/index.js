import React, { useEffect, useState } from "react";
import Intro from "./components/intro";
import Deal from "./components/deal";
import Services from "./components/services";
import BestSeller from "./components/bestsellers";
import BestPrice from "./components/bestprice";
import ShopeCategory from "./components/shopcategory";
import OnSale from "./components/onsale";
import TodaySpecial from "./components/todayspecial";
import Brands from "./components/brands";
import Newsletter from "./components/newsletter";
import pool from "./api/db";
import Navbar from "./components/navbar";

export default function Home({
  addToCart,
  IntroImages,
  Bestseller,
  Onsale,
  Bestprice,
  Todayspecial,
  Brand
}) {
  useEffect(() => {
    localStorage.removeItem("admin_name");
  }, []);

  return (
    <>
      <Intro IntroImages={IntroImages} />
      <Deal />
      <div className="mx-[1rem]">
        <Services />
        <BestSeller addToCart={addToCart} Bestseller={Bestseller} />
        <BestPrice Bestprice={Bestprice}/>
        <ShopeCategory />
        <OnSale addToCart={addToCart} Onsale={Onsale} />
        <TodaySpecial Todayspecial={Todayspecial}/>
        <Brands Brand={Brand}/>
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
  const [Bestprice] = await pool.query('SELECT * FROM best_price ORDER BY id DESC LIMIT 1');
  const [Todayspecial] = await pool.query('SELECT * FROM today_special ORDER BY id DESC LIMIT 1');
  const [Brand] = await pool.query('SELECT * FROM brands ORDER BY id DESC');
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
