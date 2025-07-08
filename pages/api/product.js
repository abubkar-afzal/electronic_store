import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});
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
