import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";
import Link from "next/link";

const BestPrice = () => {
  const [data, setData] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [form, setForm] = useState({
    img: "",
    label: "",
    saveText: "",
    amount: "",
    description: "",
    terms: "",
    button: "",
    file: null,
  });
  const [errors, setErrors] = useState({});

  const validateBestPrice = () => {
    const newErrors = {};
    if (!form.label || form.label.trim().length < 2)
      newErrors.label = "Label is required (min 2 chars)";
    if (!form.saveText || form.saveText.trim().length < 2)
      newErrors.saveText = "Save Text is required (min 2 chars)";
    if (!form.amount || form.amount.trim().length < 1)
      newErrors.amount = "Amount is required (min 1 chars)";
    if (!form.description || form.description.trim().length < 2)
      newErrors.description = "Description is required (min 2 chars)";
    if (!form.terms || form.terms.trim().length < 2)
      newErrors.terms = "Terms are required (min 2 chars)";
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
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/bestprice");
      if (res.ok) {
        const dbData = await res.json();
        setData(dbData);
      }
    };
    fetchData();
  }, []);

  const openEditModal = () => {
    setForm({
      img: data.image || data.img,
      label: data.label || "",
      saveText: data.save_text || "",
      amount: data.amount || "",
      description: data.description || "",
      terms: data.terms || "",
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

    await fetch("/api/bestprice", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        label: form.label,
        save_text: form.saveText,
        amount: form.amount,
        description: form.description,
        terms: form.terms,
        button_text: form.button,
        image,
        id: form.id,
      }),
    });

    const res = await fetch("/api/bestprice");
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
          className="absolute top-4 l:right-4 l:left-auto  sm:right-auto sm:left-4 z-50 text-[40px] cursor-pointer text-[var(---edit)]"
          onClick={openEditModal}
          title="Edit Section"
        />
        <div className="bg-[var(---whitetext)] my-[1rem] l:grid l:grid-cols-2 l:gap-[1rem] l:h-[90vh]">
          <div className="relative t:w-[98%]">
            <Image
              src={data.image || data.img}
              width={1020}
              height={100}
              alt="img1"
              className="w-full h-[30%] l:h-[90vh] rounded-br-[10rem]"
            />
            <div className="absolute top-10 l:top-[30%]  l:right-[-3rem] right-3 bg-[var(---salelabel)] text-[var(---whitetext)] font-bold text-[20px] l:text-[2rem] w-[5rem] l:w-[9rem] t:p-5 text-center p-3 rounded-full rotate-24">
              {data.label}
            </div>
          </div>
          <div className="ml-5 my-4  l:ml-[15vw] l:items-start l:content-center l:flex l:flex-col l:justify-center">
            <div className="text-[20px] l:text-[1.5rem] font-semibold mt-2">
              {data.save_text}
            </div>
            <div className="text-[55px] l:text-[6rem] font-bold">
              ${data.amount}
            </div>
            <div className="text-[18px] l:text-[2rem] font-semibold w-[55%]">
              {data.description}
            </div>
            <div className="font-thin my-2 l:text-[1.3rem]">{data.terms}</div>
            <Link href="/components/category/allproducts">
              <button className="p-2 px-[2rem] bg-[var(---btncolor)] text-[var(---whitetext)] rounded-[1.5rem] t:rounded-[3rem] mb-[2rem] l:text-[1.5rem] l:px-[3rem] hover:bg-transparent hover:text-[var(---btncolor)] hover:border-[var(---btncolor)] hover:border-[1px] duration-[1s] mt-[1rem] cursor-pointer">
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
            <div className="text-2xl font-bold mb-4">
              Edit Best Price Deal!!
            </div>
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
                  label: "Save Text:",
                  htmlFor: "saveText",
                  input: (
                    <>
                      <input
                        type="text"
                        id="saveText"
                        name="saveText"
                        value={form.saveText}
                        onChange={handleFormChange}
                        className={`outline-2 focus:outline-black m-2 w-full p-1 rounded-[4px] ${
                          errors.saveText ? "border border-red-500" : ""
                        }`}
                      />
                      {errors.saveText && (
                        <div className="text-red-500 text-xs mb-1">
                          {errors.saveText}
                        </div>
                      )}
                    </>
                  ),
                },
                {
                  label: "Amount:",
                  htmlFor: "amount",
                  input: (
                    <>
                      <input
                        type="number"
                        id="amount"
                        name="amount"
                        value={form.amount}
                        onChange={handleFormChange}
                        className={`outline-2 focus:outline-black m-2 w-full p-1 rounded-[4px] ${
                          errors.amount ? "border border-red-500" : ""
                        }`}
                      />
                      {errors.amount && (
                        <div className="text-red-500 text-xs mb-1">
                          {errors.amount}
                        </div>
                      )}
                    </>
                  ),
                },
                {
                  label: "Description:",
                  htmlFor: "description",
                  input: (
                    <>
                      <input
                        type="text"
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleFormChange}
                        className={`outline-2 focus:outline-black m-2 w-full p-1 rounded-[4px] ${
                          errors.description ? "border border-red-500" : ""
                        }`}
                      />
                      {errors.description && (
                        <div className="text-red-500 text-xs mb-1">
                          {errors.description}
                        </div>
                      )}
                    </>
                  ),
                },
                {
                  label: "Terms:",
                  htmlFor: "terms",
                  input: (
                    <>
                      <input
                        type="text"
                        id="terms"
                        name="terms"
                        value={form.terms}
                        onChange={handleFormChange}
                        className={`outline-2 focus:outline-black m-2 w-full p-1 rounded-[4px] ${
                          errors.terms ? "border border-red-500" : ""
                        }`}
                      />
                      {errors.terms && (
                        <div className="text-red-500 text-xs mb-1">
                          {errors.terms}
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

export default BestPrice;
