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
      const [rows] = await pool.query('SELECT * FROM shop_category ORDER BY id DESC');
      res.status(200).json({ categories: rows });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Database query failed' });
    }
  } else if (req.method === "POST") {
    const { label, link, img, bg } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO shop_category (label, link, img, bg) VALUES (?, ?, ?, ?)',
        [label, link, img, bg]
      );
      res.status(200).json({ success: true, id: result.insertId });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Database insert failed' });
    }
  } else if (req.method === "PUT") {
    const { id, label, link, img, bg } = req.body;
    try {
      await pool.query(
        'UPDATE shop_category SET label=?, link=?, img=?, bg=? WHERE id=?',
        [label, link, img, bg, id]
      );
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Database update failed' });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    try {
      await pool.query('DELETE FROM shop_category WHERE id=?', [id]);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Database delete failed' });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}