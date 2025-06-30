import React, { useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi2";
import img1 from "./assets/img7.jpg";
import img2 from "./assets/img5.jpg";
import img3 from "./assets/img6.jpg";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoPricetagOutline } from "react-icons/io5";
import { LuStickyNote } from "react-icons/lu";
import { FaLock } from "react-icons/fa";
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

const ViewCart = () => {
  let count = 1;
  const [showloder, setshowloder] = useState(false);
  const [showresult, setshowresult] = useState(false);
  const [quantities, setQuantities] = useState(
    () => images.map(() => 1) // default starting count is 1 for each
  );
    const handleShowLoader = () => {
    setshowloder(!showloder);
    setTimeout(() => {
      setshowloder(false);
      setshowresult(true);
    }, 2000); 
}
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

  return (
    <>
      <div className="flex flex-col items-center justify-center p-4">
        <div className="text-[2rem] font-sans font-bold">View Cart</div>
        <div className="my-[2rem] border-y-[1px] py-[1rem]">
          <div className="text-center my-[1rem] mt-[2rem] text-[20px] font-bold">
            Your Shopping Cart
          </div>
          <div className="text-center mb-[2rem]">
            Review the items in your cart before proceeding to checkout.
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 ">
          {images.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-3 w-full flex-shrink-0 cursor-pointer border-b-[1px]"
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
                  <RiDeleteBin6Line className="text-[20px] h-[2rem]" />
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
        <div className="text-[14px] items-start w-full py-[1rem] space-y-2 border-b-[1px]">
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
        <div className="text-[16px] items-start w-full py-[1rem] space-y-2 border-b-[1px]">
          <div className="flex items-center justify-between ">
            <div className="">Subtotal</div>
            <div>$ {grandTotal.toFixed(2)}</div>
          </div>
          <div className="flex items-center justify-between font-thin">
            <div className="">Delivery</div>
            <div>FREE</div>
          </div>
          <div className="underline text-[14px]">Lahore, Punjab, Pakistan</div>
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
            className="w-full  py-2.5 px-5 me-2 text-sm font-medium text-[var(---whitetext)] bg-[var(---hoverbtncolor)] rounded-[2rem] border border-gray-200 items-center"
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
      ) : 
          <button onClick={handleShowLoader} className="w-full bg-[var(---btncolor)] text-[var(---whitetext)] p-2 my-[1rem] hover:bg-[var(---hoverbtncolor)] rounded-[2rem]">
            Checkout
          </button>}
          <div className="flex items-center justify-center font-bold my-[1rem] text-[14px] space-x-2">
            <div>
              <FaLock />
            </div>
            <div>Secure Checkout</div>
          </div>
        </div>
      </div>
      {
        showresult ? <>
        <div>
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                <div className="bg-white rounded-lg p-8 shadow-lg max-w-sm w-full text-center">
                    <div className="text-2xl font-bold mb-4">Order Placed!</div>
                    <div className="mb-4">Thank you for your purchase. Your order has been successfully placed.</div>
                    <button
                        className="mt-4 px-6 py-2 bg-[var(---btncolor)] text-[var(---whitetext)] rounded-full hover:bg-[var(---hoverbtncolor)]"
                        onClick={() => setshowresult(false)}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
        </>:null
      }
    </>
  );
};
export default ViewCart;
