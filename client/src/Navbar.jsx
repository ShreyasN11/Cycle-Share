import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Menu, X } from 'lucide-react';
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const NavItems = () => (
    <>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Services</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[200px] lg:w-[300px]">
                <ListItem href="/rent" title="Rent a cycle">
                  Rent a cycle for an hour or two
                </ListItem>
                <ListItem href="/list" title="List a Cycle">
                  List your cycles up for rent to earn passive income
                </ListItem>
                <ListItem href="#" title="Other Features">
                  Explore other features and services
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#">
              About
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} href="#">
              Contact
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <SignedIn>
        <NavigationMenu>
          <NavigationMenuLink className={navigationMenuTriggerStyle()} href="/dashboard">
            Dashboard
          </NavigationMenuLink>
        </NavigationMenu>
      </SignedIn>
    </>
  );

  return (
    <nav className="border-b">
      <div className="container mx-auto flex items-center justify-between px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-4">
          <a href="/" className="text-2xl font-bold">
            CYCLESHARE
          </a>
          <div className="hidden md:flex">
            <NavItems />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <SignedOut>
            <SignInButton className="flex items-center space-x-2 bg-black text-white rounded border-solid hover:bg-green-600 mx-auto p-2 px-4" forceRedirectUrl="/dashboard" />
          </SignedOut>
          <SignedIn>
            <UserButton className="bg-black text-white rounded p-2" />
          </SignedIn>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex flex-col space-y-4 mt-4">
                <NavItems />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}

const ListItem = React.forwardRef(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Navbar;