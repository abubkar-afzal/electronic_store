import Image from "next/image";
import React, { useState } from "react";
import img from "../assets/img5.jpg";
import { RiErrorWarningLine } from "react-icons/ri";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaEdit } from "react-icons/fa";
import Newsletter from "../newsletter";

const initialStoreInfo = {
  location: "500 Japan Bara Market, Shah Allam Market, Lahore, Punjab, Pakisatn 54000",
  email: "arcodes504@gmail.com",
  phone: "+923270972423",
  hours: [
    "Mon - Fri: 8:00 AM - 8:00 PM",
    "Saturday: 9:00 AM - 7:00 PM",
    "Sunday: Closed",
  ],
};

const Contact = () => {
  const [storeInfo, setStoreInfo] = useState(initialStoreInfo);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [form, setForm] = useState({
    location: storeInfo.location,
    email: storeInfo.email,
    phone: storeInfo.phone,
    hours: [...storeInfo.hours],
  });

  const openEditModal = () => {
    setForm({
      location: storeInfo.location,
      email: storeInfo.email,
      phone: storeInfo.phone,
      hours: [...storeInfo.hours],
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

  const handleSave = () => {
    setStoreInfo({
      location: form.location,
      email: form.email,
      phone: form.phone,
      hours: [...form.hours],
    });
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
              {storeInfo.hours.map((h, i) => (
                <div key={i} className="text-[13px] font-thin text-center my-1 cursor-pointer l:text-[16px]">
                  {h}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-200">
          <div className="bg-white rounded-lg p-8 shadow-lg w-[350px]">
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
              />
              <label className="mt-2">Opening Hours:</label>
              {form.hours.map((h, idx) => (
                <input
                  key={idx}
                  type="text"
                  value={h}
                  onChange={(e) => handleHoursChange(idx, e.target.value)}
                  className="outline focus:outline-black m-2 w-full"
                />
              ))}
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
          </div>
        </div>
      )}
      <Newsletter />
    </>
  );
};
export default Contact;