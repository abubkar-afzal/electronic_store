import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RxCross2, RxMinus, RxPlus } from "react-icons/rx";
import { FaArrowCircleUp, FaEdit } from "react-icons/fa";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import toast, { Toaster } from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const BestSeller = () => {
  const [items, setItems] = useState([]);
  const [displayPlaceOpen, setDisplayPlaceOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const [form, setForm] = useState({
    id: "",
    name: "",
    specification: "",
    description: "",
    price: "",
    sale_price: "",
    onsale: 0,
    avaliable_quantity: "",
    use_cause: "",
    return_policy: "",
    shipping: "",
    image: null,
    display_place: "",
    category: "",
    color: "#000000",
    file: null,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/bestsellermain");
        const data = await res.json();
        setItems(data);
      } catch (error) {}
    };
    fetchProducts();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!form.name || form.name.trim().length < 2)
      newErrors.name = "Name is required (min 2 chars)";
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0)
      newErrors.price = "Valid price is required";
    if (!form.category) newErrors.category = "Category is required";
    if (!form.display_place)
      newErrors.display_place = "Display Place is required";
    if (!form.image) newErrors.image = "Image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const openEditModal = (index = null) => {
    if (index !== null) {
      const item = items[index];
      setForm({
        id: item.id,
        name: item.name,
        specification: item.specification,
        description: item.description,
        price: item.price,
        sale_price: item.sale_price,
        onsale: item.onsale,
        avaliable_quantity: item.avaliable_quantity,
        use_cause: item.use_cause,
        return_policy: item.return_policy,
        shipping: item.shipping,
        image: item.image,
        display_place: item.display_place,
        category: item.category,
        color: item.color,
        file: null,
      });
      setEditIndex(index);
    } else {
      setForm({
        id: "",
        name: "",
        specification: "",
        description: "",
        price: "",
        sale_price: "",
        onsale: 0,
        avaliable_quantity: "",
        use_cause: "",
        return_policy: "",
        shipping: "",
        image: null,
        display_place: "",
        category: "",
        color: "#000000",
        file: null,
      });
      setEditIndex(null);
    }
    setEditModalOpen(true);
  };

  const handleFormChange = async (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm((f) => ({ ...f, [name]: checked ? 1 : 0 }));
    } else if (type === "file" && files && files[0]) {
      const file = files[0];
      const toBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      const base64 = await toBase64(file);
      setForm((f) => ({
        ...f,
        file: file,
        image: base64,
      }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    const productData = {
      id: form.id,
      name: form.name,
      specification: form.specification,
      description: form.description || "",
      price: form.price,
      sale_price: form.sale_price || "",
      onsale: form.onsale,
      avaliable_quantity: form.avaliable_quantity || "",
      use_cause: form.use_cause || "",
      return_policy: form.return_policy || "",
      shipping: form.shipping || "",
      image: form.image || "",
      display_place: form.display_place || "",
      category: form.category || "",
      color: form.color || "#000000",
    };
    try {
      if (editIndex !== null) {
        setEditModalOpen(false);
        await fetch("/api/updateproduct", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });
        toast("Product Update Succussfully", {
          icon: "✅",
          style: {
            background: "#7002ff",
            color: "#fff",
          },
        });
      } else {
        setEditModalOpen(false);
        let req = await fetch("/api/addproduct", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });

        let res = await req.json();
        if (res.duplicate) {
          setErrors({ id: "Product with this name already exists" });
          setEditModalOpen(true);
          return;
        } else {
          toast("Product Added Succussfully", {
            icon: "✅",
            style: {
              background: "#7002ff",
              color: "#fff",
            },
          });
        }
      }
      const res = await fetch("/api/bestsellermain");

      const data = await res.json();
      setItems(data);
    } catch (error) {}

    setForm({
      id: "",
      name: "",
      specification: "",
      description: "",
      price: "",
      sale_price: "",
      onsale: 0,
      avaliable_quantity: "",
      use_cause: "",
      return_policy: "",
      shipping: "",
      image: null,
      display_place: "",
      category: "",
      color: "#000000",
      file: null,
    });
    setEditIndex(null);
  };

  const handleDelete = async (index) => {
    const product = items[index];
    if (!product?.id) return;

    try {
      await fetch("/api/deleteproduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: product.id }),
      });
      const res = await fetch("/api/bestsellermain");
      const data = await res.json();
      setItems(data);
    } catch (error) {}
  };
  const inputVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.04, type: "spring", stiffness: 120 },
    }),
  };

  return (
    <>
      <Toaster />

      {/* Edit Modal */}
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
            className="bg-white rounded-lg p-8 shadow-lg w-[400px] max-h-[90vh] scrollbar-hide overflow-y-auto"
          >
            <div className="text-2xl font-bold mb-4">
              {editIndex !== null ? "Edit Product" : "Add New Product"}
            </div>

            <motion.div
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center"
            >
              {[
                {
                  label: "ID:",
                  htmlFor: "id",
                  input: (
                    <>
                      <input
                        type="number"
                        id="id"
                        name="id"
                        value={form.id}
                        onChange={handleFormChange}
                        className={`outline-2 focus:outline-black m-2 w-full p-1 rounded-[4px] ${
                          errors.id ? "border border-red-500" : ""
                        }`}
                        placeholder="Unique ID"
                      />
                      {errors.id && (
                        <div className="text-red-500 text-xs mb-1">
                          {errors.id}
                        </div>
                      )}
                    </>
                  ),
                },
                {
                  label: "Name:",
                  htmlFor: "name",
                  input: (
                    <>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleFormChange}
                        className={`outline-2 focus:outline-black m-2 w-full p-1 rounded-[4px] ${
                          errors.name ? "border border-red-500" : ""
                        }`}
                      />
                      {errors.name && (
                        <div className="text-red-500 text-xs mb-1">
                          {errors.name}
                        </div>
                      )}
                    </>
                  ),
                },
                {
                  label: "Specification:",
                  htmlFor: "specification",
                  input: (
                    <input
                      type="text"
                      id="specification"
                      name="specification"
                      value={form.specification}
                      onChange={handleFormChange}
                      className="outline-2 focus:outline-black m-2 w-full p-1 rounded-[4px]"
                    />
                  ),
                },
                {
                  label: "Description:",
                  htmlFor: "description",
                  input: (
                    <textarea
                      id="description"
                      name="description"
                      value={form.description}
                      onChange={handleFormChange}
                      className="outline-2 focus:outline-black m-2 w-full p-1 rounded-[4px]"
                    />
                  ),
                },
                {
                  label: "Price:",
                  htmlFor: "price",
                  input: (
                    <>
                      <input
                        type="number"
                        id="price"
                        name="price"
                        value={form.price}
                        onChange={handleFormChange}
                        className={`outline-2 focus:outline-black m-2 w-full p-1 rounded-[4px] ${
                          errors.price ? "border border-red-500" : ""
                        }`}
                        step="0.01"
                      />
                      {errors.price && (
                        <div className="text-red-500 text-xs mb-1">
                          {errors.price}
                        </div>
                      )}
                    </>
                  ),
                },
                {
                  label: "Sale Price:",
                  htmlFor: "sale_price",
                  input: (
                    <input
                      type="number"
                      id="sale_price"
                      name="sale_price"
                      value={form.sale_price}
                      onChange={handleFormChange}
                      className="outline-2 focus:outline-black m-2 w-full p-1 rounded-[4px]"
                      step="0.01"
                    />
                  ),
                },
                {
                  label: "On Sale",
                  htmlFor: "onsale",
                  input: (
                    <label className="flex items-center mt-2 w-full justify-center my-[1rem] gap-2 cursor-pointer select-none">
                      <span
                        className={`relative inline-block w-15 h-6 transition duration-[1s] 
                  ${form.onsale ? "bg-[var(---btncolor)] " : "bg-gray-300"} 
                  rounded-full`}
                      >
                        <input
                          type="checkbox"
                          name="onsale"
                          checked={!!form.onsale}
                          onChange={handleFormChange}
                          className="opacity-0 w-0 h-0 peer"
                        />
                        <span
                          className={`absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-[1s]
                    ${form.onsale ? "translate-x-9" : ""}`}
                        ></span>
                      </span>
                      <span
                        className={`font-semibold duration-[1s] ${
                          form.onsale ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        On Sale
                      </span>
                    </label>
                  ),
                },
                {
                  label: "Available Quantity:",
                  htmlFor: "avaliable_quantity",
                  input: (
                    <input
                      type="number"
                      id="avaliable_quantity"
                      name="avaliable_quantity"
                      value={form.avaliable_quantity}
                      onChange={handleFormChange}
                      className="outline-2 focus:outline-black m-2 w-full p-1 rounded-[4px]"
                    />
                  ),
                },
                {
                  label: "Use Cause:",
                  htmlFor: "use_cause",
                  input: (
                    <textarea
                      type="text"
                      id="use_cause"
                      name="use_cause"
                      value={form.use_cause}
                      onChange={handleFormChange}
                      className="outline-2 focus:outline-black m-2 w-full p-1 rounded-[4px]"
                    />
                  ),
                },
                {
                  label: "Return Policy:",
                  htmlFor: "return_policy",
                  input: (
                    <textarea
                      type="text"
                      id="return_policy"
                      name="return_policy"
                      value={form.return_policy}
                      onChange={handleFormChange}
                      className="outline-2 focus:outline-black m-2 w-full p-1 rounded-[4px]"
                    />
                  ),
                },
                {
                  label: "Shipping:",
                  htmlFor: "shipping",
                  input: (
                    <textarea
                      type="text"
                      id="shipping"
                      name="shipping"
                      value={form.shipping}
                      onChange={handleFormChange}
                      className="outline-2 focus:outline-black m-2 w-full p-1 rounded-[4px]"
                    />
                  ),
                },
                {
                  label: (
                    <>
                      <span>Color:</span>
                      <span className="text-[12px] mt-[1rem] block">
                        Click on Color and then select new Color
                      </span>
                    </>
                  ),
                  htmlFor: "color",
                  input: (
                    <input
                      type="color"
                      id="color"
                      name="color"
                      value={form.color}
                      onChange={handleFormChange}
                      className="m-2 w-full h-10 p-0 border-none bg-transparent cursor-pointer"
                    />
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

              {/* Display Place Dropdown with validation */}
              <motion.div
                custom={13}
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                className="w-full relative my-2"
              >
                <label htmlFor="display_place">Display Place:</label>
                <div
                  className={`outline focus:outline-black m-2 w-full border rounded px-3 py-2 cursor-pointer bg-white ${
                    errors.display_place ? "border-red-500" : ""
                  }`}
                  onClick={() => setDisplayPlaceOpen((open) => !open)}
                  tabIndex={0}
                  onBlur={() =>
                    setTimeout(() => setDisplayPlaceOpen(false), 100)
                  }
                >
                  {form.display_place
                    ? {
                        product_category: "Products Category",
                        onsale: "On Sale",
                        bestseller: "Best Seller",
                      }[form.display_place]
                    : "Select Display Place"}
                </div>
                <AnimatePresence>
                  {displayPlaceOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -16, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -16, scale: 0.98 }}
                      transition={{ duration: 0.22, type: "spring" }}
                      className="absolute left-0 right-0 bg-white border rounded shadow z-50"
                    >
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setForm((f) => ({
                            ...f,
                            display_place: "product_category",
                          }));
                          setDisplayPlaceOpen(false);
                        }}
                      >
                        Products Category
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setForm((f) => ({ ...f, display_place: "onsale" }));
                          setDisplayPlaceOpen(false);
                        }}
                      >
                        On Sale
                      </li>
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setForm((f) => ({
                            ...f,
                            display_place: "bestseller",
                          }));
                          setDisplayPlaceOpen(false);
                        }}
                      >
                        Best Seller
                      </li>
                    </motion.ul>
                  )}
                </AnimatePresence>
                {errors.display_place && (
                  <div className="text-red-500 text-xs mb-1">
                    {errors.display_place}
                  </div>
                )}
              </motion.div>

              {/* Category Dropdown with validation */}
              <motion.div
                custom={14}
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                className="w-full relative my-2"
              >
                <label htmlFor="category">Category:</label>
                <div
                  className={`outline focus:outline-black m-2 w-full border rounded px-3 py-2 cursor-pointer bg-white ${
                    errors.category ? "border-red-500" : ""
                  }`}
                  onClick={() => setCategoryOpen((open) => !open)}
                  tabIndex={0}
                  onBlur={() => setTimeout(() => setCategoryOpen(false), 100)}
                >
                  {form.category
                    ? {
                        allproduct: "All Products",
                        computers: "Computers",
                        tablets: "Tablets",
                        "drones&cameras": "Drones & Cameras",
                        "headphones&speakers": "Headphones & Speakers",
                        mobiles: "Mobiles",
                        "tv&homecinema": "T.V & Home Cinema",
                        wearabletech: "Wearable Tech",
                        sale: "Sale",
                        bestseller: "Best Seller",
                      }[form.category]
                    : "Select Category"}
                </div>
                <AnimatePresence>
                  {categoryOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: -16, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -16, scale: 0.98 }}
                      transition={{ duration: 0.22, type: "spring" }}
                      className="absolute left-0 right-0 bg-white border rounded shadow z-50 max-h-60 overflow-y-auto"
                    >
                      {[
                        { value: "allproduct", label: "All Products" },
                        { value: "computers", label: "Computers" },
                        { value: "tablets", label: "Tablets" },
                        { value: "drones&cameras", label: "Drones & Cameras" },
                        {
                          value: "headphones&speakers",
                          label: "Headphones & Speakers",
                        },
                        { value: "mobiles", label: "Mobiles" },
                        { value: "tv&homecinema", label: "T.V & Home Cinema" },
                        { value: "wearabletech", label: "Wearable Tech" },
                        { value: "sale", label: "Sale" },
                        { value: "bestseller", label: "Best Seller" },
                      ].map((opt) => (
                        <li
                          key={opt.value}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setForm((f) => ({ ...f, category: opt.value }));
                            setCategoryOpen(false);
                          }}
                        >
                          {opt.label}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
                {errors.category && (
                  <div className="text-red-500 text-xs mb-1">
                    {errors.category}
                  </div>
                )}
              </motion.div>

              {/* File Upload with validation */}
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
              {errors.image && (
                <div className="text-red-500 text-xs mb-1">{errors.image}</div>
              )}
              {form.image && (
                <motion.div
                  custom={16}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-full flex justify-center"
                >
                  <Image
                    src={form.image}
                    alt="Preview"
                    className="mt-2 w-24 h-24 object-cover rounded"
                    width={96}
                    height={96}
                  />
                </motion.div>
              )}
            </motion.div>
            <div className="flex justify-between mt-6">
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
                {editIndex !== null ? "Update" : "Add"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
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
                    className="absolute top-0 right-2 text-[22px] text-red-500 rounded px-2  z-10 cursor-pointer"
                    onClick={() => openEditModal(index)}
                    title="Edit"
                  >
                    <FaEdit className="inline mr-1" />
                  </button>
                  <button
                    className="absolute top-2 right-14 text-xs bg-red-500 text-white rounded px-2 py-1 z-10 cursor-pointer"
                    onClick={() => handleDelete(index)}
                    title="Delete"
                  >
                    Delete
                  </button>
                  <div className="w-full relative cursor-pointer">
                    {item.onsale ? (
                      <div className="p-0.5 px-4 bg-[var(---salelabel)] inline text-[var(---whitetext)] rounded-[1rem] m-2 font-thin ">
                        SALE
                      </div>
                    ) : (
                      <div className="p-0.5 px-4 bg-[var(---whitetext)] inline text-[var(---whitetext)] rounded-[1rem] m-2 font-thin ">
                        SALE
                      </div>
                    )}
                    <Image
                      src={item.image}
                      alt={`Slide ${index}`}
                      width={1020}
                      height={1020}
                      className="transition-transform duration-500 my-2 hover:scale-102 hover:duration-500 hover:ease-in-out rounded-[1rem] w-full h-auto"
                    />
                  </div>
                  <div className="ml-2 font-thin">{item.name}</div>
                  <div className="ml-2 font-thin">{item.specification}</div>
                  {item.onsale ? (
                    <div className="flex text-[18px] ml-2">
                      <div className="font-bold text-[var(---price)]">
                        <s>{item.price}</s>
                      </div>
                      <div className="ml-2 font-bold text-[var(---price)]">
                        {item.sale_price}
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
    </>
  );
};

export default BestSeller;
