import React, { useState, useEffect } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import Newsletter from "../newsletter";

const Contact = () => {
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Subject: "",
    Resume: "",
  });

  const [storeInfo, setStoreInfo] = useState({
    location: "",
    email: "",
    phone: "",
    hours: [],
    id: null,
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchStoreInfo = async () => {
      const res = await fetch("/api/contact");
      if (res.ok) {
        const dbData = await res.json();
        setStoreInfo(
          dbData && Object.keys(dbData).length > 0
            ? dbData
            : {
                location: "",
                email: "",
                phone: "",
                hours: [],
                id: null,
              }
        );
      }
    };
    fetchStoreInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await fetch("/api/submitContact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        setMessage("✅ Your message was sent successfully!");
        setFormData({
          FirstName: "",
          LastName: "",
          Email: "",
          Subject: "",
          Resume: "",
        });
      } else {
        setMessage("❌ Failed to submit. Please try again.");
      }
    } catch (err) {
      setMessage("❌ Something went wrong.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center p-4 bg-[var(---whitetext)]">
        <div className="w-[80vw] pb-[2rem] text-center text-[2rem] font-sans font-bold border-b-[1px]">
          Get in Touch
        </div>
        <div className="l:grid l:grid-cols-2 l:gap-[2rem] l:px-[2rem]">
          <div>
            <div className="my-[2rem] py-[1rem]">
              <div className="text-center my-[1rem] mt-[2rem] text-[20px] font-bold l:text-[25px]">
                We're here to help!
              </div>
              <div className="text-center mb-[2rem] l:text-[18px]">
                Fill out the form with any query on your mind and we'll get back
                to you as soon as possible.
              </div>
            </div>

            <form onSubmit={handleSubmit} className="w-full l:grid l:grid-cols-4 l:gap-[1rem] l:text-[18px]">
              {[
                { label: "First Name*", name: "FirstName", col: "1-3" },
                { label: "Last Name*", name: "LastName", col: "3-5" },
                { label: "Email*", name: "Email", col: "1-3", type: "email" },
                { label: "Subject*", name: "Subject", col: "3-5" },
              ].map((field, i) => (
                <div
                  key={i}
                  className={`px-[1rem] my-[1rem] l:col-start-${field.col.split("-")[0]} l:col-end-${field.col.split("-")[1]}`}
                >
                  <div className="font-thin">{field.label}</div>
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    required
                    className="border-b-[2px] w-full h-[3rem] appearance-none focus:outline-none border-[var(---inputborder)] hover:border-[var(---inputhoverborder)]"
                  />
                </div>
              ))}

              <div className="px-[1rem] my-[1rem] l:col-start-1 l:col-end-5">
                <div className="font-thin">Leave us a message...</div>
                <textarea
                  name="Resume"
                  value={formData.Resume}
                  onChange={handleChange}
                  required
                  className="border-b-[2px] w-full h-[6rem] appearance-none focus:outline-none border-[var(---inputborder)] hover:border-[var(---inputhoverborder)]"
                />
              </div>

              <div className="px-[1rem] my-[1rem] l:col-start-1 l:col-end-3 l:content-center">
                <button
                  type="submit"
                  className="w-full rounded-[2rem] bg-[var(---btncolor)] p-2 text-[var(---whitetext)] font-thin hover:bg-[var(---whitetext)] hover:border-[var(---btncolor)] hover:text-[var(---btncolor)] hover:border-[1px] cursor-pointer duration-[1s]"
                >
                  Submit
                </button>
                {message && <p className="mt-2 text-center text-sm">{message}</p>}
              </div>
            </form>
          </div>

          <div>
            <div className="flex flex-col items-center px-[4rem] py-[2rem] l:my-[2rem]">
              <div className="text-[18px] font-bold my-[1rem] l:text-[22px]">
                Store Location
              </div>
              <div className="font-thin text-center my-1 cursor-pointer l:text-[18px]">
                {storeInfo.location}
              </div>
              <div className="font-thin text-center my-1 cursor-pointer l:text-[18px]">
                {storeInfo.email}
              </div>
              <div className="font-thin text-center my-1 cursor-pointer l:text-[18px]">
                {storeInfo.phone}
              </div>
            </div>

            <div className="flex flex-col items-center px-[4rem] py-[2rem]">
              <div className="text-[18px] font-bold my-[1rem] l:text-[22px]">
                Opening Hours
              </div>
              {storeInfo.hours?.map((h, i) => {
                let from = "", to = "", day = "";
                if (typeof h === "object" && h !== null) {
                  from = h.from || "";
                  to = h.to || "";
                  day = h.day || "";
                } else if (typeof h === "string" && h.includes(" to ")) {
                  [from, to] = h.split(" to ");
                }
                const formatTime = (t) => {
                  if (!t) return "";
                  const [hour, minute] = t.split(":");
                  let h = parseInt(hour, 10);
                  const ampm = h >= 12 ? "PM" : "AM";
                  h = h % 12 || 12;
                  return `${h}:${minute} ${ampm}`;
                };
                return (
                  <div
                    key={i}
                    className="text-[13px] font-thin text-center my-1 cursor-pointer l:text-[16px]"
                  >
                    {day && <span className="font-semibold">{day}: </span>}
                    {from && to ? `${formatTime(from)} to ${formatTime(to)}` : ""}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Newsletter />
    </>
  );
};

export default Contact;
