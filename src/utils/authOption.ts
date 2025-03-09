/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import { pages } from "next/dist/build/templates/app-page";
import { signIn } from "next-auth/react";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session, User } from "next-auth";


interface UserWithRole extends User {
  role: string;
  access_token: string;
}

export const authOptions = {
  providers: [
    GithubProvider({
      profile(profile) {
        const userRole = "customer"; // Use const since it never changes
        return {
          id: String(profile.id), // Convert id to string
          name: profile.name,
          email: profile.email,
          role: userRole,
          image: profile.avatar_url,
        };
      },
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      profile(profile) {
        const userRole = "customer"; // Use const since it never changes
        return {
          id: String(profile.sub), // Use 'sub' instead of 'id'
          name: profile.name,
          email: profile.email,
          role: userRole,
          image: profile.picture, // Use 'profile.picture' for Google
        };
      },
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const user = await fetch(`${process.env.SERVER_URL}/api/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        }).then((res) => res.json());
  
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user?.user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
  
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        console.log({user})
        const typedUser = user as UserWithRole;
        token.role = typedUser.role;
        token.accessToken = typedUser.access_token;
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        console.log(session)
        const typesSession = session.user as UserWithRole;
        typesSession.role = token.role as string;
      }

      return session;
    },
  },
  pages: {
    signIn: '/login'
  },
  secret:process.env.NEXTAUTH_SECRET,
}

export default NextAuth;