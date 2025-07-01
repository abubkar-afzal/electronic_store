import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RxCross2, RxMinus, RxPlus } from "react-icons/rx";
import { FaEdit } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import { MoonLoader } from "react-spinners";
import { motion } from "framer-motion";
import { Fade } from "react-awesome-reveal";

const AllProducts = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({
    id: "",
    name: "",
    specification: "",
    description: "",
    price: "",
    sale_price: "",
    onsale: 0,
    avaliable_quantity: "",
    use_cause: "",
    return_policy: "",
    shipping: "",
    image: null,
    display_place: "",
    category: "",
    file: null,
  });
  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/viewall");
        const data = await res.json();
        setItems(data);
      } catch (error) {}
      setLoading(false);
    };
    fetchProducts();
  }, []);
  const openEditModal = (index = null) => {
    if (index !== null) {
      const item = items[index];
      setForm({
        id: item.id,
        name: item.name,
        specification: item.specification,
        description: item.description,
        price: item.price,
        sale_price: item.sale_price,
        onsale: item.onsale,
        avaliable_quantity: item.avaliable_quantity,
        use_cause: item.use_cause,
        return_policy: item.return_policy,
        shipping: item.shipping,
        image: item.image,
        display_place: item.display_place,
        category: item.category,
        file: null,
      });
      setEditIndex(index);
    } else {
      setForm({
        id: "",
        name: "",
        specification: "",
        description: "",
        price: "",
        sale_price: "",
        onsale: 0,
        avaliable_quantity: "",
        use_cause: "",
        return_policy: "",
        shipping: "",
        image: null,
        display_place: "",
        category: "",
        file: null,
      });
      setEditIndex(null);
    }
    setEditModalOpen(true);
  };

  const handleFormChange = async (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setForm((f) => ({ ...f, [name]: checked ? 1 : 0 }));
    } else if (type === "file" && files && files[0]) {
      const file = files[0];
      const toBase64 = (file) =>
        new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      const base64 = await toBase64(file);
      setForm((f) => ({
        ...f,
        file: file,
        image: base64,
      }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSave = async () => {
    if (!form.name || !form.price) return;
    setLoading(true);
    const productData = {
      id: form.id,
      name: form.name,
      specification: form.specification,
      description: form.description || "",
      price: form.price,
      sale_price: form.sale_price || "",
      onsale: form.onsale,
      avaliable_quantity: form.avaliable_quantity || "",
      use_cause: form.use_cause || "",
      return_policy: form.return_policy || "",
      shipping: form.shipping || "",
      image: form.image || "",
      display_place: form.display_place || "",
      category: form.category || "",
    };
    console.log(editIndex);
    try {
      if (editIndex !== null) {
        setEditModalOpen(false);
        await fetch("/api/updateproduct", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });
      } else {
        setEditModalOpen(false);
        await fetch("/api/addproduct", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(productData),
        });
      }
      const res = await fetch("/api/viewall");

      const data = await res.json();
      setItems(data);
    } catch (error) {}

    setLoading(false);
    setForm({
      id: "",
      name: "",
      specification: "",
      description: "",
      price: "",
      sale_price: "",
      onsale: 0,
      avaliable_quantity: "",
      use_cause: "",
      return_policy: "",
      shipping: "",
      image: null,
      display_place: "",
      category: "",
      file: null,
    });
    setEditIndex(null);
  };

  const handleDelete = async (index) => {
    const product = items[index];
    if (!product?.id) return;
    setLoading(true);

    try {
      await fetch("/api/deleteproduct", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: product.id }),
      });
      const res = await fetch("/api/viewall");
      const data = await res.json();
      setItems(data);
    } catch (error) {}
    setLoading(false);
  };

  const [filter, setfilter] = useState(false);
  const [sortbyfilter, setsortbyfilter] = useState(true);
  const [pricefilter, setpricefilter] = useState(false);
  const [minPrice, setMinPrice] = useState(50);
  const [maxPrice, setMaxPrice] = useState(100);

  const [colorfilter, setcolorfilter] = useState(false);
  const router = useRouter();
  let currentpage;
  if (router.route === "/admin/components/category/allproducts") {
    currentpage = "allproducts";
  } else if (router.route === "/admin/components/category/computers") {
    currentpage = "computers";
  } else if (router.route === "/admin/components/category/mobiles") {
    currentpage = "mobiles";
  } else if (router.route === "/admin/components/category/drones&cameras") {
    currentpage = "drones&cameras";
  } else if (router.route === "/admin/components/category/tv&homecinema") {
    currentpage = "tv&homecinema";
  } else if (router.route === "/admin/components/category/tablets") {
    currentpage = "tablets";
  } else if (
    router.route === "/admin/components/category/headphones&speakers"
  ) {
    currentpage = "headphones&speakers";
  } else if (router.route === "/admin/components/category/wearabletech") {
    currentpage = "wearabletech";
  } else if (router.route === "/admin/components/category/sale") {
    currentpage = "sale";
  } else if (router.route === "/admin/components/category/bestseller") {
    currentpage = "bestseller";
  } else {
    currentpage = "no route found";
  }

  const showfilter = () => {
    setfilter(!filter);
  };
  const showsortbyfilter = () => {
    setsortbyfilter(!sortbyfilter);
  };
  const showpricefilter = () => {
    setpricefilter(!pricefilter);
  };
  const showcolorfilter = () => {
    setcolorfilter(!colorfilter);
  };
  let colorofitem = "rgb(810, 58, 4)";

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Recommended");
  const dropdownOptions = [
    "Recommended",
    "Newest",
    "Price (low to high)",
    "Price (high to low)",
    "Name A-Z",
    "Name Z-A",
  ];

  const handleDropdownSelect = (option) => {
    setSelectedOption(option);
    setDropdownOpen(false);
  };

  return (
    <>
      {/* Edit Modal */}
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
            className="bg-white rounded-lg p-8 shadow-lg w-[400px] max-h-[90vh] overflow-y-auto"
          >
            <div className="text-2xl font-bold mb-4">
              {editIndex !== null ? "Edit Product" : "Add New Product"}
            </div>
            <div className="flex flex-col items-center">
              <label htmlFor="id">ID:</label>
              <input
                type="number"
                id="id"
                name="id"
                value={form.id}
                onChange={handleFormChange}
                className="outline focus:outline-black m-2 w-full"
                placeholder="Unique ID"
              />
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleFormChange}
                className="outline focus:outline-black m-2 w-full"
              />
              <label htmlFor="specification">Specification:</label>
              <input
                type="text"
                id="specification"
                name="specification"
                value={form.specification}
                onChange={handleFormChange}
                className="outline focus:outline-black m-2 w-full"
              />
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleFormChange}
                className="outline focus:outline-black m-2 w-full"
              />
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                name="price"
                value={form.price}
                onChange={handleFormChange}
                className="outline focus:outline-black m-2 w-full"
                step="0.01"
              />
              <label htmlFor="sale_price">Sale Price:</label>
              <input
                type="number"
                id="sale_price"
                name="sale_price"
                value={form.sale_price}
                onChange={handleFormChange}
                className="outline focus:outline-black m-2 w-full"
                step="0.01"
              />
              <label className="flex items-center mt-2 w-full justify-center my-[1rem]">
                <input
                  type="checkbox"
                  name="onsale"
                  checked={!!form.onsale}
                  onChange={handleFormChange}
                  className="mr-2 cursor-pointer"
                />
                On Sale
              </label>
              <label htmlFor="avaliable_quantity">Available Quantity:</label>
              <input
                type="number"
                id="avaliable_quantity"
                name="avaliable_quantity"
                value={form.avaliable_quantity}
                onChange={handleFormChange}
                className="outline focus:outline-black m-2 w-full"
              />
              <label htmlFor="use_cause">Use Cause:</label>
              <textarea
                type="text"
                id="use_cause"
                name="use_cause"
                value={form.use_cause}
                onChange={handleFormChange}
                className="outline focus:outline-black m-2 w-full"
              />
              <label htmlFor="return_policy">Return Policy:</label>
              <textarea
                type="text"
                id="return_policy"
                name="return_policy"
                value={form.return_policy}
                onChange={handleFormChange}
                className="outline focus:outline-black m-2 w-full"
              />
              <label htmlFor="shipping">Shipping:</label>
              <textarea
                type="text"
                id="shipping"
                name="shipping"
                value={form.shipping}
                onChange={handleFormChange}
                className="outline focus:outline-black m-2 w-full"
              />

              <label htmlFor="display_place">Display Place:</label>

              <select
                id="display_place"
                name="display_place"
                value={form.display_place}
                onChange={handleFormChange}
                className="outline focus:outline-black m-2 w-full"
              >
                <option value="">Select Display Place</option>
                <option value="product_category">Products Category</option>
                <option value="onsale">On Sale</option>
                <option value="bestseller">Best Seller</option>
              </select>
              <label htmlFor="category">Category:</label>

              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleFormChange}
                className="outline focus:outline-black m-2 w-full"
              >
                <option value="">Select Category</option>
                <option value="allproduct">All Products</option>

                <option value="computers">Computers</option>
                <option value="tablets">Tablets</option>

                <option value="drones&cameras">Drones & Cameras</option>
                <option value="headphones&speakers">
                  Headphones & Speakers
                </option>
                <option value="mobiles">Mobiles</option>
                <option value="tv&homecinema">T.V & Home Cinema</option>
                <option value="wearabletech">Wearable Tech</option>
                <option value="sale">Sale</option>
                <option value="bestseller">Best Seller</option>
              </select>
              <label
                htmlFor="file"
                className="mt-4 flex bg-[var(---btncolor)] text-[var(---whitetext)] px-4 py-2 rounded cursor-pointer w-full justify-center"
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
                {editIndex !== null ? "Update" : "Add"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* mobile  */}
      <Fade duration={2000} cascade>
        <div className="sm:block l:hidden mx-[1rem] min-h-screen">
          <div className="flex space-x-2">
            <Link href={`/admin/components`}>
              <div className="cursor-pointer hover:font-bold font-thin">
                Home
              </div>
            </Link>
            <div className="">&gt;</div>
            <div className="font-thin">All Products</div>
          </div>
          <div className="text-[30px] font-bold my-[1rem] flex items-center justify-between">
            All Products
            <FaEdit
              className="text-[30px] cursor-pointer text-[var(---edit)]"
              onClick={() => openEditModal()}
              title="Add New Product"
            />
          </div>
          <div className="flex justify-between font-thin items-center">
            <div>{items.length} Products</div>
            <div
              className="underline cursor-pointer my-[1rem]"
              onClick={showfilter}
            >
              Filter & Sort
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-[4rem]">
            {loading ? (
              <div className=" inset-0 mt-[40%] flex items-center justify-center col-span-5 bg-opacity-80 z-999">
                <div className=" p-6 rounded  text-xl font-bold flex items-center gap-2">
                  <MoonLoader size={30} color="#7002ff" />
                  Loading...
                </div>
              </div>
            ) : items.length == 0 ? (
              <div className="text-[50px] col-span-5 font-thin">
                There is no Product, Add Product for Production.
              </div>
            ) : (
              items.map((item, index) => (
                <Fade duration={2000} cascade triggerOnce fraction={0.1}>
                  <div
                    key={item.id}
                    className="relative w-full flex-shrink-0 cursor-pointer bg-[var(---whitetext)] h-[20rem]"
                  >
                    <div className="relative w-full h-[2rem]">
                      <FaEdit
                        className="absolute top-1 right-2 z-10 text-[20px] cursor-pointer text-[var(---edit)]"
                        onClick={() => openEditModal(index)}
                        title="Edit"
                      />
                      <button
                        className="absolute top-1 left-4 z-10 cursor-pointer bg-red-500 text-white px-2 py-1 rounded text-xs"
                        onClick={() => handleDelete(index)}
                        title="Delete"
                      >
                        Delete
                      </button>
                    </div>
                    {item.onsale ? (
                      <div className="p-0.5 px-4 bg-[var(---salelabel)] inline text-[var(---whitetext)] rounded-[1rem] m-2 font-thin ">
                        SALE
                      </div>
                    ) : (
                      <div className="p-0.5 px-4 bg-[var(---whitetext)] inline text-[var(---whitetext)] rounded-[1rem] m-2 font-thin ">
                        SALE
                      </div>
                    )}

                    <Image
                      src={item.image}
                      alt={`Product ${index}`}
                      width={1020}
                      height={1020}
                      className="transition-transform duration-500 my-2 h-[9rem]"
                    />
                    <div>
                      <div className="ml-4 font-thin">{item.name}</div>
                      <div className="ml-4 font-thin">{item.specification}</div>
                      {item.onsale ? (
                        <div className="flex flex-col text-[18px] ">
                          <div className="ml-2 font-bold text-[var(---price)]">
                            <s>{item.price}</s>
                          </div>
                          <div className="ml-2 font-bold text-[var(---price)]">
                            {item.sale_price}
                          </div>
                        </div>
                      ) : (
                        <div className="m-2 text-[18px] font-bold text-[var(---price)]">
                          {item.price}
                        </div>
                      )}
                    </div>
                  </div>
                </Fade>
              ))
            )}
          </div>
        </div>
      </Fade>
      {/* mobile filter  */}
      <div
        className={`fixed w-full h-full bg-[var(---whitetext)] top-0 duration-[2s] px-[1rem] z-300 ${
          filter ? "right-0 opacity-100" : "opacity-0 right-[-120vw] hidethis"
        } overflow-y-scroll mb-[4rem] scrollbar-hide`}
      >
        <div className="flex justify-between p-4 border-y-[1px] items-center py-[1.5rem] my-[1rem] text-[20px] font-thin">
          <div>Filter & Sort (10 products)</div>
          <div className="text-[1.5rem]">
            <RxCross2 onClick={showfilter} />
          </div>
        </div>
        <div
          className={`p-4 border-b-[1px] duration-700 overflow-y-hidden ${
            sortbyfilter ? "h-[19rem]" : "h-[3.5rem] "
          }`}
        >
          <div
            className={`justify-between items-center  text-[20px] font-thin flex ${
              sortbyfilter ? "block" : "hidden"
            }`}
          >
            <div>Sort by:</div>
            <RxMinus className="cursor-pointer" onClick={showsortbyfilter} />
          </div>
          <div
            className={`justify-between items-center text-[20px] font-thin ${
              sortbyfilter ? "hidden" : "flex"
            } border-b-[1px`}
          >
            <div>Sort by:</div>
            <RxPlus className="cursor-pointer" onClick={showsortbyfilter} />
          </div>

          <div className="flex flex-col">
            <div className="space-x-2 my-2">
              <input type="radio" name="sort" id="rec" defaultChecked />
              <label htmlFor="rec">Recommended</label>
            </div>
            <div className="space-x-2 my-2">
              <input type="radio" name="sort" id="newest" />
              <label htmlFor="newest">Newest</label>
            </div>
            <div className="space-x-2 my-2">
              <input type="radio" name="sort" id="plth" />
              <label htmlFor="plth">Price (low to high)</label>
            </div>
            <div className="space-x-2 my-2">
              <input type="radio" name="sort" id="phtl" />
              <label htmlFor="phtl">Price (high to low)</label>
            </div>
            <div className="space-x-2 my-2">
              <input type="radio" name="sort" id="Natoz" />
              <label htmlFor="Natoz">Name A-Z</label>
            </div>
            <div className="space-x-2 my-2">
              <input type="radio" name="sort" id="Nztoa" />
              <label htmlFor="Nztoa">Name Z-A</label>
            </div>
          </div>
        </div>

        <div
          className={`p-4 border-b-[1px] duration-700 overflow-y-hidden ${
            pricefilter ? "h-[9rem]" : "h-[3.5rem] "
          }`}
        >
          <div
            className={`justify-between items-center  text-[20px] font-thin flex ${
              pricefilter ? "block" : "hidden"
            }`}
          >
            <div>
              Price (${minPrice}-${maxPrice})
            </div>
            <RxMinus className="cursor-pointer" onClick={showpricefilter} />
          </div>
          <div
            className={`justify-between items-center text-[20px] font-thin ${
              pricefilter ? "hidden" : "flex"
            } border-b-[1px`}
          >
            <div>
              Price (${minPrice}-${maxPrice})
            </div>
            <RxPlus className="cursor-pointer" onClick={showpricefilter} />
          </div>
          <div className="flex w-[80vw] my-[1rem]">
            <input
              type="range"
              min={minPrice}
              value={maxPrice}
              max={100}
              onChange={(e) => {
                setMaxPrice(e.target.value);
              }}
              className="w-[80vw]"
            />
          </div>
          <div className="flex justify-between w-[80vw]">
            <div>${minPrice}</div>
            <div>${maxPrice}</div>
          </div>
        </div>

        <div
          className={`p-4 mb-[4rem] border-b-[1px] duration-700 overflow-y-hidden ${
            colorfilter ? "h-[7rem]" : "h-[3.5rem] "
          }`}
        >
          <div
            className={`justify-between items-center  text-[20px] font-thin flex ${
              colorfilter ? "block" : "hidden"
            }`}
          >
            <div>Color</div>
            <RxMinus className="cursor-pointer" onClick={showcolorfilter} />
          </div>
          <div
            className={`justify-between items-center text-[20px] font-thin ${
              colorfilter ? "hidden" : "flex"
            } border-b-[1px`}
          >
            <div>Color</div>
            <RxPlus className="cursor-pointer" onClick={showcolorfilter} />
          </div>
          <div className="my-[1rem]">
            <div
              className="w-[2rem] h-[2rem] rounded-full"
              style={{ backgroundColor: colorofitem }}
            ></div>
          </div>
        </div>
      </div>
      {/* laptop */}
      <Fade duration={1000} cascade>
        <div className="sm:hidden mx-[1.5rem] l:grid l:grid-cols-5 gap-[10px] ">
          <div className="col-span-1 h-[100vh] overflow-scroll scrollbar-hide">
            <Fade duration={2000} cascade triggerOnce>
              <div className="flex space-x-2 text-[20px]">
                <Link href={`/admin/components`}>
                  <div className="cursor-pointer hover:font-bold font-thin">
                    Home
                  </div>
                </Link>
                <div className="">&gt;</div>
                <div className="font-thin">All Products</div>
              </div>
              <div>
                <div className="my-[2rem] py-[1rem] border-b-[1px] text-[1.5rem] font-semibold">
                  Browse by
                </div>

                <Link href={`/admin/components/category/allproducts`}>
                  <p
                    className={`inline-block cursor-pointer hover:underline ${
                      currentpage == "allproducts" ? "font-bold" : "font-thin"
                    }`}
                  >
                    All Produtcs
                  </p>
                </Link>
                <br />
                <Link href={`/admin/components/category/computers`}>
                  <p
                    className={`inline-block cursor-pointer hover:underline ${
                      currentpage == "computers" ? "font-bold" : "font-thin"
                    }`}
                  >
                    Computers
                  </p>
                </Link>
                <br />
                <Link href={`/admin/components/category/tablets`}>
                  <p
                    className={`inline-block cursor-pointer hover:underline ${
                      currentpage == "tablets" ? "font-bold" : "font-thin"
                    }`}
                  >
                    Tablets
                  </p>
                </Link>
                <br />
                <Link href={`/admin/components/category/drones&cameras`}>
                  <p
                    className={`inline-block cursor-pointer hover:underline ${
                      currentpage == "drones&cameras"
                        ? "font-bold"
                        : "font-thin"
                    }`}
                  >
                    Drones & Cameras
                  </p>
                </Link>
                <br />
                <Link href={`/admin/components/category/headphones&speakers`}>
                  <p
                    className={`inline-block cursor-pointer hover:underline ${
                      currentpage == "headphones&speakers"
                        ? "font-bold"
                        : "font-thin"
                    }`}
                  >
                    Headphones & Speakers
                  </p>
                </Link>
                <br />
                <Link href={`/admin/components/category/mobiles`}>
                  <p
                    className={`inline-block cursor-pointer hover:underline ${
                      currentpage == "mobile" ? "font-bold" : "font-thin"
                    }`}
                  >
                    Mobiles
                  </p>
                </Link>
                <br />
                <Link href={`/admin/components/category/tv&homecinema`}>
                  <p
                    className={`inline-block cursor-pointer hover:underline ${
                      currentpage == "tv&homecinema" ? "font-bold" : "font-thin"
                    }`}
                  >
                    T.V & Home Cinema
                  </p>
                </Link>
                <br />
                <Link href={`/admin/components/category/wearabletech`}>
                  <p
                    className={`inline-block cursor-pointer hover:underline ${
                      currentpage == "wearabletech" ? "font-bold" : "font-thin"
                    }`}
                  >
                    Wearable Tech
                  </p>
                </Link>
                <br />
                <Link href={`/admin/components/category/sale`}>
                  <p
                    className={`inline-block cursor-pointer hover:underline ${
                      currentpage == "sale" ? "font-bold" : "font-thin"
                    }`}
                  >
                    Sale
                  </p>
                </Link>
                <br />
                <Link href={`/admin/components/category/bestseller`}>
                  <p
                    className={`inline-block cursor-pointer hover:underline ${
                      currentpage == "bestseller" ? "font-bold" : "font-thin"
                    }`}
                  >
                    Best Sellers
                  </p>
                </Link>

                <br />
              </div>
              <div>
                <div className="my-[2rem] py-[1rem] border-b-[1px] text-[1.5rem] font-semibold">
                  Filter by
                </div>
                <div
                  className={`p-4 border-b-[1px] duration-700 overflow-y-hidden ${
                    pricefilter ? "h-[9rem]" : "h-[3.5rem] "
                  }`}
                >
                  <div
                    className={`justify-between items-center  text-[20px] font-thin flex ${
                      pricefilter ? "block" : "hidden"
                    }`}
                  >
                    <div>
                      Price (${minPrice}-${maxPrice})
                    </div>
                    <RxMinus
                      className="cursor-pointer"
                      onClick={showpricefilter}
                    />
                  </div>
                  <div
                    className={`justify-between items-center text-[20px] font-thin ${
                      pricefilter ? "hidden" : "flex"
                    } border-b-[1px`}
                  >
                    <div>
                      Price (${minPrice}-${maxPrice})
                    </div>
                    <RxPlus
                      className="cursor-pointer"
                      onClick={showpricefilter}
                    />
                  </div>
                  <div className="flex  my-[1rem]">
                    <input
                      type="range"
                      min={minPrice}
                      value={maxPrice}
                      max={100}
                      onChange={(e) => {
                        setMaxPrice(e.target.value);
                      }}
                      className="w-full"
                    />
                  </div>
                  <div className="flex justify-between">
                    <div>${minPrice}</div>
                    <div>${maxPrice}</div>
                  </div>
                </div>

                <div
                  className={`p-4 border-b-[1px] mb-[4rem] duration-700 overflow-y-hidden ${
                    colorfilter ? "h-[7rem]" : "h-[3.5rem] "
                  }`}
                >
                  <div
                    className={`justify-between items-center  text-[20px] font-thin flex ${
                      colorfilter ? "block" : "hidden"
                    }`}
                  >
                    <div>Color</div>
                    <RxMinus
                      className="cursor-pointer"
                      onClick={showcolorfilter}
                    />
                  </div>
                  <div
                    className={`justify-between items-center text-[20px] font-thin ${
                      colorfilter ? "hidden" : "flex"
                    } border-b-[1px`}
                  >
                    <div>Color</div>
                    <RxPlus
                      className="cursor-pointer"
                      onClick={showcolorfilter}
                    />
                  </div>
                  <div className="my-[1rem]">
                    <div
                      className="w-[2rem] h-[2rem] rounded-full"
                      style={{ backgroundColor: colorofitem }}
                    ></div>
                  </div>
                </div>
              </div>
            </Fade>
          </div>
          <div className="col-span-4 h-[100vh] overflow-scroll scrollbar-hide">
            <div className="text-[50px] font-bold my-[1rem] flex items-center justify-between">
              All Products
              <FaEdit
                className="text-[40px] cursor-pointer text-[var(---edit)]"
                onClick={() => openEditModal()}
                title="Add New Product"
              />
            </div>
            <div className="flex justify-between font-thin text-[20px] items-center">
              <div>{items.length} Products</div>
              <div className="  my-[1rem] flex items-baseline">
                Sort by:
                <div className="relative mb-4 cursor-pointer">
                  <button
                    className=" px-4 py-2 rounded cursor-pointer"
                    onClick={() => setDropdownOpen((open) => !open)}
                  >
                    {selectedOption}
                    {dropdownOpen ? (
                      <span className="ml-2">∧</span>
                    ) : (
                      <span className="ml-2">∨</span>
                    )}
                  </button>
                  {dropdownOpen && (
                    <Fade duration={1000} cascade>
                      <ul className="absolute right-5  w-[11rem] border rounded bg-white shadow z-30">
                        {dropdownOptions.map((option) => (
                          <li
                            key={option}
                            className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                              selectedOption === option ? "font-bold" : ""
                            }`}
                            onClick={() => handleDropdownSelect(option)}
                          >
                            {option}
                          </li>
                        ))}
                      </ul>
                    </Fade>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-[4rem]">
              {loading ? (
                <div className=" inset-0 mt-[10%] flex items-center justify-center col-span-5 bg-opacity-80 z-999">
                  <div className=" p-6 rounded  text-xl font-bold flex items-center gap-2">
                    <MoonLoader size={30} color="#7002ff" />
                    Loading...
                  </div>
                </div>
              ) : items.length == 0 ? (
                <div className="text-[50px] col-span-5 font-thin">
                  There is no Product, Add Product for Production.
                </div>
              ) : (
                items.map((item, index) => (
                  <Fade duration={1000} cascade fraction={0.3} triggerOnce>
                    <div
                      key={item.id}
                      className="relative w-full flex-shrink-0 cursor-pointer bg-[var(---whitetext)] h-[28rem] content-center"
                    >
                      <FaEdit
                        className="absolute top-1 right-2 z-10 text-[25px] cursor-pointer text-[var(---edit)]"
                        onClick={() => openEditModal(index)}
                        title="Edit"
                      />
                      <button
                        className="absolute top-1 right-10 z-10 bg-red-500 text-white cursor-pointer px-2 py-1 rounded text-xs"
                        onClick={() => handleDelete(index)}
                        title="Delete"
                      >
                        Delete
                      </button>
                      {item.onsale ? (
                        <div className=" p-0.5 px-4 bg-[var(---salelabel)] inline text-[var(---whitetext)] rounded-[1rem] m-2 font-thin ">
                          SALE
                        </div>
                      ) : (
                        <div className="p-0.5 px-4 bg-[var(---whitetext)] inline text-[var(---whitetext)] rounded-[1rem] m-2 font-thin ">
                          SALE
                        </div>
                      )}

                      <Image
                        src={item.image}
                        alt={`product ${index}`}
                        width={1020}
                        height={1020}
                        className="transition-transform duration-500 my-2 hover:scale-102 h-[18rem]"
                      />
                      <div>
                        <div className="ml-4 font-thin">{item.name}</div>
                        <div className="ml-4 font-thin">
                          {item.specification}
                        </div>
                        {item.onsale ? (
                          <div className="flex flex-col text-[18px] ">
                            <div className="ml-2 font-bold text-[var(---price)]">
                              <s>{item.price}</s>
                            </div>
                            <div className="ml-2 font-bold text-[var(---price)]">
                              {item.sale_price}
                            </div>
                          </div>
                        ) : (
                          <div className="m-2 text-[18px] font-bold text-[var(---price)]">
                            {item.price}
                          </div>
                        )}
                      </div>
                    </div>
                  </Fade>
                ))
              )}
            </div>
          </div>
        </div>
      </Fade>
    </>
  );
};

export default AllProducts;
