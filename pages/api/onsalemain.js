import pool from "./db";

export default async function handler(req, res) {
  try {
    const [rows] = await pool.query(
      'SELECT * FROM product WHERE display_place = ?',
      ['onsale']
    );
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Database query failed' });
  }
}
