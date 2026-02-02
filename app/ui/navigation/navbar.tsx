"use client";

import Link from "next/link";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { useAuth } from "@/context/auth-provider";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <>
      <div className="mx-auto max-w-6xl flex justify-between items-center py-6 px-6">
        {/* Logo/Title */}
        <div>
          <Link href="/">
            <h1 className="text-3xl font-black cursor-pointer">
              Personal Cheatsheet
            </h1>
          </Link>
        </div>
        {/* Navigation Items */}
        <div className="flex items-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/manifesto"
                  className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors mr-4"
                >
                  <span>Manifesto</span>
                </NavigationMenuLink>
              </NavigationMenuItem>
              {user && (
                <NavigationMenuItem>
                  <NavigationMenuLink
                    href="/dashboard"
                    className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <span>Snippets</span>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>

          {user ? (
            <div className="flex items-center ml-6 gap-4">
              <span className="hidden md:inline-block text-sm font-medium text-muted-foreground">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Avatar size="lg">
                      <AvatarFallback>
                        {user.email.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40" align="start">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Link href="/dashboard">Dashboard</Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />

                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-full text-muted-foreground hover:text-red-500"
                          onClick={() => logout()}
                        >
                          <FaSignOutAlt className="mr-2 h-3 w-3" />
                          Logout
                        </Button>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </span>
            </div>
          ) : (
            <Button
              variant="secondary"
              className="flex items-center space-x-2 ml-6 rounded-full"
              asChild
            >
              <Link href="/login">
                <FaSignInAlt />
                <span>Login</span>
              </Link>
            </Button>
          )}
        </div>
      </div>
    </>
  );
}
