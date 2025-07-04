import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Remove static images and initialCategories, use API instead

const ShopeCategory = () => {
  const [categories, setCategories] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({
    img: null,
    label: "",
    link: "",
    file: null,
    id: null,
    bg: "bg-[var(---pagecolor)]",
  });

  // Fetch categories from API on mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const res = await fetch("/api/shopcategory");
    if (res.ok) {
      const data = await res.json();
      setCategories(data.categories || []);
    }
  };

  const openEditModal = (index = null) => {
    if (index !== null) {
      const item = categories[index];
      setForm({
        img: item.img,
        label: item.label,
        link: item.link,
        file: null,
        id: item.id,
        bg: item.bg || "bg-[var(---pagecolor)]",
      });
      setEditIndex(index);
    } else {
      setForm({
        img: null,
        label: "",
        link: "",
        file: null,
        id: null,
        bg: "bg-[var(---pagecolor)]",
      });
      setEditIndex(null);
    }
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

  // Convert file to base64
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // Save (add or update) category via API
  const handleSave = async () => {
    if (!form.label || !form.link) return;
    let img = form.img;
    if (form.file) {
      img = await fileToBase64(form.file);
    }
    const payload = {
      img,
      label: form.label,
      link: form.link,
      bg: form.bg,
      id: form.id,
    };
    if (editIndex !== null) {
      // Update
      await fetch("/api/shopcategory", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      // Add
      await fetch("/api/shopcategory", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    setEditModalOpen(false);
    setForm({
      img: null,
      label: "",
      link: "",
      file: null,
      id: null,
      bg: "bg-[var(---pagecolor)]",
    });
    setEditIndex(null);
    fetchCategories();
  };

  // Delete category via API
  const handleDelete = async (index) => {
    const item = categories[index];
    await fetch("/api/shopcategory", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id }),
    });
    fetchCategories();
  };

  return (
    <>
      <div className="bg-[var(---whitetext)] py-[2rem] mb-[1rem] relative">
        <FaEdit
          className="absolute top-4 right-4 z-50 text-[40px] cursor-pointer text-[var(---edit)]"
          onClick={() => openEditModal()}
          title="Add New Category"
        />
        <div className="text-[25px] l:text-[35px] font-semibold text-center my-[2rem]">
          Shope by Category
        </div>
        <div className="flex flex-col l:grid l:grid-cols-5 l:gap-[1rem] items-center">
          {categories.map((item, index) => (
            <div key={item.id || index} className="relative">
              <FaEdit
                className="absolute top-2 right-2 z-10 text-lg cursor-pointer text-[var(---edit)]"
                onClick={() => openEditModal(index)}
                title="Edit"
              />
              <button
                className="absolute top-2 left-2 z-10 bg-red-500 cursor-pointer text-white px-2 py-1 rounded text-xs"
                onClick={() => handleDelete(index)}
                title="Delete"
              >
                Delete
              </button>
              <Link href={item.link}>
                <div className="flex flex-col items-center my-[2rem] cursor-pointer">
                  <div className={`w-[15rem] h-[15rem] ${item.bg} rounded-full overflow-hidden p-4`}>
                    <Image
                      src={item.img}
                      width={1020}
                      height={1020}
                      alt="img"
                      className="transition-transform duration-500 my-2 hover:scale-102 hover:duration-500 hover:ease-in-out rounded-[1rem] w-full h-auto"
                    />
                  </div>
                  <div className="font-bold my-2">{item.label}</div>
                </div>
              </Link>
            </div>
          ))}
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
                {editIndex !== null ? "Edit Category" : "Add New Category"}
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
                <label htmlFor="link">Link:</label>
                <input
                  type="text"
                  id="link"
                  name="link"
                  value={form.link}
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
                  {editIndex !== null ? "Update" : "Add"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ShopeCategory;