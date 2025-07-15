import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { MoonLoader } from "react-spinners";
const { motion, AnimatePresence } = require("framer-motion");
const { default: Link } = require("next/link");
const { useRouter } = require("next/router");
const { useState, useEffect } = require("react");
const { FaMinus, FaPlus } = require("react-icons/fa");
import { PiShareNetworkFill } from "react-icons/pi";
import Head from "next/head";

const ProductPage = ({ addToCart }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [productInfo, setproductInfo] = useState(false);
  const [refund, setrefund] = useState(false);
  const [shippingInfo, setshippingInfo] = useState(false);
  const [previousPage, setPreviousPage] = useState(null);
  const [items, setItems] = useState([]);
  const [flippedCards, setFlippedCards] = useState({});
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/onsalemain");
        const data = await res.json();
        setItems(data);
      } catch (error) {}
    };
    fetchProducts();
  }, []);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (slug) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(`/api/product`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ slug }),
          });
          if (res.ok) {
            const data = await res.json();
            setProduct(data);
          } else {
            console.error("Failed to fetch product");
          }
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };
      fetchProduct();
    }
  }, [slug]);
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check this out!",
          text: "This is something cool!",
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Web Share API not supported in this browser");
    }
  };
  if (!product) {
    return (
      <div className=" inset-0 min-h-screen flex items-center justify-center col-span-5 bg-opacity-80 z-999">
        <div className=" p-6 rounded  text-xl font-bold flex items-center gap-2">
          <MoonLoader size={30} color="#7002ff" />
          Loading...
        </div>
      </div>
    );
  }
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  return (
    <>
      <Head>
        <title>AR Codes - {product.map((item) => item.name)} Page</title>
        <meta
          name="description"
          content="Shop the latest electronics and accessories at the best prices with AR Codes. Fast delivery and exclusive deals!"
        />
        <meta name="author" content="Hafiz Abubakar Afzal" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content={`${product.map((item) => item.name)}, ${product.map(
            (item) => item.category
          )}, online shopping, best prices, electronics, AR Codes, sale, deals, e-commerce, mobile, laptop, lcd, tablet, drone, camera, headphone, mobiles, laptops, lcds, tablets, drones, cameras, headphones`}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${siteUrl}components/product/${product.map(
            (item) => item.id
          )}`}
        />
        <meta
          property="og:title"
          content={`Buy ${product.map((item) => item.name)} - AR Codes`}
        />
        <meta
          property="og:description"
          content={`Get ${product.map(
            (item) => item.name
          )} with fast shipping and exclusive deals only at AR Codes.`}
        />
        <meta property="og:image" content={product.map((item) => item.image)} />
        <link
          rel="canonical"
          href={`${siteUrl}components/product/${product.map(
            (item) => item.id
          )}`}
        />
        <link rel="icon" href={product.map((item) => item.image)} />
      </Head>
      {product.map((product) => (
        <>
          <div className="l:px-[10rem] sm:px-[2rem] flex space-x-2 text-[18px] mb-[1rem]">
            {previousPage && (
              <>
                <Link href={previousPage.href}>
                  <div className="cursor-pointer sm:flex items-center l:block hover:font-bold l:font-thin">
                    <div className="sm:block l:hidden mr-1">&lt; Back to</div>
                    {previousPage.label == "Undefined"
                      ? "Home"
                      : previousPage.label}
                  </div>
                </Link>
                <div className="sm:hidden l:block">&gt;</div>
              </>
            )}
            <div className="font-thin sm:hidden l:block">
              {product?.name || "Product"}
            </div>
          </div>

          <div
            key={product.id}
            className="l:grid l:grid-cols-2 sm:grid-cols-1 l:gap-4 p-[2rem] l:px-[10rem]"
          >
            <div>
              <Image
                src={product.image}
                alt={product.name}
                width={500}
                height={500}
              />
              <p className="sm:hidden l:block text-[20px] font-thin my-[1rem]">
                {product.description}
              </p>
            </div>
            <div className="">
              <p className="sm:block l:hidden text-[20px] font-thin">
                {product.specification}
              </p>

              <h1 className="text-[35px] font-bold">{product.name}</h1>
              <p className="sm:hidden l:block text-[20px] font-thin">
                {product.specification}
              </p>

              {product.onsale ? (
                <div className="flex space-x-2 my-[1rem] text-[18px]">
                  <p className="opacity-45">
                    <s>${product.price}</s>
                  </p>
                  <p className="sale-price">${product.sale_price}</p>
                </div>
              ) : (
                <p className="regular-price">${product.price}</p>
              )}

              <div className="text-[20px] font-thin my-[1rem]">
                <p className="text-[18px]">Quantity:</p>
                <div className="bg-[var(---whitetext)] w-[7rem] p-2 flex items-center space-x-2 border">
                  <FaMinus
                    className="cursor-pointer"
                    onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
                  />
                  <input
                    type="number"
                    value={quantity}
                    min="1"
                    className="w-12 text-center appearance-none focus:outline-none bg-transparent text-[var(---blacktext)]"
                    readOnly
                  />
                  <FaPlus
                    className="cursor-pointer"
                    onClick={() => setQuantity((prev) => prev + 1)}
                  />
                </div>
              </div>
              <p className="text-[18px] font-thin">Color:</p>
              <div
                className={` w-[2rem] h-[2rem] rounded-full cursor-pointer flex items-center justify-center transition-all duration-200
                
              `}
                style={{ backgroundColor: product.color }}
                title={product.color}
              ></div>
              <div className="flex flex-col l:items-start sm:items-center ">
                <div className=" flex items-center">
                  <button
                    onClick={() => addToCart(product)}
                    className="text-[16px] l:text-[16px] font-semibold bg-[var(---btncolor)] text-[var(---whitetext)]  p-4 sm:w-[70vw] l:w-auto l:px-[3rem] rounded-[8px] my-[1rem] cursor-pointer hover:bg-transparent hover:text-[var(---btncolor)] hover:border-[var(---btncolor)] hover:border-[1px] duration-[1s]"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={handleShare}
                    className="mx-2 w-[3rem] h-[3rem] rounded-full bg-[var(---whitetext)] justify-items-center cursor-pointer hover:bg-transparent hover:text-[var(---btncolor)] hover:border-[var(---btncolor)] border-[1px] duration-[1s]"
                  >
                    <PiShareNetworkFill />
                  </button>
                </div>
                <Link href={`/components/buynow/${product.id}`}>
                  <button className="text-[16px] l:text-[16px] font-semibold bg-[var(---blacktext)] text-[var(---whitetext)] p-4 sm:w-[90vw] l:w-auto l:px-[5rem] rounded-[8px] mb-[1rem] cursor-pointer hover:bg-transparent hover:text-[var(---blacktext)] hover:border-[var(---blacktext)] hover:border-[1px] duration-[1s]">
                    Buy Now
                  </button>
                </Link>
              </div>
              <p className="sm:block l:hidden text-[20px] font-thin my-[1rem]">
                {product.description}
              </p>
              {[
                {
                  title: "Product Info",
                  isOpen: productInfo,
                  setOpen: setproductInfo,
                  content: product.use_cause,
                },
                {
                  title: "Return & Refund Policy",
                  isOpen: refund,
                  setOpen: setrefund,
                  content: product.return_policy,
                },
                {
                  title: "Shipping Info",
                  isOpen: shippingInfo,
                  setOpen: setshippingInfo,
                  content: product.shipping,
                },
              ].map(({ title, isOpen, setOpen, content }, idx) => (
                <div key={idx} className="my-[1rem] text-[18px] py-2 relative">
                  <button
                    onClick={() => setOpen(!isOpen)}
                    className="w-full text-left font-medium cursor-pointer flex justify-between"
                  >
                    {title}
                    <span>{isOpen ? <FaMinus /> : <FaPlus />}</span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="mt-2 text-sm text-gray-600">{content}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </>
      ))}
      <div className=" l:px-[5rem] my-[2rem]">
        <div className="sm:mx-[2rem] l:mx-[5rem] text-[25px] font-bold">
          You might also like
        </div>
        <div className="relative max-w-6xl l:max-w-full mx-auto">
          <Swiper
            spaceBetween={10}
            breakpoints={{
              640: { slidesPerView: 1 },
              1024: { slidesPerView: 4 },
            }}
          >
            {items.length > 0 ? (
              items.map((item, index) => (
                <SwiperSlide key={item.id || index}>
                  <div
                    onClick={() =>
                      setFlippedCards((prev) => ({
                        ...prev,
                        [item.id]: !prev[item.id],
                      }))
                    }
                    className="sm:w-[17rem] sm:mx-auto l:w-full sm:h-[26rem] l:h-[30rem] relative my-[2rem] l:mx-2 perspective-[1000px] cursor-pointer"
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
                          className="transition-transform duration-500 my-2 hover:scale-102 rounded-[1rem] w-full h-auto"
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
      </div>
    </>
  );
};
export default ProductPage;
