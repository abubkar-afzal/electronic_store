
import pool from "./db";


export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    name,
    email,
    phone,
    address,
    postcode,
    order_items,
    total_price,
    status
  } = req.body;

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    const insufficientProducts = [];

    // Check stock for each product
    for (const item of order_items) {
      const [rows] = await connection.query(
        "SELECT avaliable_quantity FROM product WHERE id = ?",
        [item.product_id]
      );

      if (rows.length === 0) {
        insufficientProducts.push({
          product_id: item.product_id,
          message: "Product not found"
        });
        continue;
      }

      const available = rows[0].avaliable_quantity;
      const requested = item.quantity;

      if (available < requested) {
        insufficientProducts.push({
          product_id: item.product_id,
          available,
          requested,
          message: `Only ${available} item(s) available for product ID ${item.product_id}`
        });
      }
    }

    // If any product has insufficient stock, return error
    if (insufficientProducts.length > 0) {
      await connection.rollback();
      return res.status(200).json({
        success: false,
        insufficient: true,
        message: "Some products have insufficient stock",
        details: insufficientProducts
      });
    }

    // Insert order
    const [result] = await connection.query(
      `INSERT INTO orders 
      (name, email, phone, address, postcode, order_items, total_price, status) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        email,
        phone,
        address,
        postcode,
        JSON.stringify(order_items),
        total_price,
        status || "pending"
      ]
    );

    // Update stock
    for (const item of order_items) {
      await connection.query(
        "UPDATE product SET avaliable_quantity = avaliable_quantity - ? WHERE id = ?",
        [item.quantity, item.product_id]
      );
    }

    await connection.commit();
    res.status(201).json({ success: true, id: result.insertId });
  } catch (error) {
    await connection.rollback();
    console.error("Order error:", error);
    res.status(500).json({ success: false, message: "Server error while placing order" });
  } finally {
    connection.release();
  }
}
