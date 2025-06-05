import React from "react";
import Navbar from "./components/navbar";
import Intro from "./components/intro";
import Deal from "./components/deal";
import Services from "./components/services";
import BestSeller from "./components/bestsellers";
import BestPrice from "./components/bestprice";
import ShopeCategory from "./components/shopcategory";
import OnSale from "./components/onsale";
import TodaySpecial from "./components/todayspecial";
import Brands from "./components/brands";

export default function Home() {
  return (
    <>
    <Navbar/>
    <Intro/>
    <Deal/>
    <Services/>
    <BestSeller/>
    <BestPrice/>
    <ShopeCategory/>
    <OnSale/>
    <TodaySpecial/>
    <Brands/>
    </>
  );
}
