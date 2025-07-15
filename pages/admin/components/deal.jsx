import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";

const Deal = () => {
  const [mobileEdit, setMobileEdit] = useState(false);
  const [mobileImages, setMobileImages] = useState([]);
  const [mobileDeal, setMobileDeal] = useState({
    line1: "",
    line2: "",
    line3: "",
    image: "",
  });

  const [headphoneEdit, setHeadphoneEdit] = useState(false);
  const [headphoneImages, setHeadphoneImages] = useState([]);
  const [headphoneDeal, setHeadphoneDeal] = useState({
    line1: "",
    line2: "",
    line3: "",
    image: "",
  });
  const [errors, setErrors] = useState({});

  const validatemobileDeal = () => {
    const newErrors = {};
    if (!mobileDeal.line1 || mobileDeal.line1.trim().length < 2)
      newErrors.line1 = "Line 1 is required (min 2 chars)";
    if (!mobileDeal.line2 || mobileDeal.line2.trim().length < 2)
      newErrors.line2 = "Line 2 is required (min 2 chars)";
    if (!mobileDeal.line3 || mobileDeal.line3.trim().length < 2)
      newErrors.line3 = "Line 3 is required (min 2 chars)";
    if (!mobileDeal.image) newErrors.image = "Image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const validateheadphoneDeal = () => {
    const newErrors = {};
    if (!headphoneDeal.line1 || headphoneDeal.line1.trim().length < 2)
      newErrors.line1 = "Line 1 is required (min 2 chars)";
    if (!headphoneDeal.line2 || headphoneDeal.line2.trim().length < 2)
      newErrors.line2 = "Line 2 is required (min 2 chars)";
    if (!headphoneDeal.line3 || headphoneDeal.line3.trim().length < 2)
      newErrors.line3 = "Line 3 is required (min 2 chars)";
    if (!headphoneDeal.image) newErrors.image = "Image is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    fetchDeals();
  }, []);

  const fetchDeals = async () => {
    const res = await fetch("/api/deals");
    if (res.ok) {
      const data = await res.json();
      if (data.mobile) setMobileDeal(data.mobile);
      if (data.headphone) setHeadphoneDeal(data.headphone);
    }
  };

  const handleMobileImage = (e) => {
    const files = Array.from(e.target.files);
    setMobileImages(files);
  };

  const handleHeadphoneImage = (e) => {
    const files = Array.from(e.target.files);
    setHeadphoneImages(files);
  };

  const filesToBase64 = async (files) => {
    return Promise.all(
      files.map(
        (file) =>
          new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target.result);
            reader.onerror = reject;
            reader.readAsDataURL(file);
          })
      )
    );
  };

  const handleSaveMobile = async () => {
    if (!validatemobileDeal()) return;

    let image = mobileDeal.image;
    if (mobileImages.length > 0) {
      const base64Images = await filesToBase64(mobileImages);
      image = base64Images[0];
    }
    await fetch("/api/deals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "mobile",
        line1: mobileDeal.line1,
        line2: mobileDeal.line2,
        line3: mobileDeal.line3,
        image,
      }),
    });
    setMobileEdit(false);
    setMobileImages([]);
    fetchDeals();
  };

  const handleSaveHeadphone = async () => {
    if (!validateheadphoneDeal()) return;

    let image = headphoneDeal.image;
    if (headphoneImages.length > 0) {
      const base64Images = await filesToBase64(headphoneImages);
      image = base64Images[0];
    }
    await fetch("/api/deals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: "headphone",
        line1: headphoneDeal.line1,
        line2: headphoneDeal.line2,
        line3: headphoneDeal.line3,
        image,
      }),
    });
    setHeadphoneEdit(false);
    setHeadphoneImages([]);
    fetchDeals();
  };

  return (
    <>
      <div className="l:grid l:grid-cols-2 l:gap-[1rem] l:h-[40rem] l:overflow-hidden l:justify-between l:w-full px-[1rem]">
        {/* Mobile Deal */}
        <div className="my-4 w-full h-[50%] l:h-full relative ">
          <FaEdit
            className="absolute top-[5%] right-[5%] text-[40px] z-50 text-[var(---edit)] cursor-pointer"
            onClick={() => setMobileEdit(true)}
          />
          {mobileDeal.image && (
            <Image
              src={mobileDeal.image}
              alt="mobile deal"
              width={1020}
              height={1020}
              className="w-full h-[50%] l:h-full"
            />
          )}
          <div className="absolute top-[5vh] left-6 l:top-[15vh] l:left-[5vw] text-[var(---whitetext)] w-[50%] l:w-[40%]">
            <div className="text-[14px] l:text-[1.5rem] font-thin">
              {mobileDeal.line1}
            </div>
            <div className="text-[35px] l:text-[4rem] font-semibold">
              {mobileDeal.line2}
            </div>
            <div className="text-[13px] l:text-[1.4rem] font-thin">
              {mobileDeal.line3}
            </div>
            <div>
              <Link href={`/components/category/mobiles`}>
                <button className="my-4 p-2 px-8 bg-[var(---whitetext)] text-[var(---blacktext)] rounded-[1.5rem] text-[14px] l:text-[18px] l:px-[3rem] cursor-pointer hover:bg-transparent hover:text-[var(---whitetext)] hover:border-[var(---whitetext)] hover:border-[1px] duration-[1s] ">
                  Shope
                </button>
              </Link>
            </div>
          </div>
        </div>
        {/* Headphone Deal */}
        <div className="my-4 w-full h-[50%] l:h-full relative">
          <FaEdit
            className="absolute top-[5%] right-[5%] text-[40px] z-50 text-[var(---edit)] cursor-pointer"
            onClick={() => setHeadphoneEdit(true)}
          />
          {headphoneDeal.image && (
            <Image
              src={headphoneDeal.image}
              alt="headphone deal"
              width={1020}
              height={1020}
              className="w-full h-[50%] l:h-full"
            />
          )}
          <div className="absolute top-[5vh] left-6 l:top-[10rem] l:left-[5vw] text-[var(---whitetext)] w-[50%] l:w-[40%]">
            <div className="text-[14px] l:text-[1.5rem] font-thin">
              {headphoneDeal.line1}
            </div>
            <div className="text-[35px] l:text-[4rem] font-semibold">
              {headphoneDeal.line2}
            </div>
            <div className="text-[13px] l:text-[1.4rem] font-thin">
              {headphoneDeal.line3}
            </div>
            <div>
              <Link href={`/components/category/headphones&speakers`}>
                <button className="my-4 p-2 px-8 bg-[var(---whitetext)] text-[var(---blacktext)] rounded-[1.5rem] text-[14px] l:text-[18px] l:px-[3rem] cursor-pointer hover:bg-transparent hover:text-[var(---whitetext)] hover:border-[var(---whitetext)] hover:border-[1px] duration-[1s] ">
                  Shope
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <>
        {mobileEdit && (
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
              
              <div className="text-2xl font-bold mb-4">Edit Mobile Deal!!</div>
              <div className=" mb-4">Update the deal details and image.</div>
              <motion.div
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center"
              >
                {[
                  {
                    label: "First Line:",
                    htmlFor: "line1",
                    input: (
                      <>
                        <input
                          type="text"
                          id="line1"
                          name="line1"
                          value={mobileDeal.line1}
                          onChange={(e) =>
                            setMobileDeal({
                              ...mobileDeal,
                              line1: e.target.value,
                            })
                          }
                          className={`outline-2 focus:outline-black m-2 w-full p-1 rounded-[4px] ${
                            errors.line1 ? "border border-red-500" : ""
                          }`}
                        />
                        {errors.line1 && (
                          <div className="text-red-500 text-xs mb-1">
                            {errors.line1}
                          </div>
                        )}
                      </>
                    ),
                  },
                  {
                    label: "Second Line:",
                    htmlFor: "line2",
                    input: (
                      <>
                        <input
                          type="text"
                          id="line2"
                          name="line2"
                          value={mobileDeal.line2}
                          onChange={(e) =>
                            setMobileDeal({
                              ...mobileDeal,
                              line2: e.target.value,
                            })
                          }
                          className={`outline-2 focus:outline-black m-2 w-full p-1 rounded-[4px] ${
                            errors.line2 ? "border border-red-500" : ""
                          }`}
                        />
                        {errors.line2 && (
                          <div className="text-red-500 text-xs mb-1">
                            {errors.line2}
                          </div>
                        )}
                      </>
                    ),
                  },
                  {
                    label: "Third Line:",
                    htmlFor: "line3",
                    input: (
                      <>
                        <input
                          type="text"
                          id="line3"
                          name="line3"
                          value={mobileDeal.line3}
                          onChange={(e) =>
                            setMobileDeal({
                              ...mobileDeal,
                              line3: e.target.value,
                            })
                          }
                          className={`outline-2 focus:outline-black m-2 w-full p-1 rounded-[4px] ${
                            errors.line3 ? "border border-red-500" : ""
                          }`}
                        />
                        {errors.line3 && (
                          <div className="text-red-500 text-xs mb-1">
                            {errors.line3}
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
                  Upload Image
                  <input
                    type="file"
                    id="file"
                    name="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleMobileImage}
                  />
                </motion.label>
                {errors.image && (
                  <div className="text-red-500 text-xs mb-1">
                    {errors.image}
                  </div>
                )}
                {mobileDeal.image && (
                  <motion.div
                    custom={16}
                    variants={inputVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full flex justify-center"
                  >
                    <Image
                      src={
                        mobileImages.length > 0
                          ? URL.createObjectURL(mobileImages[0])
                          : mobileDeal.image
                      }
                      alt="Preview"
                      className="mt-2 w-24 h-24 object-cover rounded"
                      width={96}
                      height={96}
                    />
                  </motion.div>
                )}
              </motion.div>
              <div className="flex l:flex-row sm:flex-col l:space-x-[1rem] items-center justify-center l:w-[100%] l:mt-[2rem]">
                <button
                  className="px-6 py-2 bg-[var(---btncolor)] cursor-pointer text-white hover:bg-transparent hover:border hover:border-[var(---btncolor)] hover:text-[var(---btncolor)] duration-[1s] rounded-[6px]"
                  onClick={() => setMobileEdit(false)}
                >
                  Close
                </button>
                <button
                  className="px-6 py-2 bg-[var(---btncolor)] cursor-pointer text-white hover:bg-transparent hover:border hover:border-[var(---btncolor)] hover:text-[var(---btncolor)] duration-[1s] rounded-[6px]"
                  onClick={handleSaveMobile}
                >
                  Update
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </>

      {headphoneEdit && (
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
            
            <div className="text-2xl font-bold mb-4">Edit Headphone Deal!!</div>
            <div className=" mb-4">Update the deal details and image.</div>
            <motion.div
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center"
            >
              {[
                {
                  label: "First Line:",
                  htmlFor: "line1",
                  input: (
                    <>
                      <input
                        type="text"
                        id="line1"
                        name="line1"
                        value={headphoneDeal.line1}
                        onChange={(e) =>
                          setHeadphoneDeal({
                            ...headphoneDeal,
                            line1: e.target.value,
                          })
                        }
                        className={`outline-2 focus:outline-black m-2 w-full p-1 rounded-[4px] ${
                          errors.line1 ? "border border-red-500" : ""
                        }`}
                      />
                      {errors.line1 && (
                        <div className="text-red-500 text-xs mb-1">
                          {errors.line1}
                        </div>
                      )}
                    </>
                  ),
                },
                {
                  label: "Second Line:",
                  htmlFor: "line2",
                  input: (
                    <>
                      <input
                        type="text"
                        id="line2"
                        name="line2"
                        value={headphoneDeal.line2}
                        onChange={(e) =>
                          setHeadphoneDeal({
                            ...headphoneDeal,
                            line2: e.target.value,
                          })
                        }
                        className={`outline-2 focus:outline-black m-2 w-full p-1 rounded-[4px] ${
                          errors.line2 ? "border border-red-500" : ""
                        }`}
                      />
                      {errors.line2 && (
                        <div className="text-red-500 text-xs mb-1">
                          {errors.line2}
                        </div>
                      )}
                    </>
                  ),
                },
                {
                  label: "Third Line:",
                  htmlFor: "line3",
                  input: (
                    <>
                      <input
                        type="text"
                        id="line3"
                        name="line3"
                        value={headphoneDeal.line3}
                        onChange={(e) =>
                          setHeadphoneDeal({
                            ...headphoneDeal,
                            line3: e.target.value,
                          })
                        }
                        className={`outline-2 focus:outline-black m-2 w-full p-1 rounded-[4px] ${
                          errors.line3 ? "border border-red-500" : ""
                        }`}
                      />
                      {errors.line3 && (
                        <div className="text-red-500 text-xs mb-1">
                          {errors.line3}
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
                Upload Image
                <input
                  type="file"
                  id="file"
                  name="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleHeadphoneImage}
                />
              </motion.label>
              {errors.image && (
                <div className="text-red-500 text-xs mb-1">{errors.image}</div>
              )}
              {headphoneDeal.image && (
                <motion.div
                  custom={16}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-full flex justify-center"
                >
                  <Image
                    src={
                      headphoneImages.length > 0
                        ? URL.createObjectURL(headphoneImages[0])
                        : headphoneDeal.image
                    }
                    alt="Preview"
                    className="mt-2 w-24 h-24 object-cover rounded"
                    width={96}
                    height={96}
                  />
                </motion.div>
              )}
            </motion.div>
            <div className="flex l:flex-row sm:flex-col l:space-x-[1rem] items-center justify-center l:w-[100%] l:mt-[2rem]">
              <button
                className="px-6 py-2 bg-[var(---btncolor)] cursor-pointer text-white hover:bg-transparent hover:border hover:border-[var(---btncolor)] hover:text-[var(---btncolor)] duration-[1s] rounded-[6px]"
                onClick={() => setHeadphoneEdit(false)}
              >
                Close
              </button>
              <button
                className="px-6 py-2 bg-[var(---btncolor)] cursor-pointer text-white hover:bg-transparent hover:border hover:border-[var(---btncolor)] hover:text-[var(---btncolor)] duration-[1s] rounded-[6px]"
                onClick={handleSaveHeadphone}
              >
                Update
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default Deal;
