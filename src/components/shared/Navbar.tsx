"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react"; // Import useState for toggling the menu
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { data: session, status } = useSession(); // Check if user is logged in
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for menu visibility

  // Default avatar URL
  const defaultAvatar = "https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png";

  // Get user role from session (assuming it's stored in session.user.role)
  const userRole = session?.user?.role || "";

  // Determine dashboard route based on user role
  const dashboardRoute =
    userRole === "meal-provider" ? "/dashboard/provider/providerDashboard" :
    userRole === "customer" ? "/dashboard/customer/customerDashboard" :
    "/dashboard"; // Fallback route if role is missing

  // Toggle menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md relative">
      {/* Left Side: Logo & Name */}
      <Link href="/" className="flex items-center gap-2">
        <Image height={40} width={40} src="/meal-logo.png" alt="Meal Logo" />
        <span className="text-lg font-bold">Meal Hub</span>
      </Link>

      {/* Center: Navigation Links */}
      <div className="hidden md:flex space-x-6">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <Link href="/providerPost" className="hover:text-blue-600">Meal</Link>
        <Link href="/customerPost" className="hover:text-blue-600">Meal-Preference</Link>
        <Link href="/abouts" className="hover:text-blue-600">About Us</Link>
        <Link href="/contact" className="hover:text-blue-600">Contact Us</Link>
      </div>

      {/* Hamburger Menu for Small Devices */}
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-2xl focus:outline-none">
          {isMenuOpen ? "✖" : "☰"}
        </button>
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

      {/* Mobile Menu (for small screens) */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-md z-10">
          <div className="flex flex-col items-center space-y-4 py-4">
            <Link href="/" className="hover:text-blue-600">Home</Link>
            <Link href="/providerPost" className="hover:text-blue-600">Meal</Link>
            <Link href="/customerPost" className="hover:text-blue-600">Meal-Preference</Link>
            <Link href="/contact" className="hover:text-blue-600">Contact Us</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
