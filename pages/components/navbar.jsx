import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { RxCross2, RxHamburgerMenu } from "react-icons/rx";
import { FaLock, FaMinus, FaPlus, FaUserCircle } from "react-icons/fa";
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

const Navbar = () => {
  const [mobilemenu, setmonbilemenu] = useState(true);
  const [search, setsearch] = useState(true);
  const [cart, setcart] = useState(true);
   const [showloder, setshowloder] = useState(false);
    const [showresult, setshowresult] = useState(false);
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
  const showcart = () => {
    setcart(!cart);
  };
  let count = 1;
  const [quantities, setQuantities] = useState(
    () => images.map(() => 1) // default starting count is 1 for each
  );

  const handleIncrement = (index) => {
    setQuantities((prev) =>
      prev.map((qty, i) => (i === index ? qty + 1 : qty))
    );
  };

  const handleDecrement = (index) => {
    setQuantities((prev) =>
      prev.map((qty, i) => (i === index && qty > 1 ? qty - 1 : qty))
    );
  };

  const getNumericPrice = (priceStr) => {
    return parseFloat(priceStr.replace(/[^\d.]/g, "")) || 0;
  };
  const grandTotal = images.reduce((acc, item, index) => {
    return (
      acc +
      quantities[index] *
        getNumericPrice(item.sale ? item.saleprice : item.price)
    );
  }, 0);
const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
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
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);


  return (
    <><nav className={`sticky top-0 left-0 w-full bg-white shadow transition-transform duration-300 z-30 overflow-x-hidden ${
        show ? 'l:translate-y-0' : 'l:-translate-y-full'
      }`}
>     <Link href={`/admin/components/`}><div className="absolute top-[-3rem] left-[-4rem] w-[5rem] h-[5rem] rounded-full cursor-not-allowed bg-[var(---salelabel)]"></div></Link>
      {/* navbar */}
      <div className="sm:h-[10vh] l:h-[5rem] w-full bg-[var(---navbar)] ">
        <div className="flex sm:h-[10vh] l:h-[5rem] justify-between px-2 sm:text-[22px] place-items-center">
          <Link href={`/`}><div className="l:text-[28px] font-black cursor-pointer l:mx-2">AR Codes</div></Link>
          <div className="flex items-center space-x-2 text-[1.6rem] l:text-[1.8rem]">
            <div className="cursor-pointer" onClick={showsearch}>
              <IoIosSearch />
            </div>
            <Link href={`/components/basic/login`} className="sm:hidden l:block">
          <div
            onClick={() => {
              showmenu()
            }}
            className="flex items-center space-x-2 mx-4 cursor-pointer"
          >
            <div className="l:text-[30px]">
              <FaUserCircle />
            </div>
            <div className="l:text-[20px] font-thin">Login</div>

          </div>
        </Link>
            <div className=" mr-4" onClick={showcart}>
              <div className="cursor-pointer">
                <AiOutlineShoppingCart />
              </div>
              <div className="sm:text-[10px] l:text-[14px] bg-black text-white font-thin sm:w-[15px] l:w-[18px] sm:absolute right-11 top-4 l:top-4 l:right-5 text-center rounded-[20px]">
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
          <div
            onClick={() => {
              showmenu()
            }}
            className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)] "
          >
            All Products
          </div>
        </Link>
        <Link href={`/components/category/computers`}>
          <div
            onClick={() => {
              showmenu()
            }}
            className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)]"
          >
            Computers
          </div>
        </Link>
        <Link href={`/components/category/tablets`}>
          <div
            onClick={() => {
              showmenu()
            }}
            className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)]"
          >
            Tablets
          </div>
        </Link>
        <Link href={`/components/category/drones&cameras`}>
          <div
            onClick={() => {
              showmenu()
            }}
            className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)]"
          >
            Drones & Cameras
          </div>
        </Link>
        <Link href={`/components/category/headphones&speakers`}>
          <div
            onClick={() => {
              showmenu()
            }}
            className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)]"
          >
            Head Phones & Speakers
          </div>
        </Link>
        <Link href={`/components/category/mobiles`}>
          <div
            onClick={() => {
              showmenu()
            }}
            className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)]"
          >
            Mobiles
          </div>
        </Link>
        <Link href={`/components/category/tv&homecinema`}>
          <div
            onClick={() => {
              showmenu()
            }}
            className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)]"
          >
            T.V & Home Cinema
          </div>
        </Link>
        <Link href={`/components/category/wearabletech`}>
          <div
            onClick={() => {
              showmenu()
            }}
            className="text-center text-[16px] py-2 cursor-pointer hover:text-[var(---btncolor)]"
          >
            Wearable Tech
          </div>
        </Link>
        <Link href={`/components/category/sale`}>
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
            <Link href={`/components/basic/about`}>
            <div
              onClick={() => {
                showmenu()
              }}
              className="underline text-[15px] cursor-pointer"
            >
              About
            </div>
          </Link>
          <Link href={`/components/basic/contact`}>
            <div
              onClick={() => {
                showmenu()
              }}
              className="underline text-[15px] cursor-pointer"
            >
              Contact
            </div>
          </Link>
          <Link href={`/components/basic/helpcenter`}>
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
        <Link href={`/components/basic/login`}>
          <div
            onClick={() => {
              showmenu()
            }}
            className="flex items-center space-x-2 my-2 cursor-pointer"
          >
            <div>Login</div>
            <div className="text-[22px]">
              <FaUserCircle />
            </div>
          </div>
        </Link>
        <div className="flex justify-between text-[14px] my-4">
          <Link href={`/components/basic/about`}>
            <div
              onClick={() => {
                showmenu()
              }}
              className="underline cursor-pointer"
            >
              About
            </div>
          </Link>
          <Link href={`/components/basic/contact`}>
            <div
              onClick={() => {
                showmenu()
              }}
              className="underline cursor-pointer"
            >
              Contact
            </div>
          </Link>
          <Link href={`/components/basic/helpcenter`}>
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
        <Link href={`/components/category/allproducts`}>
          <div
            onClick={() => {
              showmenu()
            }}
            className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer "
          >
            All Products
          </div>
        </Link>
        <Link href={`/components/category/computers`}>
          <div
            onClick={() => {
              showmenu()
            }}
            className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
          >
            Computers
          </div>
        </Link>
        <Link href={`/components/category/tablets`}>
          <div
            onClick={() => {
              showmenu()
            }}
            className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
          >
            Tablets
          </div>
        </Link>
        <Link href={`/components/category/drones&cameras`}>
          <div
            onClick={() => {
              showmenu()
            }}
            className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
          >
            Drones & Cameras
          </div>
        </Link>
        <Link href={`/components/category/headphones&speakers`}>
          <div
            onClick={() => {
              showmenu()
            }}
            className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
          >
            Head Phones & Speakers
          </div>
        </Link>
        <Link href={`/components/category/mobiles`}>
          <div
            onClick={() => {
              showmenu()
            }}
            className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
          >
            Mobiles
          </div>
        </Link>
        <Link href={`/components/category/tv&homecinema`}>
          <div
            onClick={() => {
              showmenu()
            }}
            className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
          >
            T.V & Home Cinema
          </div>
        </Link>
        <Link href={`/components/category/wearabletech`}>
          <div
            onClick={() => {
              showmenu()
            }}
            className="text-center border-b-1 my-2 text-[16px] py-2 cursor-pointer"
          >
            Wearable Tech
          </div>
        </Link>
        <Link href={`/components/category/sale`}>
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
        } duration-[2s] fixed top-0 w-full h-full bg-[var(---whitetext)] sm:text-[18px] p-3 overflow-y-scroll z-30 scrollbar-hide`}
      >
        <div className="flex justify-between l:justify-center l:space-x-[2rem] px-[1rem]">
          <div className="flex items-center space-x-2 p-2 border-[1px] w-[60vw] l:w-[80vw]">
            <div>
              <IoIosSearch />
            </div>
            <input
              type="text"
              placeholder="Search"
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

      {/* cart */}
      <div
        className={`${
          cart ? "right-[-120vw] l:right-[-50vw] opacity-0" : "right-0 opacity-100"
        } duration-[2s] fixed top-0 w-full l:w-[30vw] h-full bg-[var(---whitetext)] sm:text-[18px] p-3 overflow-y-scroll scrollbar-hide z-50`}
      >
        <div className="flex justify-between border-b-[1px] py-[1rem] mb-[2rem]  items-center px-[1rem]">
          <div className="flex font-bold space-x-2">
            Cart <div className="font-thin ml-2">(1 item)</div>
          </div>
          <div className="text-[28px] cursor-pointer" onClick={showcart}>
            <RxCross2 />
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 gap-4 ">
            {images.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-3 w-full flex-shrink-0 cursor-pointer bg-[var(---whitetext)] border-b-[1px]"
              >
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
                    <>
                      <div className="ml-2 flex text-[18px] ">
                        <div className="ml-2 text-[14px]">
                          <s>{item.price}</s>
                        </div>

                        <div className="ml-2 text-[14px]">{item.saleprice}</div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="m-2 ml-4 text-[14px]">{item.price}</div>
                    </>
                  )}
                  <div className="flex justify-between p-2 text-[12px] ml-4 my-[1rem] mb-[2rem] border-[1px]">
                    <button onClick={() => handleDecrement(index)}>
                      <HiMinus />
                    </button>
                    <div className="w-6 text-center">{quantities[index]}</div>
                    <button onClick={() => handleIncrement(index)}>
                      <HiPlus />
                    </button>
                  </div>
                </div>
                <div className="flex flex-col justify-between items-end mr-4">
                  <div className="">
                    <RiDeleteBin6Line className="text-[20px] h-[2rem]"/>
                  </div>
                  <div className="my-[1rem] mb-[2rem]">
                    ${" "}
                    {(
                      quantities[index] *
                      getNumericPrice(item.sale ? item.saleprice : item.price)
                    ).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
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
                onClick={handleShowLoader}
                className="w-full bg-[var(---btncolor)] text-[var(---whitetext)] p-2 my-[1rem] hover:bg-[var(---hoverbtncolor)] cursor-pointer"
              >
                Checkout
              </button>
            )}
            <Link href={`/components/viewcart`}>
            <button onClick={() => {
                showcart()

              }} className="w-full border-[var(---btncolor)] border-[1px] p-2 hover:border-[var(---hoverbtncolor)] cursor-pointer">
              View Cart
            </button></Link>
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
            <div>
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg p-8 shadow-lg max-w-sm w-full text-center">
                  <div className="text-2xl font-bold mb-4">Order Placed!</div>
                  <div className="mb-4">
                    Thank you for your purchase. Your order has been
                    successfully placed.
                  </div>
                  <button
                    className="mt-4 px-6 py-2 bg-[var(---btncolor)] text-[var(---whitetext)] rounded-full hover:bg-[var(---hoverbtncolor)]"
                    onClick={() => setshowresult(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : null}
    </>
  );
};
export default Navbar;
