import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ image: null, file: null, id: null });

  // Fetch brands from API on mount
  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    const res = await fetch("/api/brands");
    if (res.ok) {
      const data = await res.json();
      setBrands(data.brands || []);
    }
  };

  return (
    <>
      <div className="bg-[var(---whitetext)] relative">
       
        <div className="text-[25px] l:text-[35px] font-semibold text-center py-[2rem]">
          Brands
        </div>
        <div className="flex flex-col l:flex-row l:flex-wrap l:justify-center items-center py-[2rem]">
          {brands.map((brand, index) => (
            <div
              key={brand.id || index}
              className="relative shadow w-[15rem] h-[7rem] text-center content-center text-[30px] font-black text-[var(---brandscolor)] flex items-center justify-center m-2"
            >
             
             
              {brand.image && (
                <Image
                  src={brand.image}
                  alt="Brand"
                  width={120}
                  height={60}
                  className="object-contain mx-auto"
                />
              )}
            </div>
          ))}
        </div>
      </div>
      
    </>
  );
};

export default Brands;