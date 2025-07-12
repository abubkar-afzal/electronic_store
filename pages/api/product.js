import pool from "./db";

export default async function handler(req, res) {
  try {
    const { slug } = req.body;
    let id = parseInt(slug);
    const [rows] = await pool.query(
      'SELECT * FROM product WHERE id = ?',
      [id]
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error('Database query failed:', error);
    res.status(500).json({ error: 'Database query failed' });
  }
}
