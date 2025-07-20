import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { FaBox, FaEdit } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { BiSolidMessage } from "react-icons/bi";
import { Swiper, SwiperSlide } from "swiper/react";
import { MoonLoader } from "react-spinners";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

import toast, { Toaster } from "react-hot-toast";
const AdminNavbar = ({ orders }) => {
  const [mobilemenu, setmonbilemenu] = useState(true);
  const [search, setsearch] = useState(true);
  const [trendproduct, settrendproduct] = useState([]);
  const router = useRouter();

  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
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
  const [editSource, setEditSource] = useState(null);

  const openEditModal = (index = null, source) => {
    if (index !== null) {
      const item = source === "trend" ? trendproduct[index] : filtered[index];
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
      setEditSource(source);
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
      setEditSource(null);
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
        router.push("/admin/components");
      setsearch(true);
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
      router.push("/admin/components");
      setsearch(true);
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

  const handleDelete = async (index, source) => {
    const product = source === "trend" ? trendproduct[index] : filtered[index];
    if (!product?.id) return;

    try {
      await fetch("/api/deleteproduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: product.id }),
      });

      router.push("/admin/components");
      setsearch(true);
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.04, type: "spring", stiffness: 120 },
    }),
  };
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/viewall");
        const json = await res.json();
        if (json) {
          setAllProducts(json);
          setFiltered(json);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const q = searchQuery.toLowerCase();
    const f = allProducts.filter((item) =>
      String(item.id).toLowerCase().includes(q)
    );
    setFiltered(f);
  }, [searchQuery, allProducts]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/bestsellermain");
        const data = await res.json();
        settrendproduct(data);
      } catch (error) {}
    };
    fetchProducts();
  }, []);

  const showmenu = () => {
    setmonbilemenu(!mobilemenu);
  };
  const showsearch = () => {
    setsearch(!search);
  };

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlAdminNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlAdminNavbar);
    return () => window.removeEventListener("scroll", controlAdminNavbar);
  }, [lastScrollY]);

  return (
    <>
      <nav
        className={`sticky top-0 left-0 w-full bg-white shadow transition-transform duration-300 z-100 overflow-x-hidden ${
          show ? "l:translate-y-0" : "l:-translate-y-full"
        }`}
      >
        <Link href={`/`}>
          <div className="absolute top-[-3rem] left-[-4rem] w-[5rem] h-[5rem] rounded-full cursor-not-allowed bg-[var(---salelabel)]"></div>
        </Link>
        {/*  navbar */}
        <div className="sm:h-[10vh] l:h-[5rem] w-full bg-[var(---Adminnavbar)] ">
          <div className="flex sm:h-[10vh] l:h-[5rem] justify-between px-2 sm:text-[22px] place-items-center">
            <Link href={`/admin/components/`}>
              <div className="l:text-[28px] font-black cursor-pointer l:mx-2">
                AR Codes
              </div>
            </Link>
            <div className="l:text-[28px] font-black cursor-pointer l:mx-2">
              Admin
            </div>
            <div className="flex items-center space-x-2 text-[1.6rem] l:text-[1.8rem]">
              <div className="cursor-pointer" onClick={showsearch}>
                <IoIosSearch />
              </div>
              <Link href={`/admin/components/basic/messages`} className="">
                <div
                  onClick={() => {
                    showmenu();
                  }}
                  className="flex items-center l:text-[35px] mx-2 cursor-pointer"
                >
                  <BiSolidMessage />
                </div>
              </Link>
              <Link
                href={`/admin/components/basic/orders`}
                className="sm:hidden l:block"
              >
                <div
                  onClick={() => {
                    showmenu();
                  }}
                  className="flex items-center space-x-2 mx-2 cursor-pointer"
                >
                  <div className="l:text-[30px] relative">
                    <FaBox />
                    <div className="absolute top-[-0.5rem] left-[1rem] w-[1.5rem] h-[1.5rem] bg-[var(---salelabel)] text-[var(---whitetext)] text-center rounded-full text-[15px]">
                      {orders?.rows?.length || 0}
                    </div>
                  </div>
                  <div className="l:text-[20px] font-thin">Orders</div>
                </div>
              </Link>
              <div className="cursor-pointer l:hidden" onClick={showmenu}>
                <RxHamburgerMenu />
              </div>
            </div>
          </div>
        </div>
        {/* laptop menu */}
        <div className="hidden w-full l:flex justify-between sm:text-[18px] px-2 py-2 bg-[var(---pagecolor)]">
          <div className="flex items-center space-x-[1rem] pl-[1rem]">
            <Link href={`/admin/components/category/allproducts`}>
              <div
                onClick={() => {
                  showmenu();
                }}
                className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)] t:text-[12px] "
              >
                All Products
              </div>
            </Link>
            <Link href={`/admin/components/category/computers`}>
              <div
                onClick={() => {
                  showmenu();
                }}
                className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)] t:text-[12px]"
              >
                Computers
              </div>
            </Link>
            <Link href={`/admin/components/category/tablets`}>
              <div
                onClick={() => {
                  showmenu();
                }}
                className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)] t:text-[12px]"
              >
                Tablets
              </div>
            </Link>
            <Link href={`/admin/components/category/drones&cameras`}>
              <div
                onClick={() => {
                  showmenu();
                }}
                className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)] t:text-[12px]"
              >
                Drones & Cameras
              </div>
            </Link>
            <Link href={`/admin/components/category/headphones&speakers`}>
              <div
                onClick={() => {
                  showmenu();
                }}
                className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)] t:text-[12px]"
              >
                Head Phones & Speakers
              </div>
            </Link>
            <Link href={`/admin/components/category/mobiles`}>
              <div
                onClick={() => {
                  showmenu();
                }}
                className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)] t:text-[12px]"
              >
                Mobiles
              </div>
            </Link>
            <Link href={`/admin/components/category/tv&homecinema`}>
              <div
                onClick={() => {
                  showmenu();
                }}
                className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)] t:text-[12px]"
              >
                T.V & Home Cinema
              </div>
            </Link>
            <Link href={`/admin/components/category/wearabletech`}>
              <div
                onClick={() => {
                  showmenu();
                }}
                className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)] t:text-[12px]"
              >
                Wearable Tech
              </div>
            </Link>
            <Link href={`/admin/components/category/sale`}>
              <div
                onClick={() => {
                  showmenu();
                }}
                className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)] t:text-[12px]"
              >
                Sale
              </div>
            </Link>
          </div>
          <div className="flex py-2 space-x-[1rem] pr-[1rem]">
            <Link href={`/admin/components/basic/about`}>
              <div
                onClick={() => {
                  showmenu();
                }}
                className="underline text-[15px] cursor-pointer t:text-[12px]"
              >
                About
              </div>
            </Link>
            <Link href={`/admin/components/basic/contact`}>
              <div
                onClick={() => {
                  showmenu();
                }}
                className="underline text-[15px] cursor-pointer t:text-[12px]"
              >
                Contact
              </div>
            </Link>
            <Link href={`/admin/components/basic/helpcenter`}>
              <div
                onClick={() => {
                  showmenu();
                }}
                className="underline text-[15px] cursor-pointer t:text-[12px]"
              >
                Help Center
              </div>
            </Link>
            <div className="flex text-[15px] t:text-[12px] cursor-pointer">
              Call Us{" "}
              <Link
                href={`https://wa.me/${923270972423}?text=${encodeURIComponent(
                  "Hi!"
                )}`}
                target="_blank"
                className=" mx-1 underline "
              >
                +923270972423
              </Link>
            </div>
          </div>
        </div>

        {/* mobilemenu */}
        <div
          className={`${
            mobilemenu ? "right-[-120vw] opacity-0" : "right-0 opacity-100"
          } duration-[2s] fixed top-0 w-full h-full bg-[var(---mobilemenu)] sm:text-[18px] p-3 overflow-y-scroll z-10 l:hidden`}
        >
          <div
            className="text-[30px] place-self-end my-1 cursor-pointer"
            onClick={showmenu}
          >
            <RxCross2 />
          </div>
          <Link href={`/admin/components/basic/login`}>
            <div
              onClick={() => {
                showmenu();
              }}
              className="flex items-center space-x-2 my-2 cursor-pointer"
            >
              <div>Orders</div>
              <div className="l:text-[30px] relative">
                <FaBox />
                <div className="absolute top-[-0.5rem] left-[0.6rem] w-[1rem] h-[1rem] bg-[var(---salelabel)] text-[var(---whitetext)] text-center rounded-full text-[11px]">
                  {orders?.rows?.length || 0}
                </div>
              </div>
            </div>
          </Link>
          <div className="flex justify-between text-[14px] my-4">
            <Link href={`/admin/components/basic/about`}>
              <div
                onClick={() => {
                  showmenu();
                }}
                className="underline cursor-pointer"
              >
                About
              </div>
            </Link>
            <Link href={`/admin/components/basic/contact`}>
              <div
                onClick={() => {
                  showmenu();
                }}
                className="underline cursor-pointer"
              >
                Contact
              </div>
            </Link>
            <Link href={`/admin/components/basic/helpcenter`}>
              <div
                onClick={() => {
                  showmenu();
                }}
                className="underline cursor-pointer"
              >
                Help Center
              </div>
            </Link>
          </div>
          <div className="flex text-[15px] my-4 mb-[2rem] cursor-pointer">
            Call Us{" "}
            <Link
              href={`https://wa.me/${923270972423}?text=${encodeURIComponent(
                "Hi!"
              )}`}
              target="_blank"
              className=" mx-1 underline "
            >
              +923270972423
            </Link>
          </div>
          <Link href={`/admin/components/category/allproducts`}>
            <div
              onClick={() => {
                showmenu();
              }}
              className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer "
            >
              All Products
            </div>
          </Link>
          <Link href={`/admin/components/category/computers`}>
            <div
              onClick={() => {
                showmenu();
              }}
              className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
            >
              Computers
            </div>
          </Link>
          <Link href={`/admin/components/category/tablets`}>
            <div
              onClick={() => {
                showmenu();
              }}
              className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
            >
              Tablets
            </div>
          </Link>
          <Link href={`/admin/components/category/drones&cameras`}>
            <div
              onClick={() => {
                showmenu();
              }}
              className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
            >
              Drones & Cameras
            </div>
          </Link>
          <Link href={`/admin/components/category/headphones&speakers`}>
            <div
              onClick={() => {
                showmenu();
              }}
              className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
            >
              Head Phones & Speakers
            </div>
          </Link>
          <Link href={`/admin/components/category/mobiles`}>
            <div
              onClick={() => {
                showmenu();
              }}
              className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
            >
              Mobiles
            </div>
          </Link>
          <Link href={`/admin/components/category/tv&homecinema`}>
            <div
              onClick={() => {
                showmenu();
              }}
              className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
            >
              T.V & Home Cinema
            </div>
          </Link>
          <Link href={`/admin/components/category/wearabletech`}>
            <div
              onClick={() => {
                showmenu();
              }}
              className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
            >
              Wearable Tech
            </div>
          </Link>
          <Link href={`/admin/components/category/sale`}>
            <div
              onClick={() => {
                showmenu();
              }}
              className="text-center my-2 text-[16px] py-2 cursor-pointer"
            >
              Sale
            </div>
          </Link>
        </div>
      </nav>
      {/* searchmenu */}
      <div
        className={`${
          search ? "right-[-120vw] opacity-0" : "right-0 opacity-100"
        } duration-[2s] fixed top-0 w-full h-full bg-[var(---whitetext)] sm:text-[18px] p-3 overflow-y-scroll z-999 scrollbar-hide`}
      >
        <div className="flex justify-between l:justify-center l:space-x-[2rem] px-[1rem]">
          <div className="flex items-center space-x-2 p-2 border-[1px] w-[60vw] l:w-[80vw]">
            <div>
              <IoIosSearch />
            </div>
            <input
              type="number"
              placeholder="Search by id"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="appearance-none focus:outline-none p-2 w-full"
            />
          </div>
          <button
            className="font-thin hover:underline cursor-pointer"
            onClick={showsearch}
          >
            Close
          </button>
        </div>
        <div>
          {searchQuery.length > 0 ? (
            filtered.length > 0 ? (
              <>
                <div className="font-bold my-[2rem] text-[18px] l:mx-[1rem]">
                  Searched Item
                </div>
                <div className="relative max-w-6xl l:max-w-full mx-auto">
                  <Swiper
                    spaceBetween={10}
                    breakpoints={{
                      640: { slidesPerView: 1 },
                      1024: { slidesPerView: 4 },
                    }}
                  >
                    {filtered.map((item, index) => (
                      <SwiperSlide key={index}>
                        <div className="flex flex-col items-start my-2 shadow shadow-black p-2 mx-2 relative">
                          <button
                            className="absolute top-0 right-2 text-[22px] text-red-500 rounded px-2  z-10 cursor-pointer"
                            onClick={() => openEditModal(index, "all")}
                            title="Edit"
                          >
                            <FaEdit className="inline mr-1" />
                          </button>
                          <button
                            className="absolute top-2 right-14 text-xs bg-red-500 text-white rounded px-2 py-1 z-10 cursor-pointer"
                            onClick={() => handleDelete(index, "all")}
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
                              className="transition-transform duration-500 my-2 hover:scale-102 hover:duration-500 hover:ease-in-out rounded-[1rem] w-full sm:h-[16rem] l:h-[22rem]"
                            />
                          </div>
                          <div className="ml-2 font-thin">{item.name}</div>
                          <div className="ml-2 font-thin">
                            {item.specification}
                          </div>
                          {item.onsale ? (
                            <div className="flex text-[18px] ml-2">
                              <div className="font-bold text-[var(---price)]">
                                <s>${item.price}</s>
                              </div>
                              <div className="ml-2 font-bold text-[var(---price)]">
                                ${item.sale_price}
                              </div>
                            </div>
                          ) : (
                            <div className="text-[18px] ml-2 font-bold text-[var(---price)]">
                              ${item.price}
                            </div>
                          )}
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </>
            ) : (
              <div className="text-center text-gray-500 py-10">
                No matching products found.
              </div>
            )
          ) : null}

          <div className="font-bold my-[2rem] text-[18px] l:mx-[1rem]">
            Trending Products
          </div>
          <div className="relative max-w-6xl l:max-w-full mx-auto">
            <Swiper
              spaceBetween={10}
              breakpoints={{
                640: { slidesPerView: 1 },
                1024: { slidesPerView: 4 },
              }}
            >
              {trendproduct.length > 0 ? (
                trendproduct.map((item, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex flex-col items-start my-2 shadow shadow-black p-2 mx-2 relative">
                      <button
                        className="absolute top-0 right-2 text-[22px] text-red-500 rounded px-2  z-10 cursor-pointer"
                        onClick={() => openEditModal(index, "trend")}
                        title="Edit"
                      >
                        <FaEdit className="inline mr-1" />
                      </button>
                      <button
                        className="absolute top-2 right-14 text-xs bg-red-500 text-white rounded px-2 py-1 z-10 cursor-pointer"
                        onClick={() => handleDelete(index, "trend")}
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
                          className="transition-transform duration-500 my-2 hover:scale-102 hover:duration-500 hover:ease-in-out rounded-[1rem] w-full sm:h-[16rem] l:h-[22rem]"
                        />
                      </div>
                      <div className="ml-2 font-thin">{item.name}</div>
                      <div className="ml-2 font-thin">{item.specification}</div>
                      {item.onsale ? (
                        <div className="flex text-[18px] ml-2">
                          <div className="font-bold text-[var(---price)]">
                            <s>${item.price}</s>
                          </div>
                          <div className="ml-2 font-bold text-[var(---price)]">
                            ${item.sale_price}
                          </div>
                        </div>
                      ) : (
                        <div className="text-[18px] ml-2 font-bold text-[var(---price)]">
                          ${item.price}
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                ))
              ) : (
                <div className=" inset-0 flex items-center justify-center col-span-5 bg-opacity-80 z-999">
                  <div className=" p-6 rounded  text-xl font-bold flex items-center gap-2">
                    <MoonLoader size={30} color="#7002ff" />
                    Loading...
                  </div>
                </div>
              )}
            </Swiper>
          </div>
          <Link href={`/components/category/bestseller`}>
            <button className="w-[10rem] l:w-[8rem] h-[4rem] l:h-[3rem] l:text-[14px] bg-[var(---blacktext)] text-[var(---whitetext)] p-4 l:p-2 font-thin my-[1rem] hover:underline cursor-pointer l:mx-[1rem]">
              Show All Results
            </button>
          </Link>
        </div>
      </div>
      <Toaster />

      {editModalOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-999"
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
    </>
  );
};
export default AdminNavbar;
