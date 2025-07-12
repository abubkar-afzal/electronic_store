
import pool from "./db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ error: "Product id is required" });
    }

    try {
      const [result] = await pool.query(
        `DELETE FROM product WHERE id = ?`,
        [id]
      );
      res.status(200).json({ success: true, affectedRows: result.affectedRows });
    } catch (error) {
      res
        .status(500)
        .json({ error: "Database delete failed", details: error.message });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}