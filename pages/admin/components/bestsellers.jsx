import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import Link from "next/link";

import img1 from "./assets/img7.jpg";
import img2 from "./assets/img5.jpg";
import img3 from "./assets/img6.jpg";
import { FaEdit } from "react-icons/fa";

const images = [
  {
    id: 1,
    src: img1,
    sale: true,
    name: "FaPhone",
    specification: "12gb ram",
    price: "$70.00",
    saleprice: "$65.00",
  },
  {
    id: 2,
    src: img2,
    sale: false,
    name: "FaPhone",
    specification: "12gb ram",
    price: "$70.00",
    saleprice: "$65.00",
  },
  {
    id: 3,
    src: img3,
    sale: true,
    name: "FaPhone",
    specification: "12gb ram",
    price: "$70.00",
    saleprice: "$65.00",
  },
  {
    id: 4,
    src: img3,
    sale: true,
    name: "FaPhone",
    specification: "12gb ram",
    price: "$70.00",
    saleprice: "$65.00",
  },
  {
    id: 5,
    src: img3,
    sale: true,
    name: "FaPhone",
    specification: "12gb ram",
    price: "$70.00",
    saleprice: "$65.00",
  },
  {
    id: 6,
    src: img3,
    sale: true,
    name: "FaPhone",
    specification: "12gb ram",
    price: "$70.00",
    saleprice: "$65.00",
  },
];

const BestSeller = () => {
  // State for editing items
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({
    id: "",
    name: "",
    specification: "",
    price: "",
    saleprice: "",
    sale: false,
    src: null,
    file: null,
  });

  // Items state (editable)
  const [items, setItems] = useState(images);

  // Open modal for add or edit
  const openEditModal = (index = null) => {
    if (index !== null) {
      const item = items[index];
      setForm({
        id: item.id,
        name: item.name,
        specification: item.specification,
        price: item.price,
        saleprice: item.saleprice,
        sale: item.sale,
        src: item.src,
        file: null,
      });
      setEditIndex(index);
    } else {
      setForm({
        id: "",
        name: "",
        specification: "",
        price: "",
        saleprice: "",
        sale: false,
        src: null,
        file: null,
      });
      setEditIndex(null);
    }
    setEditModalOpen(true);
  };

  // Handle form changes
  const handleFormChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm((f) => ({ ...f, [name]: checked }));
    } else if (type === "file") {
      if (files && files[0]) {
        setForm((f) => ({
          ...f,
          file: files[0],
          src: URL.createObjectURL(files[0]),
        }));
      }
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  // Save item (add or update)
  const handleSave = () => {
    if (!form.id || !form.name || !form.price) return;
    const newItem = {
      id: form.id,
      name: form.name,
      specification: form.specification,
      price: form.price,
      saleprice: form.saleprice,
      sale: form.sale,
      src: form.src,
    };
    if (editIndex !== null) {
      setItems((prev) =>
        prev.map((item, idx) => (idx === editIndex ? newItem : item))
      );
    } else {
      setItems((prev) => [...prev, newItem]);
    }
    setEditModalOpen(false);
    setForm({
      id: "",
      name: "",
      specification: "",
      price: "",
      saleprice: "",
      sale: false,
      src: null,
      file: null,
    });
    setEditIndex(null);
  };

  // Delete item
  const handleDelete = (index) => {
    setItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <>
      <div className="w-full bg-[var(---whitetext)] my-[1rem]">
        <div className="text-center text-[30px] l:text-[40px] font-bold py-[2rem]">
          Best Sellers
        </div>
        <div className="relative max-w-6xl l:max-w-full mx-auto">
          <FaEdit
            className="absolute top-[-5rem] right-[1rem] text-[40px] z-50 text-[var(---edit)] cursor-pointer"
            onClick={() => openEditModal()}
            title="Add New Item"
          />
          <Swiper
            spaceBetween={10}
            breakpoints={{
              640: { slidesPerView: 1 },
              1024: { slidesPerView: 4 },
            }}
          >
            {items.map((item, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-start my-2 shadow shadow-black p-2 mx-2 relative">
                  <button
                    className="absolute top-2 right-2 text-xs bg-[var(---btncolor)] text-white rounded px-2 py-1 z-10 cursor-pointer"
                    onClick={() => openEditModal(index)}
                    title="Edit"
                  >
                    Edit
                  </button>
                  <button
                    className="absolute top-2 right-14 text-xs bg-red-500 text-white rounded px-2 py-1 z-10 cursor-pointer"
                    onClick={() => handleDelete(index)}
                    title="Delete"
                  >
                    Delete
                  </button>
                  <div className="w-full relative cursor-pointer">
                    {item.sale ? (
                      <div className="p-0.5 px-4 bg-[var(---salelabel)] inline text-[var(---whitetext)] rounded-[1rem] m-2 font-thin ">
                        SALE
                      </div>
                    ) : (
                      <div className="p-0.5 px-4 bg-[var(---whitetext)] inline text-[var(---whitetext)] rounded-[1rem] m-2 font-thin ">
                        SALE
                      </div>
                    )}
                    <Image
                      src={item.src}
                      alt={`Slide ${index}`}
                      width={1020}
                      height={1020}
                      className="transition-transform duration-500 my-2 hover:scale-102 hover:duration-500 hover:ease-in-out rounded-[1rem] w-full h-auto"
                    />
                  </div>
                  <div className="ml-2 font-thin">{item.name}</div>
                  <div className="ml-2 font-thin">{item.specification}</div>
                  {item.sale ? (
                    <div className="flex text-[18px] ml-2">
                      <div className="font-bold text-[var(---price)]">
                        <s>{item.price}</s>
                      </div>
                      <div className="ml-2 font-bold text-[var(---price)]">
                        {item.saleprice}
                      </div>
                    </div>
                  ) : (
                    <div className="text-[18px] ml-2 font-bold text-[var(---price)]">
                      {item.price}
                    </div>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="flex justify-center">
          <Link href={`/components/category/bestseller`}>
            <button className="text-[16px] l:text-[20px] font-semibold bg-[var(---btncolor)] text-[var(---whitetext)] p-2 l:p-4 l:px-[4rem] px-[3rem] rounded-[1.5rem] my-[2rem] cursor-pointer hover:bg-transparent hover:text-[var(---btncolor)] hover:border-[var(---btncolor)] hover:border-[1px] duration-[1s]">
              View All
            </button>
          </Link>
        </div>
      </div>
      {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center content-center bg-black bg-opacity-50 z-200 overflow-y-scroll scrollbar-hide">
          <div className="bg-white rounded-lg p-8 shadow-lg sm:max-w-sm sm:w-full l:max-w-full text-center l:w-[30rem] my-[4rem]">
            <div className="text-2xl font-bold mb-4">
              {editIndex !== null ? "Edit Item" : "Add New Item"}
            </div>
            <div className="flex flex-col items-center">
              <label htmlFor="id">ID:</label>
              <input
                type="text"
                id="id"
                name="id"
                value={form.id}
                onChange={handleFormChange}
                className="outline focus:outline-black m-2"
              />
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleFormChange}
                className="outline focus:outline-black m-2"
              />
              <label htmlFor="specification">Specification:</label>
              <input
                type="text"
                id="specification"
                name="specification"
                value={form.specification}
                onChange={handleFormChange}
                className="outline focus:outline-black m-2"
              />
              <label htmlFor="price">Price:</label>
              <input
                type="text"
                id="price"
                name="price"
                value={form.price}
                onChange={handleFormChange}
                className="outline focus:outline-black m-2"
              />
              <label htmlFor="saleprice">Sale Price:</label>
              <input
                type="text"
                id="saleprice"
                name="saleprice"
                value={form.saleprice}
                onChange={handleFormChange}
                className="outline focus:outline-black m-2"
              />
              <label className="flex items-center mt-2">
                <input
                  type="checkbox"
                  name="sale"
                  checked={form.sale}
                  onChange={handleFormChange}
                  className="mr-2 cursor-pointer"
                />
                On Sale
              </label>
              <label
                htmlFor="file"
                className="mt-[1rem] flex bg-[var(---btncolor)] hover:bg-transparent text-[var(---whitetext)] hover:text-[var(---btncolor)] hover:border-[1px] hover:border-[var(---btncolor)] text-base font-medium px-4 py-2.5 outline-none hover:*:fill-[var(---btncolor)] rounded w-max cursor-pointer mx-auto *:duration-[1s] duration-[1s]"
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
              {form.src && (
                <Image
                width={1020}
                height={1020}
                  src={form.src}
                  alt="Preview"
                  className="mt-2 w-24 h-24 object-cover rounded"
                />
              )}
            </div>
            <div className="flex l:flex-row sm:flex-col l:space-x-[1rem] items-center justify-center l:w-[100%] l:mt-[2rem]">
              <button
                className="mt-4 px-6 py-2 bg-[var(---btncolor)] text-[var(---whitetext)] rounded-full hover:bg-[var(---hoverbtncolor)] l:p-[1rem] cursor-pointer  l:w-[8rem]"
                onClick={() => setEditModalOpen(false)}
              >
                Close
              </button>
              <button
                className="mt-4 px-6 py-2 bg-[var(---btncolor)] text-[var(---whitetext)] rounded-full hover:bg-[var(---hoverbtncolor)] l:p-[1rem] cursor-pointer  l:w-[8rem]"
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

export default BestSeller;
