"use client";

import { FaHome, FaCode, FaSignInAlt } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  return (
    <>
      <div className="mx-auto bg-card border border-border p-4 rounded-2xl mt-3 max-w-6xl shadow-lg flex justify-between items-center">
        {/* Logo/Title */}
        <div>
          <h1 className="text-3xl font-black text-foreground">Percheat</h1>
        </div>
        {/* Navigation Items */}
        <div className="flex items-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/"
                  className="flex items-center space-x-2 text-foreground hover:text-blue-400 transition-colors"
                >
                  <FaHome />
                  <span>Home</span>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/snippets"
                  className="flex items-center space-x-2 text-foreground hover:text-blue-400 transition-colors"
                >
                  <FaCode />
                  <span>Snippets</span>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <Button
            variant="secondary"
            className="flex items-center space-x-2 ml-6"
            onClick={() => console.log("Clicked")}
          >
            <FaSignInAlt />
            <span>Login</span>
          </Button>
        </div>
      </div>
    </>
  );
}
