import React, { useEffect } from "react";
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
import { useRouter } from "next/router";

export default function Admin() {
  const router = useRouter();
  useEffect(() => {
  const adminName = localStorage.getItem("admin_name");
  if (!adminName) {
    router.push("/"); // redirect to login
  }
}, []);

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
