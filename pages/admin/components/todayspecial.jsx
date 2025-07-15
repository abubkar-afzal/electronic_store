import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";
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
    percentLabel: "",
    note1: "",
    note2: "",
    button: "",
    file: null,
    id: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/todayspecial");
      if (res.ok) {
        const dbData = await res.json();
        setData(
          dbData && Object.keys(dbData).length > 0
            ? dbData
            : {
                img: "",
                label: "",
                title: "",
                percent: "",
                percent_label: "",
                percentLabel: "",
                note1: "",
                note2: "",
                button_text: "",
              }
        );
      }
    };
    fetchData();
  }, []);

  const openEditModal = () => {
    setForm({
      img: data.image || data.img,
      label: data.label || "",
      title: data.title || "",
      percent: data.percent || "",
      percentLabel: data.percent_label || "",
      percentLabel: data.percentLabel || "",
      note1: data.note1 || "",
      note2: data.note2 || "",
      button: data.button_text || "",
      file: null,
      id: data.id,
    });
    setEditModalOpen(true);
  };
  const [errors, setErrors] = useState({});

  const validateBestPrice = () => {
    const newErrors = {};
    if (!form.label || form.label.trim().length < 2)
      newErrors.label = "Label is required (min 2 chars)";
    if (!form.title || form.title.trim().length < 2)
      newErrors.title = "Title is required (min 2 chars)";
    if (!form.percent || form.percent.trim().length < 1)
      newErrors.percent = "Percent is required (min 1 chars)";
    if (!form.percentLabel || form.percentLabel.trim().length < 2)
      newErrors.percentLabel = "Percent Label is required (min 2 chars)";
    if (!form.note1 || form.note1.trim().length < 2)
      newErrors.note1 = "Note 1 are required (min 2 chars)";
    if (!form.note2 || form.note2.trim().length < 2)
      newErrors.note2 = "Note 2 are required (min 2 chars)";
    if (!form.button || form.button.trim().length < 2)
      newErrors.button = "Button text is required (min 2 chars)";
    if (!form.img) newErrors.img = "Image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const inputVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.04, type: "spring", stiffness: 120 },
    }),
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
    if (!validateBestPrice()) return;
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
      percentLabel: form.percentLabel,
      note1: form.note1,
      note2: form.note2,
      button_text: form.button,
      image,
      id: form.id,
    };

    await fetch("/api/todayspecial", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

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
              {data.percentLabel}
            </div>
            <div className="font-thin l:text-[20px] my-2 w-[80%]">
              {data.note1}
            </div>
            <div className="font-thin l:text-[20px] my-2 w-[80%]">
              {data.note2}
            </div>
            <Link href="/components/category/allproducts">
              <button className="p-2 px-[2rem] bg-[var(---btncolor)] text-[var(---whitetext)] rounded-[1.5rem] l:text-[22px] l:px-[3rem] mb-[2rem] mt-[1rem] cursor-pointer hover:bg-transparent hover:text-[var(---btncolor)] hover:border-[var(---btncolor)] hover:border-[1px] duration-[1s]">
                {data.button_text}
              </button>
            </Link>
          </div>
        </div>
      </div>

      {editModalOpen ? (
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
            className="bg-white rounded-lg p-8 shadow-lg w-[400px] max-h-[90vh] scrollbar-hide overflow-y-auto"
          >
            <div className="text-2xl font-bold mb-4">Edit Today's Special</div>
            <div className=" mb-4">Update the deal details and image.</div>
            <motion.div
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center"
            >
              {[
                {
                  label: "Label:",
                  htmlFor: "label",
                  input: (
                    <>
                      <input
                        type="text"
                        id="label"
                        name="label"
                        value={form.label}
                        onChange={handleFormChange}
                        className={`outline-2 focus:outline-black m-2 w-full p-1 rounded-[4px] ${
                          errors.label ? "border border-red-500" : ""
                        }`}
                      />
                      {errors.label && (
                        <div className="text-red-500 text-xs mb-1">
                          {errors.lebel}
                        </div>
                      )}
                    </>
                  ),
                },
                {
                  label: "Title:",
                  htmlFor: "title",
                  input: (
                    <>
                      <input
                        type="text"
                        id="title"
                        name="title"
                        value={form.title}
                        onChange={handleFormChange}
                        className={`outline-2 focus:outline-black m-2 w-full p-1 rounded-[4px] ${
                          errors.title ? "border border-red-500" : ""
                        }`}
                      />
                      {errors.title && (
                        <div className="text-red-500 text-xs mb-1">
                          {errors.title}
                        </div>
                      )}
                    </>
                  ),
                },
                {
                  label: "Percent:",
                  htmlFor: "percent",
                  input: (
                    <>
                      <input
                        type="number"
                        id="percent"
                        name="percent"
                        value={form.percent}
                        onChange={handleFormChange}
                        className={`outline-2 focus:outline-black m-2 w-full p-1 rounded-[4px] ${
                          errors.percent ? "border border-red-500" : ""
                        }`}
                      />
                      {errors.percent && (
                        <div className="text-red-500 text-xs mb-1">
                          {errors.percent}
                        </div>
                      )}
                    </>
                  ),
                },
                {
                  label: "Percentage Label:",
                  htmlFor: "percentLabel",
                  input: (
                    <>
                      <input
                        type="text"
                        id="percentLabel"
                        name="percentLabel"
                        value={form.percentLabel}
                        onChange={handleFormChange}
                        className={`outline-2 focus:outline-black m-2 w-full p-1 rounded-[4px] ${
                          errors.percentLabel ? "border border-red-500" : ""
                        }`}
                      />
                      {errors.percentLabel && (
                        <div className="text-red-500 text-xs mb-1">
                          {errors.percentLabel}
                        </div>
                      )}
                    </>
                  ),
                },
                {
                  label: "Note 1:",
                  htmlFor: "note1",
                  input: (
                    <>
                      <input
                        type="text"
                        id="note1"
                        name="note1"
                        value={form.note1}
                        onChange={handleFormChange}
                        className={`outline-2 focus:outline-black m-2 w-full p-1 rounded-[4px] ${
                          errors.note1 ? "border border-red-500" : ""
                        }`}
                      />
                      {errors.note1 && (
                        <div className="text-red-500 text-xs mb-1">
                          {errors.note1}
                        </div>
                      )}
                    </>
                  ),
                },
                {
                  label: "Note 2:",
                  htmlFor: "note2",
                  input: (
                    <>
                      <input
                        type="text"
                        id="note2"
                        name="note2"
                        value={form.note2}
                        onChange={handleFormChange}
                        className={`outline-2 focus:outline-black m-2 w-full p-1 rounded-[4px] ${
                          errors.note2 ? "border border-red-500" : ""
                        }`}
                      />
                      {errors.note2 && (
                        <div className="text-red-500 text-xs mb-1">
                          {errors.note2}
                        </div>
                      )}
                    </>
                  ),
                },
                {
                  label: "Button Text:",
                  htmlFor: "button",
                  input: (
                    <>
                      <input
                        type="text"
                        id="button"
                        name="button"
                        value={form.button}
                        onChange={handleFormChange}
                        className={`outline-2 focus:outline-black m-2 w-full p-1 rounded-[4px] ${
                          errors.button ? "border border-red-500" : ""
                        }`}
                      />
                      {errors.button && (
                        <div className="text-red-500 text-xs mb-1">
                          {errors.button}
                        </div>
                      )}
                    </>
                  ),
                },
              ].map((field, i) => (
                <motion.div
                  key={field.htmlFor}
                  custom={i}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-full"
                >
                  <label htmlFor={field.htmlFor}>{field.label}</label>
                  {field.input}
                </motion.div>
              ))}

              <motion.label
                custom={15}
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                htmlFor="file"
                className="mt-4 flex bg-[var(---btncolor)] text-[var(---whitetext)] px-4 py-2 cursor-pointer w-full justify-center hover:bg-transparent hover:border hover:border-[var(---btncolor)] hover:text-[var(---btncolor)] duration-[1s] rounded-[6px] "
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
              </motion.label>
              {errors.img && (
                <div className="text-red-500 text-xs mb-1">{errors.img}</div>
              )}
              {form.img && (
                <motion.div
                  custom={16}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-full flex justify-center"
                >
                  <Image
                    src={form.img}
                    alt="Preview"
                    className="mt-2 w-24 h-24 object-cover rounded"
                    width={96}
                    height={96}
                  />
                </motion.div>
              )}
            </motion.div>
            <div className="flex l:flex-row sm:flex-col l:space-x-[1rem] items-center justify-center l:w-[100%] l:mt-[2rem]">
              <button
                className="px-6 py-2 bg-[var(---btncolor)] cursor-pointer text-white hover:bg-transparent hover:border hover:border-[var(---btncolor)] hover:text-[var(---btncolor)] duration-[1s] rounded-[6px]"
                onClick={() => setEditModalOpen(false)}
              >
                Close
              </button>
              <button
                className="px-6 py-2 bg-[var(---btncolor)] cursor-pointer text-white hover:bg-transparent hover:border hover:border-[var(---btncolor)] hover:text-[var(---btncolor)] duration-[1s] rounded-[6px]"
                onClick={handleSave}
              >
                Update
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </>
  );
};

export default TodaySpecial;
