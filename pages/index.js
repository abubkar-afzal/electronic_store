import React, { useState } from "react";
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
  const [step, setStep] = useState(0);

  return (
    <>
      {step >= 0 && <Intro onDone={() => setStep(1)} />}
      {step >= 1 && <Deal onDone={() => setStep(2)} />}
      <div className="mx-[1rem]">
         <Services />
        {step >= 2 && <BestSeller onDone={() => setStep(3)} />}
        {step >= 3 && <BestPrice onDone={() => setStep(4)} />}
        <ShopeCategory />
        {step >= 4 && <OnSale onDone={() => setStep(5)} />}
        {step >= 5 && <TodaySpecial onDone={() => setStep(6)} />}
        {step >= 6 && <Brands onDone={() => setStep(7)} />}
        {step >= 7 && <Newsletter />}
      </div>
    </>
  );
}
