import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { Fade } from "react-awesome-reveal";
import { MoonLoader } from "react-spinners";

// Remove this line, we'll use state instead
// const imagefordisplay = [img1, img2, img3];

const Intro = () => {
  const [index, setIndex] = useState(0);
  const [edit, setedit] = useState(false);
  const [images, setImages] = useState([]);
  const [imagefordisplay, setImagefordisplay] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleEdit = () => {
    setedit(!edit);
  };

  // Helper: Convert File objects to base64
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

  // Add Images API call
  const handleAddImages = async () => {
    if (images.length === 0) return;
    const base64Images = await filesToBase64(images);
    // Call API to add images (append)
    await fetch("/api/addorupdateintro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "add", images: base64Images }),
    });
    // Update UI: fetch new images
    fetchImages();
    setImages([]);
    setedit(false);
  };

  // Only Display Them API call
  const handleOnlyDisplay = async () => {
    if (images.length === 0) return;
    const base64Images = await filesToBase64(images);
    // Call API to replace images
    await fetch("/api/addorupdateintro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "replace", images: base64Images }),
    });
    // Update UI: fetch new images
    fetchImages();
    setImages([]);
    setedit(false);
  };

  // Fetch images from API
  const fetchImages = async () => {
    setLoading(true);
    const res = await fetch("/api/addorupdateintro");
    if (res.ok) {
      const data = await res.json();
      setImagefordisplay(
        data.images && data.images.length > 0 ? data.images : []
      );
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (imagefordisplay.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % imagefordisplay.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [imagefordisplay, loading]);
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);
  return (
    <>
      {loading ? (
        <div className="fixed inset-0 flex flex-col items-center justify-center col-span-5 bg-[var(---loader)] w-[100vw] h-[100vh] z-999">
          <div className="p-6 rounded text-xl font-bold flex items-center text-[var(---whitetext)] gap-2">
            <MoonLoader size={30} color="#ffff" />
            Loading...
          </div>
          <div className="p-6 rounded text-xl font-bold flex items-center text-[var(---whitetext)] gap-2">
            Sorry for wait..!!
          </div>
        </div>
      ) : null}
      <Fade duration={1000} triggerOnce cascade>
        <div className="l:relative">
          <div className="sm:flex sm:flex-col l:absolute l:z-20 sm:items-center l:items-start l:left-40 l:top-[15vh] my-4">
            <div className="bg-[var(---bestpricelabel)] inline text-[var(---whitetext)] px-2 my-2 l:text-[22px]">
              Best Prices
            </div>
            <div className="sm:text-[35px] l:text-[50px] l:w-[30vw] l:text-left text-center font-black">
              Incredible Prices on All Your Favorite Items
            </div>
            <div className="sm:text-[16px] l:text-[20px] sm:font-thin my-2">
              Get more for less on selected brands
            </div>
            <div className="">
              <Link href={`/admin/components/category/allproducts`}>
                <button
                  className="p-3 px-6 my-4
            bg-[var(---btncolor)] hover:text-[var(---btncolor)] hover:bg-[var(---whitetext)] hover:border-[1px] hover:border-[var(---btncolor)] cursor-pointer duration-[1s] l:text-[16px] l:py-[1.2rem] l:px-[4rem] text-[var(---whitetext)] rounded-[1.5rem]"
                >
                  Shope Now
                </button>
              </Link>
            </div>
          </div>
          <div className="relative w-full max-w-lg l:max-w-full h-64 l:h-[100vh]  overflow-hidden">
            <FaEdit
              className="absolute top-[5%] right-[5%] text-[40px] z-50 text-[var(---edit)] cursor-pointer"
              onClick={handleEdit}
            />
            {imagefordisplay.map((img, i) => (
              <Fade duration={1000} triggerOnce>
                <Image
                  key={i}
                  src={img}
                  alt={`Slide ${i}`}
                  width={1200}
                  height={1200}
                  className={`absolute l:block w-full h-full object-cover l:object-fill transition-opacity duration-1000 ${
                    i === index ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Fade>
            ))}
          </div>
        </div>
      </Fade>
      <AnimatePresence>
        {edit && (
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
              <div className="text-2xl font-bold mb-4">Edit Intro Page!!</div>
              <div className="mb-4">
                There you can only pass images those you need to display.
              </div>
              <div>
                <label
                  htmlFor="uploadFile1"
                  className="flex bg-[var(---btncolor)] hover:bg-transparent text-[var(---whitetext)] hover:text-[var(---btncolor)] hover:border-[1px] hover:border-[var(---btncolor)] text-base font-medium px-4 py-2.5 outline-none hover:*:fill-[var(---btncolor)] rounded w-max cursor-pointer mx-auto *:duration-[1s] duration-[1s]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 mr-2 fill-[var(---whitetext)]  inline"
                    viewBox="0 0 32 32"
                  >
                    <path
                      d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
                      data-original="#000000"
                    />
                    <path
                      d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
                      data-original="#000000"
                    />
                  </svg>
                  Upload
                  <input
                    type="file"
                    id="uploadFile1"
                    className="hidden"
                    multiple
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              {/* Preview of new images (selected for upload) */}
              {images.length > 0 && (
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {images.map((file, idx) => (
                    <Image
                      key={idx}
                      src={URL.createObjectURL(file)}
                      alt={`New Preview ${idx}`}
                      width={120}
                      height={120}
                      className="rounded shadow object-cover max-h-32"
                    />
                  ))}
                </div>
              )}

              {/* Preview of currently displayed images (from backend) */}
              {images.length === 0 && imagefordisplay.length > 0 && (
                <div className="flex flex-wrap justify-center gap-4 mt-4">
                  {imagefordisplay.map((img, idx) => (
                    <Image
                      key={idx}
                      src={img}
                      alt={`Current Preview ${idx}`}
                      width={120}
                      height={120}
                      className="rounded shadow object-cover max-h-32"
                    />
                  ))}
                </div>
              )}

              <div className="flex l:flex-row sm:flex-col l:space-x-[1rem] items-center justify-center l:w-[100%] l:mt-[2rem]">
                <button
                  className="px-6 py-2 bg-[var(---btncolor)] cursor-pointer text-white hover:bg-transparent hover:border hover:border-[var(---btncolor)] hover:text-[var(---btncolor)] duration-[1s] rounded-[6px]"
                  onClick={() => setedit(false)}
                >
                  Close
                </button>
                <button
                  className="px-6 py-2 bg-[var(---btncolor)] cursor-pointer text-white hover:bg-transparent hover:border hover:border-[var(---btncolor)] hover:text-[var(---btncolor)] duration-[1s] rounded-[6px]"
                  onClick={() => {
                    setedit(false), handleAddImages();
                  }}
                  disabled={images.length === 0}
                >
                  Add Them
                </button>
                <button
                  className="px-4 py-2 bg-[var(---btncolor)] cursor-pointer text-white hover:bg-transparent hover:border hover:border-[var(---btncolor)] hover:text-[var(---btncolor)] duration-[1s] rounded-[6px]"
                  onClick={() => {
                    setedit(false), handleOnlyDisplay();
                  }}
                  disabled={images.length === 0}
                >
                  Only Display Them
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Intro;
