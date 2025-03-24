"use client";

import { ChevronsUpDown, LogOut } from "lucide-react";
import { toast } from "sonner"; // Import Sonner toast
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/features/auth/authSlice";
import { useRouter } from "next/navigation";


export function NavUser() {
const user = useAppSelector((state) => state.auth.user);// Access the session data
  const { isMobile } = useSidebar();
  const dispatch = useAppDispatch();
  const router = useRouter(); // Initialize router

  // Handle the logout process
  const handleLogout = () => {
     dispatch(logout());
     toast.success("Successfully logged out!"); // Show success toast
     setTimeout(() => {
      router.push("/login"); // Redirect to login page
    }, 1500); // Delay for smooth tran
  };

  // if (status === "loading") {
  //   return <div>Loading...</div>; // Optionally handle loading state
  // }

  if (!user) {
    return <div>User not logged in</div>; // If session is not available, handle it
  }


  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage alt={user?.name} src={user?.image || "/default-avatar.png"} />
                <AvatarFallback className="rounded-lg">
                  {user?.role || "U"} {/* Fallback if role is not available */}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage alt={user?.name} src={user?.image || "/default-avatar.png"} />
                  <AvatarFallback className="rounded-lg">
                    {user?.role || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user?.name}</span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuItem  onClick={handleLogout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
