import React, { useState, useEffect } from "react";
import { RiErrorWarningLine } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import Newsletter from "../newsletter";
import { motion, AnimatePresence } from "framer-motion";

const Contact = () => {
  const [storeInfo, setStoreInfo] = useState({
    location: "",
    email: "",
    phone: "",
    hours: [],
    id: null,
  });
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [form, setForm] = useState({
    location: "",
    email: "",
    phone: "",
    hours: [],
    id: null,
  });
 const [showDayDropdown, setShowDayDropdown] = useState(false);
  const day = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
  ];
  // Fetch store info from API on mount
  useEffect(() => {
    const fetchStoreInfo = async () => {
      const res = await fetch("/api/contact");
      if (res.ok) {
        const dbData = await res.json();
        setStoreInfo(dbData && Object.keys(dbData).length > 0 ? dbData : {
          location: "",
          email: "",
          phone: "",
          hours: [],
          id: null,
        });
      }
    };
    fetchStoreInfo();
  }, []);

  const openEditModal = () => {
    setForm({
      location: storeInfo.location || "",
      email: storeInfo.email || "",
      phone: storeInfo.phone || "",
      hours: storeInfo.hours && storeInfo.hours.length > 0 ? [...storeInfo.hours] : [""],
    id: storeInfo.id,
  });
    setEditModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleHoursChange = (idx, value) => {
    setForm((prev) => {
      const hours = [...prev.hours];
      hours[idx] = value;
      return { ...prev, hours };
    });
  };

  const handleSave = async () => {
    // Save to API (update or insert)
    const payload = {
      location: form.location,
      email: form.email,
      phone: form.phone,
      hours: form.hours,
      id: form.id,
    };

    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // Refetch from DB after save
    const res = await fetch("/api/contact");
    if (res.ok) {
      const dbData = await res.json();
      setStoreInfo(dbData);
    }
    setEditModalOpen(false);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center p-4 bg-[var(---whitetext)]">
        <div className="w-[80vw] pb-[2rem] text-center text-[2rem] font-sans font-bold border-b-[1px]">
          Get in Touch
        </div>
        <div className="l:grid l:grid-cols-2 l:gap-[2rem] l:px-[2rem]">
          <div>
            <div className="my-[2rem]  py-[1rem]">
              <div className="text-center my-[1rem] mt-[2rem] text-[20px] font-bold l:text-[25px]">
                We're here to help!
              </div>
              <div className="text-center mb-[2rem] l:text-[18px]">
                Fill out the form with any query on your mind and we'll get back
                to you as soon as possible.
              </div>
            </div>

            <form action="post" className="w-full l:grid l:grid-cols-4 l:gap-[1rem] l:text-[18px]">
              <div className="px-[1rem] my-[1rem] l:col-start-1 l:col-end-3">
                <div htmlFor="FirstName" className="font-thin">
                  First Name*
                </div>
                <input
                  type="text"
                  id="FirstName"
                  name="FirstName"
                  required
                  className="border-b-[2px] w-full h-[3rem] appearance-none focus:outline-none border-[var(---inputborder)] hover:border-[var(---inputhoverborder)]"
                />
                <div className="flex items-center text-[var(---error)] mt-[0.5rem] text-[14px]">
                  <RiErrorWarningLine className="m-2" />
                  <div>Enter a first name.</div>
                </div>
              </div>
              <div className="px-[1rem] my-[1rem] l:col-start-3 l:col-end-5">
                <div htmlFor="LastName" className="font-thin">
                  Last Name*
                </div>
                <input
                  type="text"
                  id="LastName"
                  name="LastName"
                  required
                  className="border-b-[2px] w-full h-[3rem] appearance-none focus:outline-none border-[var(---inputborder)] hover:border-[var(---inputhoverborder)]"
                />
                <div className="flex items-center text-[var(---error)] mt-[0.5rem] text-[14px]">
                  <RiErrorWarningLine className="m-2" />
                  <div>Enter a last name.</div>
                </div>
              </div>
              <div className="px-[1rem] my-[1rem] l:col-start-1 l:col-end-3">
                <div htmlFor="Email" className="font-thin">
                  Email*
                </div>
                <input
                  type="email"
                  id="Email"
                  name="Email"
                  required
                  className="border-b-[2px] w-full h-[3rem] appearance-none focus:outline-none border-[var(---inputborder)] hover:border-[var(---inputhoverborder)]"
                />
                <div className="flex items-center text-[var(---error)] mt-[0.5rem] text-[14px]">
                  <RiErrorWarningLine className="m-2" />
                  <div>Enter a email.</div>
                </div>
              </div>
              <div className="px-[1rem] my-[1rem] l:col-start-3 l:col-end-5">
                <div htmlFor="Subject" className="font-thin">
                  Subject*
                </div>
                <input
                  type="text"
                  id="Subject"
                  name="Subject"
                  required
                  className="border-b-[2px] w-full h-[3rem] appearance-none focus:outline-none border-[var(---inputborder)] hover:border-[var(---inputhoverborder)]"
                />
                <div className="flex items-center text-[var(---error)] mt-[0.5rem] text-[14px]">
                  <RiErrorWarningLine className="m-2" />
                  <div>Enter your Subject.</div>
                </div>
              </div>
              <div className="px-[1rem] my-[1rem] l:col-start-1 l:col-end-5">
                <div htmlFor="Resume" className="font-thin">
                  Leave us a message...
                </div>
                <textarea
                  type="text"
                  id="Resume"
                  name="Resume"
                  required
                  className="border-b-[2px] w-full h-[6rem] appearance-none focus:outline-none border-[var(---inputborder)] hover:border-[var(---inputhoverborder)]"
                />
                <div className="flex items-center text-[var(---error)] mt-[0.5rem] text-[14px]">
                  <RiErrorWarningLine className="m-2" />
                  <div>Give your resume link.</div>
                </div>
              </div>
              <div className="px-[1rem] my-[1rem] l:col-start-1 l:col-end-3 l:content-center">
                <button
                  id="submit"
                  className="w-full rounded-[2rem] bg-[var(---btncolor)] p-2 text-[var(---whitetext)] font-thin hover:bg-[var(---whitetext)] hover:border-[var(---btncolor)] hover:text-[var(---btncolor)] hover:border-[1px] cursor-pointer duration-[1s]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div>
                <div className="flex flex-col items-center px-[4rem] py-[2rem] l:my-[2rem] relative">
              <FaEdit
                className="absolute top-2 right-2 text-[40px] cursor-pointer text-[var(---edit)]"
                onClick={openEditModal}
                title="Edit Store Info"
              />
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
  {storeInfo.hours && storeInfo.hours.map((h, i) => {
    let from = "", to = "", day = "";
    if (typeof h === "object" && h !== null) {
      from = h.from || "";
      to = h.to || "";
      day = h.day || "";
    } else if (typeof h === "string" && h.includes(" to ")) {
      [from, to] = h.split(" to ");
    }
    // Format time to 12-hour with AM/PM
    function formatTime(t) {
      if (!t) return "";
      const [hour, minute] = t.split(":");
      let h = parseInt(hour, 10);
      const ampm = h >= 12 ? "PM" : "AM";
      h = h % 12 || 12;
      return `${h}:${minute} ${ampm}`;
    }
    return (
      <div key={i} className="text-[13px] font-thin text-center my-1 cursor-pointer l:text-[16px]">
        {day && <span className="font-semibold">{day}: </span>}
        {from && to ? `${formatTime(from)} to ${formatTime(to)}` : ""}
      </div>
    );
  })}
</div>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {editModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-200"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg p-8 shadow-lg w-[350px]"
            >
              <div className="text-2xl font-bold mb-4">Edit Store Info</div>
              <div className="flex flex-col items-center">
                <label htmlFor="location">Location:</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={form.location}
                  onChange={handleFormChange}
                  className="outline focus:outline-black m-2 w-full"
                />
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={form.email}
                  onChange={handleFormChange}
                  className="outline focus:outline-black m-2 w-full"
                />
                <label htmlFor="phone">Phone:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={form.phone}
                  onChange={handleFormChange}
                  className="outline focus:outline-black m-2 w-full"
                /><label className="mt-2">Opening Hours:</label>
                <div className="w-full h-[10rem] overflow-y-scroll scrollbar-hide">
               
{form.hours.map((h, idx) => {
  // Safely extract day, from, to from each hour object
  const dayValue = typeof h === "object" && h !== null ? h.day || "" : "";
  const from = typeof h === "object" && h !== null ? h.from || "" : "";
  const to = typeof h === "object" && h !== null ? h.to || "" : "";

  return (
    <div key={idx} className="flex flex-col items-center w-full relative ">
      <div className="w-auto relative">
        <div
          className="outline focus:outline-black m-2 px-2 py-2 bg-white border  border-gray-300 rounded cursor-pointer flex justify-between items-center"
          onClick={() => setShowDayDropdown(idx)}
          tabIndex={0}
          onBlur={() => setTimeout(() => setShowDayDropdown(false), 150)}
        >
          <span>{dayValue || "Day"}</span>
          <span className="mx-2">{showDayDropdown === idx ? "▲" : "▼"}</span>
        </div>
        <AnimatePresence>
          {showDayDropdown === idx && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute left-0 right-0 bg-white border border-gray-300 z-10 rounded shadow"
            >
              {day.map(d => (
                <li
                  key={d}
                  className={`px-4 py-2 hover:bg-[var(---btncolor)] hover:text-white cursor-pointer ${dayValue === d ? "bg-gray-100" : ""}`}
                  onClick={() => {
                    const newHours = [...form.hours];
                    newHours[idx] = { ...newHours[idx], day: d, from, to };
                    setForm(f => ({ ...f, hours: newHours }));
                    setShowDayDropdown(false);
                  }}
                >
                  {d}
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      
      <input
        type="time"
        value={from}
        onChange={e => {
          const newHours = [...form.hours];
          newHours[idx] = { ...newHours[idx], from: e.target.value, to, day: dayValue };
          setForm(f => ({ ...f, hours: newHours }));
        }}
        className="outline focus:outline-black m-2 w-[25%]"
      />
      <span className="mx-2">to</span>
      <input
        type="time"
        value={to}
        onChange={e => {
          const newHours = [...form.hours];
          newHours[idx] = { ...newHours[idx], from, to: e.target.value, day: dayValue };
          setForm(f => ({ ...f, hours: newHours }));
        }}
        className="outline focus:outline-black m-2 w-[25%]"
      />
      <button
        type="button"
        className="ml-2 text-red-500"
        onClick={() => setForm(f => ({
          ...f,
          hours: f.hours.filter((_, i) => i !== idx)
        }))}
        title="Remove"
      >
        &times;
      </button>
    </div>
  );
})}</div>
<button
  type="button"
  className="px-3 py-1 bg-[var(---btncolor)] text-white rounded mt-2"
  onClick={() => setForm(f => ({
    ...f,
    hours: [...f.hours, { day: "", from: "", to: "" }]
  }))}
>
  Add Hour
</button>
              </div>
              <div className="flex justify-between mt-6">
                <button
                  className="px-6 py-2 bg-[var(---btncolor)] cursor-pointer text-white rounded"
                  onClick={() => setEditModalOpen(false)}
                >
                  Close
                </button>
                <button
                  className="px-6 py-2 bg-[var(---btncolor)] cursor-pointer text-white rounded"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Newsletter />
    </>
  );
};

export default Contact;