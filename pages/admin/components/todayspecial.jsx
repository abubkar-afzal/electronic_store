import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const TodaySpecial = () => {
  const [data, setData] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [form, setForm] = useState({
    img: "",
    label: "",
    title: "",
    percent: "",
    percentLabel: "",
    description: "",
    note1: "",
    note2: "",
    button: "",
    file: null,
    id: null,
  });

  // Fetch from API on mount
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/todayspecial");
      if (res.ok) {
        const dbData = await res.json();
        setData(dbData && Object.keys(dbData).length > 0 ? dbData : {
          img: "",
          label: "",
          title: "",
          percent: "",
          percent_label: "",
          description: "",
          note1: "",
          note2: "",
          button_text: "",
        });
      }
    };
    fetchData();
  }, []);

  // Open modal and sync form with DB data
  const openEditModal = () => {
    setForm({
      img: data.image || data.img,
      label: data.label || "",
      title: data.title || "",
      percent: data.percent || "",
      percentLabel: data.percent_label || "",
      description: data.description || "",
      note1: data.note1 || "",
      note2: data.note2 || "",
      button: data.button_text || "",
      file: null,
      id: data.id,
    });
    setEditModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file" && files && files[0]) {
      setForm((f) => ({
        ...f,
        file: files[0],
        img: URL.createObjectURL(files[0]),
      }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSave = async () => {
    let image = form.img;
    if (form.file) {
      image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.onerror = reject;
        reader.readAsDataURL(form.file);
      });
    }

    const payload = {
      label: form.label,
      title: form.title,
      percent: form.percent,
      percent_label: form.percentLabel,
      description: form.description,
      note1: form.note1,
      note2: form.note2,
      button_text: form.button,
      image,
      id: form.id, // for update if exists
    };

    await fetch("/api/todayspecial", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    // Refetch from DB after save
    const res = await fetch("/api/todayspecial");
    if (res.ok) {
      const dbData = await res.json();
      setData(dbData);
    }
    setEditModalOpen(false);
  };

  return (
    <>
      <div className="relative">
        <FaEdit
          className="absolute top-4 right-4 z-50 text-[40px] cursor-pointer text-[var(---edit)]"
          onClick={openEditModal}
          title="Edit Section"
        />
        <div className="bg-[var(---whitetext)] l:grid l:h-[90vh] l:grid-cols-2 l:gap-[1rem] l:overflow-hidden mb-[1rem]">
          <div className="relative l:col-start-2 l:row-start-1 l:w-[130%] l:ml-[-11rem]">
            <Image
              src={data.image || data.img}
              width={1020}
              height={100}
              alt="img1"
              className="w-full h-[30%] l:h-[90vh] rounded-bl-[10rem]"
            />
          </div>
          <div className="ml-5 mt-4 l:flex l:flex-col l:justify-center l:items-start l:content-center l:w-[80%] l:ml-[15%]">
            <div className="text-[20px] l:text-[22px] font-thin bg-[var(---salelabel)] inline text-[var(---whitetext)] px-2 mt-2">
              {data.label}
            </div>
            <div className="text-[20px] l:text-[30px] font-semibold my-2 w-[80%]">
              {data.title}
            </div>
            <div className="text-[55px] font-bold flex l:text-[6rem]">
              <div className="text-[var(---btncolor)] mr-2">{data.percent}</div>
              {data.percent_label}
            </div>
            <div className="text-[20px] l:text-[30px] font-semibold w-[80%]">
              {data.description}
            </div>
            <div className="font-thin l:text-[20px] my-2 w-[80%]">{data.note1}</div>
            <div className="font-thin l:text-[20px] my-2 w-[80%]">{data.note2}</div>
            <Link href="/components/category/allproducts">
              <button className="p-2 px-[2rem] bg-[var(---btncolor)] text-[var(---whitetext)] rounded-[1.5rem] l:text-[22px] l:px-[3rem] mb-[2rem] mt-[1rem] cursor-pointer hover:bg-transparent hover:text-[var(---btncolor)] hover:border-[var(---btncolor)] hover:border-[1px] duration-[1s]">
                {data.button_text}
              </button>
            </Link>
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
              className="bg-white rounded-lg p-8 shadow-lg w-[350px] max-h-[90vh] scrollbar-hide overflow-y-auto"
            >
              <div className="text-2xl font-bold mb-4">Edit Today's Special</div>
              <div className="flex flex-col items-center">
                <label htmlFor="label">Label:</label>
                <input
                  type="text"
                  id="label"
                  name="label"
                  value={form.label}
                  onChange={handleFormChange}
                  className="outline focus:outline-black m-2"
                />
                <label htmlFor="title">Title:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  className="outline focus:outline-black m-2"
                />
                <label htmlFor="percent">Percent:</label>
                <input
                  type="text"
                  id="percent"
                  name="percent"
                  value={form.percent}
                  onChange={handleFormChange}
                  className="outline focus:outline-black m-2"
                />
                <label htmlFor="percentLabel">Percent Label:</label>
                <input
                  type="text"
                  id="percentLabel"
                  name="percentLabel"
                  value={form.percentLabel}
                  onChange={handleFormChange}
                  className="outline focus:outline-black m-2"
                />
                <label htmlFor="description">Description:</label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  className="outline focus:outline-black m-2"
                />
                <label htmlFor="note1">Note 1:</label>
                <input
                  type="text"
                  id="note1"
                  name="note1"
                  value={form.note1}
                  onChange={handleFormChange}
                  className="outline focus:outline-black m-2"
                />
                <label htmlFor="note2">Note 2:</label>
                <input
                  type="text"
                  id="note2"
                  name="note2"
                  value={form.note2}
                  onChange={handleFormChange}
                  className="outline focus:outline-black m-2"
                />
                <label htmlFor="button">Button Text:</label>
                <input
                  type="text"
                  id="button"
                  name="button"
                  value={form.button}
                  onChange={handleFormChange}
                  className="outline focus:outline-black m-2"
                />
                <label
                  htmlFor="file"
                  className="mt-4 flex bg-[var(---btncolor)] text-[var(---whitetext)] px-4 py-2 rounded cursor-pointer"
                >
                  Upload Image
                  <input
                    type="file"
                    id="file"
                    name="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFormChange}
                  />
                </label>
                {form.img && (
                  <Image
                    src={form.img}
                    alt="Preview"
                    className="mt-2 w-24 h-24 object-cover rounded"
                    width={96}
                    height={96}
                  />
                )}
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
    </>
  );
};

export default TodaySpecial;