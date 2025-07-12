import pool from "./db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { FirstName, LastName, Email, Subject, Resume } = req.body;

  if (!FirstName || !LastName || !Email || !Subject || !Resume) {
    return res.status(400).json({ success: false, message: "All fields are required." });
  }

  try {
   
    await pool.execute(
      `CREATE TABLE IF NOT EXISTS contact_queries (
        id INT AUTO_INCREMENT PRIMARY KEY,
        firstname VARCHAR(255),
        lastname VARCHAR(255),
        email VARCHAR(255),
        subject VARCHAR(255),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`
    );

    await pool.execute(
      `INSERT INTO contact_queries (firstname, lastname, email, subject, message) VALUES (?, ?, ?, ?, ?)`,
      [FirstName, LastName, Email, Subject, Resume]
    );

    await pool.end();
    res.status(200).json({ success: true, message: "Message submitted successfully." });
  } catch (error) {
    console.error("pool Error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
}
