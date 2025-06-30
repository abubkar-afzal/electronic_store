import Image from "next/image";
import React, { useState } from "react";
import img1 from "./assets/img8.jpg"
import img2 from "./assets/img9.jpg"
import Link from "next/link";
import { FaEdit } from "react-icons/fa";

const Deal =()=>{
    const [headphoneEdit, setheadphoneEdit] = useState(false);
    const [headphoneimages, setheadphoneimages] = useState([]);
      
     const handleheadphoneEdit = () => {
    setheadphoneEdit(!headphoneEdit);
  };
 const handleheadphoneimage = (e) => {
    const files = Array.from(e.target.files);
    setheadphoneimages(files);
  };
   const [mobileEdit, setmobileEdit] = useState(false);
    const [mobileimages, setmobileimages] = useState([]);
      
     const handlemobileEdit = () => {
    setmobileEdit(!mobileEdit);
  };
 const handlemobileimage = (e) => {
    const files = Array.from(e.target.files);
    setmobileimages(files);
  };

    return(
        <>
        <div className="l:grid l:grid-cols-2 l:gap-[1rem] l:h-[40rem] l:overflow-hidden l:justify-between l:w-full l:px-[1rem]">
            <div className="my-4 w-full h-[50%] l:h-full relative ">
              <FaEdit
                            className="absolute top-[5%] right-[5%] text-[40px] z-50 text-[var(---edit)] cursor-pointer"
                            onClick={handlemobileEdit}
                          />
                <Image src={img1} alt="image1" width={1020} height={1020} className="w-full h-[50%] l:h-full "/>
                <div className="absolute top-6 left-6 l:top-[15vh] l:left-[5vw] text-[var(---whitetext)] w-[50%] l:w-[40%]">
                    <div className="text-[12px] l:text-[1.5rem] font-thin">Holiday Deals</div>
                    <div className="text-[35px] l:text-[4rem] font-semibold">Up to 30% off</div>
                    <div className="text-[13px] l:text-[1.4rem] font-thin">Selected Smartphone Brands</div>
                    <div>
                        <Link href={`/components/category/mobiles`}><button className="my-4 p-2 px-8 bg-[var(---whitetext)] text-[var(---blacktext)] rounded-[1.5rem] text-[14px] l:text-[18px] l:px-[3rem] cursor-pointer hover:bg-transparent hover:text-[var(---whitetext)] hover:border-[var(---whitetext)] hover:border-[1px] duration-[1s] ">Shope</button></Link></div>
                </div>
            </div>
            <div className="my-4 w-full h-[50%] l:h-full relative">
                <FaEdit
                            className="absolute top-[5%] right-[5%] text-[40px] z-50 text-[var(---edit)] cursor-pointer"
                            onClick={handleheadphoneEdit}
                          />
                <Image src={img2} alt="image1" width={1020} height={1020} className="w-full h-[50%] l:h-full"/>
                <div className="absolute top-6 left-6 l:top-[10vh] l:left-[5vw] text-[var(---whitetext)] w-[50%] l:w-[40%]">
                    <div className="text-[12px] l:text-[1.5rem] font-thin">Just In</div>
                    <div className="text-[35px] l:text-[4rem] font-semibold">Take Your Sound Anywhere</div>
                    <div className="text-[13px] l:text-[1.4rem] font-thin">Top Headphone Brands</div>
                    <div>
                        <Link href={`/components/category/headphones&speakers`}><button className="my-4 p-2 px-8 bg-[var(---whitetext)] text-[var(---blacktext)] rounded-[1.5rem] text-[14px] l:text-[18px] l:px-[3rem] cursor-pointer hover:bg-transparent hover:text-[var(---whitetext)] hover:border-[var(---whitetext)] hover:border-[1px] duration-[1s] ">Shope</button></Link></div>
                </div>
            </div>
        </div>
         {headphoneEdit ? (
        <>
          <div className="">
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-200">
              <div className="bg-white rounded-lg p-8 shadow-lg sm:max-w-sm sm:w-full l:max-w-full text-center l:w-[30rem]">
                <div className="text-2xl font-bold mb-4">Edit Headphones Deal!!</div>
                <div className="mb-4">
                  There give the data or change it according to your requirement.
                </div>
                <div className="flex flex-col items-center">
                    <label htmlFor="line1">First Line:</label>
                    <input type="text" id="line1" className="outline focus:outline-black m-2" /><br />
                    <label htmlFor="line2">Second Line:</label>
                    <input type="text" id="line2" className="outline focus:outline-black m-2" /><br />
                    <label htmlFor="line3">Third Line:</label>
                    <input type="text" id="line3" className="outline focus:outline-black m-2" />
                  <label
                    htmlFor="uploadFile1"
                    className="mt-[1rem] flex bg-[var(---btncolor)] hover:bg-transparent text-[var(---whitetext)] hover:text-[var(---btncolor)] hover:border-[1px] hover:border-[var(---btncolor)] text-base font-medium px-4 py-2.5 outline-none hover:*:fill-[var(---btncolor)] rounded w-max cursor-pointer mx-auto *:duration-[1s] duration-[1s]"
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
                      onChange={handleheadphoneimage}
                    />
                  </label>
                   {headphoneimages.map((file, index) => (
                  <div key={index} className="mt-2 text-sm text-gray-700">
                    📎 {file.name}
                  </div>
                ))}
                </div>
              

                <div className="flex l:flex-row sm:flex-col l:space-x-[1rem] items-center justify-center l:w-[100%] l:mt-[2rem]">
                  <button
                    className="mt-4 px-6 py-2 bg-[var(---btncolor)] text-[var(---whitetext)] rounded-full hover:bg-[var(---hoverbtncolor)] l:p-[1rem] cursor-pointer  l:w-[8rem]"
                    onClick={() => setheadphoneEdit(false)}
                  >
                    Close
                  </button>
                  <button
                    className="mt-4 px-6 py-2 bg-[var(---btncolor)] text-[var(---whitetext)] rounded-full hover:bg-[var(---hoverbtncolor)] l:p-[1rem] cursor-pointer  l:w-[8rem]"
                    onClick={() => setheadphoneEdit(false)}
                  >
                    Update
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
       {mobileEdit ? (
        <>
          <div className="">
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-200">
              <div className="bg-white rounded-lg p-8 shadow-lg sm:max-w-sm sm:w-full l:max-w-full text-center l:w-[30rem]">
                <div className="text-2xl font-bold mb-4">Edit Mobile Deal!!</div>
                <div className="mb-4">
                  There give the data or change it according to your requirement.
                </div>
                <div className="flex flex-col items-center">
                    <label htmlFor="line1">First Line:</label>
                    <input type="text" id="line1" className="outline focus:outline-black m-2" /><br />
                    <label htmlFor="line2">Second Line:</label>
                    <input type="text" id="line2" className="outline focus:outline-black m-2" /><br />
                    <label htmlFor="line3">Third Line:</label>
                    <input type="text" id="line3" className="outline focus:outline-black m-2" />
                  <label
                    htmlFor="uploadFile1"
                    className="mt-[1rem] flex bg-[var(---btncolor)] hover:bg-transparent text-[var(---whitetext)] hover:text-[var(---btncolor)] hover:border-[1px] hover:border-[var(---btncolor)] text-base font-medium px-4 py-2.5 outline-none hover:*:fill-[var(---btncolor)] rounded w-max cursor-pointer mx-auto *:duration-[1s] duration-[1s]"
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
                      onChange={handlemobileimage}
                    />
                  </label>
                   {mobileimages.map((file, index) => (
                  <div key={index} className="mt-2 text-sm text-gray-700">
                    📎 {file.name}
                  </div>
                ))}
                </div>
              

                <div className="flex l:flex-row sm:flex-col l:space-x-[1rem] items-center justify-center l:w-[100%] l:mt-[2rem]">
                  <button
                    className="mt-4 px-6 py-2 bg-[var(---btncolor)] text-[var(---whitetext)] rounded-full hover:bg-[var(---hoverbtncolor)] l:p-[1rem] cursor-pointer  l:w-[8rem]"
                    onClick={() => setmobileEdit(false)}
                  >
                    Close
                  </button>
                  <button
                    className="mt-4 px-6 py-2 bg-[var(---btncolor)] text-[var(---whitetext)] rounded-full hover:bg-[var(---hoverbtncolor)] l:p-[1rem] cursor-pointer  l:w-[8rem]"
                    onClick={() => setmobileEdit(false)}
                  >
                    Update
                  </button>
                  
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
        </>
    )
}
export default Deal;