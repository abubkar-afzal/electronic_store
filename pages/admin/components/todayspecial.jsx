import React, { useState } from "react";
import img1 from "./assets/img6.jpg";
import Image from "next/image";
import { FaEdit } from "react-icons/fa";

const initialData = {
  img: img1,
  label: "Today's Special",
  title: "Best Arial View in Town",
  percent: "30%",
  percentLabel: "OFF",
  description: "on professional camera drones",
  note1: "Limited quantites.",
  note2: "See product detail pages for availability",
  button: "Shope",
};

const TodaySpecial = () => {
  const [data, setData] = useState(initialData);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [form, setForm] = useState({
    img: data.img,
    label: data.label,
    title: data.title,
    percent: data.percent,
    percentLabel: data.percentLabel,
    description: data.description,
    note1: data.note1,
    note2: data.note2,
    button: data.button,
    file: null,
  });

  const openEditModal = () => {
    setForm({
      img: data.img,
      label: data.label,
      title: data.title,
      percent: data.percent,
      percentLabel: data.percentLabel,
      description: data.description,
      note1: data.note1,
      note2: data.note2,
      button: data.button,
      file: null,
    });
    setEditModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file" && files && files[0]) {
      setForm((f) => ({
        ...f,
        file: files[0],
        img: URL.createObjectURL(files[0]),
      }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSave = () => {
    setData({
      img: form.img,
      label: form.label,
      title: form.title,
      percent: form.percent,
      percentLabel: form.percentLabel,
      description: form.description,
      note1: form.note1,
      note2: form.note2,
      button: form.button,
    });
    setEditModalOpen(false);
  };

  return (
    <>
      <div className="relative">
        <FaEdit
          className="absolute top-4 right-4 z-50 text-[40px] cursor-pointer text-[var(---edit)]"
          onClick={openEditModal}
          title="Edit Section"
        />
        <div className="bg-[var(---whitetext)] l:grid l:h-[90vh] l:grid-cols-2 l:gap-[1rem] l:overflow-hidden mb-[1rem]">
          <div className="relative l:col-start-2 l:row-start-1 l:w-[130%] l:ml-[-11rem]">
            <Image
              src={data.img}
              width={1020}
              height={100}
              alt="img1"
              className="w-full h-[30%] l:h-[90vh] rounded-bl-[10rem]"
            />
          </div>
          <div className="ml-5 mt-4 l:flex l:flex-col l:justify-center l:items-start l:content-center l:w-[80%] l:ml-[15%]">
            <div className="text-[20px] l:text-[22px] font-thin bg-[var(---salelabel)] inline text-[var(---whitetext)] px-2 mt-2">
              {data.label}
            </div>
            <div className="text-[20px] l:text-[30px] font-semibold my-2 w-[80%]">
              {data.title}
            </div>
            <div className="text-[55px] font-bold flex l:text-[6rem]">
              <div className="text-[var(---btncolor)] mr-2">{data.percent}</div>
              {data.percentLabel}
            </div>
            <div className="text-[20px] l:text-[30px] font-semibold w-[80%]">
              {data.description}
            </div>
            <div className="font-thin l:text-[20px] my-2 w-[80%]">{data.note1}</div>
            <div className="font-thin l:text-[20px] my-2 w-[80%]">{data.note2}</div>
            <div>
              <button className="p-2 px-[2rem] bg-[var(---btncolor)] text-[var(---whitetext)] rounded-[1.5rem] l:text-[22px] l:px-[3rem] mb-[2rem] mt-[1rem] cursor-pointer hover:bg-transparent hover:text-[var(---btncolor)] hover:border-[var(---btncolor)] hover:border-[1px] duration-[1s]">
                {data.button}
              </button>
            </div>
          </div>
        </div>
      </div>
      {editModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-200">
          <div className="bg-white rounded-lg p-8 shadow-lg w-[350px]">
            <div className="text-2xl font-bold mb-4">Edit Today's Special</div>
            <div className="flex flex-col items-center">
              <label htmlFor="label">Label:</label>
              <input
                type="text"
                id="label"
                name="label"
                value={form.label}
                onChange={handleFormChange}
                className="outline focus:outline-black m-2"
              />
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={form.title}
                onChange={handleFormChange}
                className="outline focus:outline-black m-2"
              />
              <label htmlFor="percent">Percent:</label>
              <input
                type="text"
                id="percent"
                name="percent"
                value={form.percent}
                onChange={handleFormChange}
                className="outline focus:outline-black m-2"
              />
              <label htmlFor="percentLabel">Percent Label:</label>
              <input
                type="text"
                id="percentLabel"
                name="percentLabel"
                value={form.percentLabel}
                onChange={handleFormChange}
                className="outline focus:outline-black m-2"
              />
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                value={form.description}
                onChange={handleFormChange}
                className="outline focus:outline-black m-2"
              />
              <label htmlFor="note1">Note 1:</label>
              <input
                type="text"
                id="note1"
                name="note1"
                value={form.note1}
                onChange={handleFormChange}
                className="outline focus:outline-black m-2"
              />
              <label htmlFor="note2">Note 2:</label>
              <input
                type="text"
                id="note2"
                name="note2"
                value={form.note2}
                onChange={handleFormChange}
                className="outline focus:outline-black m-2"
              />
              <label htmlFor="button">Button Text:</label>
              <input
                type="text"
                id="button"
                name="button"
                value={form.button}
                onChange={handleFormChange}
                className="outline focus:outline-black m-2"
              />
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
              {form.img && (
                <Image
                  src={form.img}
                  alt="Preview"
                  className="mt-2 w-24 h-24 object-cover rounded"
                  width={96}
                  height={96}
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
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TodaySpecial;