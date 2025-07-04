import Image from "next/image";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Remove static imports for img1, img2
// import img1 from "./assets/img8.jpg"
// import img2 from "./assets/img9.jpg"

const Deal = () => {
  // State for mobile deal
  const [mobileEdit, setMobileEdit] = useState(false);
  const [mobileImages, setMobileImages] = useState([]);
  const [mobileDeal, setMobileDeal] = useState({
    line1: "",
    line2: "",
    line3: "",
    image: "",
  });

  // State for headphone deal
  const [headphoneEdit, setHeadphoneEdit] = useState(false);
  const [headphoneImages, setHeadphoneImages] = useState([]);
  const [headphoneDeal, setHeadphoneDeal] = useState({
    line1: "",
    line2: "",
    line3: "",
    image: "",
  });

  // Fetch deals from API on mount
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

  // Handle file change for mobile
  const handleMobileImage = (e) => {
    const files = Array.from(e.target.files);
    setMobileImages(files);
  };

  // Handle file change for headphone
  const handleHeadphoneImage = (e) => {
    const files = Array.from(e.target.files);
    setHeadphoneImages(files);
  };

  // Convert files to base64
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

  // Save mobile deal
  const handleSaveMobile = async () => {
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

  // Save headphone deal
  const handleSaveHeadphone = async () => {
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
          <div className="absolute top-6 left-6 l:top-[15vh] l:left-[5vw] text-[var(---whitetext)] w-[50%] l:w-[40%]">
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
          <div className="absolute top-6 left-6 l:top-[10rem] l:left-[5vw] text-[var(---whitetext)] w-[50%] l:w-[40%]">
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

      {/* Mobile Edit Modal */}
      <AnimatePresence>
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
              className="bg-white rounded-lg p-8 shadow-lg sm:max-w-sm sm:w-full l:max-w-full text-center l:w-[30rem] max-h-[90vh] scrollbar-hide overflow-y-auto"
            >
              <div className="text-2xl font-bold mb-4">Edit Mobile Deal!!</div>
              <div className="mb-4">Update the deal details and image.</div>
              <div className="flex flex-col items-center">
                <label htmlFor="mobile-line1">First Line:</label>
                <input
                  type="text"
                  id="mobile-line1"
                  className="outline focus:outline-black m-2"
                  value={mobileDeal.line1}
                  onChange={(e) =>
                    setMobileDeal({ ...mobileDeal, line1: e.target.value })
                  }
                />
                <label htmlFor="mobile-line2">Second Line:</label>
                <input
                  type="text"
                  id="mobile-line2"
                  className="outline focus:outline-black m-2"
                  value={mobileDeal.line2}
                  onChange={(e) =>
                    setMobileDeal({ ...mobileDeal, line2: e.target.value })
                  }
                />
                <label htmlFor="mobile-line3">Third Line:</label>
                <input
                  type="text"
                  id="mobile-line3"
                  className="outline focus:outline-black m-2"
                  value={mobileDeal.line3}
                  onChange={(e) =>
                    setMobileDeal({ ...mobileDeal, line3: e.target.value })
                  }
                />
                <label
                  htmlFor="mobile-upload"
                  className="mt-[1rem] flex bg-[var(---btncolor)] hover:bg-transparent text-[var(---whitetext)] hover:text-[var(---btncolor)] hover:border-[1px] hover:border-[var(---btncolor)] text-base font-medium px-4 py-2.5 outline-none hover:*:fill-[var(---btncolor)] rounded w-max cursor-pointer mx-auto *:duration-[1s] duration-[1s]"
                >
                  Upload
                  <input
                    type="file"
                    id="mobile-upload"
                    className="hidden"
                    multiple={false}
                    onChange={handleMobileImage}
                  />
                </label>
                {(mobileImages.length > 0 || mobileDeal.image) && (
                  <div className="flex justify-center mt-4">
                    <Image
                      src={
                        mobileImages.length > 0
                          ? URL.createObjectURL(mobileImages[0])
                          : mobileDeal.image
                      }
                      alt="Preview"
                      width={200}
                      height={200}
                      className="rounded shadow object-cover max-h-40"
                    />
                  </div>
                )}
              </div>
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
      </AnimatePresence>

      {/* Headphone Edit Modal */}
      <AnimatePresence>
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
              className="bg-white rounded-lg p-8 shadow-lg sm:max-w-sm sm:w-full l:max-w-full text-center l:w-[30rem] max-h-[90vh] scrollbar-hide overflow-y-auto"
            >
              <div className="text-2xl font-bold mb-4">
                Edit Headphones Deal!!
              </div>
              <div className="mb-4">Update the deal details and image.</div>
              <div className="flex flex-col items-center">
                <label htmlFor="headphone-line1">First Line:</label>
                <input
                  type="text"
                  id="headphone-line1"
                  className="outline focus:outline-black m-2"
                  value={headphoneDeal.line1}
                  onChange={(e) =>
                    setHeadphoneDeal({
                      ...headphoneDeal,
                      line1: e.target.value,
                    })
                  }
                />
                <label htmlFor="headphone-line2">Second Line:</label>
                <input
                  type="text"
                  id="headphone-line2"
                  className="outline focus:outline-black m-2"
                  value={headphoneDeal.line2}
                  onChange={(e) =>
                    setHeadphoneDeal({
                      ...headphoneDeal,
                      line2: e.target.value,
                    })
                  }
                />
                <label htmlFor="headphone-line3">Third Line:</label>
                <input
                  type="text"
                  id="headphone-line3"
                  className="outline focus:outline-black m-2"
                  value={headphoneDeal.line3}
                  onChange={(e) =>
                    setHeadphoneDeal({
                      ...headphoneDeal,
                      line3: e.target.value,
                    })
                  }
                />
                <label
                  htmlFor="headphone-upload"
                  className="mt-[1rem] flex bg-[var(---btncolor)] hover:bg-transparent text-[var(---whitetext)] hover:text-[var(---btncolor)] hover:border-[1px] hover:border-[var(---btncolor)] text-base font-medium px-4 py-2.5 outline-none hover:*:fill-[var(---btncolor)] rounded w-max cursor-pointer mx-auto *:duration-[1s] duration-[1s]"
                >
                  Upload
                  <input
                    type="file"
                    id="headphone-upload"
                    className="hidden"
                    multiple={false}
                    onChange={handleHeadphoneImage}
                  />
                </label>
                {(headphoneImages.length > 0 || headphoneDeal.image) && (
                  <div className="flex justify-center mt-4">
                    <Image
                      src={
                        headphoneImages.length > 0
                          ? URL.createObjectURL(headphoneImages[0])
                          : headphoneDeal.image
                      }
                      alt="Preview"
                      width={200}
                      height={200}
                      className="rounded shadow object-cover max-h-40"
                    />
                  </div>
                )}
              </div>
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
      </AnimatePresence>
    </>
  );
};

export default Deal;
