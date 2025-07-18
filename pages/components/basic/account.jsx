import React, { useEffect, useState } from "react";
import Image from "next/image";
import defaultImage from "../../../public/my_logo.jpg";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import Link from "next/link";
import dynamic from "next/dynamic";

const MoonLoader = dynamic(() =>
  import("react-spinners").then((mod) => mod.MoonLoader),
  { ssr: false }
);
const motion = dynamic(() =>
  import("framer-motion").then((mod) => mod.motion),
  { ssr: false }
);
const AnimatePresence = dynamic(() =>
  import("framer-motion").then((mod) => mod.AnimatePresence),
  { ssr: false }
);

const FaEdit = dynamic(() =>
  import("react-icons/fa").then((mod) => mod.FaEdit),
  { ssr: false }
);
const FaOutdent = dynamic(() =>
  import("react-icons/fa").then((mod) => mod.FaOutdent),
  { ssr: false }
);
const FaPlus = dynamic(() =>
  import("react-icons/fa").then((mod) => mod.FaPlus),
  { ssr: false }
);
const FaSignOutAlt = dynamic(() =>
  import("react-icons/fa").then((mod) => mod.FaSignOutAlt),
  { ssr: false }
);
const RxCross2 = dynamic(() =>
  import("react-icons/rx").then((mod) => mod.RxCross2),
  { ssr: false }
);
const RxHamburgerMenu = dynamic(() =>
  import("react-icons/rx").then((mod) => mod.RxHamburgerMenu),
  { ssr: false }
);

const Account = ({ account, setAccount }) => {
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("custom_jwt");
    if (!token) {
      router.push("/");
    }
  }, []);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [showdetails, setshowdetails] = useState(false);
  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
      },
    }),
  };

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    postcode: "",
    image: "",
  });
  const logout = () => {
    localStorage.removeItem("custom_jwt");
    setAccount({});
    toast("Logout Successfully", {
      icon: "✅",
      style: {
        background: "#ff0000",
        color: "#fff",
      },
    });
    setEditModalOpen(false);
    router.push("/");
  };
  const OpenModal = () => {
    setForm({
      name: account.name || "",
      email: account.email || "",
      phone: account.phone || "",
      password: account.password || "",
      address: account.address || "",
      postcode: account.postcode || "",
      image: account.image || "",
    });
  };
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required.";
    if (!form.email.trim()) newErrors.email = "Email is required.";
    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required.";
    } else if (!/^\d+$/.test(form.phone.trim())) {
      newErrors.phone = "Phone number must contain only digits.";
    }
    if (!form.password.trim()) newErrors.password = "Password is required.";
    if (!form.address.trim()) newErrors.address = "Address is required.";
    if (!form.postcode.trim()) newErrors.postcode = "Postcode is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file" && files.length > 0) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const response = await fetch("/api/accountupdate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) throw new Error("Failed to update account");
      const data = await response.json();
      if (data) {
        if (data.success) {
          setAccount({
            name: form.name,
            email: form.email,
            phone: form.phone,
            password: form.password,
            address: form.address,
            postcode: form.postcode,
            image: form.image,
          });
          setEditModalOpen(false);
          localStorage.setItem("custom_jwt", data.token);
          toast("Account Update Succussfully", {
            icon: "✅",
            style: {
              background: "#7002ff",
              color: "#fff",
            },
          });
        }
      }
    } catch (error) {
      console.error("Error updating account:", error);
    }
  };
  useEffect(() => {
    const token = localStorage.getItem("custom_jwt");
    if (!token) {
      router.push("/");
      return;
    }

    if (account?.email) {
      fetchUserOrders(account.email);
    }
  }, [account?.email]);

  const fetchUserOrders = async (email) => {
    try {
      const res = await fetch("/api/getorders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        const formattedOrders = data.orders.map((order) => ({
          id: order.id,
          customer: order.name,
          email: order.email,
          phone: order.phone,
          address: order.address,
          postcode: order.postcode,
          items: order.order_items.map((item) => ({
            product_id: item.product_id,
            name: item.name,
            image: item.image,
            specification: item.specification,
            color: item.color,
            onsale: item.onsale,
            quantity: item.quantity,
            price: item.price,
          })),
          status: order.status,
          date: new Date(order.created_at || order.date).toLocaleDateString(),
        }));
        setOrders(formattedOrders);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  return (
    <>
      <Toaster />

      {editModalOpen && (
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
            className="bg-white rounded-lg p-8 shadow-lg w-[400px] max-h-[90vh] scrollbar-hide overflow-y-auto"
          >
            <div className="text-2xl font-bold mb-4">Edit Account Details</div>

            <motion.div
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center"
            >
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
                        disabled
                        type="email"
                        id="email"
                        name="email"
                        value={form.email}
                        onChange={handleFormChange}
                        className={`outline-2 disabled:outline-gray-400 text-gray-500 m-2 w-full p-1 rounded-[4px] ${
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
                      <div className="text-[12px]">
                        (Also add country code without +)
                      </div>
                      <input
                        type="phone"
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
                  label: "Password:",
                  htmlFor: "password",
                  input: (
                    <>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        value={form.password}
                        onChange={handleFormChange}
                        className={`outline-2 focus:outline-black m-2 w-full p-1 rounded-[4px] ${
                          errors.password ? "border border-red-500" : ""
                        }`}
                      />
                      {errors.password && (
                        <div className="text-red-500 text-xs mb-1">
                          {errors.password}
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
                        type="address"
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
                        type="postcode"
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

              <motion.label
                custom={15}
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                htmlFor="file"
                className="mt-4 flex bg-[var(---btncolor)] text-[var(---whitetext)] px-4 py-2 cursor-pointer w-full justify-center hover:bg-transparent hover:border hover:border-[var(---btncolor)] hover:text-[var(---btncolor)] duration-[1s] rounded-[6px] "
              >
                Change Image
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
                Update
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
      <div className="l:grid l:grid-cols-6 l:gap-4 p-4">
        <div
          className={`${
            showdetails ? "right-0" : "right-[100vw]"
          } duration-[2s] sm:fixed l:hidden top-[10vh] overflow-y-scroll scrollbar-hide h-[90vh] bg-white shadow-md rounded-lg p-6  `}
        >
          <div
            className="text-[30px] place-self-end my-1 l:hidden sm:block cursor-pointer"
            onClick={() => {
              setshowdetails(false);
            }}
          >
            <RxCross2 />
          </div>
          <h1 className="text-2xl font-bold mb-4">Account Details</h1>
          <div className="border-r-[4px] px-[1rem] border-[var(---btncolor)]">
            <div className="my-4 ">
              {account.image ? (
                <Image
                  src={account.image}
                  width={1020}
                  height={1020}
                  alt="User Image"
                  className="w-[10rem] h-[10rem] rounded-full"
                />
              ) : (
                <Image
                  src={defaultImage}
                  width={1020}
                  height={1020}
                  alt="No Image"
                  className="w-[10rem] h-[10rem] rounded-full"
                />
              )}
            </div>
            <div className="mb-4 text-[18px]">
              <strong className="text-[20px]">Name: </strong>
              {account.name ? account.name : "Not provided"}
            </div>
            <div className="mb-4 text-[18px]">
              <strong className="text-[20px]">Email: </strong>
              {account.email}
            </div>
            <div className="mb-4 text-[18px]">
              <strong className="text-[20px]">Phone: </strong>
              {account.phone ? account.phone : "Not provided"}
            </div>
            <div className="mb-4 text-[18px]">
              <strong className="text-[20px]">Password: </strong>
              {account.password ? "********" : "Not set"}
            </div>
            <div className="mb-4 text-[18px]">
              <strong className="text-[20px]">Address: </strong>
              {account.address ? account.address : "Not provided"}
            </div>
            <div className="mb-4 text-[18px]">
              <strong className="text-[20px]">Post Code: </strong>
              {account.postcode ? account.postcode : "Not provided"}
            </div>
            <div className="mb-4 text-[18px]">
              <button
                onClick={() => {
                  setEditModalOpen(true), OpenModal();
                }}
                className="flex items-center text-[16px] l:text-[18px] font-semibold bg-[var(---btncolor)] text-[var(---whitetext)] p-2 l:p-3 l:px-[3rem] px-[3rem] rounded-[8px] my-[2rem] cursor-pointer hover:bg-transparent hover:text-[var(---btncolor)] hover:border-[var(---btncolor)] hover:border-[1px] duration-[1s] "
              >
                Edit <FaEdit className="mx-2" />
              </button>
            </div>
            <div className="mb-4 text-[18px]">
              <button
                onClick={() => {
                  signOut(), logout();
                }}
                className="flex items-center text-[16px] l:text-[18px] font-semibold bg-[var(---edit)] text-[var(---whitetext)] p-2 l:p-3 l:px-[3rem] px-[3rem] rounded-[8px] my-[2rem] cursor-pointer hover:bg-transparent hover:text-[var(---edit)] hover:border-[var(---edit)] hover:border-[1px] duration-[1s] "
              >
                Logout <FaSignOutAlt className="mx-2" />
              </button>
            </div>
          </div>
        </div>
        <div
          className={`sm:hidden l:block bg-white shadow-md rounded-lg p-6 col-span-2 `}
        >
          <div
            className="text-[30px] place-self-end my-1 l:hidden sm:block cursor-pointer"
            onClick={() => {
              setshowdetails(false);
            }}
          >
            <RxCross2 />
          </div>
          <h1 className="text-2xl font-bold mb-4">Account Details</h1>
          <div className="border-r-[4px] px-[1rem] border-[var(---btncolor)]">
            <div className="my-4 ">
              {account.image ? (
                <Image
                  src={account.image}
                  width={1020}
                  height={1020}
                  alt="User Image"
                  className="w-[10rem] h-[10rem] rounded-full"
                />
              ) : (
                <Image
                  src={defaultImage}
                  width={1020}
                  height={1020}
                  alt="No Image"
                  className="w-[10rem] h-[10rem] rounded-full"
                />
              )}
            </div>
            <div className="mb-4 text-[18px]">
              <strong className="text-[20px]">Name: </strong>
              {account.name ? account.name : "Not provided"}
            </div>
            <div className="mb-4 text-[18px]">
              <strong className="text-[20px]">Email: </strong>
              {account.email}
            </div>
            <div className="mb-4 text-[18px]">
              <strong className="text-[20px]">Phone: </strong>
              {account.phone ? account.phone : "Not provided"}
            </div>
            <div className="mb-4 text-[18px]">
              <strong className="text-[20px]">Password: </strong>
              {account.password ? "********" : "Not set"}
            </div>
            <div className="mb-4 text-[18px]">
              <strong className="text-[20px]">Address: </strong>
              {account.address ? account.address : "Not provided"}
            </div>
            <div className="mb-4 text-[18px]">
              <strong className="text-[20px]">Post Code: </strong>
              {account.postcode ? account.postcode : "Not provided"}
            </div>
            <div className="mb-4 text-[18px]">
              <button
                onClick={() => {
                  setEditModalOpen(true), OpenModal();
                }}
                className="flex items-center text-[16px] l:text-[18px] font-semibold bg-[var(---btncolor)] text-[var(---whitetext)] p-2 l:p-3 l:px-[3rem] px-[3rem] rounded-[8px] my-[2rem] cursor-pointer hover:bg-transparent hover:text-[var(---btncolor)] hover:border-[var(---btncolor)] hover:border-[1px] duration-[1s] "
              >
                Edit <FaEdit className="mx-2" />
              </button>
            </div>
            <div className="mb-4 text-[18px]">
              <button
                onClick={() => {
                  signOut(), logout();
                }}
                className="flex items-center text-[16px] l:text-[18px] font-semibold bg-[var(---edit)] text-[var(---whitetext)] p-2 l:p-3 l:px-[3rem] px-[3rem] rounded-[8px] my-[2rem] cursor-pointer hover:bg-transparent hover:text-[var(---edit)] hover:border-[var(---edit)] hover:border-[1px] duration-[1s] "
              >
                Logout <FaSignOutAlt className="mx-2" />
              </button>
            </div>
          </div>
        </div>
        <div className="bg-white shadow-md rounded-lg p-6 col-span-4 content-center">
          <div
            className="cursor-pointer l:hidden text-[1.5rem]"
            onClick={() => setshowdetails(true)}
          >
            <RxHamburgerMenu />
          </div>
          <div className="p-6">
            <div className="text-2xl font-bold mb-6 w-full text-center">
              Your Orders
            </div>
            <div className="w-[70%] mx-auto my-[2rem]">
              There you got all the details of your orders if you have any
              problem or any type of complain please contact us. Tell us what's
              the matter we will find a best way to solve it.
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="p-2 border">Order ID</th>
                    <th className="p-2 border">Customer</th>
                    <th className="p-2 border">Email</th>
                    <th className="p-2 border">Phone</th>
                    <th className="p-2 border">Status</th>
                    <th className="p-2 border">Date</th>
                    <th className="p-2 border">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 text-center">
                      <td className="p-2 border">{order.id}</td>
                      <td className="p-2 border">{order.customer}</td>
                      <td className="p-2 border">{order.email}</td>
                      <td className="p-2 border">{order.phone}</td>
                      <td className="p-2 border">{order.status}</td>
                      <td className="p-2 border">{order.date}</td>
                      <td className="p-2 border">
                        <button
                          className="text-blue-600 underline cursor-pointer"
                          onClick={() => setSelectedOrder(order)}
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center p-4">
                        <div className=" inset-0  flex items-center justify-center col-span-5 bg-opacity-80 z-999">
                          <div className=" p-6 rounded  text-xl font-bold flex items-center gap-2">
                            <MoonLoader size={30} color="#7002ff" />
                            Loading...
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <div className="mb-4 text-[16px] w-full items-center flex justify-center">
              <Link href={`/components/category/allproducts`}>
                <button className="flex items-center text-[14px] l:text-[16px] font-semibold bg-[var(---hoverbtncolor)] text-[var(---whitetext)] p-2 l:p-3 l:px-[2rem] px-[1.5rem] rounded-[8px] my-[2rem] cursor-pointer hover:bg-transparent hover:text-[var(---hoverbtncolor)] hover:border-[var(---hoverbtncolor)] hover:border-[1px] duration-[1s] ">
                  Buy More <FaPlus className="mx-2" />
                </button>
              </Link>
            </div>

            <AnimatePresence>
              {selectedOrder && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-200"
                >
                  <div className="bg-white rounded-lg p-8 shadow-lg max-w-2xl max-h-[90vh] overflow-y-auto scrollbar-hide">
                    <div className="text-2xl font-bold mb-4">
                      Order #{selectedOrder.id}
                    </div>
                    <div className="grid grid-cols-1  gap-4 text-[16px]">
                      <div>
                        <b>Customer:</b> {selectedOrder.customer}
                      </div>
                      <div>
                        <b>Email:</b> {selectedOrder.email}
                      </div>
                      <div>
                        <b>Phone:</b> {selectedOrder.phone}
                      </div>
                      <div>
                        <b>Address:</b> {selectedOrder.address}
                      </div>
                      <div>
                        <b>Status:</b> {selectedOrder.status}
                      </div>
                      <div>
                        <b>Post Code:</b> {selectedOrder.postcode}
                      </div>
                      <div>
                        <b>Date:</b> {selectedOrder.date}
                      </div>
                    </div>

                    <div className="mt-6">
                      <div className="text-lg font-semibold mb-2">Items:</div>
                      <ul className="space-y-4">
                        {selectedOrder.items.map((item, idx) => (
                          <li
                            key={idx}
                            className="grid grid-cols-2 items-start gap-4 border l:px-[3rem] p-3 rounded-md"
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={1020}
                              height={1020}
                              className="w-30 h-30 object-cover rounded-md border col-span-2"
                            />
                            <div className="flex-1 col-start-3 ">
                              <div className="font-bold text-[17px]">
                                {item.name}
                              </div>
                              <div className="text-sm text-gray-600">
                                {item.specification}
                              </div>
                              <div className="text-sm flex items-center">
                                Color:
                                <div
                                  className="rounded-full w-[1.2rem] h-[1.2rem] mx-1"
                                  style={{ backgroundColor: item.color }}
                                ></div>
                              </div>
                              <div className="text-sm">
                                Quantity: <b>{item.quantity}</b>
                              </div>
                              <div className="text-sm">
                                Price:
                                <b className="text-[var(---price)]">
                                  ${item.price}
                                </b>
                              </div>
                              {item.onsale && (
                                <span className="bg-[var(---salelabel)] text-white text-xs px-2 py-0.5 rounded inline-block mt-1">
                                  On Sale
                                </span>
                              )}
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="text-center mt-6">
                      <button
                        className="hover:bg-transparent hover:text-[var(---btncolor)] hover:border-[1px] hover:border-[var(---btncolor)] duration-[1s] px-6 py-2 bg-[var(---btncolor)] cursor-pointer text-white rounded"
                        onClick={() => setSelectedOrder(null)}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};
export default Account;
