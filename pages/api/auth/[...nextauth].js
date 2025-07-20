import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";
import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
          const res = await fetch(`${baseUrl}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const user = await res.json();

          if (res.ok && user?.email) {
            return {
              id: user.id,
              email: user.email,
              name: user.name || user.email,
            };
          }

          return null;
        } catch (err) {
          console.error("Authorize error:", err);
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
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

        user.id = dbUser.id;
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
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
  },
});
