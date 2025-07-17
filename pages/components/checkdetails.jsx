import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiMinus, HiPlus } from "react-icons/hi2";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MoonLoader } from "react-spinners";
import { useRouter } from "next/router";
import Head from "next/head";

const CheckDetails = ({
  cart,
  removeFromCart,
  account,
  setplacemessage,
  setshowresult,
  clearCart,
  setCart,
}) => {
  const [errors, setErrors] = useState({});
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorModalContent, setErrorModalContent] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const inputVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.04, type: "spring", stiffness: 120 },
    }),
  };
  const [form, setForm] = useState({
    name: account.name || "",
    email: account.email || "",
    phone: account.phone || "",
    address: account.address || "",
    postcode: account.postcode || "",
  });
  const [quantities, setQuantities] = useState([]);

  const validateForm = () => {
    const newErrors = {};
    if (!form.name || form.name.trim().length < 2)
      newErrors.name = "Name is required (min 2 chars)";
    if (!form.email || form.email.trim().length < 12)
      newErrors.email = "Email is required (min 12 chars)";
    if (!form.phone || form.phone.trim().length < 10)
      newErrors.phone = "Phone is required (min 10 chars)";
    if (!form.address || form.address.trim().length < 10)
      newErrors.address = "Address is required (min 10 chars)";
    if (!form.postcode || form.postcode.trim().length < 4)
      newErrors.postcode = "Post Code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
  const message = async () => {
    if (!validateForm()) return;
    setLoading(true);
    const orderItems = cart.map((item, index) => ({
      product_id: item.item_id,
      name: item.item_name,
      image: item.item_image,
      specification: item.item_specification,
      onsale: item.item_on_sale,
      color: item.item_color,
      quantity: quantities[index],
      price: item.item_on_sale ? item.item_sale_price : item.item_price,
    }));

    try {
      const res = await fetch("/api/addorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          postcode: form.postcode,
          order_items: orderItems,
          total_price: grandTotal,
          status: "pending",
        }),
      });

      const data = await res.json();

      if (data.insufficient) {
        const messages = data.details.map(
          (item) =>
            `🛑 Product ID ${item.product_id}: Requested ${item.requested}, Available ${item.available}`
        );
        setLoading(false);
        setErrorModalContent(messages);
        setShowErrorModal(true);
        return;
      }

      if (data.success) {
        setTimeout(() => {
          setplacemessage(true);
          clearCart();
          localStorage.removeItem("user_cart");
        }, 500); // 0.5 second delay
      } else {
        alert("Order failed to place. Try again.");
      }
    } catch (error) {
      console.error("Order submission failed:", error);
      alert("Something went wrong while placing the order.");
    }
    router.events.on("routeChangeComplete", () => {
      setLoading(false);
    });
  };

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
        <meta property="og:image" content={`${siteUrl}logo.png`} />

        <link rel="canonical" href={siteUrl} />
        <link rel="icon" href={imageUrl} />
      </Head>
      {loading ? (
        <div className="fixed top-0 cursor-progress z-999 min-w-full min-h-full bg-[var(---blacktext)]  h-screen  inset-0 flex items-center justify-center col-span-5 bg-opacity-80 ">
          <div className=" p-6 rounded-xl  text-xl font-bold flex items-center gap-2 bg-[var(---whitetext)]">
            <MoonLoader size={30} color="#7002ff" />
            Loading...
          </div>
        </div>
      ) : null}
      {showErrorModal && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-1050"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="bg-white rounded-lg p-6 shadow-xl w-[90%] max-w-md justify-items-center">
            <h2 className="text-xl font-semibold mb-4">Insufficient Stock</h2>
            <ul className="list-disc list-inside text-red-600 text-sm space-y-2">
              {errorModalContent.map((msg, idx) => (
                <li key={idx}>{msg}</li>
              ))}
            </ul>
            <button
              onClick={() => setShowErrorModal(false)}
              className="mt-4 bg-[var(---redstock)]  text-white px-4 py-2 rounded-[8px] border-[var(---redstock)] hover:bg-transparent hover:text-[var(---redstock)] cursor-pointer border-[1px] duration-[1s]"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}

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
          className="bg-white rounded-lg p-8 shadow-lg l:w-[70vw] w-[400px] max-h-[90vh] scrollbar-hide overflow-y-auto"
        >
          <div className="text-2xl font-bold mb-4">Check Details</div>
          <div className="grid l:grid-cols-2 sm:grid-cols-1 gap-[3rem]">
            <motion.div
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center"
            >
              <div className="my-[1rem] text-[20px] font-thin text-left w-full">
                Recheck your Delivery details:
              </div>
              {[
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
                  label: "Email:",
                  htmlFor: "email",
                  input: (
                    <>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleFormChange}
                        className={`outline-2 focus:outline-black m-2 w-full p-1 rounded-[4px] ${
                          errors.email ? "border border-red-500" : ""
                        }`}
                      />
                      {errors.email && (
                        <div className="text-red-500 text-xs mb-1">
                          {errors.email}
                        </div>
                      )}
                    </>
                  ),
                },
                {
                  label: "Phone:",
                  htmlFor: "phone",
                  input: (
                    <>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleFormChange}
                        className={`outline-2 focus:outline-black m-2 w-full p-1 rounded-[4px] ${
                          errors.phone ? "border border-red-500" : ""
                        }`}
                      />
                      {errors.phone && (
                        <div className="text-red-500 text-xs mb-1">
                          {errors.phone}
                        </div>
                      )}
                    </>
                  ),
                },
                {
                  label: "Address:",
                  htmlFor: "address",
                  input: (
                    <>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={form.address}
                        onChange={handleFormChange}
                        className={`outline-2 focus:outline-black m-2 w-full p-1 rounded-[4px] ${
                          errors.address ? "border border-red-500" : ""
                        }`}
                      />
                      {errors.address && (
                        <div className="text-red-500 text-xs mb-1">
                          {errors.address}
                        </div>
                      )}
                    </>
                  ),
                },
                {
                  label: "Post Code:",
                  htmlFor: "postcode",
                  input: (
                    <>
                      <input
                        type="number"
                        id="postcode"
                        name="postcode"
                        value={form.postcode}
                        onChange={handleFormChange}
                        className={`outline-2 focus:outline-black m-2 w-full p-1 rounded-[4px] ${
                          errors.postcode ? "border border-red-500" : ""
                        }`}
                      />
                      {errors.postcode && (
                        <div className="text-red-500 text-xs mb-1">
                          {errors.postcode}
                        </div>
                      )}
                    </>
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
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center "
            >
              <div className="mb-[2rem] mt-[1rem] text-[20px] font-thin text-left w-full ">
                Recheck your Items details:
              </div>
              <div className="grid grid-cols-1 gap-4 l:max-h-[50vh] scrollbar-hide l:overflow-y-scroll">
                {cart.length == 0 ? (
                  <div className="text-[1.5rem] font-thin my-[1rem]">
                    There Is no Item In Cart
                  </div>
                ) : (
                  cart.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-3 w-full flex-shrink-0  border-b-[1px]"
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
            </motion.div>
            <motion.div
              initial="hidden"
              animate="visible"
              className="l:col-span-2 l:px-[6rem] text-[16px] items-start w-full py-[1rem] space-y-2 border-b-[1px]"
            >
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

              <div className="text-[16px] items-start w-full py-[1rem] space-y-2">
                <div className="flex text-[20px] items-center justify-between ">
                  <div className="">Total</div>
                  <div>$ {grandTotal.toFixed(2)}</div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="flex justify-between mt-6">
            <button
              onClick={() => {
                setshowresult(false);
              }}
              className="px-6 py-2 bg-[var(---btncolor)] cursor-pointer text-white hover:bg-transparent hover:border hover:border-[var(---btncolor)] hover:text-[var(---btncolor)] duration-[1s] rounded-[6px]"
            >
              Close
            </button>
            <button
              onClick={() => {
                message();
              }}
              className="px-6 py-2 bg-[var(---btncolor)] cursor-pointer text-white hover:bg-transparent hover:border hover:border-[var(---btncolor)] hover:text-[var(---btncolor)] duration-[1s] rounded-[6px]"
            >
              Confrim
            </button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};
export default CheckDetails;
