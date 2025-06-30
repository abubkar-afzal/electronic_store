import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { FaBox, FaLock, FaMinus, FaPlus, FaUserCircle } from "react-icons/fa";
import { HiMinus, HiPlus } from "react-icons/hi2";
import Link from "next/link";
import img1 from "./assets/img7.jpg";
import img2 from "./assets/img5.jpg";
import img3 from "./assets/img6.jpg";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
const images = [
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

const AdminNavbar = () => {
  const [mobilemenu, setmonbilemenu] = useState(true);
  const [search, setsearch] = useState(true);
  const showmenu = () => {
    setmonbilemenu(!mobilemenu);
  };
  const showsearch = () => {
    setsearch(!search);
  };
  
  let count = 1;
  
const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlAdminNavbar = () => {
    if (typeof window !== 'undefined') {
      if (window.scrollY > lastScrollY) {
        setShow(false); // scroll down → hide
      } else {
        setShow(true); // scroll up → show
      }
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', controlAdminNavbar);
    return () => window.removeEventListener('scroll', controlAdminNavbar);
  }, [lastScrollY]);


  return (
    <><nav className={`sticky top-0 left-0 w-full bg-white shadow transition-transform duration-300 z-100 overflow-x-hidden ${
        show ? 'l:translate-y-0' : 'l:-translate-y-full'
      }`}
><Link href={`/`}><div className="absolute top-[-3rem] left-[-4rem] w-[5rem] h-[5rem] rounded-full cursor-not-allowed bg-[var(---salelabel)]"></div></Link>
      {/* Admin navbar */}
      <div className="sm:h-[10vh] l:h-[5rem] w-full bg-[var(---Adminnavbar)] ">
        <div className="flex sm:h-[10vh] l:h-[5rem] justify-between px-2 sm:text-[22px] place-items-center">
          <Link href={`/admin/components/`}><div className="l:text-[28px] font-black cursor-pointer l:mx-2">AR Codes</div></Link>
          <div className="l:text-[28px] font-black cursor-pointer l:mx-2">Admin</div>
          <div className="flex items-center space-x-2 text-[1.6rem] l:text-[1.8rem]">
            <div className="cursor-pointer" onClick={showsearch}>
              <IoIosSearch />
            </div>
            <Link href={`/admin/components/basic/orders`} className="sm:hidden l:block">
          <div
            onClick={() => {
              showmenu()
            }}
            className="flex items-center space-x-2 mx-4 cursor-pointer"
          >
            <div className="l:text-[30px] relative">
              <FaBox />
              <div className="absolute top-[-0.5rem] left-[1rem] w-[1.5rem] h-[1.5rem] bg-[var(---salelabel)] text-[var(---whitetext)] text-center rounded-full text-[15px]">{count}</div>
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
              showmenu()
            }}
            className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)] "
          >
            All Products
          </div>
        </Link>
        <Link href={`/admin/components/category/computers`}>
          <div
            onClick={() => {
              showmenu()
            }}
            className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)]"
          >
            Computers
          </div>
        </Link>
        <Link href={`/admin/components/category/tablets`}>
          <div
            onClick={() => {
              showmenu()
            }}
            className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)]"
          >
            Tablets
          </div>
        </Link>
        <Link href={`/admin/components/category/drones&cameras`}>
          <div
            onClick={() => {
              showmenu()
            }}
            className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)]"
          >
            Drones & Cameras
          </div>
        </Link>
        <Link href={`/admin/components/category/headphones&speakers`}>
          <div
            onClick={() => {
              showmenu()
            }}
            className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)]"
          >
            Head Phones & Speakers
          </div>
        </Link>
        <Link href={`/admin/components/category/mobiles`}>
          <div
            onClick={() => {
              showmenu()
            }}
            className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)]"
          >
            Mobiles
          </div>
        </Link>
        <Link href={`/admin/components/category/tv&homecinema`}>
          <div
            onClick={() => {
              showmenu()
            }}
            className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)]"
          >
            T.V & Home Cinema
          </div>
        </Link>
        <Link href={`/admin/components/category/wearabletech`}>
          <div
            onClick={() => {
              showmenu()
            }}
            className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)]"
          >
            Wearable Tech
          </div>
        </Link>
        <Link href={`/admin/components/category/sale`}>
          <div
            onClick={() => {
              showmenu()
            }}
            className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)]"
          >
            Sale
          </div>
        </Link>
        </div>
        <div className="flex py-2 space-x-[1rem] pr-[1rem]">
            <Link href={`/admin/components/basic/about`}>
            <div
              onClick={() => {
                showmenu()
              }}
              className="underline text-[15px] cursor-pointer"
            >
              About
            </div>
          </Link>
          <Link href={`/admin/components/basic/contact`}>
            <div
              onClick={() => {
                showmenu()
              }}
              className="underline text-[15px] cursor-pointer"
            >
              Contact
            </div>
          </Link>
          <Link href={`/admin/components/basic/helpcenter`}>
            <div
              onClick={() => {
                showmenu()
              }}
              className="underline text-[15px] cursor-pointer"
            >
              Help Center
            </div>
          </Link>
        <div className="flex text-[15px] cursor-pointer">
          Call Us <p className=" mx-1 underline ">+923270972423</p>
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
              showmenu()
            }}
            className="flex items-center space-x-2 my-2 cursor-pointer"
          >
            <div>Orders</div>
            <div className="l:text-[30px] relative">
              <FaBox />
              <div className="absolute top-[-0.5rem] left-[0.6rem] w-[1rem] h-[1rem] bg-[var(---salelabel)] text-[var(---whitetext)] text-center rounded-full text-[11px]">{count}</div>
            </div>
          

          </div>
        
        </Link>
        <div className="flex justify-between text-[14px] my-4">
          <Link href={`/admin/components/basic/about`}>
            <div
              onClick={() => {
                showmenu()
              }}
              className="underline cursor-pointer"
            >
              About
            </div>
          </Link>
          <Link href={`/admin/components/basic/contact`}>
            <div
              onClick={() => {
                showmenu()
              }}
              className="underline cursor-pointer"
            >
              Contact
            </div>
          </Link>
          <Link href={`/admin/components/basic/helpcenter`}>
            <div
              onClick={() => {
                showmenu()
              }}
              className="underline cursor-pointer"
            >
              Help Center
            </div>
          </Link>
        </div>
        <div className="flex text-[15px] my-4 mb-[2rem] cursor-pointer">
          Call Us <p className=" mx-1 underline ">+923270972423</p>
        </div>
        <Link href={`/admin/components/category/allproducts`}>
          <div
            onClick={() => {
              showmenu()
            }}
            className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer "
          >
            All Products
          </div>
        </Link>
        <Link href={`/admin/components/category/computers`}>
          <div
            onClick={() => {
              showmenu()
            }}
            className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
          >
            Computers
          </div>
        </Link>
        <Link href={`/admin/components/category/tablets`}>
          <div
            onClick={() => {
              showmenu()
            }}
            className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
          >
            Tablets
          </div>
        </Link>
        <Link href={`/admin/components/category/drones&cameras`}>
          <div
            onClick={() => {
              showmenu()
            }}
            className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
          >
            Drones & Cameras
          </div>
        </Link>
        <Link href={`/admin/components/category/headphones&speakers`}>
          <div
            onClick={() => {
              showmenu()
            }}
            className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
          >
            Head Phones & Speakers
          </div>
        </Link>
        <Link href={`/admin/components/category/mobiles`}>
          <div
            onClick={() => {
              showmenu()
            }}
            className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
          >
            Mobiles
          </div>
        </Link>
        <Link href={`/admin/components/category/tv&homecinema`}>
          <div
            onClick={() => {
              showmenu()
            }}
            className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
          >
            T.V & Home Cinema
          </div>
        </Link>
        <Link href={`/admin/components/category/wearabletech`}>
          <div
            onClick={() => {
              showmenu()
            }}
            className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
          >
            Wearable Tech
          </div>
        </Link>
        <Link href={`/admin/components/category/sale`}>
          <div
            onClick={() => {
              showmenu()
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
        } duration-[2s] fixed top-0 w-full h-full bg-[var(---whitetext)] sm:text-[18px] p-3 overflow-y-scroll z-110 scrollbar-hide`}
      >
        <div className="flex justify-between l:justify-center l:space-x-[2rem] px-[1rem]">
          <div className="flex items-center space-x-2 p-2 border-[1px] w-[60vw] l:w-[80vw]">
            <div>
              <IoIosSearch />
            </div>
            <input
              type="text"
              placeholder="Search Items by ID"
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
          <div className="font-bold my-[2rem] text-[18px] l:mx-[1rem]">
            Trending Products
          </div>
          <div className="grid grid-cols-1 l:grid-cols-4 gap-4 l:mx-[1rem]">
            {images.map((item, index) => (
              <div
                key={index}
                className="relative w-full flex-shrink-0 cursor-pointer bg-[var(---whitetext)]"
              >
                {item.sale ? (
                  <>
                    <div className="p-0.5 px-4 bg-[var(---price)] inline text-[var(---whitetext)] rounded-[1rem] m-2 font-thin ">
                      SALE
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-0.5 px-4 bg-[var(---whitetext)] inline text-[var(---whitetext)] rounded-[1rem] m-2 font-thin ">
                      SALE
                    </div>
                  </>
                )}

                <Image
                  src={item.src}
                  alt={`Slide ${index}`}
                  width={1020}
                  height={1020}
                  className="transition-transform duration-500 my-2"
                />
                <div className="l:-ml-4">
                  <div className="l:flex">
                  <div className="ml-4 font-thin">{item.name}</div>
                  <div className="ml-4 font-thin">{item.specification}</div></div>
                  {item.sale ? (
                    <>
                      <div className="flex text-[18px] ">
                        <div className="ml-2 l:ml-4 font-bold">
                          <s>{item.price}</s>
                        </div>

                        <div className="ml-2 font-bold">{item.saleprice}</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="m-2 l:ml-4 text-[14px] font-semibold">{item.price}</div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
          <button className="w-[10rem] l:w-[8rem] h-[4rem] l:h-[3rem] l:text-[14px] bg-[var(---blacktext)] text-[var(---whitetext)] p-4 l:p-2 font-thin my-[1rem] hover:underline cursor-pointer l:mx-[1rem]">
            Show All Results
          </button>
        </div>
      </div>

     
    </>
  );
};
export default AdminNavbar;
