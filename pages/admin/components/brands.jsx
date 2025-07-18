import React, { useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import { motion } from "framer-motion";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ image: null, file: null, id: null });

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

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  const [errors, setErrors] = useState({});

  const validateBrand = () => {
    const newErrors = {};
    if (!form.img) newErrors.img = "Image is required";
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
  const handleSave = async () => {
    if (!validateBrand()) return;
    let image = form.image;
    if (form.file) {
      image = await fileToBase64(form.file);
    }
    const payload = {
      image,
      id: form.id,
    };
    if (editIndex !== null) {
      await fetch("/api/brands", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
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
            <motion.div
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center"
            >
              {[].map((field, i) => (
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
                  onChange={handleFormChange}
                />
              </motion.label>
              {errors.img && (
                <div className="text-red-500 text-xs mb-1">{errors.img}</div>
              )}
              {form.img && (
                <motion.div
                  custom={16}
                  variants={inputVariants}
                  initial="hidden"
                  animate="visible"
                  className="w-full flex justify-center"
                >
                  <Image
                    src={form.img}
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
    </>
  );
};

export default Brands;
