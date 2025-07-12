import pool from "./db";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }

  const { email } = req.body;

  if (!email || !email.includes("@")) {
    return res.status(400).json({ success: false, message: "Invalid email address." });
  }

  try {
  

    const [existing] = await pool.execute("SELECT * FROM newsletter WHERE email = ?", [email]);

    if (existing.length > 0) {
      return res.status(409).json({ success: false, message: "Email already subscribed." });
    }

    await pool.execute("INSERT INTO newsletter (email) VALUES (?)", [email]);

    res.status(200).json({ success: true, message: "Successfully subscribed!" });
  } catch (error) {
    console.error("Newsletter pool Error:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
