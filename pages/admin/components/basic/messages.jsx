import React, { useEffect, useState } from "react";

const Messages = () => {
  const [career, setCareer] = useState([]);
  const [contact, setContact] = useState([]);
  const [newsletter, setNewsletter] = useState([]);

  const [loadingCareer, setLoadingCareer] = useState(true);
  const [loadingContact, setLoadingContact] = useState(true);
  const [loadingNewsletter, setLoadingNewsletter] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [res1, res2, res3] = await Promise.all([
          fetch("/api/getCareer"),
          fetch("/api/getContact"),
          fetch("/api/getNewsletter"),
        ]);

        const [data1, data2, data3] = await Promise.all([
          res1.json(),
          res2.json(),
          res3.json(),
        ]);

        if (data1.success && Array.isArray(data1.data)) setCareer(data1.data);
        if (data2.success && Array.isArray(data2.data)) setContact(data2.data);
        if (data3.success && Array.isArray(data3.data)) setNewsletter(data3.data);
      } catch (error) {
        console.error("Error fetching data", error);
      } finally {
        setLoadingCareer(false);
        setLoadingContact(false);
        setLoadingNewsletter(false);
      }
    };

    fetchData();
  }, []);
const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};

  const Loader = () => (
    <div className="text-center text-gray-500 italic py-4 animate-pulse">Loading...</div>
  );

  const Section = ({ title, data, loading, fields }) => (
    <div className="bg-white p-6 rounded-lg shadow mb-10 w-full">
      <h2 className="text-2xl font-bold mb-4 border-b pb-2 text-[var(---btncolor)]">{title}</h2>
      {loading ? (
        <Loader />
      ) : data.length === 0 ? (
        <p className="text-gray-500 italic">No data found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                {fields.map((field) => (
                  <th key={field} className="border px-4 py-2 bg-gray-100 text-left capitalize">
                    {field.replace("_", " ")}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((entry, i) => (
                <tr key={i} className="even:bg-gray-50">
                  {fields.map((field) => (
                    <td key={field} className="border px-4 py-2 text-sm">
                      {entry[field] || "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <Section
  title="Career Applications"
  data={career.map((item) => ({
    ...item,
    available: formatDate(item.available),
  }))}
  loading={loadingCareer}
  fields={["firstname", "lastname", "email", "phone", "position", "available", "resume"]}
/>

        <Section
          title="Contact Messages"
          data={contact}
          loading={loadingContact}
          fields={["firstname", "lastname", "email", "subject", "message"]}
        />
        <Section
          title="Newsletter Subscribers"
          data={newsletter}
          loading={loadingNewsletter}
          fields={["email"]}
        />
      </div>
    </div>
  );
};

export default Messages;
