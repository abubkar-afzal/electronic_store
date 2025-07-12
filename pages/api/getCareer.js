
import pool from "./db";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  try {
  

    const [rows] = await pool.execute(`
      SELECT 
        id, 
        first_name AS firstname, 
        last_name AS lastname, 
        email, 
        phone, 
        position, 
        available_date AS available, 
        resume_link AS resume
      FROM careers
      ORDER BY id DESC
    `);

    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error("Career DB Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
