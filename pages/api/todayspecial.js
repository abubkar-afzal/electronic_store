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
      const [rows] = await pool.query('SELECT * FROM today_special ORDER BY id DESC LIMIT 1');
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
      title,
      percent,
      percent_label,
      description,
      note1,
      note2,
      button_text,
      image,
      id // for update
    } = req.body;
    try {
      if (id) {
        await pool.query(
          `UPDATE today_special SET
            label=?, title=?, percent=?, percent_label=?, description=?, note1=?, note2=?, button_text=?, image=?
          WHERE id=?`,
          [label, title, percent, percent_label, description, note1, note2, button_text, image, id]
        );
      } else {
        await pool.query(
          `INSERT INTO today_special (label, title, percent, percent_label, description, note1, note2, button_text, image)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [label, title, percent, percent_label, description, note1, note2, button_text, image]
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