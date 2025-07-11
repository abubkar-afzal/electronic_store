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
import Head from "next/head";

const Tablets = ({addToCart}) => {
  const pageName = "Tablets";
    const [flippedCards, setFlippedCards] = useState({});
  
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
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
        const res = await fetch("/api/viewtablets");
        const data = await res.json();
        setItems(data);
      } catch (error) {}
      setLoading(false);
    };
    fetchProducts();
  }, []);

  if (router.route === "/components/category/allproducts") {
    currentpage = "allproducts";
  } else if (router.route === "/components/category/computers") {
    currentpage = "computers";
  } else if (router.route === "/components/category/mobiles") {
    currentpage = "mobiles";
  } else if (router.route === "/components/category/drones&cameras") {
    currentpage = "drones&cameras";
  } else if (router.route === "/components/category/tv&homecinema") {
    currentpage = "tv&homecinema";
  } else if (router.route === "/components/category/tablets") {
    currentpage = "tablets";
  } else if (
    router.route === "/components/category/headphones&speakers"
  ) {
    currentpage = "headphones&speakers";
  } else if (router.route === "/components/category/wearabletech") {
    currentpage = "wearabletech";
  } else if (router.route === "/components/category/sale") {
    currentpage = "sale";
  } else if (router.route === "/components/category/bestseller") {
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

     

      {/* mobile  */}
      <Fade duration={2000} cascade>
        <div className="sm:block l:hidden mx-[1rem] min-h-screen">
          <div className="flex space-x-2">
            <Link href={`/`}>
              <div className="cursor-pointer hover:font-bold font-thin">
                Home
              </div>
            </Link>
            <div className="">&gt;</div>
            <div className="font-thin">{pageName}</div>
          </div>
          <div className="text-[30px] font-bold my-[1rem] flex items-center justify-between">
            {pageName}
            
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
                  <Fade
                    key={item.id}
                    duration={1000}
                    cascade
                    fraction={0.3}
                    triggerOnce
                  >
                    <div
                      onClick={() =>
                        setFlippedCards((prev) => ({
                          ...prev,
                          [item.id]: !prev[item.id], // flip only this card
                        }))
                      }
                      className="w-full h-[20rem] relative my-[1rem] mx-2 perspective-[1000px] cursor-pointer"
                    >
                      <div
                        className={`transition-transform duration-[1s] w-full h-full relative`}
                        style={{
                          transformStyle: "preserve-3d",
                          transform: flippedCards[item.id]
                            ? "rotateY(180deg)"
                            : "rotateY(0deg)",
                        }}
                      >
                        {/* FRONT SIDE */}
                      <div className="absolute inset-0 backface-hidden bg-[var(---whitetext)] rounded-[1rem] shadow shadow-black p-2">
                        {item.avaliable_quantity <= 0 ? (
                          <div className=" bg-red-600 text-white font-bold w-full top-[50%] relative text-center z-20">
                            OUT OF STOCK
                          </div>
                        ) : item.onsale ? (
                          <div className="p-0.5 px-4 bg-[var(---salelabel)] inline text-[var(---whitetext)] rounded-[1rem] m-2 font-thin">
                            SALE
                          </div>
                        ) : (
                          <div className="p-0.5 px-4 bg-[var(---whitetext)] inline text-[var(---whitetext)] rounded-[1rem] m-2 font-thin">
                            SALE
                          </div>
                        )}

                        <Image
                          src={item.image}
                          alt={`Slide ${index}`}
                          width={1020}
                          height={1020}
                          className="transition-transform duration-500 my-2 hover:scale-102 rounded-[1rem] w-full h-[10rem]"
                        />

                        <div className="ml-2 font-thin">{item.name}</div>
                        <div className="ml-2 font-thin">
                          {item.specification}
                        </div>

                        {item.onsale ? (
                          <div className="flex sm:flex-col l:flex-row text-[18px] l:ml-2">
                            <div className="font-bold text-[var(---price)]">
                              <s>{item.price}</s>
                            </div>
                            <div className="l:ml-2 font-bold text-[var(---price)]">
                              {item.sale_price}
                            </div>
                          </div>
                        ) : (
                          <div className="text-[18px] ml-2 font-bold text-[var(---price)]">
                            {item.price}
                          </div>
                        )}
                      </div>

                      {/* BACK SIDE */}
                      <div className="absolute inset-0 backface-hidden rotate-y-180 border shadow-black bg-[var(---whitetext)] shadow-sm rounded-[1rem] flex flex-col justify-center items-center p-4 space-y-4">
                        {item.avaliable_quantity <= 0 ? (
                          <div className="text-red-600 font-black text-center">
                            Not Available
                          </div>
                        ) : (
                          <>
                            <button
                              onClick={() => addToCart(item)}
                              className="text-[14px] font-semibold bg-[var(---btncolor)] text-[var(---whitetext)] p-2 l:p-4 l:px-[2rem] px-[1.5rem] rounded-[8px] my-[1rem] cursor-pointer hover:bg-transparent hover:text-[var(---btncolor)] hover:border-[var(---btncolor)] hover:border-[1px] duration-[1s]"
                            >
                              Add to Cart
                            </button>
                            <Link href={`/components/buynow/${item.id}`}>
                              <button className="text-[14px] l:text-[16px] font-semibold bg-[var(---blacktext)] text-[var(---whitetext)] p-2 l:p-4 l:px-[2rem] px-[1.5rem] rounded-[8px] mb-[1rem] cursor-pointer hover:bg-transparent hover:text-[var(---blacktext)] hover:border-[var(---blacktext)] hover:border-[1px] duration-[1s]">
                                Buy Now
                              </button>
                            </Link>
                            <Link href={`/components/product/${item.id}`}>
                              <div className="underline text-blue-600 text-[14px] cursor-pointer hover:scale-110 duration-[1s]">
                                Details
                              </div>
                            </Link>
                          </>
                        )}
                      </div>
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
                ${selectedColor === color ? " scale-110 shadow-lg ring-2 ring-[var(---btncolor)]" : "border-gray-300"}
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
                <Link href={`/`}>
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

                <Link href={`/components/category/allproducts`}>
                  <p
                    className={`inline-block cursor-pointer hover:underline ${
                      currentpage == "allproducts" ? "font-bold" : "font-thin"
                    }`}
                  >
                    All Produtcs
                  </p>
                </Link>
                <br />
                <Link href={`/components/category/computers`}>
                  <p
                    className={`inline-block cursor-pointer hover:underline ${
                      currentpage == "computers" ? "font-bold" : "font-thin"
                    }`}
                  >
                    Computers
                  </p>
                </Link>
                <br />
                <Link href={`/components/category/tablets`}>
                  <p
                    className={`inline-block cursor-pointer hover:underline ${
                      currentpage == "tablets" ? "font-bold" : "font-thin"
                    }`}
                  >
                    Tablets
                  </p>
                </Link>
                <br />
                <Link href={`/components/category/drones&cameras`}>
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
                <Link href={`/components/category/headphones&speakers`}>
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
                <Link href={`/components/category/mobiles`}>
                  <p
                    className={`inline-block cursor-pointer hover:underline ${
                      currentpage == "mobile" ? "font-bold" : "font-thin"
                    }`}
                  >
                    Mobiles
                  </p>
                </Link>
                <br />
                <Link href={`/components/category/tv&homecinema`}>
                  <p
                    className={`inline-block cursor-pointer hover:underline ${
                      currentpage == "tv&homecinema" ? "font-bold" : "font-thin"
                    }`}
                  >
                    T.V & Home Cinema
                  </p>
                </Link>
                <br />
                <Link href={`/components/category/wearabletech`}>
                  <p
                    className={`inline-block cursor-pointer hover:underline ${
                      currentpage == "wearabletech" ? "font-bold" : "font-thin"
                    }`}
                  >
                    Wearable Tech
                  </p>
                </Link>
                <br />
                <Link href={`/components/category/sale`}>
                  <p
                    className={`inline-block cursor-pointer hover:underline ${
                      currentpage == "sale" ? "font-bold" : "font-thin"
                    }`}
                  >
                    Sale
                  </p>
                </Link>
                <br />
                <Link href={`/components/category/bestseller`}>
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
  className={`p-4 mb-[4rem] duration-700 border-b-[1px] overflow-y-hidden ${
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
    }`}
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
              className={` w-[2rem] h-[2rem] rounded-full cursor-pointer flex items-center justify-center transition-all duration-200
                ${selectedColor === color ? " scale-110 shadow-lg ring-2 ring-[var(---btncolor)]" : "border-gray-300"}
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
            </Fade>
          </div>
          <div className="col-span-4 scrollbar-hide">
            <div className="text-[50px] font-bold my-[1rem] flex items-center justify-between">
              {pageName}
              
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
                  <Fade
                    key={item.id}
                    duration={1000}
                    cascade
                    fraction={0.3}
                    triggerOnce
                  >
                    <div
                      onClick={() =>
                        setFlippedCards((prev) => ({
                          ...prev,
                          [item.id]: !prev[item.id], // flip only this card
                        }))
                      }
                      className="w-full h-[25rem] relative my-[1rem] mx-2 perspective-[1000px] cursor-pointer"
                    >
                      <div
                        className={`transition-transform duration-[1s] w-full h-full relative`}
                        style={{
                          transformStyle: "preserve-3d",
                          transform: flippedCards[item.id]
                            ? "rotateY(180deg)"
                            : "rotateY(0deg)",
                        }}
                      >
                        {/* FRONT SIDE */}
                      <div className="absolute inset-0 backface-hidden bg-[var(---whitetext)] rounded-[1rem] shadow shadow-black p-2">
                        {item.avaliable_quantity <= 0 ? (
                          <div className=" bg-red-600 text-white font-bold w-full top-[50%] relative text-center z-20">
                            OUT OF STOCK
                          </div>
                        ) : item.onsale ? (
                          <div className="p-0.5 px-4 bg-[var(---salelabel)] inline text-[var(---whitetext)] rounded-[1rem] m-2 font-thin">
                            SALE
                          </div>
                        ) : (
                          <div className="p-0.5 px-4 bg-[var(---whitetext)] inline text-[var(---whitetext)] rounded-[1rem] m-2 font-thin">
                            SALE
                          </div>
                        )}

                        <Image
                          src={item.image}
                          alt={`Slide ${index}`}
                          width={1020}
                          height={1020}
                          className="transition-transform duration-500 my-2 hover:scale-102 rounded-[1rem] w-full h-[16rem]"
                        />

                        <div className="ml-2 font-thin">{item.name}</div>
                        <div className="ml-2 font-thin">
                          {item.specification}
                        </div>

                        {item.onsale ? (
                          <div className="flex sm:flex-col l:flex-row text-[18px] l:ml-2">
                            <div className="font-bold text-[var(---price)]">
                              <s>{item.price}</s>
                            </div>
                            <div className="l:ml-2 font-bold text-[var(---price)]">
                              {item.sale_price}
                            </div>
                          </div>
                        ) : (
                          <div className="text-[18px] ml-2 font-bold text-[var(---price)]">
                            {item.price}
                          </div>
                        )}
                      </div>

                      {/* BACK SIDE */}
                      <div className="absolute inset-0 backface-hidden rotate-y-180 border shadow-black bg-[var(---whitetext)] shadow-sm rounded-[1rem] flex flex-col justify-center items-center p-4 space-y-4">
                        {item.avaliable_quantity <= 0 ? (
                          <div className="text-red-600 font-black text-center">
                            Not Available
                          </div>
                        ) : (
                          <>
                            <button
                              onClick={() => addToCart(item)}
                              className="text-[16px] l:text-[16px] font-semibold bg-[var(---btncolor)] text-[var(---whitetext)] p-2 l:p-4 l:px-[2rem] px-[1.5rem] rounded-[8px] my-[1rem] cursor-pointer hover:bg-transparent hover:text-[var(---btncolor)] hover:border-[var(---btncolor)] hover:border-[1px] duration-[1s]"
                            >
                              Add to Cart
                            </button>
                            <Link href={`/components/buynow/${item.id}`}>
                              <button className="text-[16px] l:text-[16px] font-semibold bg-[var(---blacktext)] text-[var(---whitetext)] p-2 l:p-4 l:px-[2rem] px-[1.5rem] rounded-[8px] mb-[1rem] cursor-pointer hover:bg-transparent hover:text-[var(---blacktext)] hover:border-[var(---blacktext)] hover:border-[1px] duration-[1s]">
                                Buy Now
                              </button>
                            </Link>
                            <Link href={`/components/product/${item.id}`}>
                              <div className="underline text-blue-600 text-[16px] cursor-pointer hover:scale-110 duration-[1s]">
                                Details
                              </div>
                            </Link>
                          </>
                        )}
                      </div>
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

export default Tablets;
