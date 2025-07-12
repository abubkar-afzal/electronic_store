import jwt from "jsonwebtoken";
import pool from "./db";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, phone, password, address, postcode, image } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Missing required fields: email." });
    }

    try {
      const [result] = await pool.query(
        `UPDATE users 
         SET name = ?, email = ?, phone = ?, password = ?, image = ?, address = ?, postcode = ?
         WHERE email = ?`,
        [name, email, phone, password,  image, address, postcode, email]
      );

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
      const token = jwt.sign(
      { name, email, phone, password, address, postcode, image },
      process.env.NEXTAUTH_SECRET || process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );
      res.status(200).json({ result:result, success: true, message: "User updated successfully", token });
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ success: false, message: "Database error" });
    }
  } else {
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
