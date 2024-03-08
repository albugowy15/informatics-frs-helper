import {
  type DefaultSession,
  getServerSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { env } from "@/env.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "@/server/db";

export interface LoginResponseData {
  username: string;
  email: string;
  accessToken: string;
  id: string;
}

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: LoginResponseData & DefaultSession["user"];
  }
}

const KEY = env.NEXTAUTH_SECRET!;

async function handleLogin(username: string, password: string) {
  if (!username || !password) {
    throw new Error("Username dan password tidak ada");
  }

  const users = await prisma.user.findMany({
    where: {
      OR: [
        {
          username: username,
        },
        {
          email: username,
        },
      ],
    },
  });
  if (users.length === 0 || users.length > 1) {
    throw new Error("User tidak ditemukan");
  }
  const user = users[0];
  if (!user) {
    throw new Error("User tidak ditemukan");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Password salah");
  }
  const payload = {
    id: user.id,
    username: user.username,
    email: user.email,
  };
  try {
    const token = jwt.sign(payload, KEY, { expiresIn: "1d" });
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      accessToken: token,
    };
  } catch (e) {
    console.log(e);
    throw new Error("ERROR SIGN TOKEN");
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Username dan password kosong");
        }
        try {
          return await handleLogin(credentials.username, credentials.password);
        } catch (e: unknown) {
          if (e instanceof Error) {
            throw new Error(e.message);
          } else {
            throw new Error("INTERNAL ERROR");
          }
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      return { ...token, ...user };
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
  },
  secret: env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  jwt: {
    secret: env.NEXTAUTH_SECRET,
  },
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
