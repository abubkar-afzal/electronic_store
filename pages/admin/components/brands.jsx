import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

const initialBrands = [
  { name: "ZODIAC" },
  { name: "Zoro" },
  { name: "PIK" },
  { name: "GXL" },
  { name: "HORIZON" },
];

const Brands = () => {
  const [brands, setBrands] = useState(initialBrands);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({ name: "" });

  const openEditModal = (index = null) => {
    if (index !== null) {
      setForm({ name: brands[index].name });
      setEditIndex(index);
    } else {
      setForm({ name: "" });
      setEditIndex(null);
    }
    setEditModalOpen(true);
  };

  const handleFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (!form.name) return;
    const newBrand = { name: form.name };
    if (editIndex !== null) {
      setBrands((prev) =>
        prev.map((item, idx) => (idx === editIndex ? newBrand : item))
      );
    } else {
      setBrands((prev) => [...prev, newBrand]);
    }
    setEditModalOpen(false);
    setForm({ name: "" });
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    setBrands((prev) => prev.filter((_, idx) => idx !== index));
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
              key={index}
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
              {brand.name}
            </div>
          ))}
        </div>
      </div>
      {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-200">
          <div className="bg-white rounded-lg p-8 shadow-lg w-[350px]">
            <div className="text-2xl font-bold mb-4">
              {editIndex !== null ? "Edit Brand" : "Add New Brand"}
            </div>
            <div className="flex flex-col items-center">
              <label htmlFor="name">Brand Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleFormChange}
                className="outline focus:outline-black m-2"
              />
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
          </div>
        </div>
      )}
    </>
  );
};

export default Brands;