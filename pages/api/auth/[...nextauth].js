import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";
import mysql from 'mysql2/promise';

const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],  secret: process.env.NEXTAUTH_SECRET, // required for JWT encryption

  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET, // ✅ explicitly add this
  },
 callbacks: {
  async signIn({ user, account, profile }) {
    if (account.provider === "google") {
      const email = profile.email;

      const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
      let dbUser = rows[0];

      if (!dbUser) {
        const [result] = await db.query(
          "INSERT INTO users (name, email, password, image) VALUES (?, ?, ?, ?)",
          [profile.name, email, '', profile.picture]
        );
        dbUser = { id: result.insertId, email };
      }

      // ✅ attach DB user ID to token
      user.id = dbUser.id;
    }

    return true;
  },

  async jwt({ token, user }) {
    // When user signs in, attach id
    if (user) {
      token.id = user.id;
      token.customToken = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET || process.env.NEXTAUTH_SECRET,
        { expiresIn: "30d" }
      );
    }

    return token;
  },

  async session({ session, token }) {
    session.user.id = token.id;
    session.user.customToken = token.customToken;
    return session;
  },
}

});
