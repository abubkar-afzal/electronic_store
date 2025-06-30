import Image from "next/image";
import React, { useState } from "react";
import img1 from "./assets/img1.jpg";
import img2 from "./assets/img2.jpg";
import img3 from "./assets/img3.jpg";
import img4 from "./assets/img4.jpg";
import img5 from "./assets/img5.jpg";
import img6 from "./assets/img6.jpg";
import img7 from "./assets/img7.jpg";
import img8 from "./assets/img8.jpg";
import img9 from "./assets/img9.jpg";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";

const initialCategories = [
  {
    img: img1,
    label: "Computers",
    link: "/components/category/computers",
    bg: "bg-[var(---pagecolor)]",
  },
  {
    img: img2,
    label: "Mobiles",
    link: "/components/category/mobiles",
    bg: "bg-[var(---pagecolor)]",
  },
  {
    img: img3,
    label: "Drones & Cameras",
    link: "/components/category/drones&cameras",
    bg: "bg-[var(---pagecolor)]",
  },
  {
    img: img4,
    label: "Sale",
    link: "/components/category/sale",
    bg: "bg-[var(---btncolor)]",
  },
  {
    img: img5,
    label: "Tablets",
    link: "/components/category/tablets",
    bg: "bg-[var(---pagecolor)]",
  },
  {
    img: img6,
    label: "Best Sellers",
    link: "/components/category/bestseller",
    bg: "bg-[var(---blacktext)]",
  },
  {
    img: img7,
    label: "T.V & Home Cinema",
    link: "/components/category/tv&homecinema",
    bg: "bg-[var(---pagecolor)]",
  },
  {
    img: img8,
    label: "Wearable Tech",
    link: "/components/category/wearabletech",
    bg: "bg-[var(---pagecolor)]",
  },
  {
    img: img9,
    label: "Headphones & Speakers",
    link: "/components/category/headphones&speakers",
    bg: "bg-[var(---pagecolor)]",
  },
  {
    img: img1,
    label: "All Products",
    link: "/components/category/allproducts",
    bg: "bg-[var(---pagecolor)]",
  },
];

const ShopeCategory = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({
    img: null,
    label: "",
    link: "",
    file: null,
  });

  const openEditModal = (index = null) => {
    if (index !== null) {
      const item = categories[index];
      setForm({
        img: item.img,
        label: item.label,
        link: item.link,
        file: null,
      });
      setEditIndex(index);
    } else {
      setForm({
        img: null,
        label: "",
        link: "",
        file: null,
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

  const handleSave = () => {
    if (!form.label || !form.link) return;
    const newItem = {
      img: form.img,
      label: form.label,
      link: form.link,
      bg: editIndex !== null ? categories[editIndex].bg : "bg-[var(---pagecolor)]",
    };
    if (editIndex !== null) {
      setCategories((prev) =>
        prev.map((item, idx) => (idx === editIndex ? newItem : item))
      );
    } else {
      setCategories((prev) => [...prev, newItem]);
    }
    setEditModalOpen(false);
    setForm({
      img: null,
      label: "",
      link: "",
      file: null,
    });
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    setCategories((prev) => prev.filter((_, idx) => idx !== index));
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
            <div key={index} className="relative">
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
      {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-200">
          <div className="bg-white rounded-lg p-8 shadow-lg w-[350px]">
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
          </div>
        </div>
      )}
    </>
  );
};

export default ShopeCategory;
