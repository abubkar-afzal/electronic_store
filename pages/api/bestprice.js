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
      const [rows] = await pool.query('SELECT * FROM best_price ORDER BY id DESC LIMIT 1');
      if (rows.length > 0) {
        res.status(200).json(rows[0]);
      } else {
        res.status(200).json({});
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Database query failed' });
    }
  } else if (req.method === "POST") {
    const {
      label,
      save_text,
      amount,
      description,
      terms,
      button_text,
      image,
      id // optional, for update
    } = req.body;
    try {
      if (id) {
        // Update existing
        await pool.query(
          `UPDATE best_price SET
            label=?,
            save_text=?,
            amount=?,
            description=?,
            terms=?,
            button_text=?,
            image=?
          WHERE id=?`,
          [label, save_text, amount, description, terms, button_text, image, id]
        );
      } else {
        // Insert new
        await pool.query(
          `INSERT INTO best_price (label, save_text, amount, description, terms, button_text, image)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [label, save_text, amount, description, terms, button_text, image]
        );
      }
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