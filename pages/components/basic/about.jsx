import dynamic from "next/dynamic";
import React, { useState } from "react";
import Image from "next/image";
import Head from "next/head";

import img from "../../../public/my_logo.jpg";

const toast = dynamic(() => import("react-hot-toast").then((mod) => mod.default), {
  ssr: false,
});
const Toaster = dynamic(() => import("react-hot-toast").then((mod) => mod.Toaster), {
  ssr: false,
});

const About = () => {
  const [form, setForm] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Phone: "",
    Position: "",
    AvailableDate: "",
    Resume: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/career", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        toast.success("Form submitted successfully!");
        setForm({
          FirstName: "",
          LastName: "",
          Email: "",
          Phone: "",
          Position: "",
          AvailableDate: "",
          Resume: "",
        });
      } else {
        toast.error(data.message || "Submission failed");
      }
    } catch (err) {
      toast.error("Server error");
    }
  };

   const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const imageUrl = `${siteUrl}my_logo.jpg`;
  return (
    <>
    <Head>
  <title>AR Codes - About Page</title>
  <meta name="description" content="Contact Us we will help you as we can." />
  <meta name="author" content="Hafiz Abubakar Afzal" />
  <meta name="robots" content="index, follow" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="keywords" content="online shopping, best prices, electronics, AR Codes, sale, deals, e-commerce, mobile, laptop, lcd, tablet, drone, camera, headphone, mobiles, laptops, lcds, tablets, drones, cameras, headphones" />

  <meta property="og:type" content="website" />
  <meta property="og:url" content={`${siteUrl}component/basic/about`} />
  <meta property="og:title" content="AR Codes - About Page" />
  <meta property="og:description" content="Contact Us we will help you as we can." />
    <meta property="og:image" content={`${siteUrl}logo.png`} />

  <link rel="canonical" href={`${siteUrl}component/basic/about`} />
  <link rel="icon" href={imageUrl} />
</Head>
      <Toaster />
      <div className="flex flex-col items-center justify-center p-4 bg-[var(---whitetext)]">
        <div className="text-[2rem] font-sans font-bold l:text-[40px]">About AR Codes</div>
        <div className="my-[2rem] border-y-[1px] py-[1rem] l:grid l:grid-cols-2 l:gap-[2rem]">
          <Image
            src={img}
            width={1020}
            height={1020}
            className="w-full h-[25rem] "
          />
          <div className="text-center my-[2rem] l:text-[18px] content-center">
            I'm technically a full-stack developer with a passion for creating
            innovative web applications. My expertise lies in both front-end and
            back-end development, allowing me to build robust and user-friendly
            solutions. I thrive on challenges and enjoy staying up-to-date with
            the latest technologies to deliver high-quality code and exceptional
            user experiences.
          </div>
        </div>
        <div>
          <div className="text-[2rem] text-center font-bold mb-[1rem] l:text-[40px]">Careers</div>
          <div className="px-[1rem] text-center mb-[2rem] font-thin l:text-[20px]">
            Check out our job postings & opportunities waiting for you.
          </div>
          <form onSubmit={handleSubmit} className="l:grid l:grid-cols-4 l:gap-[1rem] l:w-[70vw] l:text-[18px]">
            {[
              { label: "First Name*", name: "FirstName", type: "text", col: "1 / 3" },
              { label: "Last Name*", name: "LastName", type: "text", col: "3 / 5" },
              { label: "Email*", name: "Email", type: "email", col: "1 / 3" },
              { label: "Phone*", name: "Phone", type: "tel", col: "3 / 5" },
              { label: "Available Start Date*", name: "AvailableDate", type: "date", col: "3 / 5" },
              { label: "Link to Resume*", name: "Resume", type: "text", col: "1 / 4" },
            ].map(({ label, name, type, col }, i) => (
              <div key={i} className={`px-[1rem] my-[1rem] l:col-start-[${col.split(" / ")[0]}] l:col-end-[${col.split(" / ")[1]}]`}>
                <div className="font-thin">{label}</div>
                <input
                  type={type}
                  name={name}
                  required
                  value={form[name]}
                  onChange={handleChange}
                  className="border-b-[2px] w-full h-[3rem] appearance-none focus:outline-none border-[var(---inputborder)] hover:border-[var(---inputhoverborder)]"
                />
              </div>
            ))}
            <div className="px-[1rem] my-[1rem] l:col-start-1 l:col-end-3">
              <div className="font-thin">Position You Apply For</div>
              <select
                name="Position"
                value={form.Position}
                onChange={handleChange}
                required
                className="border-b-[2px] w-full h-[3rem] focus:outline-none border-[var(---inputborder)] hover:border-[var(---inputhoverborder)] cursor-pointer"
              >
                <option value=""></option>
                <option value="frontend">Frontend Developer</option>
                <option value="backend">Backend Developer</option>
                <option value="fullstack">Full Stack Developer</option>
                <option value="designer">UI/UX Designer</option>
                <option value="manager">Project Manager</option>
              </select>
            </div>
            <div className="px-[1rem] my-[1rem] l:col-start-4 l:col-end-5 l:content-center">
              <button type="submit" className="cursor-pointer w-full rounded-[2rem] bg-[var(---btncolor)] p-2 text-[var(---whitetext)] font-thin hover:bg-[var(---whitetext)] hover:border-[var(---btncolor)] hover:text-[var(---btncolor)] hover:border-[1px] duration-[1s]">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default About;
