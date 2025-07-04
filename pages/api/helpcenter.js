import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

export default async function handler(req, res) {
  const { category = "generaloption" } = req.method === "GET" ? req.query : req.body;
  const dbCategory = category === "generaloption" ? "general" : "setup";

  if (req.method === "GET") {
    try {
      const [rows] = await pool.query(
        "SELECT * FROM helpcenter WHERE category=? ORDER BY id DESC",
        [dbCategory]
      );
      res.status(200).json({ faqs: rows });
    } catch (error) {
      res.status(500).json({ error: "Database query failed" });
    }
  } else if (req.method === "POST") {
    const { q, a } = req.body;
    try {
      const [result] = await pool.query(
        "INSERT INTO helpcenter (q, a, category) VALUES (?, ?, ?)",
        [q, a, dbCategory]
      );
      res.status(200).json({ success: true, id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: "Database insert failed" });
    }
  } else if (req.method === "PUT") {
    const { id, q, a } = req.body;
    try {
      await pool.query(
        "UPDATE helpcenter SET q=?, a=? WHERE id=?",
        [q, a, id]
      );
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Database update failed" });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    try {
      await pool.query("DELETE FROM helpcenter WHERE id=?", [id]);
      res.status(200).json({ success: true });
    } catch (error) {
      res.status(500).json({ error: "Database delete failed" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}