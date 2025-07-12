
import pool from "./db";


export default async function handler(req, res) {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET") {
    try {
      const [rows] = await pool.query("SELECT * FROM orders ORDER BY id DESC");

     

      res.status(200).json({ success: true, rows });
    } catch (error) {
      console.error("DB Error:", error);
      res.status(500).json({ success: false, message: "Database error" });
    }
  } else {
    res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
}
