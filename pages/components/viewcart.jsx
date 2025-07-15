import React, { useEffect, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi2";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoPricetagOutline } from "react-icons/io5";
import { LuStickyNote } from "react-icons/lu";
import { FaLock } from "react-icons/fa";
import CheckDetails from "./checkdetails";
import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";
const ViewCart = ({ cart, removeFromCart, account, clearCart, setCart }) => {
  const [showloder, setshowloder] = useState(false);
  const [showresult, setshowresult] = useState(false);
  const [placemessage, setplacemessage] = useState(false);
  const [quantities, setQuantities] = useState([]);
  const [previousPage, setPreviousPage] = useState([]);

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
  const handleShowLoader = () => {
    setshowloder(!showloder);
    setTimeout(() => {
      setshowloder(false);
      setshowresult(true);
    }, 2000);
  };

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

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const imageUrl = `${siteUrl}main.jpeg`;
  return (
    <>
      <Head>
        <title>AR Codes - Affordable & Trendy Online Shopping</title>
        <meta
          name="description"
          content="Shop the latest electronics and accessories at the best prices with AR Codes. Fast delivery and exclusive deals!"
        />
        <meta name="author" content="Hafiz Abubakar Afzal" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="online shopping, best prices, electronics, AR Codes, sale, deals, e-commerce, mobile, laptop, lcd, tablet, drone, camera, headphone, mobiles, laptops, lcds, tablets, drones, cameras, headphones"
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta
          property="og:title"
          content="AR Codes - Affordable & Trendy Online Shopping"
        />
        <meta
          property="og:description"
          content="Shop the latest electronics and accessories at the best prices with AR Codes."
        />
        <meta property="og:image" content={imageUrl} />

        <link rel="canonical" href={siteUrl} />
        <link rel="icon" href={imageUrl} />
      </Head>
      <div className="flex flex-col items-center justify-center p-4">
        <div className="text-[2rem] font-sans font-bold">View Cart</div>
        <div className="l:grid l:grid-cols-2 l:gap-[2rem] ">
          <div className="l:h-[35rem] l:overflow-y-scroll scrollbar-hide">
            <div className="my-[2rem] border-y-[1px] py-[1rem]">
              <div className="text-center my-[1rem] mt-[2rem] text-[20px] font-bold">
                Your Shopping Cart
              </div>
              <div className="text-center mb-[2rem]">
                Review the items in your cart before proceeding to checkout.
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 ">
              {cart.length == 0 ? (
                <div className="text-[1.5rem] font-thin my-[1rem]">
                  There Is no Item In Cart
                </div>
              ) : (
                cart.map((item, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-3 w-full flex-shrink-0   border-b-[1px]"
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
                        <div className="w-6 text-center">
                          {quantities[index]}
                        </div>
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
                        ${" "}
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
            <div className="text-[14px] items-start w-full py-[1rem] space-y-2 border-b-[1px] l:mb-[4rem]">
              <div className="flex items-center text-[var(---btncolor)] ">
                <div className="mr-2">
                  <IoPricetagOutline />
                </div>
                <div>Enter a promo code</div>
              </div>
              <div className="flex items-center text-[var(---btncolor)]">
                <div className="mr-2">
                  <LuStickyNote />
                </div>
                <div>Add a note</div>
              </div>
            </div>
          </div>
          <div className="l:h-[35rem] l:items-center l:content-center l:px-[3rem]">
            <div className="text-[16px] items-start w-full py-[1rem] space-y-2 border-b-[1px]">
              <div className="flex items-center justify-between ">
                <div className="">Subtotal</div>
                <div>$ {grandTotal.toFixed(2)}</div>
              </div>
              <div className="flex items-center justify-between font-thin">
                <div className="">Delivery</div>
                <div>FREE</div>
              </div>
              <div className="underline text-[14px]">
                Lahore, Punjab, Pakistan
              </div>
            </div>
            <div className="text-[16px] items-start w-full py-[1rem] space-y-2">
              <div className="flex text-[20px] items-center justify-between ">
                <div className="">Total</div>
                <div>$ {grandTotal.toFixed(2)}</div>
              </div>
              {showloder ? (
                <>
                  <button
                    disabled
                    type="button"
                    className=" py-2.5 px-5 me-2 text-sm font-medium  items-center w-full bg-[var(---btncolor)] text-[var(---whitetext)] p-2 my-[1rem] hover:bg-[var(---hoverbtncolor)] cursor-pointer rounded-[2rem]"
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
                  className="w-full bg-[var(---btncolor)] text-[var(---whitetext)] p-2 my-[1rem] hover:bg-[var(---hoverbtncolor)] rounded-[2rem] cursor-pointer"
                >
                  Checkout
                </button>
              )}
              <div className="flex items-center justify-center font-bold my-[1rem] text-[14px] space-x-2">
                <div>
                  <FaLock />
                </div>
                <div>Secure Checkout</div>
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
                        <div className="text-2xl font-bold mb-4">
                          Order Placed!
                        </div>
                        <div className="mb-4">
                          Thank you for your purchase. Your order will
                          successfully placed on your given address.
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
          </div>
        </div>
      </div>
    </>
  );
};
export default ViewCart;
