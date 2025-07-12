
import pool from "./db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { FirstName, LastName, Email, Phone, Position, AvailableDate, Resume } = req.body;

  if (!FirstName || !LastName || !Email || !Phone || !Position || !AvailableDate || !Resume) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
    const [result] = await pool.execute(
      `INSERT INTO careers (first_name, last_name, email, phone, position, available_date, resume_link)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [FirstName, LastName, Email, Phone, Position, AvailableDate, Resume]
    );

    res.status(200).json({ success: true, message: "Career application submitted successfully" });
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
}
