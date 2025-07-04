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

  const openEditModal = (index = null) => {
    if (index !== null) {
      const item = brands[index];
      setForm({
        image: item.image,
        file: null,
        id: item.id,
      });
      setEditIndex(index);
    } else {
      setForm({ image: null, file: null, id: null });
      setEditIndex(null);
    }
    setEditModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { type, files } = e.target;
    if (type === "file" && files && files[0]) {
      setForm((f) => ({
        ...f,
        file: files[0],
        image: URL.createObjectURL(files[0]),
      }));
    }
  };

  // Convert file to base64
  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  // Save (add or update) brand via API
  const handleSave = async () => {
    let image = form.image;
    if (form.file) {
      image = await fileToBase64(form.file);
    }
    const payload = {
      image,
      id: form.id,
    };
    if (editIndex !== null) {
      // Update
      await fetch("/api/brands", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      // Add
      await fetch("/api/brands", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    setEditModalOpen(false);
    setForm({ image: null, file: null, id: null });
    setEditIndex(null);
    fetchBrands();
  };

  // Delete brand via API
  const handleDelete = async (index) => {
    const item = brands[index];
    await fetch("/api/brands", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id }),
    });
    fetchBrands();
  };

  return (
    <>
      <div className="bg-[var(---whitetext)] relative">
        <FaEdit
          className="absolute top-4 right-4 z-50 text-[40px] cursor-pointer text-[var(---edit)]"
          onClick={() => openEditModal()}
          title="Add New Brand"
        />
        <div className="text-[25px] l:text-[35px] font-semibold text-center py-[2rem]">
          Brands
        </div>
        <div className="flex flex-col l:flex-row l:flex-wrap l:justify-center items-center py-[2rem]">
          {brands.map((brand, index) => (
            <div
              key={brand.id || index}
              className="relative shadow w-[15rem] h-[7rem] text-center content-center text-[30px] font-black text-[var(---brandscolor)] flex items-center justify-center m-2"
            >
              <FaEdit
                className="absolute top-2 right-2 z-10 text-lg cursor-pointer text-[var(---edit)]"
                onClick={() => openEditModal(index)}
                title="Edit"
              />
              <button
                className="absolute top-2 left-2 z-10 bg-red-500 text-white px-2 py-1 cursor-pointer rounded text-xs"
                onClick={() => handleDelete(index)}
                title="Delete"
              >
                Delete
              </button>
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
      <AnimatePresence>
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
              className="bg-white rounded-lg p-8 shadow-lg w-[350px]"
            >
              <div className="text-2xl font-bold mb-4">
                {editIndex !== null ? "Edit Brand" : "Add New Brand"}
              </div>
              <div className="flex flex-col items-center">
                <label
                  htmlFor="file"
                  className="mt-4 flex bg-[var(---btncolor)] text-[var(---whitetext)] px-4 py-2 rounded cursor-pointer"
                >
                  Upload Image
                  <input
                    type="file"
                    id="file"
                    name="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFormChange}
                  />
                </label>
                {form.image && (
                  <Image
                    src={form.image}
                    alt="Preview"
                    className="mt-2 w-24 h-12 object-contain rounded"
                    width={120}
                    height={60}
                  />
                )}
              </div>
              <div className="flex justify-between mt-6">
                <button
                  className="px-6 py-2 bg-[var(---btncolor)] cursor-pointer text-white rounded"
                  onClick={() => setEditModalOpen(false)}
                >
                  Close
                </button>
                <button
                  className="px-6 py-2 bg-[var(---btncolor)] cursor-pointer text-white rounded"
                  onClick={handleSave}
                >
                  {editIndex !== null ? "Update" : "Add"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Brands;