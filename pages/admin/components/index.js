import React from "react";
import Intro from "./intro";
import Deal from "./deal";
import Services from "./services";
import BestSeller from "./bestsellers";
import BestPrice from "./bestprice";
import ShopeCategory from "./shopcategory";
import OnSale from "./onsale";
import TodaySpecial from "./todayspecial";
import Brands from "./brands";
import Newsletter from "./newsletter";

export default function Admin() {
  return (
    <>
    <Intro/>
    <Deal/>
    <div className="mx-[1rem]">
    <Services/>
    <BestSeller/>
    <BestPrice/>
    <ShopeCategory/>
    <OnSale/>
    <TodaySpecial/>
    <Brands/>
    <Newsletter/></div>
    </>
  );
}
