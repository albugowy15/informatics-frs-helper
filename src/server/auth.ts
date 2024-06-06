import { env } from "@/env.mjs";
import NextAuth, { CredentialsSignin } from "next-auth";

import Credentials from "next-auth/providers/credentials";

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */

interface LoginApiResponse {
  msg?: string;
  data?: {
    id: string;
    username: string;
    email: string;
  };
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
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
      authorize: async (credentials) => {
        if (!credentials) {
          throw new CredentialsSignin("credentials empty");
        }
        const loginApiUrl = env.APP_URL + "/api/login";
        const res = await fetch(loginApiUrl, {
          method: "POST",
          body: JSON.stringify(credentials),
        });

        const resBody: LoginApiResponse = await res.json();
        if (!res.ok || resBody.msg) {
          throw new CredentialsSignin(resBody.msg);
        }

        if (resBody.data) {
          return resBody.data;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        // User is available during sign-in
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id as string;
      return session;
    },
  },
  // secret: env.AUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
});
