
import pool from "./db";


export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email } = req.body;
    try {
      const [rows] = await pool.query(
        "SELECT * FROM orders WHERE email = ? ORDER BY id DESC",
        [email]
      );
     const orders = rows.map((order) => ({
  ...order,
  order_items:
    typeof order.order_items === "string"
      ? JSON.parse(order.order_items)
      : order.order_items,
}));

      res.status(200).json({ success: true, orders });
    } catch (error) {
      console.error("DB Error:", error);
      res.status(500).json({ success: false, message: "Database error" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
