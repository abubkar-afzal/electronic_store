import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube, FaEdit } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

// ...existing code...

const Help_Center = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [selectedValue, setSelectedValue] = useState("generaloption");

  // Editor state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ q: "", a: "" });

  // Separate state for each category
  const [faqs, setFaqs] = useState([
    {
      q: "What is this FAQ about?",
      a: "It's an FAQ example using Tailwind and React.",
    },
    { q: "How do I use it Mobile?", a: "Click on a question to see the answer." },
    { q: "Can I add more Cities in Pakistan?", a: "Yes! Just extend the faqs array." },
  ]);
  const [gen, setGen] = useState([
    {
      q: "What is this site about?",
      a: "It's an FAQ example using Tailwind and React.",
    },
    { q: "How do I use it?", a: "Click on a question to see the answer." },
    { q: "Can I add more?", a: "Yes! Just extend the faqs array." },
  ]);

  // Helper to get/set correct category
  const getCurrentList = () => (selectedValue === "generaloption" ? gen : faqs);
  const setCurrentList = (cb) =>
    selectedValue === "generaloption" ? setGen(cb) : setFaqs(cb);

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setOpenIndex(null);
  };

  const openEditModal = (index = null) => {
    const list = getCurrentList();
    if (index !== null) {
      setForm({ q: list[index].q, a: list[index].a });
      setEditIndex(index);
    } else {
      setForm({ q: "", a: "" });
      setEditIndex(null);
    }
    setEditModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSave = () => {
    if (!form.q || !form.a) return;
    setCurrentList((prev) =>
      editIndex !== null
        ? prev.map((item, idx) => (idx === editIndex ? { q: form.q, a: form.a } : item))
        : [...prev, { q: form.q, a: form.a }]
    );
    setEditModalOpen(false);
    setForm({ q: "", a: "" });
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    setCurrentList((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center p-4 bg-[var(---whitetext)]">
        <div className="text-[2rem] font-sans font-bold text-center l:text-[45px]">
          AR Codes Help Center
        </div>
        <div className="">
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
            <div className="w-full"> 
              choose a category
              <select value={selectedValue} onChange={handleChange} className=" outline outline-black text-[var(---btncolor)] px-2 my-3 h-[3rem] w-full ">
                <option value="generaloption">General</option>
                <option value="settingupfaqsoption">Setting up FAQs</option>
              </select>
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
              <div key={index} className="border-b py-2 relative">
                <button
                  onClick={() => setOpenIndex(index === openIndex ? null : index)}
                  className="w-full text-left font-medium flex justify-between"
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
          </div>
        </div>
      </div>
      {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg w-[350px]">
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
          </div>
        </div>
      )}
    </>
  );
};
export default Help_Center;