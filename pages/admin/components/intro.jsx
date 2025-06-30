import Image from "next/image";
import React, { useEffect, useState } from "react";
import img1 from "./assets/img1.jpg";
import img2 from "./assets/img2.jpg";
import img3 from "./assets/img3.jpg";
import Link from "next/link";
import { FaEdit } from "react-icons/fa";
const imagefordisplay = [img1, img2, img3];

const Intro = () => {
  const [index, setIndex] = useState(0);
  const [edit, setedit] = useState(false);
  const [images, setImages] = useState([]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleEdit = () => {
    setedit(!edit);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % imagefordisplay.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
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
            bg-[var(---btncolor)] cursor-pointer l:text-[16px] l:py-[1.2rem] l:px-[4rem] text-[var(---whitetext)] rounded-[1.5rem]"
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
               ))}
        </div>
      </div>
      {edit ? (
        <>
          <div className="">
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-200">
              <div className="bg-white rounded-lg p-8 shadow-lg sm:max-w-sm sm:w-full l:max-w-full text-center l:w-[30rem]">
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
                {images.map((file, index) => (
                  <div key={index} className="mt-2 text-sm text-gray-700">
                    📎 {file.name}
                  </div>
                ))}

                <div className="flex l:flex-row sm:flex-col l:space-x-[1rem] items-center justify-center l:w-[100%] l:mt-[2rem]">
                  <button
                    className="mt-4 px-6 py-2 bg-[var(---btncolor)] text-[var(---whitetext)] rounded-full hover:bg-[var(---hoverbtncolor)] l:p-[0.8rem]  l:w-[5rem]"
                    onClick={() => setedit(false)}
                  >
                    Close
                  </button>
                  <button
                    className="mt-4 px-6 py-2 bg-[var(---btncolor)] text-[var(---whitetext)] rounded-full hover:bg-[var(---hoverbtncolor)] l:p-[1rem] cursor-pointer  l:w-[8rem]"
                    onClick={() => setedit(false)}
                  >
                    Add Them
                  </button>
                  <button
                    className="mt-4 px-6 py-2 bg-[var(---btncolor)] text-[var(---whitetext)] rounded-full hover:bg-[var(---hoverbtncolor)] l:p-[1rem] cursor-pointer  l:w-[12rem]"
                    onClick={() => setedit(false)}
                  >
                    Only Display Them
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default Intro;
