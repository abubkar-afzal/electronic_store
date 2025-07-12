import pool from "./db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  try {
   

    const [rows] = await pool.execute("SELECT * FROM contact_queries ORDER BY id DESC");
    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error("Career API Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
