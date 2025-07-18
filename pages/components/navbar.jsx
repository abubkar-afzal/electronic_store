import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
const CheckDetails = dynamic(() => import("./checkdetails"), { ssr: false });
const IoIosSearch = dynamic(
  () => import("react-icons/io").then((mod) => mod.IoIosSearch),
  { ssr: false }
);
const AiOutlineShoppingCart = dynamic(
  () => import("react-icons/ai").then((mod) => mod.AiOutlineShoppingCart),
  { ssr: false }
);
const RxCross2 = dynamic(
  () => import("react-icons/rx").then((mod) => mod.RxCross2),
  { ssr: false }
);
const RxHamburgerMenu = dynamic(
  () => import("react-icons/rx").then((mod) => mod.RxHamburgerMenu),
  { ssr: false }
);
const FaLock = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaLock),
  { ssr: false }
);
const FaUserCircle = dynamic(
  () => import("react-icons/fa").then((mod) => mod.FaUserCircle),
  { ssr: false }
);
const HiMinus = dynamic(
  () => import("react-icons/hi2").then((mod) => mod.HiMinus),
  { ssr: false }
);
const HiPlus = dynamic(
  () => import("react-icons/hi2").then((mod) => mod.HiPlus),
  { ssr: false }
);
const RiDeleteBin6Line = dynamic(
  () => import("react-icons/ri").then((mod) => mod.RiDeleteBin6Line),
  { ssr: false }
);

const Swiper = dynamic(() => import("swiper/react").then((mod) => mod.Swiper), {
  ssr: false,
});
const SwiperSlide = dynamic(
  () => import("swiper/react").then((mod) => mod.SwiperSlide),
  { ssr: false }
);
const MoonLoader = dynamic(
  () => import("react-spinners").then((mod) => mod.MoonLoader),
  { ssr: false }
);
const motion = dynamic(
  () => import("framer-motion").then((mod) => mod.motion),
  { ssr: false }
);

import "swiper/css";

const Navbar = ({
  account,
  cartshow,
  setcartshow,
  cart,
  removeFromCart,
  clearCart,
  setCart,
}) => {
  const [mobilemenu, setmonbilemenu] = useState(true);
  const [search, setsearch] = useState(true);
  const [showloder, setshowloder] = useState(false);
  const [showresult, setshowresult] = useState(false);
  const [trendproduct, settrendproduct] = useState([]);
  const [flippedCards, setFlippedCards] = useState({});
  const [isClient, setIsClient] = useState(false);

  const [placemessage, setplacemessage] = useState(false);
  const [previousPage, setPreviousPage] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

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
    setIsClient(true);
    const prev = sessionStorage.getItem("previousPage");

    if (prev && prev !== window.location.pathname) {
      const parts = prev.split("/").filter(Boolean);
      const lastSegment = parts[parts.length - 1];

      const label = decodeURIComponent(lastSegment)
        .replace(/-/g, " ")
        .replace(/\b\w/g, (l) => l.toUpperCase());

      setPreviousPage({
        href: prev,
        label: label || "Back",
      });
    }
    const fetchProduct = async () => {
      try {
        const res = await fetch("/api/bestsellermain");
        const data = await res.json();
        settrendproduct(data);
      } catch (error) {}
    };
    fetchProduct();
  }, []);

  useEffect(() => {
    const q = searchQuery.toLowerCase();
    const f = allProducts.filter(
      (item) =>
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.specification?.toLowerCase().includes(q) ||
        String(item.price).includes(q) ||
        String(item.sale_price || "").includes(q)
    );
    setFiltered(f);
  }, [searchQuery, allProducts]);

  const handleShowLoader = () => {
    setshowloder(!showloder);
    setTimeout(() => {
      setshowloder(false);
      setshowresult(true);
    }, 2000);
  };
  const showmenu = () => {
    setmonbilemenu(!mobilemenu);
  };
  const showsearch = () => {
    setsearch(!search);
  };
  const showcartshow = () => {
    setcartshow(!cartshow);
  };
  let count = cart.length;
  const [quantities, setQuantities] = useState([]);

  useEffect(() => {
    if (cart && cart.length > quantities.length) {
      const updatedQuantities = [...quantities];
      for (let i = quantities.length; i < cart.length; i++) {
        updatedQuantities[i] = cart[i].item_quantity || 1;
      }
      setQuantities(updatedQuantities);
    }
  }, [cart]);

  const handleIncrement = (index) => updateQuantityAndCart(index, 1);
  const handleDecrement = (index) => updateQuantityAndCart(index, -1);
  const updateQuantityAndCart = (index, change) => {
    setQuantities((prevQuantities) => {
      const newQuantities = prevQuantities.map((qty, i) =>
        i === index ? Math.max(1, qty + change) : qty
      );

      const updatedCart = cart.map((item, i) => ({
        ...item,
        item_quantity: newQuantities[i],
      }));

      setCart(updatedCart);
      localStorage.setItem("user_cart", JSON.stringify(updatedCart));
      return newQuantities;
    });
  };

  const getNumericPrice = (priceStr) => {
    if (priceStr == null) return 0;
    const cleaned = String(priceStr).replace(/[^\d.]/g, "");
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

  const grandTotal = cart.reduce((acc, item, index) => {
    const price = getNumericPrice(
      item.item_on_sale ? item.item_sale_price : item.item_price
    );
    const quantity = parseInt(quantities[index]) || 1;
    return acc + price * quantity;
  }, 0);

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
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
    window.addEventListener("scroll", controlNavbar);
    return () => window.removeEventListener("scroll", controlNavbar);
  }, [lastScrollY]);
  const phoneNumber = "923270972423";
  const message =
    "Hello, I'm interested in your product! Can you send more info?";

  const encodedMessage = encodeURIComponent(message);
  if (!isClient) {
    return null;
  }
  return (
    <>
      <nav
        className={`sticky top-0 left-0 w-full bg-white shadow transition-transform duration-300 z-30 overflow-x-hidden ${
          show ? "l:translate-y-0" : "l:-translate-y-full"
        }`}
      >
        <Link href={`/components/admin`}>
          <div className="absolute top-[-3rem] left-[-4rem] w-[5rem] h-[5rem] rounded-full cursor-not-allowed bg-[var(---salelabel)]"></div>
        </Link>
        {/* navbar */}
        <div className="sm:h-[10vh] l:h-[5rem] w-full bg-[var(---navbar)] ">
          <div className="flex sm:h-[10vh] l:h-[5rem] justify-between px-2 sm:text-[22px] place-items-center">
            <Link href={`/`}>
              <div className="l:text-[28px] font-black cursor-pointer l:mx-2">
                AR Codes
              </div>
            </Link>
            <div className="flex items-center space-x-2 text-[1.6rem] l:text-[1.8rem]">
              <div className="cursor-pointer" onClick={showsearch}>
                <IoIosSearch />
              </div>
              {account.image ? (
                <>
                  <Link
                    href={`/components/basic/account`}
                    className="sm:hidden l:block"
                  >
                    <div className="flex items-center space-x-2 mx-4 cursor-pointer">
                      <div className="w-[2rem] h-[2rem] rounded-full overflow-hidden">
                        <Image
                          src={account.image}
                          width={200}
                          height={200}
                          alt="profile"
                          className="w-full h-full"
                        />
                      </div>
                      <div className="l:text-[20px] font-thin hover:underline">
                        Account
                      </div>
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href={`/components/basic/login`}
                    className="sm:hidden l:block"
                  >
                    <div className="flex items-center space-x-2 mx-4 cursor-pointer">
                      <div className="l:text-[30px]">
                        <FaUserCircle />
                      </div>
                      <div className="l:text-[20px] font-thin hover:underline">
                        Login
                      </div>
                    </div>
                  </Link>
                </>
              )}

              <div className=" mr-4" onClick={showcartshow}>
                <div className="cursor-pointer">
                  <AiOutlineShoppingCart />
                </div>
                <div className="sm:text-[10px] l:text-[14px] bg-[var(---salelabel)] text-white font-thin sm:w-[15px] l:w-[18px] sm:absolute right-11 top-4 l:top-4 l:right-5 text-center rounded-[20px]">
                  {count}
                </div>
              </div>
              <div className="cursor-pointer l:hidden" onClick={showmenu}>
                <RxHamburgerMenu />
              </div>
            </div>
          </div>
        </div>
        {/* laptop menu */}
        <div className="hidden w-full l:flex justify-between sm:text-[18px] px-2 py-2 bg-[var(---pagecolor)]">
          <div className="flex items-center space-x-[1rem] pl-[1rem]">
            <Link href={`/components/category/allproducts`}>
              <div className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)] l:text-[1.05vw] ">
                All Products
              </div>
            </Link>
            <Link href={`/components/category/computers`}>
              <div className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)] l:text-[1.05vw]">
                Computers
              </div>
            </Link>
            <Link href={`/components/category/tablets`}>
              <div className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)] l:text-[1.05vw]">
                Tablets
              </div>
            </Link>
            <Link href={`/components/category/drones&cameras`}>
              <div className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)] l:text-[1.05vw]">
                Drones & Cameras
              </div>
            </Link>
            <Link href={`/components/category/headphones&speakers`}>
              <div className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)] l:text-[1.05vw]">
                Head Phones & Speakers
              </div>
            </Link>
            <Link href={`/components/category/mobiles`}>
              <div className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)] l:text-[1.05vw]">
                Mobiles
              </div>
            </Link>
            <Link href={`/components/category/tv&homecinema`}>
              <div className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)] l:text-[1.05vw]">
                T.V & Home Cinema
              </div>
            </Link>
            <Link href={`/components/category/wearabletech`}>
              <div className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)] l:text-[1.05vw]">
                Wearable Tech
              </div>
            </Link>
            <Link href={`/components/category/sale`}>
              <div className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)] l:text-[1.05vw]">
                Sale
              </div>
            </Link>
          </div>
          <div className="flex py-2 space-x-[1rem] pr-[1rem]">
            <Link href={`/components/basic/about`}>
              <div className="underline text-[15px] cursor-pointer l:text-[1.05vw]">
                About
              </div>
            </Link>
            <Link href={`/components/basic/contact`}>
              <div className="underline text-[15px] cursor-pointer l:text-[1.05vw]">
                Contact
              </div>
            </Link>
            <Link href={`/components/basic/helpcenter`}>
              <div className="underline text-[15px] cursor-pointer l:text-[1.05vw]">
                Help Center
              </div>
            </Link>
            <div className="flex text-[15px] cursor-pointer l:text-[1.05vw]">
              Call Us{" "}
              <Link
                href={`https://wa.me/${phoneNumber}?text=${encodedMessage}`}
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

          {account.image ? (
            <>
              <Link href={`/components/basic/account`} className="">
                <div
                  onClick={() => {
                    showmenu();
                  }}
                  className="flex items-center space-x-2 mr-4 cursor-pointer"
                >
                  <div className="text-[20px]  hover:underline">Account</div>
                  <div className="w-[1.5rem] h-[1.5rem] rounded-full overflow-hidden">
                    <Image
                      src={account.image}
                      width={200}
                      height={200}
                      alt="profile"
                      className="w-full h-full"
                    />
                  </div>
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link href={`/components/basic/login`}>
                <div
                  onClick={() => {
                    showmenu();
                  }}
                  className="flex items-center space-x-2 my-2 cursor-pointer"
                >
                  <div>Login</div>
                  <div className="text-[22px]  hover:underline">
                    <FaUserCircle />
                  </div>
                </div>
              </Link>
            </>
          )}
          <div className="flex justify-between text-[14px] my-4">
            <Link href={`/components/basic/about`}>
              <div
                onClick={() => {
                  showmenu();
                }}
                className="underline cursor-pointer"
              >
                About
              </div>
            </Link>
            <Link href={`/components/basic/contact`}>
              <div
                onClick={() => {
                  showmenu();
                }}
                className="underline cursor-pointer"
              >
                Contact
              </div>
            </Link>
            <Link href={`/components/basic/helpcenter`}>
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
              href={`https://wa.me/${phoneNumber}?text=${encodedMessage}`}
              target="_blank"
              className=" mx-1 underline "
            >
              +923270972423
            </Link>
          </div>
          <Link href={`/components/category/allproducts`}>
            <div
              onClick={() => {
                showmenu();
              }}
              className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer "
            >
              All Products
            </div>
          </Link>
          <Link href={`/components/category/computers`}>
            <div
              onClick={() => {
                showmenu();
              }}
              className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
            >
              Computers
            </div>
          </Link>
          <Link href={`/components/category/tablets`}>
            <div
              onClick={() => {
                showmenu();
              }}
              className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
            >
              Tablets
            </div>
          </Link>
          <Link href={`/components/category/drones&cameras`}>
            <div
              onClick={() => {
                showmenu();
              }}
              className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
            >
              Drones & Cameras
            </div>
          </Link>
          <Link href={`/components/category/headphones&speakers`}>
            <div
              onClick={() => {
                showmenu();
              }}
              className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
            >
              Head Phones & Speakers
            </div>
          </Link>
          <Link href={`/components/category/mobiles`}>
            <div
              onClick={() => {
                showmenu();
              }}
              className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
            >
              Mobiles
            </div>
          </Link>
          <Link href={`/components/category/tv&homecinema`}>
            <div
              onClick={() => {
                showmenu();
              }}
              className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
            >
              T.V & Home Cinema
            </div>
          </Link>
          <Link href={`/components/category/wearabletech`}>
            <div
              onClick={() => {
                showmenu();
              }}
              className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
            >
              Wearable Tech
            </div>
          </Link>
          <Link href={`/components/category/sale`}>
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
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="appearance-none focus:outline-none p-2 w-[50vw]"
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
                      <SwiperSlide key={item.id || index}>
                        <div
                          onClick={() =>
                            setFlippedCards((prev) => ({
                              ...prev,
                              [item.id]: !prev[item.id],
                            }))
                          }
                          className="sm:w-[17rem] sm:mx-auto l:w-full sm:h-[26rem] l:h-[32rem] relative my-[2rem] l:mx-2 perspective-[1000px] cursor-pointer"
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
                            <div className="absolute inset-0 backface-hidden  rounded-[1rem] shadow shadow-black p-2">
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
                                className="transition-transform duration-500 my-2 hover:scale-102 rounded-[1rem] w-full sm:h-[16rem] l:h-[22rem]"
                              />

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

                            <div className="absolute inset-0 backface-hidden rotate-y-180 border shadow-black shadow-sm rounded-[1rem] flex flex-col justify-center items-center p-4 space-y-4">
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
                                    <div className="underline text-blue-600 cursor-pointer hover:scale-110 duration-[1s]">
                                      Details
                                    </div>
                                  </Link>
                                </>
                              )}
                            </div>
                          </div>
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
                  <SwiperSlide key={item.id || index}>
                    <div
                      onClick={() =>
                        setFlippedCards((prev) => ({
                          ...prev,
                          [item.id]: !prev[item.id],
                        }))
                      }
                      className="sm:w-[17rem] sm:mx-auto l:w-full sm:h-[26rem] l:h-[32rem] relative my-[2rem] l:mx-2 perspective-[1000px] cursor-pointer"
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
                        <div className="absolute inset-0 backface-hidden  rounded-[1rem] shadow shadow-black p-2">
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
                            className="transition-transform duration-500 my-2 hover:scale-102 rounded-[1rem] w-full sm:h-[16rem] l:h-[22rem]"
                          />

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

                        <div className="absolute inset-0 backface-hidden rotate-y-180 border shadow-black shadow-sm rounded-[1rem] flex flex-col justify-center items-center p-4 space-y-4">
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
                                <div className="underline text-blue-600 cursor-pointer hover:scale-110 duration-[1s]">
                                  Details
                                </div>
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
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

      {/* cartshow */}
      <div
        className={`${
          cartshow
            ? "right-[-120vw] l:right-[-50vw] opacity-0"
            : "right-0 opacity-100"
        } duration-[2s] fixed top-0 w-full l:w-[30vw] h-full bg-[var(---whitetext)] sm:text-[18px] p-3 overflow-y-scroll scrollbar-hide z-50`}
      >
        <div className="flex justify-between border-b-[1px] py-[1rem] mb-[2rem]  items-center px-[1rem]">
          <div className="flex font-bold items-center text-[22px] space-x-2">
            Cart{" "}
            <div className="font-thin text-[16px] ml-2">
              ({cart.length} items)
            </div>
          </div>
          <div className="text-[28px] cursor-pointer" onClick={showcartshow}>
            <RxCross2 />
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 gap-4 max-h-[90vh] overflow-y-scroll scrollbar-hide">
            {cart.length == 0 ? (
              <div className="text-[1.5rem] font-thin my-[1rem]">
                There Is no Item In Cart
              </div>
            ) : (
              cart.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 w-full flex-shrink-0 bg-[var(---whitetext)] border-b-[1px]"
                >
                  <Image
                    src={item.item_image}
                    alt={`Slide ${index}`}
                    width={1020}
                    height={1020}
                    className="transition-transform duration-500 my-2"
                  />
                  <div>
                    <div className="ml-4 font-thin">{item.item_name}</div>
                    <div className="ml-4 font-thin">
                      {item.item_specification}
                    </div>
                    {item.item_on_sale ? (
                      <>
                        <div className="ml-2 flex text-[18px] ">
                          <div className="ml-2 text-[14px]">
                            <s>${item.item_price}</s>
                          </div>

                          <div className="ml-2 text-[14px]">
                            ${item.item_sale_price}
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="m-2 ml-4 text-[14px]">
                          ${item.item_price}
                        </div>
                      </>
                    )}
                    <div className="flex justify-between p-2 text-[12px] ml-4 my-[1rem] mb-[2rem] border-[1px]">
                      <button
                        onClick={() => handleDecrement(index)}
                        className="cursor-pointer"
                      >
                        <HiMinus />
                      </button>
                      <div className="w-6 text-center">{quantities[index]}</div>
                      <button
                        onClick={() => handleIncrement(index)}
                        className="cursor-pointer"
                      >
                        <HiPlus />
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between items-end mr-4">
                    <div className="">
                      <RiDeleteBin6Line
                        onClick={() => removeFromCart(item.item_id)}
                        className="text-[20px] h-[2rem] cursor-pointer"
                      />
                    </div>
                    <div className="my-[1rem] mb-[2rem] text-[14px]">
                      $
                      {(
                        quantities[index] *
                        getNumericPrice(
                          item.item_on_sale
                            ? item.item_sale_price
                            : item.item_price
                        )
                      ).toFixed(2)}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="px-[8px]">
          <div className="flex justify-between text-[22px] py-[1rem]">
            <div>Subtotal</div>
            <div>$ {grandTotal.toFixed(2)}</div>
          </div>
          <div className="text-[18px] font-thin">
            Taxes and shipping are callculated at checkout
          </div>
          <div className="flex flex-col">
            {showloder ? (
              <>
                <button
                  disabled
                  type="button"
                  className=" py-2.5 px-5 me-2 text-sm font-medium  items-center w-full bg-[var(---btncolor)] text-[var(---whitetext)] p-2 my-[1rem] hover:bg-[var(---hoverbtncolor)] cursor-pointer"
                >
                  <svg
                    aria-hidden="true"
                    role="status"
                    className="inline w-4 h-4 me-3 animate-spin "
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="#1C64F2"
                    />
                  </svg>
                  Loading...
                </button>
              </>
            ) : (
              <button
                disabled={cart.length == 0 ? true : false}
                onClick={() => {
                  showcartshow(), handleShowLoader();
                }}
                className="disabled:bg-[var(---disablebtncolor)] w-full bg-[var(---btncolor)] text-[var(---whitetext)] p-2 my-[1rem] hover:bg-[var(---hoverbtncolor)] cursor-pointer disabled:cursor-default"
              >
                Checkout
              </button>
            )}
            <Link href={`/components/viewcart`}>
              <button
                onClick={() => {
                  showcartshow();
                }}
                disabled={cart.length == 0 ? true : false}
                className="w-full border-[var(---btncolor)] border-[1px] p-2 hover:border-[var(---hoverbtncolor)] cursor-pointer disabled:cursor-default"
              >
                View Cart
              </button>
            </Link>
          </div>
          <div className="w-full">
            <div className="flex items-center justify-center font-bold my-[1rem] text-[14px] space-x-2">
              <div>
                <FaLock />
              </div>
              <div>Secure Checkout</div>
            </div>
          </div>
        </div>
      </div>

      {showresult ? (
        <>
          <CheckDetails
            setplacemessage={setplacemessage}
            setshowresult={setshowresult}
            account={account}
            cart={cart}
            removeFromCart={removeFromCart}
            clearCart={clearCart}
            setCart={setCart}
          />
          {placemessage ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-1150"
              >
                <motion.div
                  initial="hidden"
                  animate="visible"
                  className="bg-white rounded-lg p-8 shadow-lg max-w-sm w-full text-center"
                >
                  <div className="text-2xl font-bold mb-4">Order Placed!</div>
                  <div className="mb-4">
                    Thank you for your purchase. Your order will successfully
                    placed on your given address.
                  </div>
                  <Link href={previousPage.href || ""}>
                    <button
                      className="mt-4 px-6 py-2 bg-[var(---btncolor)] text-[var(---whitetext)] rounded-[8px] border-[var(---btncolor)]
                                  border-[1px] hover:bg-transparent hover:text-[var(---btncolor)] duration-[1s] cursor-pointer"
                      onClick={() => {
                        setplacemessage(false), setshowresult(false);
                      }}
                    >
                      Close
                    </button>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          ) : null}
        </>
      ) : null}
    </>
  );
};
export default Navbar;
