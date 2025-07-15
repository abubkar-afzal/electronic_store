import React, { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaEdit,
} from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

const Help_Center = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedValue, setSelectedValue] = useState("generaloption");
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ q: "", a: "", id: null });
  const [faqs, setFaqs] = useState([]);
  const [gen, setGen] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    fetchFaqs();
  }, [selectedValue]);

  const fetchFaqs = async () => {
    const res = await fetch(`/api/helpcenter?category=${selectedValue}`);
    if (res.ok) {
      const data = await res.json();
      if (selectedValue === "generaloption") setGen(data.faqs || []);
      else setFaqs(data.faqs || []);
    }
  };

  const getCurrentList = () => (selectedValue === "generaloption" ? gen : faqs);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setOpenIndex(null);
    setShowDropdown(false);
  };

  const openEditModal = (index = null) => {
    const list = getCurrentList();
    if (index !== null) {
      setForm({ q: list[index].q, a: list[index].a, id: list[index].id });
      setEditIndex(index);
    } else {
      setForm({ q: "", a: "", id: null });
      setEditIndex(null);
    }
    setEditModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSave = async () => {
    if (!form.q || !form.a) return;
    const payload = {
      q: form.q,
      a: form.a,
      category: selectedValue,
      id: form.id,
    };
    if (editIndex !== null) {
      await fetch("/api/helpcenter", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/helpcenter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    setEditModalOpen(false);
    setForm({ q: "", a: "", id: null });
    setEditIndex(null);
    fetchFaqs();
  };

  const handleDelete = async (index) => {
    const list = getCurrentList();
    const item = list[index];
    await fetch("/api/helpcenter", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id }),
    });
    fetchFaqs();
  };

  const dropdownOptions = [
    { value: "generaloption", label: "General" },
    { value: "settingupfaqsoption", label: "Setting up FAQs" },
  ];
  const selectedLabel =
    dropdownOptions.find((opt) => opt.value === selectedValue)?.label ||
    "Choose a category";

  return (
    <>
      <div className="flex flex-col items-center justify-center p-4 bg-[var(---whitetext)]">
        <div className="text-[2rem] font-sans font-bold text-center l:text-[45px]">
          AR Codes Help Center
        </div>
        <div>
          <div className="text-center my-[2rem] text-[20px] font-bold l:text-[25px]">
            Frequently Asked Questions
          </div>
          <div>
            <form className="flex items-center justify-center focus:outline-none border-[var(---inputborder)] hover:border-[var(---inputhoverborder)] border-b-[2px] px-2 l:text-[20px]">
              <input
                type="text"
                placeholder="Search for help..."
                className=" w-full max-w-md h-[3rem] appearance-none focus:outline-none  px-2"
              />
              <button type="submit" className="ml-2 ">
                <IoIosSearch size={24} />
              </button>
            </form>
          </div>
        </div>
        <div className="l:w-[70vw] w-full px-3 my-[1rem]">
          <div className="w-full px-3 my-[1rem] flex items-center justify-between">
            <div className="w-full relative">
              <div
                className="cursor-pointer outline outline-black text-[var(---btncolor)] px-2 my-3 h-[3rem] w-full flex items-center justify-between bg-white"
                onClick={() => setShowDropdown((v) => !v)}
                tabIndex={0}
                onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
              >
                <span>{selectedLabel}</span>
                <span className="ml-2">{showDropdown ? "▲" : "▼"}</span>
              </div>
              <AnimatePresence>
                {showDropdown && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 right-0 bg-white border border-gray-300 z-10 rounded shadow"
                  >
                    {dropdownOptions.map((opt) => (
                      <li
                        key={opt.value}
                        className={`px-4 py-2 hover:bg-[var(---btncolor)] hover:text-white cursor-pointer ${
                          selectedValue === opt.value ? "bg-gray-100" : ""
                        }`}
                        onClick={() => {
                          setSelectedValue(opt.value);
                          setShowDropdown(false);
                        }}
                      >
                        {opt.label}
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          </div>
          <button
            className="bg-[var(---btncolor)] text-white px-4 cursor-pointer py-2 rounded ml-4"
            onClick={() => openEditModal()}
            title="Add Question"
          >
            <FaEdit className="inline mr-2" /> Add
          </button>
          <div className="w-full p-4">
            {getCurrentList().map((item, index) => (
              <div key={item.id || index} className="border-b py-2 relative">
                <button
                  onClick={() =>
                    setOpenIndex(index === openIndex ? null : index)
                  }
                  className="w-full text-left cursor-pointer font-medium flex justify-between"
                >
                  {item.q}
                  <span>{openIndex === index ? "∧" : "∨"}</span>
                </button>
                <div className="l:absolute sm:justify-end my-2 top-2 right-10 flex space-x-2">
                  <FaEdit
                    className="text-[var(---edit)] cursor-pointer"
                    onClick={() => openEditModal(index)}
                    title="Edit"
                  />
                  <button
                    className="bg-red-500 text-white cursor-pointer px-2 py-1 rounded text-xs"
                    onClick={() => handleDelete(index)}
                    title="Delete"
                  >
                    Delete
                  </button>
                </div>
                <AnimatePresence initial={false}>
                  {openIndex === index && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="mt-2 text-sm text-gray-600">{item.a}</p>
                      <div className="flex text-[16px] space-x-2 my-[2rem]">
                        <FaFacebookF className="cursor-pointer" />
                        <FaInstagram className="cursor-pointer" />
                        <FaTwitter className="cursor-pointer" />
                        <FaYoutube className="cursor-pointer" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
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
              <div className="text-2xl font-bold mb-4">
                {editIndex !== null ? "Edit Question" : "Add New Question"}
              </div>
              <div className="flex flex-col items-center">
                <label htmlFor="q">Question:</label>
                <input
                  type="text"
                  id="q"
                  name="q"
                  value={form.q}
                  onChange={handleFormChange}
                  className="outline focus:outline-black m-2 w-full"
                />
                <label htmlFor="a">Answer:</label>
                <textarea
                  id="a"
                  name="a"
                  value={form.a}
                  onChange={handleFormChange}
                  className="outline focus:outline-black m-2 w-full"
                />
              </div>
              <div className="flex justify-between mt-6">
                <button
                  className="px-6 py-2 bg-gray-400 text-white rounded"
                  onClick={() => setEditModalOpen(false)}
                >
                  Close
                </button>
                <button
                  className="px-6 py-2 bg-[var(---btncolor)] text-white rounded"
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

export default Help_Center;
