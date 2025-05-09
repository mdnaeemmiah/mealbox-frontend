// /* eslint-disable @typescript-eslint/no-unused-vars */
// import NextAuth from "next-auth"
// import GithubProvider from "next-auth/providers/github"
// import GoogleProvider from "next-auth/providers/google";
// import { pages } from "next/dist/build/templates/app-page";
// import { signIn } from "next-auth/react";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { JWT } from "next-auth/jwt";
// import { Session, User } from "next-auth";
// import axios from "axios";


// interface UserWithRole extends User {
//   role: string;
//   access_token: string;
// }

// // Extend NextAuth session type to include role
// declare module "next-auth" {
//   interface Session {
//     user: {
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//       role?: string; // ✅ Add role
//     };
//   }
// }

// export const authOptions = {
//   providers: [
//   //   GithubProvider({
//   //     profile(profile) {
//   //       const userRole = "customer"; // Use const since it never changes
//   //       return {
//   //         id: String(profile.id), // Convert id to string
//   //         name: profile.name,
//   //         email: profile.email,
//   //         role: userRole,
//   //         image: profile.avatar_url,
//   //       };
//   //     },
//   //     clientId: process.env.GITHUB_ID as string,
//   //     clientSecret: process.env.GITHUB_SECRET as string,
//   //   }),
//   //   GoogleProvider({
//   //     profile(profile) {
//   //       const userRole = "customer"; // Use const since it never changes
//   //       return {
//   //         id: String(profile.sub), // Use 'sub' instead of 'id'
//   //         name: profile.name,
//   //         email: profile.email,
//   //         role: userRole,
//   //         image: profile.picture, // Use 'profile.picture' for Google
//   //       };
//   //     },
//   //     clientId: process.env.GOOGLE_ID as string,
//   //     clientSecret: process.env.GOOGLE_SECRET as string,
//   //   }),
//   //   CredentialsProvider({
//   //     // The name to display on the sign in form (e.g. "Sign in with...")
//   //     name: "Credentials",
      
//   //     credentials: {
//   //         email: { label: "Email", type: "text" },
//   //         password: { label: "Password", type: "password" },
//   //     },
//   //     async authorize(credentials) {
//   //       // Add logic here to look up the user from the credentials supplied
//   //       const user = await fetch(`${process.env.SERVER_URL}/api/auth/login`, {
//   //         method: "POST",
//   //         headers: { "Content-Type": "application/json" },
//   //         body: JSON.stringify(credentials),
//   //       }).then((res) => res.json());
  
//   //       if (user) {
//   //         // Any object returned will be saved in `user` property of the JWT
//   //         return user?.user
//   //       } else {
//   //         // If you return null then an error will be displayed advising the user to check their details.
//   //         return null
  
//   //         // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
//   //       }
//   //     }
//   //   })
//   // ],
//   // callbacks: {
//   //   async jwt({ token, user }: { token: JWT; user: User }) {
//   //     if (user) {
//   //       // console.log({user})
//   //       const typedUser = user as UserWithRole;
//   //       token.role = typedUser.role;
//   //       token.accessToken = typedUser.access_token;
//   //     }

//   //     return token;
//   //   },
//   //   async session({ session, token }: { session: Session; token: JWT }) {
//   //     if (session.user) {
//   //       console.log({session})
//   //       const typesSession = session.user as UserWithRole;
//   //       typesSession.role = token.role as string;
//   //     }

//   //     return session;
//   //   },
//   // },
//   CredentialsProvider({
//     name: "Credentials",
//     credentials: {
//       email: { label: "Email", type: "email" },
//       password: { label: "Password", type: "password" },
//     },
//     async authorize(credentials) {
//       try {
//         const response = await axios.post(`${process.env.SERVER_URL}/api/auth/login`, {
//           email: credentials?.email,
//           password: credentials?.password,
//         });

//         const user = response.data;
//         if (user) return user;
//         return null;
//       } catch (error) {
//         throw new Error("Invalid email or password");
//       }
//     },
//   }),
// ],
// callbacks: {
//   async jwt({ token, user }: { token: JWT; user?: UserWithRole }) {
//     if (user) {
//       token.id = user.id;
//       token.role = user.role;
//       // token.token = user.token;
//     }
//     return token;
//   },
//   // async session({ session, token }) {
//   //   session.user.id = token.id;
//   //   session.user.role = token.role;
//   //   session.token = token.token;
//   //   return session;
//   // },
// },
//   pages: {
//     signIn: '/login'
//   },
//   secret:process.env.NEXTAUTH_SECRET,
// }

// export default authOptions;












import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { JWT } from "next-auth/jwt";

interface UserWithRole {
  id: string;
  email: string;
  role: string;
  access_token: string;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Replace with actual authentication logic
        const user: UserWithRole = {
          id: "123",
          email: credentials?.email || "",
          role: "user",
          access_token: "your_access_token_here",
        };
        return user ? user : null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          id: (user as UserWithRole).id,
          role: (user as UserWithRole).role,
          access_token: (user as UserWithRole).access_token,
        };
      }
      return token;
    },
    // async session({ session, token }) {
    //   session.user = {
    //     ...session.user,
    //     id: token.id,
    //     role: token.role,
    //     access_token: token.access_token,
    //   };
    //   return session;
    // },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
