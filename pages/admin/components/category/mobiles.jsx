import React, { useState } from "react";
import Image from "next/image";

import img1 from "../assets/img7.jpg";
import img2 from "../assets/img5.jpg";
import img3 from "../assets/img6.jpg";
import { RxCross2, RxMinus, RxPlus } from "react-icons/rx";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";


const initialImages = [
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
    src: img1,
    sale: true,
    name: "FaPhone",
    specification: "12gb ram",
    price: "$70.00",
    saleprice: "$65.00",
  },
  {
    id: 5,
    src: img2,
    sale: false,
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
  {
    id: 7,
    src: img1,
    sale: true,
    name: "FaPhone",
    specification: "12gb ram",
    price: "$70.00",
    saleprice: "$65.00",
  },
  {
    id: 8,
    src: img2,
    sale: false,
    name: "FaPhone",
    specification: "12gb ram",
    price: "$70.00",
    saleprice: "$65.00",
  },
  {
    id: 9,
    src: img3,
    sale: true,
    name: "FaPhone",
    specification: "12gb ram",
    price: "$70.00",
    saleprice: "$65.00",
  },
];

const Mobiles = () => {
  
  const [items, setItems] = useState(initialImages);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({
    id: "",
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
        id: item.id,
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
        id: "",
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
      id: form.id,
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
      id: "",
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

 
  const [filter, setfilter] = useState(false);
  const [sortbyfilter, setsortbyfilter] = useState(true);
  const [pricefilter, setpricefilter] = useState(false);
  const [minPrice, setMinPrice] = useState(50);
  const [maxPrice, setMaxPrice] = useState(100);

  const [colorfilter, setcolorfilter] = useState(false);
  const router = useRouter();
  let currentpage;
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
  } else if (router.route === "/admin/components/category/headphones&speakers") {
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
  let colorofitem = "rgb(810, 58, 4)";
  
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

  const handleDropdownSelect = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  return (
    <>
      {/* Edit Modal */}
      {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-200">
          <div className="bg-white rounded-lg p-8 shadow-lg w-[350px]">
            <div className="text-2xl font-bold mb-4">
              {editIndex !== null ? "Edit Product" : "Add New Product"}
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
                placeholder="Unique ID"
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

      {/* mobile  */}
      <div className="sm:block l:hidden mx-[1rem]">
        <div className="flex space-x-2">
          <Link href={`/admin/components`}>
            <div className="cursor-pointer hover:font-bold font-thin">Home</div>
          </Link>
          <div className="">&gt;</div>
          <div className="font-thin">Mobiles</div>
        </div>
        <div className="text-[30px] font-bold my-[1rem] flex items-center justify-between">
          Mobiles
          <FaEdit
            className="text-[30px] cursor-pointer text-[var(---edit)]"
            onClick={() => openEditModal()}
            title="Add New Product"
          />
        </div>
        <div className="flex justify-between font-thin items-center">
          <div>{items.length} Products</div>
          <div
            className="underline cursor-pointer my-[1rem]"
            onClick={showfilter}
          >
            Filter & Sort
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-[4rem]">
          {items.map((item, index) => (
            <div
              key={item.id}
              className="relative w-full flex-shrink-0 cursor-pointer bg-[var(---whitetext)]"
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
              </button></div>
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
                className="transition-transform duration-500 my-2"
              />
              <div>
                <div className="ml-4 font-thin">{item.name}</div>
                <div className="ml-4 font-thin">{item.specification}</div>
                {item.sale ? (
                  <div className="flex flex-col text-[18px] ">
                    <div className="ml-2 font-bold text-[var(---price)]">
                      <s>{item.price}</s>
                    </div>
                    <div className="ml-2 font-bold text-[var(---price)]">
                      {item.saleprice}
                    </div>
                  </div>
                ) : (
                  <div className="m-2 text-[18px] font-bold text-[var(---price)]">
                    {item.price}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* filter  */}
      <div className={`fixed w-full h-full bg-[var(---whitetext)] top-0 duration-[2s] px-[1rem] z-300 ${
          filter ? "right-0" : " right-[-120vw]"
        } overflow-y-scroll mb-[4rem] scrollbar-hide`}
      >
        <div className="flex justify-between p-4 border-y-[1px] items-center py-[1.5rem] my-[1rem] text-[20px] font-thin">
          <div>Filter & Sort (10 products)</div>
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
              <input type="radio" name="sort" id="rec" defaultChecked />
              <label htmlFor="rec">Recommended</label>
            </div>
            <div className="space-x-2 my-2">
              <input type="radio" name="sort" id="newest" />
              <label htmlFor="newest">Newest</label>
            </div>
            <div className="space-x-2 my-2">
              <input type="radio" name="sort" id="plth" />
              <label htmlFor="plth">Price (low to high)</label>
            </div>
            <div className="space-x-2 my-2">
              <input type="radio" name="sort" id="phtl" />
              <label htmlFor="phtl">Price (high to low)</label>
            </div>
            <div className="space-x-2 my-2">
              <input type="radio" name="sort" id="Natoz" />
              <label htmlFor="Natoz">Name A-Z</label>
            </div>
            <div className="space-x-2 my-2">
              <input type="radio" name="sort" id="Nztoa" />
              <label htmlFor="Nztoa">Name Z-A</label>
            </div>
          </div>
        </div>

        <div
          className={`p-4 border-b-[1px] duration-700 overflow-y-hidden ${
            pricefilter ? "h-[9rem]" : "h-[3.5rem] "
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
          <div className="flex w-[80vw] my-[1rem]">
            <input
              type="range"
              min={minPrice}
              value={maxPrice}
              max={100}
              onChange={(e) => {
                setMaxPrice(e.target.value);
              }}
              className="w-[80vw]"
            />
          </div>
          <div className="flex justify-between w-[80vw]">
            <div>${minPrice}</div>
            <div>${maxPrice}</div>
          </div>
        </div>

        <div
          className={`p-4 mb-[4rem] border-b-[1px] duration-700 overflow-y-hidden ${
            colorfilter ? "h-[7rem]" : "h-[3.5rem] "
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
            } border-b-[1px`}
          >
            <div>Color</div>
            <RxPlus className="cursor-pointer" onClick={showcolorfilter} />
          </div>
          <div className="my-[1rem]">
            <div
              className="w-[2rem] h-[2rem] rounded-full"
              style={{ backgroundColor: colorofitem }}
            ></div>
          </div>
        </div>
      </div>
      {/* laptop */}
      <div className="sm:hidden mx-[1.5rem] l:grid l:grid-cols-5 gap-[10px] ">
        <div className="col-span-1 h-[100vh] overflow-scroll scrollbar-hide">
          <div className="flex space-x-2 text-[20px]">
            <Link href={`/admin/components`}>
              <div className="cursor-pointer hover:font-bold font-thin">
                Home
              </div>
            </Link>
            <div className="">&gt;</div>
            <div className="font-thin">Mobiles</div>
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
                  currentpage == "drones&cameras" ? "font-bold" : "font-thin"
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
                  currentpage == "mobiles" ? "font-bold" : "font-thin"
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
                pricefilter ? "h-[9rem]" : "h-[3.5rem] "
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
              <div className="flex  my-[1rem]">
                <input
                  type="range"
                  min={minPrice}
                  value={maxPrice}
                  max={100}
                  onChange={(e) => {
                    setMaxPrice(e.target.value);
                  }}
                  className="w-full"
                />
              </div>
              <div className="flex justify-between">
                <div>${minPrice}</div>
                <div>${maxPrice}</div>
              </div>
            </div>

            <div
              className={`p-4 border-b-[1px] mb-[4rem] duration-700 overflow-y-hidden ${
                colorfilter ? "h-[7rem]" : "h-[3.5rem] "
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
                } border-b-[1px`}
              >
                <div>Color</div>
                <RxPlus className="cursor-pointer" onClick={showcolorfilter} />
              </div>
              <div className="my-[1rem]">
                <div
                  className="w-[2rem] h-[2rem] rounded-full"
                  style={{ backgroundColor: colorofitem }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4 h-[100vh] overflow-scroll scrollbar-hide">
          <div className="text-[50px] font-bold my-[1rem] flex items-center justify-between">
                Mobiles
            <FaEdit
              className="text-[40px] cursor-pointer text-[var(---edit)]"
              onClick={() => openEditModal()}
              title="Add New Product"
            />
          </div>
          <div className="flex justify-between font-thin text-[20px] items-center">
            <div>{items.length} Products</div>
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
                  <ul className="absolute right-5  w-[10vw] border rounded bg-white shadow z-30">
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
                )}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 gap-4 mb-[4rem]">
            {items.map((item, index) => (
              <div
                key={item.id}
                className="relative w-full flex-shrink-0 cursor-pointer bg-[var(---whitetext)]"
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
                  className="transition-transform duration-500 my-2"
                />
                <div>
                  <div className="ml-4 font-thin">{item.name}</div>
                  <div className="ml-4 font-thin">{item.specification}</div>
                  {item.sale ? (
                    <div className="flex flex-col text-[18px] ">
                      <div className="ml-2 font-bold text-[var(---price)]">
                        <s>{item.price}</s>
                      </div>
                      <div className="ml-2 font-bold text-[var(---price)]">
                        {item.saleprice}
                      </div>
                    </div>
                  ) : (
                    <div className="m-2 text-[18px] font-bold text-[var(---price)]">
                      {item.price}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Mobiles;
