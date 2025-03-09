"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { data: session, status } = useSession(); // Check if user is logged in

  // Default avatar URL
  const defaultAvatar = "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png";

  // Get user role from session (assuming it's stored in session.user.role)
  const userRole = session?.user?.role || "";

  // Determine dashboard route based on user role
  const dashboardRoute =
    userRole === "meal-provider" ? "/dashboard/provider/providerDashboard" :
    userRole === "customer" ? "/dashboard/customer/customerDashboard" :
    "/dashboard"; // Fallback route if role is missing

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Left Side: Logo & Name */}
      <Link href="/" className="flex items-center gap-2">
        <Image height={40} width={40} src="/meal-logo.png" alt="Meal Logo" />
        <span className="text-lg font-bold">Meal Hub</span>
      </Link>

      {/* Center: Navigation Links */}
      <div className="space-x-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <Link href="/about" className="hover:text-blue-600">About</Link>
        <Link href="/contact" className="hover:text-blue-600">Contact Us</Link>
      </div>

      {/* Right Side: Login Button or User Avatar */}
      <div>
        {status === "loading" ? (
          <span>Loading...</span>
        ) : !session ? (
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={session.user?.image || defaultAvatar} alt="User Avatar" />
                <AvatarFallback>{session.user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="/profile" className="cursor-pointer">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={dashboardRoute} className="cursor-pointer">Dashboard</Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </nav>
  );
}
