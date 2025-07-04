import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const [rows] = await pool.query('SELECT * FROM intro ORDER BY id ASC');
      res.status(200).json({ images: rows.map(r => r.image) });
    } catch (error) {
      res.status(500).json({ error: 'Database query failed' });
    }
  } else if (req.method === "POST") {
    const { action, images } = req.body;
    if (!Array.isArray(images)) {
      return res.status(400).json({ error: "Images must be an array" });
    }
    try {
      if (action === "add") {
        for (const img of images) {
          await pool.query('INSERT INTO intro (image) VALUES (?)', [img]);
        }
        const [rows] = await pool.query('SELECT * FROM intro ORDER BY id ASC');
        res.status(200).json({ success: true, images: rows.map(r => r.image) });
      } else if (action === "replace") {
        await pool.query('DELETE FROM intro');
        for (const img of images) {
          await pool.query('INSERT INTO intro (image) VALUES (?)', [img]);
        }
        const [rows] = await pool.query('SELECT * FROM intro ORDER BY id ASC');
        res.status(200).json({ success: true, images: rows.map(r => r.image) });
      } else {
        res.status(400).json({ error: "Invalid action" });
      }
    } catch (error) {
       console.error(error); // Add this line
  res.status(500).json({ error: 'Database query failed' });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}