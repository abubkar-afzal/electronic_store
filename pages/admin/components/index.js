import React, { useEffect, useState } from "react";
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
import { FaArrowCircleUp } from "react-icons/fa";

export default function Admin() {
  const router = useRouter();
  useEffect(() => {
  const adminName = localStorage.getItem("admin_name");
  if (!adminName) {
    router.push("/"); // redirect to login
  }
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
    return (
      <>
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
