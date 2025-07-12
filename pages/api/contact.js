
import pool from "./db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const [rows] = await pool.query('SELECT * FROM contact_info ORDER BY id DESC LIMIT 1');
      if (rows.length > 0) {
        // Parse hours from JSON string if needed
        const row = rows[0];
        row.hours = typeof row.hours === "string" ? JSON.parse(row.hours) : row.hours;
        res.status(200).json(row);
      } else {
        res.status(200).json({});
      }
    } catch (error) {
      res.status(500).json({ error: 'Database query failed' });
    }
  } else if (req.method === "POST") {
    const { location, email, phone, hours, id } = req.body;
    try {
      if (id) {
        await pool.query(
          `UPDATE contact_info SET location=?, email=?, phone=?, hours=? WHERE id=?`,
          [location, email, phone, JSON.stringify(hours), id]
        );
      } else {
        await pool.query(
          `INSERT INTO contact_info (location, email, phone, hours) VALUES (?, ?, ?, ?)`,
          [location, email, phone, JSON.stringify(hours)]
        );
      }
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Database query failed' });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}