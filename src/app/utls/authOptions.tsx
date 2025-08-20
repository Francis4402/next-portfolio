import { db } from "@/db/db";
import { usersTable } from "@/db/schema";
import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";

export const authOptions: NextAuthOptions = {

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      const existingUser = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, user.email!))
        .limit(1);

      if (existingUser.length === 0) {
        await db.insert(usersTable).values({
          name: user.name ?? "",
          email: user.email ?? "",
          image: user.image ?? "",
          role: "User",
        });
      }

      return true;
    },

    async jwt({ token, user }) {
      
      if (user?.email) {
        const dbUser = await db
          .select()
          .from(usersTable)
          .where(eq(usersTable.email, user.email))
          .limit(1);

        if (dbUser.length > 0) {
          token.id = dbUser[0].id;
          token.role = dbUser[0].role;

          
          token.accessToken = jwt.sign(
            {
              sub: dbUser[0].id,
              email: dbUser[0].email,
              role: dbUser[0].role,
            },
            process.env.AUTH_SECRET as string,
            { expiresIn: "30d" }
          );
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      // Pass accessToken to client
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
};