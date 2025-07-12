
import pool from "./db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      id,
      name,
      specification,
      description,
      price,
      sale_price,
      onsale,
      avaliable_quantity,
      use_cause,
      return_policy,
      shipping,
      image,
      display_place,
      category,
      color
    } = req.body;

    try {
      const [result] = await pool.query(
        `INSERT INTO product 
        (id, name, specification, description, price, sale_price, onsale, avaliable_quantity, use_cause, return_policy, shipping, image, display_place, category, color) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          name,
          specification,
          description,
          price,
          sale_price,
          onsale,
          avaliable_quantity,
          use_cause,
          return_policy,
          shipping,
          image,
          display_place,
          category,
          color
        ]
      );
      res.status(201).json({ success: true, id: result.insertId });
    } catch (error) {
      console.error(error);
    
         res.status(200).json({ success: false, duplicate: true, message: "Duplicate ID" });

    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
