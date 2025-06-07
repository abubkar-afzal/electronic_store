import React from "react";
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

export default function Home() {
  return (
    <>
    <Intro/>
    <Deal/>
    <Services/>
    <BestSeller/>
    <BestPrice/>
    <ShopeCategory/>
    <OnSale/>
    <TodaySpecial/>
    <Brands/>
    <Newsletter/>
    </>
  );
}
