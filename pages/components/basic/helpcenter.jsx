import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

const Help_Center = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [otherquestion, setotherquestion] = useState(false);
   const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (event.target.value === "generaloption") {
      setotherquestion(true);
    } else if (event.target.value === "settingupfaqsoption") {
      setotherquestion(false);
    }
};



  const faqs = [
    {
      q: "What is this FAQ about?",
      a: "It's an FAQ example using Tailwind and React.",
    },
    { q: "How do I use it Mobile?", a: "Click on a question to see the answer." },
    { q: "Can I add more Cities in Pakistan?", a: "Yes! Just extend the faqs array." },
  ];
   const gen = [
    {
      q: "What is this site about?",
      a: "It's an FAQ example using Tailwind and React.",
    },
    { q: "How do I use it?", a: "Click on a question to see the answer." },
    { q: "Can I add more?", a: "Yes! Just extend the faqs array." },
  ];

  return (
    <>
      <div className="flex flex-col items-center justify-center p-4 bg-[var(---whitetext)]">
        <div className="text-[2rem] font-sans font-bold text-center">
          
          AR Codes Help Center
        </div>
        <div className="">
          <div className="text-center my-[2rem] text-[20px] font-bold">
            Frequently Asked Questions
          </div>
          <div>
            <form className="flex items-center justify-center focus:outline-none border-[var(---inputborder)] hover:border-[var(---inputhoverborder)] border-b-[2px] px-2">
              <input
                type="text"
                placeholder="Search for help..."
                className=" w-full max-w-md h-[3rem] appearance-none  px-2"
              />
              <button type="submit" className="ml-2 ">
                <IoIosSearch size={24} />
              </button>
            </form>
          </div>
        </div>
        <div className="w-full px-3 my-[1rem]">
          <div>choose a category</div>
          <select value={selectedValue} onChange={handleChange} className=" outline outline-black text-[var(---btncolor)] px-2 my-3 h-[3rem] w-full ">
            <option  value="generaloption">General</option>
            <option  value="settingupfaqsoption">Setting up FAQs</option>
          </select>
        </div>
        {otherquestion ? <div className="w-full p-4">
          {gen.map((item, index) => (
            <div key={index} className="border-b py-2">
              <button
                onClick={() => setOpenIndex(index === openIndex ? null : index)}
                className="w-full text-left font-medium flex justify-between"
              >
                {item.q}
                <span>{openIndex === index ? "∧" : "∨"}</span>
              </button>
              
                <div className={openIndex === index ? "h-[6rem] overflow-hidden duration-[2s]" : "h-0 overflow-hidden duration-[2s]"}>
                  <p className="mt-2 text-sm text-gray-600">{item.a}</p>
                  <div className="flex text-[16px] space-x-2 my-[2rem]">
                    <FaFacebookF className="cursor-pointer" />
                    <FaInstagram className="cursor-pointer" />
                    <FaTwitter className="cursor-pointer" />
                    <FaYoutube className="cursor-pointer" />
                  </div>
                </div>
              
            </div>
          ))}
        </div>:
          
        <div className="w-full p-4">
          {faqs.map((item, index) => (
            <div key={index} className="border-b py-2">
              <button
                onClick={() => setOpenIndex(index === openIndex ? null : index)}
                className="w-full text-left font-medium flex justify-between"
              >
                {item.q}
                <span>{openIndex === index ? "∧" : "∨"}</span>
              </button>
              <div className={openIndex === index ? "h-[6rem] overflow-hidden duration-[2s]" : "h-0 overflow-hidden duration-[2s]"}>
                  <p className="mt-2 text-sm text-gray-600">{item.a}</p>
                  <div className="flex text-[16px] space-x-2 my-[2rem]">
                    <FaFacebookF className="cursor-pointer" />
                    <FaInstagram className="cursor-pointer" />
                    <FaTwitter className="cursor-pointer" />
                    <FaYoutube className="cursor-pointer" />
                  </div>
            </div>
            </div>
          ))}
        </div>}
      </div>
    </>
  );
};
export default Help_Center;
