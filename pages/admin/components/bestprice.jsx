import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
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

  // Fetch data from API on mount
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

  // Keep form in sync with data when opening modal
  const openEditModal = () => {
    setForm({
      img: data.image || data.img ,
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
      id: form.id, // for update if exists
    }),
  });

  // Refetch from DB after save
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
          <div className="relative t:w-[120%]">
            <Image
              src={data.image || data.img }
              width={1020}
              height={100}
              alt="img1"
              className="w-full h-[30%] l:h-[90vh] rounded-br-[10rem]"
            />
            <div className="absolute top-10 l:top-[30%] l:right-[-3rem] right-3 bg-[var(---salelabel)] text-[var(---whitetext)] font-bold text-[20px] l:text-[2rem] w-[5rem] l:w-[9rem] t:p-5 text-center p-3 rounded-full rotate-24">
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
              className="bg-white rounded-lg p-8 shadow-lg sm:max-w-sm sm:w-full l:max-w-full text-center l:w-[30rem] max-h-[90vh] scrollbar-hide overflow-y-auto"
            >
              <div className="text-2xl font-bold mb-4">
                Edit Best Price Section
              </div>
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
                <label htmlFor="saveText">Save Text:</label>
                <input
                  type="text"
                  id="saveText"
                  name="saveText"
                  value={form.saveText}
                  onChange={handleFormChange}
                  className="outline focus:outline-black m-2"
                />
                <label htmlFor="amount">Amount:</label>
                <input
                  type="text"
                  id="amount"
                  name="amount"
                  value={form.amount}
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
                <label htmlFor="terms">Terms:</label>
                <input
                  type="text"
                  id="terms"
                  name="terms"
                  value={form.terms}
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
                  className="mt-4 flex bg-[var(---btncolor)] text-[var(---whitetext)] px-4 py-2 rounded cursor-pointer hover:bg-transparent hover:text-[var(---btncolor)] hover:border-[1px] hover:border-[var(---btncolor)] duration-[1s]"
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
        )}
      </AnimatePresence>
    </>
  );
};

export default BestPrice;