import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RxCross2, RxMinus, RxPlus } from "react-icons/rx";
import { FaArrowCircleUp, FaEdit } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import { MoonLoader } from "react-spinners";
import { motion, AnimatePresence } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import toast, { Toaster } from "react-hot-toast";

const DronesAndCameras = () => {
  const pageName = "Drones & Cameras";
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [displayPlaceOpen, setDisplayPlaceOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [filter, setfilter] = useState(false);
  const [sortbyfilter, setsortbyfilter] = useState(true);
  const [pricefilter, setpricefilter] = useState(false);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Recommended");
  const dropdownOptions = [
    "Recommended",
    "Newest",
    "Price (low to high)",
    "Price (high to low)",
    "Name A-Z",
    "Name Z-A",
  ];
  const [selectedColor, setSelectedColor] = useState(null);
  const [colorfilter, setcolorfilter] = useState(false);
  const router = useRouter();
  let currentpage;
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
  const maxItemPrice =
    items.length > 0
      ? Math.max(...items.map((item) => Number(item.price) || 0)) + 10
      : 10;
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    if (items.length > 0) {
      setMinPrice(0);
      setMaxPrice(
        Math.max(...items.map((item) => Number(item.price) || 0)) + 10
      );
    } else {
      setMinPrice(0);
      setMaxPrice(10);
    }
  }, [items]);
  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/viewdrones&cameras");
        const data = await res.json();
        setItems(data);
      } catch (error) {}
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (router.route === "/admin/components/category/allproducts") {
    currentpage = "allproducts";
  } else if (router.route === "/admin/components/category/computers") {
    currentpage = "computers";
  } else if (router.route === "/admin/components/category/mobiles") {
    currentpage = "mobiles";
  } else if (router.route === "/admin/components/category/drones&cameras") {
    currentpage = "drones&cameras";
  } else if (router.route === "/admin/components/category/tv&homecinema") {
    currentpage = "tv&homecinema";
  } else if (router.route === "/admin/components/category/tablets") {
    currentpage = "tablets";
  } else if (
    router.route === "/admin/components/category/headphones&speakers"
  ) {
    currentpage = "headphones&speakers";
  } else if (router.route === "/admin/components/category/wearabletech") {
    currentpage = "wearabletech";
  } else if (router.route === "/admin/components/category/sale") {
    currentpage = "sale";
  } else if (router.route === "/admin/components/category/bestseller") {
    currentpage = "bestseller";
  } else {
    currentpage = "no route found";
  }

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
    setLoading(true);
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
          setLoading(false);
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
      const res = await fetch("/api/viewdrones&cameras");

      const data = await res.json();
      setItems(data);
    } catch (error) {}

    setLoading(false);
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
    setLoading(true);

    try {
      await fetch("/api/deleteproduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: product.id }),
      });
      const res = await fetch("/api/viewdrones&cameras");
      const data = await res.json();
      setItems(data);
    } catch (error) {}
    setLoading(false);
  };
  const inputVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.04, type: "spring", stiffness: 120 },
    }),
  };
  const showfilter = () => {
    setfilter(!filter);
  };
  const showsortbyfilter = () => {
    setsortbyfilter(!sortbyfilter);
  };
  const showpricefilter = () => {
    setpricefilter(!pricefilter);
  };
  const showcolorfilter = () => {
    setcolorfilter(!colorfilter);
  };

  const handleDropdownSelect = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };
  const uniqueColors = Array.from(
    new Set(
      items
        .map((item) => (item.color ? item.color.toLowerCase() : "#000000"))
        .filter(Boolean)
    )
  );
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const filteredAndSortedItems = items
    .filter((item) => {
      const price = Number(item.price) || 0;
      return price >= (minPrice ?? 0) && price <= (maxPrice ?? Infinity);
    })
    .filter((item) => {
      if (!selectedColor) return true;
      return (
        (item.color || "#000000").toLowerCase() === selectedColor.toLowerCase()
      );
    })
    .sort((a, b) => {
      switch (selectedOption) {
        case "Price (low to high)":
          return (Number(a.price) || 0) - (Number(b.price) || 0);
        case "Price (high to low)":
          return (Number(b.price) || 0) - (Number(a.price) || 0);
        case "Name A-Z":
          return (a.name || "").localeCompare(b.name || "");
        case "Name Z-A":
          return (b.name || "").localeCompare(a.name || "");
        case "Newest":
          return (Number(b.id) || 0) - (Number(a.id) || 0);
        default:
          return 0;
      }
    });

  return (
    <>
      <button
        onClick={scrollToTop}
        className={`${
          showScrollTop ? "opacity-100" : "opacity-0 hidethis"
        } fixed bottom-8 right-8 z-[9999] bg-[var(---btncolor)] text-white p-3 rounded-full shadow-lg hover:bg-transparent cursor-pointer hover:border hover:border-[var(---btncolor)] hover:text-[var(---btncolor)] transition-all duration-[1s] text-[20px]`}
        title="Scroll to top"
        aria-label="Scroll to top"
      >
        <FaArrowCircleUp />
      </button>

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

      {/* mobile  */}
      <Fade duration={2000} cascade>
        <div className="sm:block l:hidden mx-[1rem] min-h-screen">
          <div className="flex space-x-2">
            <Link href={`/admin/components`}>
              <div className="cursor-pointer hover:font-bold font-thin">
                Home
              </div>
            </Link>
            <div className="">&gt;</div>
            <div className="font-thin">{pageName}</div>
          </div>
          <div className="text-[30px] font-bold my-[1rem] flex items-center justify-between">
            {pageName}
            <FaEdit
              className="text-[30px] cursor-pointer text-[var(---edit)]"
              onClick={() => openEditModal()}
              title="Add New Product"
            />
          </div>
          <div className="flex justify-between font-thin items-center">
            <div>{filteredAndSortedItems.length} Products</div>
            <div
              className="underline cursor-pointer my-[1rem]"
              onClick={showfilter}
            >
              Filter & Sort
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-[4rem]">
            {loading ? (
              <div className=" inset-0 mt-[40%] flex items-center justify-center col-span-5 bg-opacity-80 z-999">
                <div className=" p-6 rounded  text-xl font-bold flex items-center gap-2">
                  <MoonLoader size={30} color="#7002ff" />
                  Loading...
                </div>
              </div>
            ) : filteredAndSortedItems.length == 0 ? (
              <div className="text-[50px] col-span-5 font-thin">
                There is no Product, Add Product for Production.
              </div>
            ) : (
              filteredAndSortedItems.map((item, index) => (
                <Fade duration={2000} cascade triggerOnce fraction={0.1}>
                  <div
                    key={item.id}
                    className="relative w-full flex-shrink-0 cursor-pointer bg-[var(---whitetext)] h-[20rem]"
                  >
                    <div className="relative w-full h-[2rem]">
                      <FaEdit
                        className="absolute top-1 right-2 z-10 text-[20px] cursor-pointer text-[var(---edit)]"
                        onClick={() => openEditModal(index)}
                        title="Edit"
                      />
                      <button
                        className="absolute top-1 left-4 z-10 cursor-pointer bg-red-500 text-white px-2 py-1 rounded text-xs"
                        onClick={() => handleDelete(index)}
                        title="Delete"
                      >
                        Delete
                      </button>
                    </div>
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
                      alt={`Product ${index}`}
                      width={1020}
                      height={1020}
                      className="transition-transform duration-500 my-2 h-[9rem]"
                    />
                    <div>
                      <div className="ml-4 font-thin">{item.name}</div>
                      <div className="ml-4 font-thin">{item.specification}</div>
                      {item.onsale ? (
                        <div className="flex flex-col text-[18px] ">
                          <div className="ml-2 font-bold text-[var(---price)]">
                            <s>{item.price}</s>
                          </div>
                          <div className="ml-2 font-bold text-[var(---price)]">
                            {item.sale_price}
                          </div>
                        </div>
                      ) : (
                        <div className="m-2 text-[18px] font-bold text-[var(---price)]">
                          {item.price}
                        </div>
                      )}
                    </div>
                  </div>
                </Fade>
              ))
            )}
          </div>
        </div>
      </Fade>

      {/* mobile filter  */}
      <div
        className={`fixed w-full h-full bg-[var(---whitetext)] top-0 duration-[2s] px-[1rem] z-300 ${
          filter ? "right-0 opacity-100" : "opacity-0 right-[-120vw] hidethis"
        } overflow-y-scroll mb-[4rem] scrollbar-hide`}
      >
        <div className="flex justify-between p-4 border-y-[1px] items-center py-[1.5rem] my-[1rem] text-[20px] font-thin">
          <div>Filter & Sort ({filteredAndSortedItems.length} products)</div>
          <div className="text-[1.5rem]">
            <RxCross2 onClick={showfilter} />
          </div>
        </div>
        <div
          className={`p-4 border-b-[1px] duration-700 overflow-y-hidden ${
            sortbyfilter ? "h-[19rem]" : "h-[3.5rem] "
          }`}
        >
          <div
            className={`justify-between items-center  text-[20px] font-thin flex ${
              sortbyfilter ? "block" : "hidden"
            }`}
          >
            <div>Sort by:</div>
            <RxMinus className="cursor-pointer" onClick={showsortbyfilter} />
          </div>
          <div
            className={`justify-between items-center text-[20px] font-thin ${
              sortbyfilter ? "hidden" : "flex"
            } border-b-[1px`}
          >
            <div>Sort by:</div>
            <RxPlus className="cursor-pointer" onClick={showsortbyfilter} />
          </div>

          <div className="flex flex-col">
            <div className="space-x-2 my-2">
              <input
                type="radio"
                name="sort"
                id="rec"
                checked={selectedOption === "Recommended"}
                onChange={() => handleDropdownSelect("Recommended")}
              />
              <label htmlFor="rec">Recommended</label>
            </div>
            <div className="space-x-2 my-2">
              <input
                type="radio"
                name="sort"
                id="newest"
                checked={selectedOption === "Newest"}
                onChange={() => handleDropdownSelect("Newest")}
              />
              <label htmlFor="newest">Newest</label>
            </div>
            <div className="space-x-2 my-2">
              <input
                type="radio"
                name="sort"
                id="plth"
                checked={selectedOption === "Price (low to high)"}
                onChange={() => handleDropdownSelect("Price (low to high)")}
              />
              <label htmlFor="plth">Price (low to high)</label>
            </div>
            <div className="space-x-2 my-2">
              <input
                type="radio"
                name="sort"
                id="phtl"
                checked={selectedOption === "Price (high to low)"}
                onChange={() => handleDropdownSelect("Price (high to low)")}
              />
              <label htmlFor="phtl">Price (high to low)</label>
            </div>
            <div className="space-x-2 my-2">
              <input
                type="radio"
                name="sort"
                id="Natoz"
                checked={selectedOption === "Name A-Z"}
                onChange={() => handleDropdownSelect("Name A-Z")}
              />
              <label htmlFor="Natoz">Name A-Z</label>
            </div>
            <div className="space-x-2 my-2">
              <input
                type="radio"
                name="sort"
                id="Nztoa"
                checked={selectedOption === "Name Z-A"}
                onChange={() => handleDropdownSelect("Name Z-A")}
              />
              <label htmlFor="Nztoa">Name Z-A</label>
            </div>
          </div>
        </div>

        <div
          className={`p-4 border-b-[1px] duration-700 overflow-y-hidden ${
            pricefilter ? "h-[7rem]" : "h-[3.5rem] "
          }`}
        >
          <div
            className={`justify-between items-center  text-[20px] font-thin flex ${
              pricefilter ? "block" : "hidden"
            }`}
          >
            <div>
              Price (${minPrice}-${maxPrice})
            </div>
            <RxMinus className="cursor-pointer" onClick={showpricefilter} />
          </div>
          <div
            className={`justify-between items-center text-[20px] font-thin ${
              pricefilter ? "hidden" : "flex"
            } border-b-[1px`}
          >
            <div>
              Price (${minPrice}-${maxPrice})
            </div>
            <RxPlus className="cursor-pointer" onClick={showpricefilter} />
          </div>
          <div className="flex flex-col items-center my-[1rem]">
            <div className="w-full flex items-center gap-4">
              <span className="text-[16px] font-semibold text-gray-700">
                ${minPrice}
              </span>
              <input
                type="range"
                min={0}
                max={maxItemPrice}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[var(---btncolor)] h-2 rounded-lg appearance-none bg-gray-200 outline-none transition-all duration-300"
                disabled={maxItemPrice === 0}
                style={{
                  background: `linear-gradient(to right, var(--btncolor, #7002ff) 0%, var(--btncolor, #7002ff) ${
                    (maxPrice / (maxItemPrice || 1)) * 100
                  }%, #e5e7eb ${
                    (maxPrice / (maxItemPrice || 1)) * 100
                  }%, #e5e7eb 100%)`,
                }}
              />
              <span className="text-[16px] font-semibold text-gray-700">
                ${maxItemPrice}
              </span>
            </div>
          </div>
        </div>

        <div
          className={`p-4 mb-[4rem] border-b-[1px] duration-700 overflow-y-hidden ${
            colorfilter ? "h-auto" : "h-auto "
          }`}
        >
          <div
            className={`justify-between items-center  text-[20px] font-thin flex ${
              colorfilter ? "block" : "hidden"
            }`}
          >
            <div>Color</div>
            <RxMinus className="cursor-pointer" onClick={showcolorfilter} />
          </div>
          <div
            className={`justify-between items-center text-[20px] font-thin ${
              colorfilter ? "hidden" : "flex"
            } `}
          >
            <div>Color</div>
            <RxPlus className="cursor-pointer" onClick={showcolorfilter} />
          </div>
          <AnimatePresence initial={false}>
            {colorfilter && (
              <motion.div
                key="colorfilter"
                initial={{ height: 0, opacity: 0, y: -20 }}
                animate={{ height: "auto", opacity: 1, y: 0 }}
                exit={{ height: 0, opacity: 0, y: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="m-[1rem] flex gap-2 flex-wrap">
                  {uniqueColors.map((color) => (
                    <div
                      key={color}
                      className={`w-[2rem] h-[2rem] rounded-full cursor-pointer flex items-center justify-center transition-all duration-200
                       ${
                         selectedColor === color
                           ? " scale-110 shadow-lg ring-2 ring-[var(---btncolor)]"
                           : "border-gray-300"
                       }
                     `}
                      style={{ backgroundColor: color }}
                      title={color}
                      onClick={() =>
                        setSelectedColor(selectedColor === color ? null : color)
                      }
                    >
                      {selectedColor === color && (
                        <span className="block w-3 h-3 rounded-full border-2 border-white bg-white opacity-80"></span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* laptop */}
      <Fade duration={1000} cascade>
        <div className="sm:hidden mx-[1.5rem] l:grid l:grid-cols-5 gap-[10px] ">
          <div className="col-span-1 scrollbar-hide">
            <Fade duration={2000} cascade triggerOnce>
              <div className="flex space-x-2 text-[20px]">
                <Link href={`/admin/components`}>
                  <div className="cursor-pointer hover:font-bold font-thin">
                    Home
                  </div>
                </Link>
                <div className="">&gt;</div>
                <div className="font-thin">{pageName}</div>
              </div>
              <div>
                <div className="my-[2rem] py-[1rem] border-b-[1px] text-[1.5rem] font-semibold">
                  Browse by
                </div>

                <Link href={`/admin/components/category/allproducts`}>
                  <p
                    className={`inline-block cursor-pointer hover:underline ${
                      currentpage == "allproducts" ? "font-bold" : "font-thin"
                    }`}
                  >
                    All Produtcs
                  </p>
                </Link>
                <br />
                <Link href={`/admin/components/category/computers`}>
                  <p
                    className={`inline-block cursor-pointer hover:underline ${
                      currentpage == "computers" ? "font-bold" : "font-thin"
                    }`}
                  >
                    Computers
                  </p>
                </Link>
                <br />
                <Link href={`/admin/components/category/tablets`}>
                  <p
                    className={`inline-block cursor-pointer hover:underline ${
                      currentpage == "tablets" ? "font-bold" : "font-thin"
                    }`}
                  >
                    Tablets
                  </p>
                </Link>
                <br />
                <Link href={`/admin/components/category/drones&cameras`}>
                  <p
                    className={`inline-block cursor-pointer hover:underline ${
                      currentpage == "drones&cameras"
                        ? "font-bold"
                        : "font-thin"
                    }`}
                  >
                    Drones & Cameras
                  </p>
                </Link>
                <br />
                <Link href={`/admin/components/category/headphones&speakers`}>
                  <p
                    className={`inline-block cursor-pointer hover:underline ${
                      currentpage == "headphones&speakers"
                        ? "font-bold"
                        : "font-thin"
                    }`}
                  >
                    Headphones & Speakers
                  </p>
                </Link>
                <br />
                <Link href={`/admin/components/category/mobiles`}>
                  <p
                    className={`inline-block cursor-pointer hover:underline ${
                      currentpage == "mobile" ? "font-bold" : "font-thin"
                    }`}
                  >
                    Mobiles
                  </p>
                </Link>
                <br />
                <Link href={`/admin/components/category/tv&homecinema`}>
                  <p
                    className={`inline-block cursor-pointer hover:underline ${
                      currentpage == "tv&homecinema" ? "font-bold" : "font-thin"
                    }`}
                  >
                    T.V & Home Cinema
                  </p>
                </Link>
                <br />
                <Link href={`/admin/components/category/wearabletech`}>
                  <p
                    className={`inline-block cursor-pointer hover:underline ${
                      currentpage == "wearabletech" ? "font-bold" : "font-thin"
                    }`}
                  >
                    Wearable Tech
                  </p>
                </Link>
                <br />
                <Link href={`/admin/components/category/sale`}>
                  <p
                    className={`inline-block cursor-pointer hover:underline ${
                      currentpage == "sale" ? "font-bold" : "font-thin"
                    }`}
                  >
                    Sale
                  </p>
                </Link>
                <br />
                <Link href={`/admin/components/category/bestseller`}>
                  <p
                    className={`inline-block cursor-pointer hover:underline ${
                      currentpage == "bestseller" ? "font-bold" : "font-thin"
                    }`}
                  >
                    Best Sellers
                  </p>
                </Link>

                <br />
              </div>
              <div>
                <div className="my-[2rem] py-[1rem] border-b-[1px] text-[1.5rem] font-semibold">
                  Filter by
                </div>
                <div
                  className={`p-4 border-b-[1px] duration-700 overflow-y-hidden ${
                    pricefilter ? "h-[8rem]" : "h-[3.5rem] "
                  }`}
                >
                  <div
                    className={`justify-between items-center  text-[20px] font-thin flex ${
                      pricefilter ? "block" : "hidden"
                    }`}
                  >
                    <div>
                      Price (${minPrice}-${maxPrice})
                    </div>
                    <RxMinus
                      className="cursor-pointer"
                      onClick={showpricefilter}
                    />
                  </div>
                  <div
                    className={`justify-between items-center text-[20px] font-thin ${
                      pricefilter ? "hidden" : "flex"
                    } border-b-[1px`}
                  >
                    <div>
                      Price (${minPrice}-${maxPrice})
                    </div>
                    <RxPlus
                      className="cursor-pointer"
                      onClick={showpricefilter}
                    />
                  </div>
                  <div className="flex flex-col items-center mt-[1rem]">
                    <div className="w-full flex items-center gap-4">
                      <span className="text-[16px] font-semibold text-gray-700">
                        ${minPrice}
                      </span>
                      <input
                        type="range"
                        min={0}
                        max={maxItemPrice}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-full accent-[var(---btncolor)] h-2 rounded-lg appearance-none bg-gray-200 outline-none transition-all duration-300"
                        disabled={maxItemPrice === 0}
                        style={{
                          background: `linear-gradient(to right, var(--btncolor, #7002ff) 0%, var(--btncolor, #7002ff) ${
                            (maxPrice / (maxItemPrice || 1)) * 100
                          }%, #e5e7eb ${
                            (maxPrice / (maxItemPrice || 1)) * 100
                          }%, #e5e7eb 100%)`,
                        }}
                      />
                      <span className="text-[16px] font-semibold text-gray-700">
                        ${maxItemPrice}
                      </span>
                    </div>
                  </div>
                </div>

                <div
                  className={`p-4 mb-[4rem] border-b-[1px] duration-700 overflow-y-hidden ${
                    colorfilter ? "h-auto" : "h-auto "
                  }`}
                >
                  <div
                    className={`justify-between items-center  text-[20px] font-thin flex ${
                      colorfilter ? "block" : "hidden"
                    }`}
                  >
                    <div>Color</div>
                    <RxMinus
                      className="cursor-pointer"
                      onClick={showcolorfilter}
                    />
                  </div>
                  <div
                    className={`justify-between items-center text-[20px] font-thin ${
                      colorfilter ? "hidden" : "flex"
                    } `}
                  >
                    <div>Color</div>
                    <RxPlus
                      className="cursor-pointer"
                      onClick={showcolorfilter}
                    />
                  </div>
                  <AnimatePresence initial={false}>
                    {colorfilter && (
                      <motion.div
                        key="colorfilter"
                        initial={{ height: 0, opacity: 0, y: -20 }}
                        animate={{ height: "auto", opacity: 1, y: 0 }}
                        exit={{ height: 0, opacity: 0, y: -20 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="m-[1rem] flex gap-2 flex-wrap">
                          {uniqueColors.map((color) => (
                            <div
                              key={color}
                              className={`w-[2rem] h-[2rem] rounded-full cursor-pointer flex items-center justify-center transition-all duration-200
                               ${
                                 selectedColor === color
                                   ? " scale-110 shadow-lg ring-2 ring-[var(---btncolor)]"
                                   : "border-gray-300"
                               }
                             `}
                              style={{ backgroundColor: color }}
                              title={color}
                              onClick={() =>
                                setSelectedColor(
                                  selectedColor === color ? null : color
                                )
                              }
                            >
                              {selectedColor === color && (
                                <span className="block w-3 h-3 rounded-full border-2 border-white bg-white opacity-80"></span>
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </Fade>
          </div>
          <div className="col-span-4 scrollbar-hide">
            <div className="text-[50px] font-bold my-[1rem] flex items-center justify-between">
              {pageName}
              <FaEdit
                className="text-[40px] cursor-pointer text-[var(---edit)]"
                onClick={() => openEditModal()}
                title="Add New Product"
              />
            </div>
            <div className="flex justify-between font-thin text-[20px] items-center">
              <div>{filteredAndSortedItems.length} Products</div>
              <div className="  my-[1rem] flex items-baseline">
                Sort by:
                <div className="relative mb-4 cursor-pointer">
                  <button
                    className=" px-4 py-2 rounded cursor-pointer"
                    onClick={() => setDropdownOpen((open) => !open)}
                  >
                    {selectedOption}
                    {dropdownOpen ? (
                      <span className="ml-2">∧</span>
                    ) : (
                      <span className="ml-2">∨</span>
                    )}
                  </button>
                  {dropdownOpen && (
                    <Fade duration={1000} cascade>
                      <ul className="absolute right-5  w-[11rem] border rounded bg-white shadow z-30">
                        {dropdownOptions.map((option) => (
                          <li
                            key={option}
                            className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                              selectedOption === option ? "font-bold" : ""
                            }`}
                            onClick={() => handleDropdownSelect(option)}
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    </Fade>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-[4rem]">
              {loading ? (
                <div className=" inset-0 mt-[10%] flex items-center justify-center col-span-5 bg-opacity-80 z-999">
                  <div className=" p-6 rounded  text-xl font-bold flex items-center gap-2">
                    <MoonLoader size={30} color="#7002ff" />
                    Loading...
                  </div>
                </div>
              ) : filteredAndSortedItems.length == 0 ? (
                <div className="text-[50px] col-span-5 font-thin">
                  There is no Product, Add Product for Production.
                </div>
              ) : (
                filteredAndSortedItems.map((item, index) => (
                  <Fade duration={1000} cascade fraction={0.3} triggerOnce>
                    <div
                      key={item.id}
                      className="relative w-full flex-shrink-0 cursor-pointer bg-[var(---whitetext)] h-[28rem] content-center"
                    >
                      <FaEdit
                        className="absolute top-1 right-2 z-10 text-[25px] cursor-pointer text-[var(---edit)]"
                        onClick={() => openEditModal(index)}
                        title="Edit"
                      />
                      <button
                        className="absolute top-1 right-10 z-10 bg-red-500 text-white cursor-pointer px-2 py-1 rounded text-xs"
                        onClick={() => handleDelete(index)}
                        title="Delete"
                      >
                        Delete
                      </button>
                      {item.onsale ? (
                        <div className=" p-0.5 px-4 bg-[var(---salelabel)] inline text-[var(---whitetext)] rounded-[1rem] m-2 font-thin ">
                          SALE
                        </div>
                      ) : (
                        <div className="p-0.5 px-4 bg-[var(---whitetext)] inline text-[var(---whitetext)] rounded-[1rem] m-2 font-thin ">
                          SALE
                        </div>
                      )}

                      <Image
                        src={item.image}
                        alt={`product ${index}`}
                        width={1020}
                        height={1020}
                        className="transition-transform duration-500 my-2 hover:scale-102 h-[18rem]"
                      />
                      <div>
                        <div className="ml-4 font-thin">{item.name}</div>
                        <div className="ml-4 font-thin">
                          {item.specification}
                        </div>
                        {item.onsale ? (
                          <div className="flex flex-col text-[18px] ">
                            <div className="ml-2 font-bold text-[var(---price)]">
                              <s>{item.price}</s>
                            </div>
                            <div className="ml-2 font-bold text-[var(---price)]">
                              {item.sale_price}
                            </div>
                          </div>
                        ) : (
                          <div className="m-2 text-[18px] font-bold text-[var(---price)]">
                            {item.price}
                          </div>
                        )}
                      </div>
                    </div>
                  </Fade>
                ))
              )}
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
};

export default DronesAndCameras;
