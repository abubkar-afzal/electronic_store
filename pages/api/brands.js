
import pool from "./db";


export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const [rows] = await pool.query('SELECT * FROM brands ORDER BY id DESC');
      res.status(200).json({ brands: rows });
    } catch (error) {
      res.status(500).json({ error: 'Database query failed' });
    }
  } else if (req.method === "POST") {
    const { image } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO brands (image) VALUES (?)',
        [image]
      );
      res.status(200).json({ success: true, id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: 'Database insert failed' });
    }
  } else if (req.method === "PUT") {
    const { id, image } = req.body;
    try {
      await pool.query(
        'UPDATE brands SET image=? WHERE id=?',
        [image, id]
      );
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Database update failed' });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    try {
      await pool.query('DELETE FROM brands WHERE id=?', [id]);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Database delete failed' });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}