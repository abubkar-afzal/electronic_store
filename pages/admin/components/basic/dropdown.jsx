import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";

const statusOptions = ["Pending", "Shipped", "Delivered", "Cancelled"];

const StatusDropdown = ({ currentStatus, onChange }) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-[130px] mx-auto">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="border px-2 py-1 rounded hover:bg-gray-50 bg-gray-100 cursor-pointer flex justify-between items-center"
      >
        <span>{currentStatus}</span>
        <span className="ml-2 text-sm">▾</span>
      </div>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 z-50 mt-1 w-full bg-white border rounded shadow-md"
          >
            {statusOptions.map((status) => (
              <li
                key={status}
                onClick={() => {
                  onChange(status);
                  setOpen(false);
                }}
                className={`text-left px-3 py-2 hover:bg-gray-100 cursor-pointer ${
                  status === currentStatus ? "font-semibold text-blue-600" : ""
                }`}
              >
                {status}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
export default StatusDropdown;
