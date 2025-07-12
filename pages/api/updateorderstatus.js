
import pool from "./db";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const { orderId, status } = req.body;
  if (!orderId || !status) return res.status(400).json({ success: false, message: "Missing data" });

  try {
    await pool.query("UPDATE orders SET status = ? WHERE id = ?", [status, orderId]);
    res.status(200).json({ success: true, message: "Status updated" });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ success: false, message: "Update failed" });
  }
}
