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
      // Get both deals by type
      const [rows] = await pool.query('SELECT * FROM deal');
      const mobile = rows.find(r => r.type === "mobile") || {};
      const headphone = rows.find(r => r.type === "headphone") || {};
      res.status(200).json({
        mobile: {
          line1: mobile.line1 || "",
          line2: mobile.line2 || "",
          line3: mobile.line3 || "",
          image: mobile.image || "",
        },
        headphone: {
          line1: headphone.line1 || "",
          line2: headphone.line2 || "",
          line3: headphone.line3 || "",
          image: headphone.image || "",
        }
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Database query failed' });
    }
  } else if (req.method === "POST") {
    const { type, line1, line2, line3, image } = req.body;
    if (!["mobile", "headphone"].includes(type)) {
      return res.status(400).json({ error: "Invalid type" });
    }
    try {
      // Upsert the deal
      await pool.query(
        `INSERT INTO deal (type, line1, line2, line3, image)
         VALUES (?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE line1=VALUES(line1), line2=VALUES(line2), line3=VALUES(line3), image=VALUES(image)`,
        [type, line1, line2, line3, image]
      );
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Database query failed' });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}