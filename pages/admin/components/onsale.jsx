import React, { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import img1 from "./assets/img7.jpg";
import img2 from "./assets/img5.jpg";
import img3 from "./assets/img6.jpg";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";

const initialImages = [
  {
    src: img1,
    sale: true,
    name: "FaPhone",
    specification: "12gb ram",
    price: "$70.00",
    saleprice: "$65.00",
  },
  {
    src: img2,
    sale: false,
    name: "FaPhone",
    specification: "12gb ram",
    price: "$70.00",
    saleprice: "$65.00",
  },
  {
    src: img3,
    sale: true,
    name: "FaPhone",
    specification: "12gb ram",
    price: "$70.00",
    saleprice: "$65.00",
  },
];

const OnSale = () => {
  const [items, setItems] = useState(initialImages);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({
    src: null,
    sale: false,
    name: "",
    specification: "",
    price: "",
    saleprice: "",
    file: null,
  });

  const openEditModal = (index = null) => {
    if (index !== null) {
      const item = items[index];
      setForm({
        src: item.src,
        sale: item.sale,
        name: item.name,
        specification: item.specification,
        price: item.price,
        saleprice: item.saleprice,
        file: null,
      });
      setEditIndex(index);
    } else {
      setForm({
        src: null,
        sale: false,
        name: "",
        specification: "",
        price: "",
        saleprice: "",
        file: null,
      });
      setEditIndex(null);
    }
    setEditModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm((f) => ({ ...f, [name]: checked }));
    } else if (type === "file" && files && files[0]) {
      setForm((f) => ({
        ...f,
        file: files[0],
        src: URL.createObjectURL(files[0]),
      }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSave = () => {
    if (!form.name || !form.price) return;
    const newItem = {
      src: form.src,
      sale: form.sale,
      name: form.name,
      specification: form.specification,
      price: form.price,
      saleprice: form.saleprice,
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
      src: null,
      sale: false,
      name: "",
      specification: "",
      price: "",
      saleprice: "",
      file: null,
    });
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    setItems((prev) => prev.filter((_, idx) => idx !== index));
  };

  return (
    <div className="w-full bg-[var(---whitetext)] my-[1rem] relative">
      <FaEdit
        className="absolute top-4 right-4 z-50 text-[40px] cursor-pointer text-[var(---edit)]"
        onClick={() => openEditModal()}
        title="Add New Item"
      />
      <div className="text-center text-[30px] l:text-[40px] font-bold py-[2rem]">
        On Sale
      </div>

      <div className="relative max-w-6xl l:max-w-full mx-auto">
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
                  className="absolute top-2 right-2 text-xs bg-[var(---btncolor)] cursor-pointer text-white rounded px-2 py-1 z-10"
                  onClick={() => openEditModal(index)}
                  title="Edit"
                >
                  Edit
                </button>
                <button
                  className="absolute top-2 right-14 text-xs bg-red-500 text-white cursor-pointer rounded px-2 py-1 z-10"
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
        <Link href={`/components/category/sale`}>
          <button className="text-[16px] l:text-[20px] font-semibold bg-[var(---btncolor)] text-[var(---whitetext)] p-2 l:p-4 l:px-[4rem] px-[3rem] rounded-[1.5rem] my-[2rem] cursor-pointer hover:bg-transparent hover:text-[var(---btncolor)] hover:border-[var(---btncolor)] hover:border-[1px] duration-[1s]">
            View All
          </button>
        </Link>
      </div>

      {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-200">
          <div className="bg-white rounded-lg p-8 shadow-lg w-[350px]">
            <div className="text-2xl font-bold mb-4">
              {editIndex !== null ? "Edit Item" : "Add New Item"}
            </div>
            <div className="flex flex-col items-center">
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
              {form.src && (
                <Image
                  src={form.src}
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
    </div>
  );
};

export default OnSale;