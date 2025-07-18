import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { FaBox } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { BiSolidMessage } from "react-icons/bi";
import dynamic from "next/dynamic";
const MoonLoader = dynamic(() => import("react-spinners").then(mod => mod.MoonLoader), { ssr: false });
const Swiper = dynamic(() => import("swiper/react").then(mod => mod.Swiper), { ssr: false });
const SwiperSlide = dynamic(() => import("swiper/react").then(mod => mod.SwiperSlide), { ssr: false });import "swiper/css";

const AdminNavbar = ({ orders }) => {
  const [mobilemenu, setmonbilemenu] = useState(true);
  const [search, setsearch] = useState(true);
  const [trendproduct, settrendproduct] = useState([]);
const [flippedCards, setFlippedCards] = useState({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient){ return null}   const [allProducts, setAllProducts] = useState([]);
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
    </>
  );
};
export default AdminNavbar;
