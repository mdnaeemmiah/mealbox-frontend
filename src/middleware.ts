// export { default } from "next-auth/middleware"

import { getToken } from "next-auth/jwt";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// export const config = { matcher: [
//     "/members(/.*)?", // Matches /members, /members/add, /members/update, /members/delete
//     "/profile",
//   ], }

const roleBasedRoutes = {
  user: ["/about"],
  admin: ["/admin"],
};

export default async function middleware(req: NextRequest) {
  try {
    const { pathname } = req.nextUrl;

    const token = await getToken({ req });

    if (!token) {
      return NextResponse.redirect("/login");
    } 


    const userRole = token.role;

    const allowedRoutes =
      roleBasedRoutes[userRole as keyof typeof roleBasedRoutes];

    if (userRole && allowedRoutes) {
      const hasAccess = allowedRoutes.includes(pathname);

      if (hasAccess) {
        return NextResponse.next();
      }
    }

    return NextResponse.redirect(new URL("/", req.url));
  } catch (error) {
    console.error(error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

export const config = { matcher: ["/about"] };